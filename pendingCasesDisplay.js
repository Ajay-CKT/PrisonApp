import React from 'react';
import { Text, View, Button, StyleSheet, ScrollView, Linking } from 'react-native';
import List from './pendinngCasesList'; // Assuming List is the array of objects you provided

const PendingCases = () => {
  const openFIRLink = (link) => {
    Linking.openURL(link);
  };

  return (
    <ScrollView style={styles.scrollView}>
      {List.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Text style={[styles.text, styles.defaultText]}>Name: {item.name}</Text>
          <Text style={[styles.text, styles.defaultText]}>Phone Number: {item.phoneNumber}</Text>
          <Text style={[styles.text, styles.defaultText]}>Family Member Name: {item.familyDetails.name}</Text>
          <Text style={[styles.text, styles.defaultText]}>Family Member Phone Number: {item.familyDetails.phoneNumber}</Text>
          <Text style={[styles.text, styles.defaultText]}>Family Member Address: {item.familyDetails.address}</Text>
          <Button title="View FIR" onPress={() => openFIRLink(item.firPdfLink)} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: '#fff', // Set background color of the ScrollView
      padding: 10, // Add padding if needed
    },
    listItem: {
      borderWidth: 1,
      borderColor: 'lightgray', // Set border color
      borderRadius: 5, // Add border radius for rounded corners
      marginBottom: 10, // Add margin between list items
      padding: 10, // Add padding within the list item
    },
    text: {
      marginBottom: 5, // Add margin between text lines
    },
    defaultText: {
      fontSize: 16, // Adjust the font size of the default text
      color: '#333', // Set the color of the default text
       // Set the font family of the default text
    },
  });
  

export default PendingCases;
