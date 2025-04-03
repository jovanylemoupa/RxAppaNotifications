const express = require("express");
const cors = require("cors");
require("dotenv").config();
const admin = require("firebase-admin");

// 🔥 Initialisation de Firebase avec les credentials
const serviceAccount = require("./src/config/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
console.log("✅ Firebase initialisé avec succès !");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

let userTokens = []; // Stocke les tokens des appareils

// ✅ Message par défaut envoyé depuis le backend
const defaultMessage = "🔄 Chargement des données depuis le serveur node...";

// ✅ Route de test pour récupérer le message
app.get("/", (req, res) => {
  console.log("📡 Requête GET reçue sur /");
  res.json({ message: defaultMessage });
});

// ✅ Route pour récupérer tous les tokens enregistrés
app.get("/tokens", (req, res) => {
  res.json({ tokens: userTokens });
});

// ✅ Sauvegarder un token Firebase Cloud Messaging (FCM)
app.post("/save-token", (req, res) => {
  const { token } = req.body;
  if (token && !userTokens.includes(token)) {
    userTokens.push(token);
    console.log("📲 Token enregistré :", token);
  }
  res.json({ success: true });
});

// ✅ Envoyer une notification push à tous les tokens enregistrés
app.post("/send-notification", async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body || userTokens.length === 0) {
    return res.status(400).json({ error: "Données manquantes ou aucun token enregistré." });
  }

  const messages = userTokens.map((token) => ({
    notification: { title, body },
    token,
  }));

  try {
    const response = await admin.messaging().sendEach(messages);
    res.json({ success: "Notifications envoyées !", response });
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi :", error);
    res.status(500).json({ error: "Erreur lors de l'envoi de la notification" });
  }
});

// ✅ Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
