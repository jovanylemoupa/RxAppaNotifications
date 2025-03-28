import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import axios from "axios";

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

  // Vérifier si expoConfig est défini avant de l'utiliser
  const projectId = Constants.expoConfig?.extra?.eas?.projectId;

  if (!projectId) {
    console.warn("🚨 Le projectId d'Expo est introuvable.");
    return;
  }

  // Obtenir le token Expo
  const { data: token } = await Notifications.getExpoPushTokenAsync({
    projectId: projectId,
  });

  console.log("🔥 Token Expo :", token);

  // Envoyer le token au backend
  await axios.post("http://192.168.X.X:3000/save-token", { token });

  return token;
}
