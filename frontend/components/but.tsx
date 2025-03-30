import React, { useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View, StyleSheet } from 'react-native';

export type IconProps = {
    icon: React.ComponentType<{ size: number}>;
};

export type Props = {
    size?: "small" | "medium" | "large";
    variant?: "accent" | "secondary" | "outline" | "ico" | "disable";
    icon?: IconProps['icon'];
    iconTheme?: "accent" | "secondary" | "gray";
    iconPosition?: "left" | "right";
    disabled?: boolean;
    isLoading?: boolean;
    children?: React.ReactNode;
};

export default function Button({
    size = "medium",
    variant = "accent",
    icon,
    iconTheme = "accent",
    iconPosition = "right",
    disabled,
    isLoading,
    children
}: Props) {
    const [message, setMessage] = useState("");
    const [isFetching, setIsFetching] = useState(false);

    const getVariantStyle = () => {
        switch (variant) {
            case "accent":
                return { backgroundColor: "#007BFF", borderRadius: 5 };
            case "secondary":
                return { backgroundColor: "#FFA500", borderRadius: 5 };
            case "outline":
                return { backgroundColor: "white", borderColor: "#FFA500", borderWidth: 1, borderRadius: 5 };
            case "disable":
                return { backgroundColor: "#D3D3D3", borderRadius: 5 };
            case "ico":
                return { backgroundColor: iconTheme === "accent" ? "#007BFF" : "#FFA500", borderRadius: 50 };
            default:
                return {};
        }
    };

    const getSizeStyle = () => {
        switch (size) {
            case "small":
                return { padding: 10, fontSize: 12, width: 100, marginBottom: 10 };
            case "medium":
                return { padding: 15, fontSize: 14, width: 200, marginBottom: 10 };
            case "large":
                return { padding: 20, fontSize: 16, width: 300, marginBottom: 10 };
            default:
                return {};
        }
    };

    const handleClick = async () => {
        setIsFetching(true);
        setMessage("");

        try {
            const response = await fetch('http://192.168.47.147:5000');
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const json = await response.json();

            if (json && json.message) {
                setMessage(json.message);
            } else {
                setMessage("Message non disponible.");
            }
        } catch (error) {
            console.error('Erreur :', error);
            setMessage("Impossible de se connecter au serveur.");
        } finally {
            setIsFetching(false);
        }
    };

    const variantStyle = getVariantStyle();
    const sizeStyle = getSizeStyle();
    const iconSize = size === "small" ? 18 : size === "medium" ? 20 : 24;

    return (
        <View>
            <TouchableOpacity
                style={[styles.button, variantStyle, sizeStyle, { opacity: disabled || isFetching ? 0.6 : 1 }]}
                onPress={handleClick}
                disabled={disabled || isFetching}
            >
                {isLoading ? (
                    <ActivityIndicator size="small"/>
                ) : (
                    <View style={styles.content}>
                        {icon && iconPosition === "left" && React.createElement(icon, { size: iconSize })}
                            <Text style={[styles.text]}>{children}</Text>
                        {icon && iconPosition === "right" && React.createElement(icon, { size: iconSize })}

                    </View>
                )}
            </TouchableOpacity>

            {message && <Text style={styles.message}>{message}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
});
