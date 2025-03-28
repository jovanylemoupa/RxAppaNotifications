const admin = require("../config/firebase");

const sendNotification = async (token, title, body) => {
  const message = {
    notification: { title, body },
    token,
  };

  try {
    await admin.messaging().send(message);
    console.log("Notification envoyée !");
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
  }
};

module.exports = { sendNotification };
