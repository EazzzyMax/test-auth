import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./screens/LoginScreen";
import GoogleWebview from "./screens/GoogleWebview";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Auth" component={LoginScreen} />
            <Stack.Screen name="Google" component={GoogleWebview} />
        </Stack.Navigator>
    );
};

export default MainStackNavigator;
