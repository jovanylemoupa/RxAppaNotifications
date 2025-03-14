import React from 'react';
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
                return { backgroundColor: "#FFA500", borderRadius: 5 }; // Utilisation de la couleur orange
            case "outline":
                return { backgroundColor: "white", borderColor: "#FFA500", borderWidth: 1, borderRadius: 5 }; // Utilisation de la couleur orange
            case "disable":
                return { backgroundColor: "#FFA500", borderColor: "#FFA500", borderWidth: 1, borderRadius: 5 }; // Utilisation de la couleur orange
            case "ico":
                if (iconTheme === "accent") {
                    return { backgroundColor: "#FFFFFF", borderRadius: 50 };
                }
                if (iconTheme === "secondary") {
                    return { backgroundColor: "#FFA500", borderRadius: 50 }; // Utilisation de la couleur orange
                }
                if (iconTheme === "gray") {
                    return { backgroundColor: "#FFA500", borderRadius: 50 }; // Utilisation de la couleur orange
                }
                break;
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

    return (
        <TouchableOpacity
            style={[variantStyle, sizeStyle, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', opacity: disabled ? 0.6 : 1 }]}
            onPress={() => console.log('Button Pressed')}
            disabled={disabled}
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
    );
}
