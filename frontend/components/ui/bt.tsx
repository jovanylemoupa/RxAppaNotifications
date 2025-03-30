import { styles } from '@/styles/style';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

export type Props = {
    size?: "small" | "medium" | "large";
    variant?: "accent" | "secondary" | "outline" | "ico" | "disable";
    icon?: React.ComponentType<{ size: number; color?: string }>;
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
    onPress,
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
                return { padding: 10, fontSize: 12, width: 100, marginBottom: 10 };
            case "medium":
                return { padding: 15, fontSize: 14, width: 280, marginBottom: 10 };
            case "large":
                return { padding: 20, fontSize: 16, width: 300, marginBottom: 10 };
            default:
                return {};
        }
    };

    const variantStyle = getVariantStyle();
    const sizeStyle = getSizeStyle();
    const iconSize = size === "small" ? 18 : size === "medium" ? 20 : 24;
    

    return (
        <View>
            <TouchableOpacity
                style={[
                    variantStyle,
                    sizeStyle,
                    { flexDirection: 'row', alignItems: 'center', opacity: disabled ? 0.6 : 1 }
                ]}
                onPress={onPress}
                disabled={disabled || isLoading}
            >
                {isLoading && (
                    <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="small" color={variant === "accent" || variant === "ico" ? "white" : "black"} />
                    </View>
                )}
                <View style={styles.content}>
                    {IconComponent && iconPosition === "left" && <IconComponent size={iconSize} />}
                    <Text style={styles.text}>{children}</Text>
                    {IconComponent && iconPosition === "right" && <IconComponent size={iconSize} />}
                </View>
            </TouchableOpacity>

           
        </View>
    );
}
