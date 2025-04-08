// utils/notificationsUtils.ts

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import axios from "axios";

// Gérer les notifications même en foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Fonction d'enregistrement + envoi du token au backend
export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  if (!Device.isDevice) {
    console.warn("🚨 Notifications push uniquement sur appareil physique.");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.warn("🚫 Permission refusée.");
    return;
  }

  const projectId = Constants.expoConfig?.extra?.eas?.projectId;
  if (!projectId) {
    console.warn("❗ projectId manquant dans app.config.js");
    return;
  }

  try {
    const { data: token } = await Notifications.getExpoPushTokenAsync({ projectId });
    console.log("✅ Token Expo:", token);
    await axios.post("http://192.168.230.82:5000/save-token", { token });
    return token;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du token:", error);
  }
}
