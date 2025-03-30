const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route de test
app.get("/", (req, res) => {
  res.json({ message: "Djiki t'es un genie......." });
});

// Lancer le serveur
app.listen(PORT,() => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
