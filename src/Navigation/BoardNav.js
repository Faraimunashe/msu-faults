import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LearningPage from '../Pages/LearningPage';
import DashboardPage from '../Pages/DashboardPage';

const Stack = createStackNavigator();

export default function BoardNav() {
  return (
    <NavigationContainer independent={true}>
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={DashboardPage} options={{ headerShown: false }}/>
            <Stack.Screen name="Learning" component={LearningPage} options={{title: 'Learn About Disasters',}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}