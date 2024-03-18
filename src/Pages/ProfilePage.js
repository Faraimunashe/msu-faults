import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../Auth/CredentialsContext';

export default function ProfilePage ({ navigation }) {
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    

    const handleResetPassword = () => {
      navigation.navigate('Reset');
    };

    const handleLogoutPrompt = async () => {
      Alert.alert(
        'Warning',
        'Are you sure you want to logout?',
        [{ text: 'Yes logout', onPress: () => clearUserData() }] // Button
      );
    }

    const clearUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const response = await fetch('http://178.62.207.33:8881/api/v1/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          const data = await response.json();
          console.log(data);
        }
        await AsyncStorage.removeItem('authToken');
        setStoredCredentials("");
      } catch (error) {
        console.error('Error clearing user data:', error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('authToken');
            console.log(token);
      
            setIsLoading(true);    
      
            try {
              const response = await fetch('http://178.62.207.33:8881/api/v1/profiles', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': 'Bearer ' + token
                },
              });
      
              if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                setUser(responseData.data);
                setLocation(responseData.location);
                setIsLoading(false);
              } else {
                const responseData = await response.json();
                console.log(responseData.message);
              }
            } catch (error) {
              console.log(error);
            }
    };
  
    const onRefresh = async () => {
      fetchData();
    };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#9Bd35A', '#689F38']}
          // Android only
          progressBackgroundColor="#056ef7"
        />
      }
    >
      <View style={styles.header}>
        <Image
          source={require('../../assets/user.png')}
          style={styles.profilePic}
        />
        <Text style={styles.username}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <View style={styles.body}>
        {/* <Text style={styles.sectionTitle}>Current Location</Text>
        <Text style={styles.aboutText}>{location.lat}, {location.lon}</Text> */}
        <Text style={styles.sectionTitle}>Joined</Text>
        <Text style={styles.interestsText}>{user.created_at}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleResetPassword} style={styles.resetPasswordButton}>
          <Text style={styles.resetPasswordButtonText}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogoutPrompt} style={styles.logoutButton}>
          <Text style={styles.resetPasswordButtonText}>Logout Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: '#fff',
      padding: 20,
    },
    header: {
      alignItems: 'center',
      marginBottom: 20,
    },
    profilePic: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    username: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    email: {
      fontSize: 16,
      color: '#666',
    },
    body: {
      flex: 1,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 5,
    },
    aboutText: {
      fontSize: 16,
      marginBottom: 20,
    },
    interestsText: {
      fontSize: 16,
    },
    footer: {
      marginTop: 20,
      alignItems: 'center',
      flexDirection: 'column'
    },
    resetPasswordButton: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginRight: 5,
      width: "100%",
      marginTop: 10,
      alignContent: 'center',
      alignItems: 'center'
    },
    logoutButton: {
        backgroundColor: '#e80707',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 5,
        width: "100%",
        marginTop: 10,
        alignContent: 'center',
        alignItems: 'center'
      },
    resetPasswordButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
});

