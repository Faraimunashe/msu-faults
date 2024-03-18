import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const DashboardCard = ({ icon, title, bgColor, total }) => {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
        <View style={styles.row}>
            <View style={styles.column}>
                <MaterialCommunityIcons name={icon} size={50} color="#fff" />
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={[styles.column, styles.columnSide]}>
                <Text style={styles.num}>{total}</Text>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 20,
    //alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    minWidth: 150,
    minHeight: 150,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column',
    //margin: 10
  }, 
  columnSide: {
    alignItems: 'center',
    justifyContent: 'center',
    //margin: 10
  }, 
  num: {
    color: '#fff',
    fontSize: 32,
    marginTop: 10,
    fontWeight: 'bold',
    marginLeft: 70
  }
});

export default DashboardCard;
