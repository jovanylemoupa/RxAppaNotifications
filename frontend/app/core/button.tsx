import React, { useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

export type IconProps = {
    icon: React.ComponentType<{ size: number; color?: string }>;
};

export type Props = {
    size?: "small" | "medium" | "large";
    variant?: "accent" | "secondary" | "outline" | "ico" | "disable";
    icon?: IconProps;
    iconTheme?: "accent" | "secondary" | "gray";
    iconPosition?: "left" | "right";
    disabled?: boolean;
    isLoading?: boolean;
    children?: React.ReactNode;
};

export default function Buton({
    size = "medium",
    variant = "accent",
    icon,
    iconTheme = "accent",
    iconPosition = "right",
    disabled,
    isLoading,
    children
}: Props) {
    const getVariantStyle = () => {
        switch (variant) {
            case "accent":
                return { backgroundColor: "#FFFFFF", borderRadius: 5 };
            case "secondary":
                return { backgroundColor: "#FFA500", borderRadius: 5 };
            case "outline":
                return { backgroundColor: "white", borderColor: "#FFA500", borderWidth: 1, borderRadius: 5 };
            case "disable":
                return { backgroundColor: "#FFA500", borderColor: "#FFA500", borderWidth: 1, borderRadius: 5 };
            case "ico":
                return { backgroundColor: iconTheme === "accent" ? "#FFFFFF" : "#FFA500", borderRadius: 50 };
            default:
                return {};
        }
    };

    const getSizeStyle = () => {
        switch (size) {
            case "small":
                return { padding: 10, fontSize: 12 };
            case "medium":
                return { padding: 15, fontSize: 14 };
            case "large":
                return { padding: 20, fontSize: 16 };
            default:
                return {};
        }
    };

    const variantStyle = getVariantStyle();
    const sizeStyle = getSizeStyle();
    const iconSize = size === "small" ? 18 : size === "medium" ? 20 : 24;
    const [message, setMessage] = useState(""); // State pour stocker la réponse
    const [isFetching, setIsFetching] = useState(false); // Gérer l'état de la requête (chargement)

    const handleclick = async () => {
        setIsFetching(true);  // Indiquer que la requête est en cours
        setMessage(""); // Réinitialiser le message avant la nouvelle requête

        try {
            const response = await fetch('http://192.168.47.147:5000'); // Mets bien l'IP de ton PC
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const json = await response.json();

            // Vérifie si la réponse contient un message valide
            if (json && json.message) {
                setMessage(json.message); // Met à jour le state avec la réponse
            } else {
                setMessage("Message non disponible dans la réponse.");
            }
        } catch (error) {
            console.error('Erreur :', error);
            setMessage("Erreur de connexion");
        } finally {
            setIsFetching(false); // Indiquer que la requête est terminée
        }
    };

    return (
        <View>
            {/* Le bouton qui déclenche l'appel API */}
            <TouchableOpacity
                style={[variantStyle, sizeStyle, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', opacity: disabled ? 0.6 : 1 }]}
                onPress={handleclick}
                disabled={disabled || isFetching} // Désactiver le bouton en cas de chargement
            >
                {isLoading && (
                    <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="small" color={variant === "accent" || variant === "ico" ? "white" : "black"} />
                    </View>
                )}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', opacity: isLoading ? 0 : 1 }}>
                    {icon && iconPosition === "left" && (
                        <icon.icon size={iconSize} />
                    )}
                    <Text style={{ marginHorizontal: 8 }}>{children}</Text>
                    {icon && iconPosition === "right" && (
                        <icon.icon size={iconSize} />
                    )}
                </View>
            </TouchableOpacity>

            {/* Afficher le message uniquement après le clic */}
            {message && (
                    <Text style={{ marginTop: 10 }}>{message}</Text>
            )}
        </View>
    );
}