import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FaultsPage from '../Pages/FaultsPage';
import FaultMapPage from '../Pages/FaultMapPage';
import DonationPage from '../Pages/DonationPage';


const Stack = createStackNavigator();

export default function FaultNav() {
  return (
    <NavigationContainer independent={true}>
        <Stack.Navigator>
            <Stack.Screen name="Faults" component={FaultsPage} options={{ headerShown: false }}/>
            <Stack.Screen name="FaultMap" component={FaultMapPage} options={{ title: 'Disaster Map Details' }}/>
            <Stack.Screen name="Donate" component={DonationPage} options={{ title: 'Make A Donation' }}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}