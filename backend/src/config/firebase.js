const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Assure-toi que le chemin est bon

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
