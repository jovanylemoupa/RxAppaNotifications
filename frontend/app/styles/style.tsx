
import { StyleSheet } from "react-native";
export const style = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
        alignItems: 'center',
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});

export const styles = StyleSheet.create({
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
    text: {
        marginHorizontal: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    message: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 14,
        color: "#333",
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
    content: {
        flexDirection: 'row',
        alignItems: "flex-start",
    },
});
