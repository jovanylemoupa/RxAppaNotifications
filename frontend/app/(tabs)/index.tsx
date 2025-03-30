import React from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import Backgrounds from "@/components/background";
import Buton from "@/components/Button";
import { styles } from "@/styles/style";

// Import correct des SVG en tant que composants
import Alter from "@/assets/fonts/alter1.svg";
import Graph from "@/assets/fonts/graph1.svg";
import Minuter from "@/assets/fonts/minuter1.svg";
import Notif from "@/assets/fonts/notif1.svg";
import Param from "@/assets/fonts/param1.svg";


export default function Bienvenue() {
    const router = useRouter();

    return (
        <Backgrounds>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>Rx-APA</Text>
                <Text style={styles.text}>Bienvenue John</Text>
            </View>
            <View>
                <Buton icon={Alter} iconPosition="left" onPress={() => router.push("/screens/MonProgramme")}>
                    Mon Programme
                </Buton>
                <Buton icon={Minuter} iconPosition="left" onPress={() => router.push("/screens/MaSeance")}>
                    Ma Séance
                </Buton>
                <Buton icon={Graph} iconPosition="left" onPress={() => router.push("/screens/MaProgession")}>
                    Ma Progression
                </Buton>
                <Buton icon={Param} iconPosition="left" onPress={() => router.push("/screens/Configuration")}>
                    Configuration
                </Buton>
                <Buton icon={Notif} iconPosition="left" onPress={() => router.push("/screens/Notification")}>
                    Notification
                </Buton>
            </View>
        </Backgrounds>
    );
}