const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

let firebaseKey;
try {
  if (process.env.FIREBASE_KEY) {
    // Це магічний рядок, який вичищає всі проблеми з переносом рядків
    const cleanKey = process.env.FIREBASE_KEY
      .replace(/\\n/g, '\n')
      .replace(/\n/g, '\\n') // тимчасово екрануємо справжні переноси
      .replace(/\\n/g, '\n'); // і робимо їх правильними для JSON
    
    firebaseKey = JSON.parse(cleanKey);
    console.log("Firebase key loaded from Environment");
  } else {
    firebaseKey = require("./serviceAccountKey.json");
  }

  if (firebaseKey) {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseKey)
    });
  }
} catch (e) {
  console.error("Помилка JSON:", e.message);
  // План Б: якщо JSON все одно битий, спробуємо хоча б завантажити файл
  try {
    firebaseKey = require("./serviceAccountKey.json");
    admin.initializeApp({ credential: admin.credential.cert(firebaseKey) });
  } catch (fileErr) {
    console.error("Файл ключа теж недоступний");
  }
}
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