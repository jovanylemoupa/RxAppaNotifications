// screens/NotificationsScreen.tsx

import React, { useEffect, useState } from "react";
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  Modal, Pressable, Platform
} from "react-native";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { registerForPushNotificationsAsync } from "../../core/notifications";

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<{ id: string; title: string; body: string }[]>(
    []
  );
  const [selectedNotif, setSelectedNotif] = useState<null | { title: string; body: string }>(null);
  const navigation = useNavigation();

  // Récupération du token au lancement
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  // Quand une notif est reçue
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      const { title, body } = notification.request.content;
      const id = notification.request.identifier;

      setNotifications((prev) => [
        { id, title: title ?? "Sans titre", body: body ?? "Sans contenu" },
        ...prev,
      ]);
    });

    return () => subscription.remove();
  }, []);

  // Quand une notif est cliquée (même hors de l'app)
  useEffect(() => {
    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      const { title, body } = response.notification.request.content;
      const id = response.notification.request.identifier;

      // Ajoute dans la liste si elle n’y est pas
      setNotifications((prev) => {
        const exists = prev.find((notif) => notif.id === id);
        if (!exists) {
          return [{ id, title: title ?? "Sans titre", body: body ?? "Sans contenu" }, ...prev];
        }
        return prev;
      });

      // On ouvre le détail directement
      setSelectedNotif({ title: title ?? "Sans titre", body: body ?? "Sans contenu" });
    });

    return () => responseListener.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔔 Notifications reçues</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20, width: "100%" }}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.notificationItem}
            onPress={() => setSelectedNotif(item)}
          >
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text numberOfLines={1} style={{ color: "#555" }}>
              {item.body}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal de détail */}
      <Modal
        visible={!!selectedNotif}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedNotif(null)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedNotif?.title}</Text>
            <Text style={styles.modalBody}>{selectedNotif?.body}</Text>
            <Pressable onPress={() => setSelectedNotif(null)} style={styles.closeButton}>
              <Text style={{ color: "#fff" }}>Fermer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  notificationItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalBody: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
