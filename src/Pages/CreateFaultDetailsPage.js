import React, { useState, useEffect } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  StyleSheet, 
  ActivityIndicator
} from "react-native";
import PageTitle from "../Components/PageTitle";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertBox from "../Components/AlertBox";
import SuccessAlertBox from "../Components/SuccessAlertBox";

export default function CreateFaultDeatailsPage({ route }) {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const coordinates = route.params.data;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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

  const submitDisaster = async () => {
    if (!title || !description || !coordinates ) {
      setErrorMessage(true);
      setErrorMessageText('Please every field must not be empty!');
      return;
    }
    console.log(token);

    setIsLoading(true);
    setErrorMessage(false);
    setSuccessMessage(false);

    const data = {
      title: title,
      description: description,
      lat: coordinates.latitude,
      lon: coordinates.longitude
    };

    try {
      const response = await fetch('http://178.62.207.33:8881/api/v1/disasters', {
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
        setTitle('')
        setDescription('');
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
    <KeyboardAvoidingView behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screenContainer}>
          <View style={styles.formView}>
            <PageTitle title={"Report Details"} />
            {errorMessage ? (
              <AlertBox message={errorMessageText} />
            ):null}
            {successMessage ? (
              <SuccessAlertBox message={successMessageText} />
            ):null}
            <TextInput
              placeholder="Title"
              placeholderColor="#c4c3cb"
              style={styles.formTextInput}
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              placeholder="Description"
              placeholderTextColor="#c4c3cb"
              style={styles.longTextInput}
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => submitDisaster()}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator style={{marginTop: 15}} size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Submit Fault</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    //flex: 1,
    marginHorizontal: 20,
    marginVertical: 50,
  },
  formView: {
    //flex: 1,
  },
  formTextInput: {
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
  submitButton: {
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
  longTextInput: {
    height: 120,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    textAlignVertical: 'top',
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 15,
  },
});

