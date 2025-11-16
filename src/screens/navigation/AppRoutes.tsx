import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../LoginScreen';
import RegisterScreen from '../RegisterScreen'
// futuramente: import HomeScreen, ProfileScreen etc

const Stack = createStackNavigator();

export default function AppRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
