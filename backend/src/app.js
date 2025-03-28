import React, { useEffect } from "react";
import { View, Text } from "react-native";
import messaging from "@react-native-firebase/messaging";
import axios from "axios"; // Pour envoyer le token au backend

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("✅ Permission accordée !");
    getToken();
  } else {
    console.log("🚫 Permission refusée !");
  }
}


async function getToken() {
  try {
    const token = await messaging().getToken();
    console.log("🔥 Token de l'appareil :", token);

    // Envoyer le token au backend pour l'utiliser dans les notifications
    await axios.post("http://192.168.X.X:3000/save-token", { token });

  } catch (error) {
    console.error("❌ Erreur lors de la récupération du token :", error);
  }
}

const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <View>
      <Text>Application Firebase Notifications</Text>
    </View>
  );
};

export default App;
