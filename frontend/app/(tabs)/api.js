import axios from "axios";

const API_URL = "http://10.0.2.2:3000"; // Pour Android Emulator (remplace par "http://localhost:3000" si tu es sur iOS)

export const saveToken = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/save-token`, { token });
    return response.data;
  } catch (error) {
    console.error("❌ Erreur enregistrement du token :", error);
  }
};

export const sendNotification = async (title, body) => {
  try {
    const response = await axios.post(`${API_URL}/send-notification`, { title, body });
    return response.data;
  } catch (error) {
    console.error("❌ Erreur envoi notification :", error);
  }
};
