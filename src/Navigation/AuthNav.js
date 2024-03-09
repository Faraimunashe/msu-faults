import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';

const Stack = createStackNavigator();

export default function AuthNav() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}