import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import axios from "axios";
import { View, Text, Button } from "react-native";
import { useEffect, useState } from "react";

export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  if (!Device.isDevice) {
    console.warn("🚨 Les notifications push ne fonctionnent que sur un appareil physique.");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.warn("🚫 Permission refusée pour les notifications.");
    return;
  }

  const projectId = Constants.expoConfig?.extra?.eas?.projectId;
  if (!projectId) {
    console.warn("🚨 Le projectId d'Expo est introuvable.");
    return;
  }

  try {
    const { data: token } = await Notifications.getExpoPushTokenAsync({ projectId });

    console.log("🔥 Token Expo :", token);
    await axios.post("http://192.168.230.82:5000/save-token", { token })
      .then(response => console.log("✅ Token envoyé avec succès :", response.data))
      .catch(error => console.error("❌ Erreur lors de l'envoi du token :", error));

    return token;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du token Expo :", error);
  }
}

// ✅ Composant React Native pour tester les notifications
export default function NotificationsScreen() {
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    registerForPushNotificationsAsync().then(setToken);
  }, []);

  return (
    <View>
      <Text>Page de gestion des notifications</Text>
      {token && <Text>🎯 Token : {token}</Text>}
      <Button title="Tester Notification" onPress={() => {
        axios.post("http://192.168.230.82:5000/send-notification", {
          title: "🚀 Test Notification",
          body: "Ceci est un test de notification depuis Expo",
        })
        .then(response => console.log("✅ Notification envoyée :", response.data))
        .catch(error => console.error("❌ Erreur lors de l'envoi de la notification :", error));
      }} />
    </View>
  );
}
