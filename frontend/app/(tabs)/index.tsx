import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from '@/app/core/button'; // Assurez-vous de l'importer correctement

const API_URL = "http://192.168.X.X:5000"; // Remplace par ton IP locale

const Stack = createStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  const [backendMessage, setBackendMessage] = useState("Connexion en cours...");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setBackendMessage(data.message))
      .catch(() => setBackendMessage("❌ Erreur de connexion au backend"));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Rx-APA</Text>
      </View>
      <View style={styles.authContainer}>
        <Text style={styles.authTitle}>AUTHENTIFICATION</Text>
        <Text style={styles.authSubtitle}>Veuillez saisir votre code personnel</Text>
        <TextInput style={styles.input} placeholder="Entrez votre code" placeholderTextColor="#999" />
        <Button variant="secondary">
          <Text style={styles.buttonText}>CONNEXION</Text>
        </Button>
        <Text style={styles.link}>Je n'ai pas le code personnel</Text>
      </View>
      {/* ✅ Message du backend affiché ici */}
      <Text style={styles.backendMessage}>{backendMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b0c4de',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 80,
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0a2a66',
  },
  authContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
  },
  authTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  authSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  link: {
    color: '#0a2a66',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  backendMessage: {
    marginTop: 20,
    fontSize: 14,
    color: '#0a2a66',
  },
});
