import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './src/Pages/LoginPage';
//import 'react-native-gesture-handler';
import AuthNav from './src/Navigation/AuthNav';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthNav/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
