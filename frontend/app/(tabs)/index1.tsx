import Backgrounds from '@/components/background';
import Buton from '@/components/Button';
import React, { useState } from 'react';
import { styles } from '@/styles/style';
import { View, Text, TextInput } from 'react-native';
import { fetchApiData } from '../api/API'; // Importation correcte

export default function HomeScreen() {
  const [message, setMessage] = useState("");  // État pour afficher le message
  const [isFetching, setIsFetching] = useState(false);  // État pour gérer le chargement

  return (
    <Backgrounds>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Rx-APA</Text>
      </View>

      <View style={styles.authContainer}>
        <Text style={styles.authTitle}>AUTHENTIFICATION</Text>
        <Text style={styles.authSubtitle}>Veuillez saisir votre code personnel</Text>

        <TextInput style={styles.input} placeholder="Entrez votre code" placeholderTextColor="#999" />

        {/* Bouton avec gestion du clic */}
        <Buton variant="secondary" isLoading={isFetching} onPress={() => fetchApiData(setMessage, setIsFetching)}>
          <Text style={styles.buttonText}>CONNEXION</Text>
        </Buton>

        {/* Affichage du message d'erreur ou de succès */}
        {message && <Text style={{ color: "red", marginTop: 10 }}>{message}</Text>}

        <Text style={styles.link}>Je n'ai pas le code personnel</Text>
      </View>
    </Backgrounds>
  );
}
