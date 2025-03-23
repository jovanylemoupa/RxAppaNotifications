
import Buton from '@/components/Button';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logo}>Rx-APA</Text>
                </View>
                <View style={styles.authContainer}>
                    <Text style={styles.authTitle}>AUTHENTIFICATION</Text>
                    <Text style={styles.authSubtitle}>Veuillez saisir votre code personnel</Text>
                    <TextInput style={styles.input} placeholder="Entrez votre code" placeholderTextColor="#999" />
                    <Buton variant='secondary' >
                        <Text style={styles.buttonText}>CONNEXION</Text>
                    </Buton>
                    <Text style={styles.link}>Je n'ai pas le code personnel</Text>
                </View>
            </View>   
  );
}

const style = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    alignItems:'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b0c4de', // Bleu clair
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
  button: {
    backgroundColor: '#f79c00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
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
});

