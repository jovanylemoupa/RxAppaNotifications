import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, 
  Modal, Button, Platform, ToastAndroid, ActivityIndicator
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../config/firebaseConfig";

const API_URL = "http://192.168.230.82:5000";
const auth = getAuth(app);

const HomeScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [backendMessage, setBackendMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log("✅ Réponse du backend :", data);
        setBackendMessage(data.message);
      })
      .catch((error) => {
        console.error("❌ Erreur de connexion :", error);
        setBackendMessage("❌ Erreur de connexion au backend");
      });
  }, []);

  const handleSignIn = () => {
    if (email === "" || password === "") {
      Alert.alert("Erreur", "Veuillez entrer votre email et votre code personnel.");
      return;
    }
    setIsLoading(true);
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("✅ Connexion réussie :", userCredential.user);
        
        // Naviguer vers WelcomeScreen après une connexion réussie
        Platform.OS === "android" 
          ? ToastAndroid.show("Connexion réussie !", ToastAndroid.SHORT)
          : Alert.alert("Succès", "Connexion réussie !");

        // Passer le nom de l'utilisateur (displayName) à l'écran de bienvenue
        navigation.navigate("WelcomeScreen", { username: userCredential.user.displayName });
        
        setModalVisible(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Erreur", errorCode === "auth/invalid-credential" ? "Email ou mot de passe invalide." : errorMessage);
        console.log(errorCode, errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  const handleSignup = () => {
    return navigation.navigate("SignupScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Rx-APA</Text>
      </View>

      <View style={styles.authContainer}>
        <Text style={styles.authTitle}>AUTHENTIFICATION</Text>
        <Text style={styles.authSubtitle}>Veuillez saisir votre email et votre code personnel</Text>

        <TextInput 
          style={styles.input}
          placeholder="Entrez votre email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput 
          style={styles.input}
          placeholder="Entrez votre code"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          {isLoading ? <ActivityIndicator /> : <Text style={styles.buttonText}>Se connecter</Text>}
        </TouchableOpacity>
        
        <TouchableOpacity 
        style={styles.link}
        onPress={handleSignup}>
         <Text>Je n'ai pas le code personnel </Text>   
        </TouchableOpacity>
      </View>

      <Text style={styles.backendMessage}>{backendMessage || "Chargement..."}</Text>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18 }}>✅ Connexion réussie !</Text>
            <Button title="OK" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b0c4de",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    position: "absolute",
    top: 50,
    alignItems: "center",
    width: "100%",
  },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0a2a66",
  },
  authContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    elevation: 5,
    marginTop: 100,
  },
  authTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  authSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#0a2a66",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    color: "#0a2a66",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  backendMessage: {
    marginTop: 20,
    fontSize: 14,
    color: "#0a2a66",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default HomeScreen;
