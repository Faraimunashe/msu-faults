import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardPage from '../Pages/DashboardPage';
import CreateFaultPage from '../Pages/CreateFaultPage';
import FaultsPage from '../Pages/FaultsPage';
import { Ionicons } from '@expo/vector-icons';
import CreateFaultNav from './CreateFaultNav';
import ProfileNav from './ProfileNav';
import FaultNav from './FaultNav';
import BoardNav from './BoardNav';

const Tab = createBottomTabNavigator();

export default function DashNav({ navigation }) {
  return (
        <Tab.Navigator independent={true}>
            <Tab.Screen 
                name="Dashboard" 
                component={BoardNav} 
                options={{
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: () => (
                      <Ionicons name="home" color={'#4287f5'} size={25} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Report" 
                component={CreateFaultNav} 
                options={{
                    title: 'Report A Disaster',
                    tabBarLabel: 'Report',
                    tabBarIcon: () => (
                      <Ionicons name="add" color={'#4287f5'} size={25} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Faults" 
                component={FaultNav}
                options={{
                    title: 'Disasters',
                    tabBarLabel: 'Disasters',
                    tabBarIcon: () => (
                      <Ionicons name="list" color={'#4287f5'} size={25} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileNav}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: () => (
                      <Ionicons name="person" color={'#4287f5'} size={25} />
                    ),
                }}
            />
        </Tab.Navigator>
  );
}