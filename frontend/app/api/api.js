import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import MonProgramme from "@/app/screens/MonProgramme";
import MaSeance from "@/app/screens/MaSeance";
import MaProgression from "@/app/screens/MaProgession";
import Configuration from "@/app/screens/Configuration";
import Notification from "@/app/screens/Notification";

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MonProgramme" component={MonProgramme} />
                <Stack.Screen name="MaSeance" component={MaSeance} />
                <Stack.Screen name="MaProgression" component={MaProgression} />
                <Stack.Screen name="Configuration" component={Configuration} />
                <Stack.Screen name="Notification" component={Notification} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
