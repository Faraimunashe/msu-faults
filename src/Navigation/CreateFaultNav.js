import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateFaultPage from '../Pages/CreateFaultPage';
import CreateFaultDeatailsPage from '../Pages/CreateFaultDetailsPage';

const Stack = createStackNavigator();

export default function CreateFaultNav() {
  return (
    <NavigationContainer independent={true}>
        <Stack.Navigator>
            <Stack.Screen name="CreateFault" component={CreateFaultPage} options={{ headerShown: false }}/>
            <Stack.Screen name="CreateFaultDetails" component={CreateFaultDeatailsPage} options={{title: 'Disaster Details',}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}