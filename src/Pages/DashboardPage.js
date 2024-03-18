import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Platform, ActivityIndicator, ScrollView, RefreshControl} from "react-native";
import DashboardCard from "../Components/DashboardCard";
import LearnCard from "../Components/LearnCard";
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardPage({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [disasters, setDisasters] = useState(0);
  const [donations, setDonations] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const token = await AsyncStorage.getItem('authToken');
      setLocation(location);

      const data = {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      };
  
      try {
        const response = await fetch('http://178.62.207.33:8881/api/v1/location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data.token);
        } else {
          const data = await response.json();
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('authToken');
          console.log(token);
    
          setIsLoading(true);    
    
          try {
            const response = await fetch('http://178.62.207.33:8881/api/v1/dashboard', {
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
              setDisasters(responseData.disasters);
              setDonations(responseData.donations);
              setUser(responseData.user);
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

  //console.log(location);
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
      {isLoading ? <ActivityIndicator style={{marginTop: 25}} size='large' color="#056ef7"/> :
      <View>
        <Text style={styles.welcomeText}>Welcome {user}!</Text>
        <DashboardCard icon="information-off-outline" title="Active Disasters" bgColor="#e74c3c" total={disasters} />
        <DashboardCard icon="currency-eur" title="Funds Donated" bgColor="#2ecc71" total={donations}/>
        <LearnCard navigation={navigation}/>
      </View>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Set your desired text color
    textAlign: 'center',
  },
});
