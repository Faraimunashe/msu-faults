import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import AlertBox from "../Components/AlertBox";
import SuccessAlertBox from "../Components/SuccessAlertBox";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DonationPage({ route }) {
    const [token, setToken] = useState(null);
    const disaster_id = route.params.data;
    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorMessageText, setErrorMessageText] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [successMessageText, setSuccessMessageText] = useState('');

    useEffect(() => {
        const getToken = async () => {
          try {
            const storedToken = await AsyncStorage.getItem('authToken');
            setToken(storedToken);
          } catch (error) {
            console.error('Error fetching token:', error);
          }
        };
        
        getToken();
    
        return () => {
          
        };
      }, []);
    
      const submitDonation = async () => {
        if (!disaster_id || !phone || !amount ) {
          setErrorMessage(true);
          setErrorMessageText('Please every field must not be empty!');
          return;
        }
        setIsLoading(true);
        setErrorMessage(false);
        setSuccessMessage(false);
    
        const data = {
            disaster_id: disaster_id,
            phone: phone,
            amount: amount
        };
    
        try {
            const response = await fetch('http://178.62.207.33:8881/api/v1/donations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+token
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setErrorMessage(false);
                setIsLoading(false);
                setSuccessMessage(true);
                setSuccessMessageText(data.message);
                setAmount(null)
                setPhone('');
            } else {
                const data = await response.json();
                console.log(data.message);
                setErrorMessage(true);
                setErrorMessageText(data.message);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(true);
            setErrorMessageText('An unexpected error occurred. Please try again later.');
            setIsLoading(false);
        }
    };
  return (
    <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
            <Image 
                source={require('../../assets/paynow.png')}
                style={styles.image}
            />
        </View>
        {errorMessage ? (
              <AlertBox message={errorMessageText} />
            ):null}
        {successMessage ? (
              <SuccessAlertBox message={successMessageText} />
        ):null}
        <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            placeholder="Enter amount"
            placeholderColor="#c4c3cb"
            style={styles.input}
        />
        <TextInput
            placeholder="Phone e.g +263783540959"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad" // Show numeric keyboard
            placeholderColor="#c4c3cb"
            style={styles.input}
        />

        <TouchableOpacity
            style={styles.button}
            onPress={() => submitDonation()}
            disabled={isLoading}
        >
            {isLoading ? (
                <ActivityIndicator style={{marginTop: 15}} size="small" color="white" />
            ) : (
                <Text style={styles.buttonText}>Process Donation</Text>
            )}
        </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  input: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 20,
    alignItems: "center"
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 8
  },
  image: {
    width: 350,
    height: 200,
    resizeMode: 'contain',
  },
  imageContainer: {
    //paddingTop: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

