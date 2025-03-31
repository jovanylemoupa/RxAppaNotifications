import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScren from '../feature/screens/HomeScreen';
import SignupScreen from '../feature/SignupScreen';
import WelcomeScreen from '../feature/WelcomeScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigation  (){
    return(
<Stack.Navigator>
    <Stack.Screen 
    name="HomeScreen"
     component={HomeScren}
     options={
        { headerShown: false }
     }  />

<Stack.Screen 
    name="SignupScreen"
     component={SignupScreen}
     options={
        { headerShown: false }
     }  />

<Stack.Screen 
    name="WelcomeScreen"
     component={WelcomeScreen}
     options={
        { headerShown: false }
     }  />
</Stack.Navigator>


    );
}