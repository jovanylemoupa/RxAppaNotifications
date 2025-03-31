import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import axios from "axios";
import { View, Text } from "react-native";

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
    const { data: token } = await Notifications.getExpoPushTokenAsync({
      projectId: projectId,
    });

    console.log("🔥 Token Expo :", token);
    await axios.post("http://192.168.X.X:5000/save-token", { token });

    return token;
  } catch (error) {
    console.error("Erreur lors de la récupération du token Expo :", error);
  }
}

// ✅ Ajout d'un composant React pour éviter l'erreur Expo Router
export default function NotificationsScreen() {
  return (
    <View>
      <Text>Page de gestion des notifications</Text>
    </View>
  );
}
