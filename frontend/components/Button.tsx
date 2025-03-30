import { styles } from '@/styles/style';
import React, { useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

export type Props = {
    size?: "small" | "medium" | "large";
    variant?: "accent" | "secondary" | "outline" | "ico" | "disable";
    icon?: React.ComponentType<{ size: number, color?: string }>;
    iconTheme?: "accent" | "secondary" | "gray";
    iconPosition?: "left" | "right";
    disabled?: boolean;
    isLoading?: boolean;
    children?: React.ReactNode;
    onPress?: () => void;
};

export default function Buton({
    size = "medium",
    variant = "accent",
    icon: IconComponent,
    iconTheme = "accent",
    iconPosition = "right",
    disabled,
    isLoading,
    children,
    onPress
}: Props) {
    const [message, setMessage] = useState("");
    const [isFetching, setIsFetching] = useState(false);

    // Vérification de l'icône
    //console.log("IconComponent:", IconComponent);

    const getVariantStyle = () => {
        switch (variant) {
            case "accent": 
                return { backgroundColor: "#FFFFFF", borderRadius: 5 };
            case "secondary": 
                return { backgroundColor: "#FFA500", borderRadius: 5 };
            case "outline": 
                return { backgroundColor: "white", borderColor: "#FFA500", borderWidth: 1, borderRadius: 5 };
            case "disable": 
                return { backgroundColor: "#D3D3D3", borderRadius: 5 };
            case "ico": 
                return { backgroundColor: iconTheme === "accent" ? "#007BFF" : "#FFA500", borderRadius: 50 };
            
        }
    };

    const getSizeStyle = () => {
        switch (size) {
            case "small": 
                return { padding: 10, fontSize: 12, width: 100, marginBottom: 10 };
            case "medium": 
                return { padding: 15, fontSize: 14, width: 250, marginBottom: 10 };
            case "large": 
                return { padding: 20, fontSize: 16, width: 300, marginBottom: 10 };
            
        }
    };

    const variantStyle = getVariantStyle();
    const sizeStyle = getSizeStyle();
    const iconSize = size === "small" ? 18 : size === "medium" ? 20 : 24;

    return (
        <View>
            <TouchableOpacity
                style={[variantStyle, sizeStyle, { opacity: disabled || isFetching ? 0.6 : 1 }]}
                onPress={onPress}
                
                disabled={disabled || isFetching}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" />
                ) : (
                    <View style={styles.content}>
                        {IconComponent && iconPosition === "left" && typeof IconComponent === "function" && (
                            <IconComponent size={iconSize}  />
                        )}
                        <Text style={[styles.text]}>{children}</Text>
                        {IconComponent && iconPosition === "right" && typeof IconComponent === "function" && (
                            <IconComponent size={iconSize} />
                        )}
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
}
