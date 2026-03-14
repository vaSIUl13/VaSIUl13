const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

const secretPath = fs.existsSync("/etc/secrets/serviceAccountKey.json")
  ? "/etc/secrets/serviceAccountKey.json"
  : path.join(__dirname, "serviceAccountKey.json");

const serviceAccount = require(secretPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

//POST
app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = req.body;
    const totalItems = newOrder.items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

    if (totalItems < 1) {
      return res
        .status(400)
        .json({ message: "Кошик порожній. Додайте мінімум 1 страву." });
    }
    if (totalItems > 10) {
      return res
        .status(400)
        .json({
          message: "Перевищено ліміт! Максимум 10 страв в одному замовленні.",
        });
    }

    const docRef = await db.collection("orders").add(newOrder);
    res
      .status(201)
      .json({ message: "Замовлення успішно оформлено!", orderId: docRef.id });
  } catch (error) {
    console.error("Помилка збереження замовлення:", error);
    res.status(500).json({ message: "Помилка сервера при збереженні" });
  }
});

//GET
app.get("/api/orders", async (req, res) => {
  try {
    const userEmail = req.query.email;
    if (!userEmail) {
      return res
        .status(400)
        .json({ message: "Необхідно вказати email користувача" });
    }

    const snapshot = await db
      .collection("orders")
      .where("userEmail", "==", userEmail)
      .get();
    const orders = [];

    snapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });

    orders.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; 
    });

    res.json(orders);
  } catch (error) {
    console.error("Помилка отримання замовлень:", error);
    res.status(500).json({ message: "Помилка сервера при завантаженні" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
