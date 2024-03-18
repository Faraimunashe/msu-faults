import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FaultsPage({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [faultsData, setFaultsData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const submitDisaster = async () => {
        const token = await AsyncStorage.getItem('authToken');
        console.log(token);
  
        setIsLoading(true);
        setErrorMessage(false);
  
  
        try {
          const response = await fetch('http://178.62.207.33:8881/api/v1/disasters', {
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
            setFaultsData(responseData.data);
            setErrorMessage(false);
            setIsLoading(false);
          } else {
            const responseData = await response.json();
            console.log(responseData.message);
            setErrorMessage(true);
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
          setErrorMessage(true);
          setIsLoading(false);
        }
    };
    useEffect(() => {
        submitDisaster();
    }, []);

    const handleItemClick = (item) => {
        coordinates = {lat: item.lat, lon: item.lon}
        navigation.navigate('FaultMap', {data: coordinates, disaster:item})
    };

    const renderFaultItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemClick(item)} style={styles.faultItemContainer}>
            <Ionicons name="alert-circle" size={25} color="red" style={styles.icon} />
            <View style={styles.faultInfo}>
                <Text style={styles.faultTitle}>{item.title}</Text>
                <Text style={styles.faultDescription}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    const onRefresh = async () => {
        submitDisaster();
    };

    return (
        <View 
            style={styles.container}
        >
            {isLoading ? (
              <ActivityIndicator style={{marginTop: 25}} size='large' color="#056ef7" />
            ): 
                <FlatList
                    data={faultsData}
                    renderItem={renderFaultItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                          colors={['#9Bd35A', '#689F38']}
                          // Android only
                          progressBackgroundColor="#056ef7"
                        />
                    }
                />
            }
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    listContainer: {
        paddingBottom: 20,
    },
    faultItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderLeftWidth: 2,
        borderRadius: 5,
        borderLeftColor: '#e30719'
    },
    icon: {
        margin: 10,
    },
    faultInfo: {
        flex: 1,
        margin: 20
    },
    faultTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    faultDescription: {
        fontSize: 16,
        color: '#666',
    },
});
