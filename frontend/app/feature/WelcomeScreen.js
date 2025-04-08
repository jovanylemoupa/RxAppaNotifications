import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Buton from '../core/button';
import Alter from "../../assets/fonts/alter1.svg";
import Graph from "../../assets/fonts/graph1.svg";
import Minuter from "../../assets/fonts/minuter1.svg";
import Notif from "../../assets/fonts/notif1.svg";
import Param from "../../assets/fonts/param1.svg";
import { useRouter } from 'expo-router';

const WelcomeScreen = ({ route, navigation }) => {
  const { username } = route.params;  // Récupérer le nom de l'utilisateur passé via `navigation`
  const router = useRouter(); // Utiliser le hook useRouter pour la navigation
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenue, {username} !</Text>
      <Button 
        title="Se déconnecter"
        onPress={() => {
          navigation.navigate("HomeScreen");  // Rediriger vers la page de connexion
        }}
      />

                <Buton icon={Alter} iconPosition="left" onPress={() => router.push("/feature/screens/MonProgramme")}>
                    Mon Programme
                </Buton>
                <Buton icon={Minuter} iconPosition="left" onPress={() => router.push("/feature/screens/MaSeance")}>
                    Ma Séance
                </Buton>
                <Buton icon={Graph} iconPosition="left" onPress={() => router.push("/feature/screens/MaProgession")}>
                    Ma Progression
                </Buton>
                <Buton icon={Param} iconPosition="left" onPress={() => router.push("/feature/screens/Configuration")}>
                    Configuration
                </Buton>
                <Buton icon={Notif} iconPosition="left" onPress={() => router.push("/feature/screens/Notification")}>
                    Notification
                </Buton>
               
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f0f8ff",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});

export default WelcomeScreen;
