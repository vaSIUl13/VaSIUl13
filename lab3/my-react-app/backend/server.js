const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

//POST
app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = req.body;
    const totalItems = newOrder.items.reduce((sum, item) => sum + item.quantity, 0);

    if (totalItems < 1) {
      return res.status(400).json({ message: "Кошик порожній. Додайте мінімум 1 страву." });
    } 
    if (totalItems > 10) {
      return res.status(400).json({ message: "Перевищено ліміт! Максимум 10 страв в одному замовленні." });
    }

    const docRef = await db.collection("orders").add(newOrder);
    res.status(201).json({ message: "Замовлення успішно оформлено!", orderId: docRef.id });

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
      return res.status(400).json({ message: "Необхідно вказати email користувача" });
    }

    const snapshot = await db.collection("orders").where("userEmail", "==", userEmail).get();
    const orders = [];
    
    snapshot.forEach(doc => {
      orders.push({ id: doc.id, ...doc.data() });
    });

    orders.sort((a, b) => b.id - a.id);

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