import React, { useState } from "react";
import styles from "./style";
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import AlertBox from "../Components/AlertBox";
import SuccessAlertBox from "../Components/SuccessAlertBox";

export default function ResetPasswordPage({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [successMessageText, setSuccessMessageText] = useState('');

  const onLoginPress = async () => {
    if (!oldPassword || !password || !passwordConfirmation) {
      setErrorMessage(true);
      setErrorMessageText('Please every field must not be empty!');
      return;
    }

    setIsLoading(true);
    setErrorMessage(false);
    setSuccessMessage(false);

    const data = {
      oldPassword: oldPassword,
      password: password,
      password_confirmation: passwordConfirmation
    };

    try {
      const response = await fetch('http://178.62.207.33:8881/api/v1/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setErrorMessage(false);
        setSuccessMessage(true);
        setSuccessMessageText(data.message);
        setIsLoading(false);
      } else {
        const data = await response.json();
        //console.log(data.errors[0]);
        setErrorMessage(true);
        setErrorMessageText(data.errors[0]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("67",error, data);
      setErrorMessage(true);
      setErrorMessageText('An unexpected error occurred. Please try again later.');
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Change Account Password</Text>
            {errorMessage ? (
              <AlertBox message={errorMessageText} />
            ):null}
            {successMessage ? (
              <SuccessAlertBox message={successMessageText} />
            ):null}
            <TextInput
              placeholder="Current Password"
              value={oldPassword}
              onChangeText={text => setOldPassword(text)}
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={text => setPassword(text)}
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
            />
            <TextInput
              placeholder="Confirm password"
              value={passwordConfirmation}
              onChangeText={text => setPasswordConfirmation(text)}
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => onLoginPress()}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator style={{marginTop: 15}} size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Change Password</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

