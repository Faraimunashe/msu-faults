import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const LearnCard = ({ navigation }) => {
  const handleLearnPage = () => {
    navigation.navigate('Learning');
  };
  return (
    <View style={styles.cardContainer}>
      <Image
        source={require('../../assets/disaster.jpg')}
        style={styles.cardImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Learn about disasters management</Text>
        <TouchableOpacity style={styles.button} onPress={handleLearnPage}>
          <Text style={styles.buttonText}>Tap here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // For Android
    shadowColor: '#000', // For iOS
    shadowOffset: { width: 0, height: 1 }, // For iOS
    shadowOpacity: 0.3, // For iOS
    shadowRadius: 2, // For iOS
    marginHorizontal: 10,
    marginTop: 5
  },
  cardImage: {
    width: '100%',
    height: 200, // Adjust height as needed
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20, // Adjust spacing between title and button
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LearnCard;
