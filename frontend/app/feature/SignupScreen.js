import React, { useState } from "react";
import { 
  View, Text, TextInput, StyleSheet, TouchableOpacity, 
  Alert, ActivityIndicator, Platform, ToastAndroid 
} from "react-native";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from "../config/firebaseConfig";  // Assure-toi que ce fichier existe pour la configuration de Firebase

const auth = getAuth(app);

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');  // Nouveau champ pour le nom d'utilisateur
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = () => {
    if (email === "" || password === "" || confirmPassword === "" || username === "") {
      Alert.alert("Erreur", "Tous les champs doivent être remplis.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);

    // Créer un utilisateur avec Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Mettre à jour le profil de l'utilisateur avec le nom d'utilisateur
        updateProfile(userCredential.user, {
          displayName: username,
        })
        .then(() => {
          // Inscription réussie et profil mis à jour
          console.log("✅ Inscription réussie :", userCredential.user);
          Platform.OS === "android"
            ? ToastAndroid.show("Inscription réussie !", ToastAndroid.SHORT)
            : Alert.alert("Succès", "Inscription réussie !");
          
          // Naviguer vers l'écran de connexion (ou autre écran, selon ta logique)
          navigation.navigate("HomeScreen");
        })
        .catch((error) => {
          console.error("❌ Erreur lors de la mise à jour du profil :", error);
          Alert.alert("Erreur", "Une erreur est survenue lors de la mise à jour du profil.");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Erreur", errorMessage);
        console.log(errorCode, errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Rx-APA</Text>
      </View>

      <View style={styles.authContainer}>
        <Text style={styles.authTitle}>INSCRIPTION</Text>
        <Text style={styles.authSubtitle}>Veuillez saisir votre email, mot de passe et nom d'utilisateur</Text>

        <TextInput 
          style={styles.input}
          placeholder="Entrez votre nom d'utilisateur"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
        />

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
          placeholder="Entrez votre mot de passe"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput 
          style={styles.input}
          placeholder="Confirmez votre mot de passe"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          {isLoading ? <ActivityIndicator /> : <Text style={styles.buttonText}>S'inscrire</Text>}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.link}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Text>Vous avez déjà un compte ? Connectez-vous</Text>
        </TouchableOpacity>
      </View>
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
});

export default SignupScreen;
