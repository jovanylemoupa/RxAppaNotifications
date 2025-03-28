import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Button } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { saveToken, sendNotification } from "../(tabs)/api"; // Ajout d'un import sans l'extension .js

// Déclaration du type pour les écrans
type ScreenProps = {
  navigation: any; // Ou un type plus précis si nécessaire
};

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC<ScreenProps> = () => (
  <View>
    <Text>🏠 Accueil</Text>
    <Button title="Envoyer une notification" onPress={() => sendNotification("Hello", "Bienvenue !")} />
  </View>
);

const SettingsScreen: React.FC<ScreenProps> = () => (
  <View>
    <Text>⚙️ Paramètres</Text>
  </View>
);

const TabNavigator: React.FC = () => {
  useEffect(() => {
    const getToken = async () => {
      const token = await messaging().getToken();
      if (token) {
        await saveToken(token);
      }
    };

    getToken();
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Paramètres" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
