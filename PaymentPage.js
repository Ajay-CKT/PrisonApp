import React, { useState , useRef} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity, ScrollView, Image, ImageBackground, KeyboardAvoidingView, Dimensions } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs, doc, addDoc, setDoc } from 'firebase/firestore';
import image from '../images/Capture.png'
const firebaseConfig = {
  apiKey: "AIzaSyC181X6t9eWBiOoXVmMpfqYS4inKVqZNEQ",
  authDomain: "chat-app-21e08.firebaseapp.com",
  projectId: "chat-app-21e08",
  storageBucket: "chat-app-21e08.appspot.com",
  messagingSenderId: "21002943906",
  appId: "1:21002943906:web:15cc3ba29bb1edfbe246fb",
  measurementId: "G-4YSC28GHRM"
};
initializeApp(firebaseConfig);
const db = getFirestore();

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');
  const cursorRef = useRef(null);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const handleCardNumberChange = (text) => {
    const formattedCardNumber = text.replace(/\D/g, '').replace(/(.{4})/g, (matches) => `${matches}-`); // Regex for formatting and hyphenation
    setCardNumber(formattedCardNumber.slice(0, 19)); // Limit to 19 characters (including hyphens)
  };

  const handleExpirationDateChange = (text) => {
    const formattedExpirationDate = text.replace(/\D/g, ''); // Remove non-digits

    // Update cursor position based on entered characters and slashes
    const cursorPosition = Math.min(formattedExpirationDate.length, 8); // Limit cursor position to 8 (after YYYY)
    if (cursorRef.current) {
      cursorRef.current.setSelection(cursorPosition, cursorPosition);
    }

    // Format date with slashes
    const formattedParts = [
      formattedExpirationDate.slice(0, 2),
      formattedExpirationDate.slice(2, 4),
      formattedExpirationDate.slice(4),
    ].join('/'); // Join with slashes

    setExpirationDate(formattedParts.slice(0, 10)); // Limit to 10 characters (including slashes)
  };

  return (
    <ScrollView>
    <KeyboardAvoidingView style={{ flex: 1 , marginTop:30,marginLeft:5, width:"95%", }}>
      <ImageBackground
        source={image}
        style={[styles.background, { width: 400, height: 220 }]}
        resizeMode="cover"
      >
        <View>
          <Text style={styles.cardNumber}>{cardNumber}</Text>
          <Text style={styles.cardholderName}>{cardholderName}</Text>
          <Text style={styles.expirationDate}>{expirationDate}</Text>
        </View>
      </ImageBackground>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={cardNumber}
          onChangeText={handleCardNumberChange}
          keyboardType="numeric"
          maxLength={19}
        />
        <TextInput
          style={styles.input}
          placeholder="Cardholder Name"
          value={cardholderName}
          onChangeText={setCardholderName}
        />
       <TextInput
          style={styles.input}
          placeholder="Expiration Date (DD/MM/YYYY)"
          value={expirationDate}
          onChangeText={handleExpirationDateChange}
          maxLength={10} // Allow 10 characters for full year (YYYY) without slashes
          ref={cursorRef} 
        />
        <TextInput
          style={styles.input}
          placeholder="CVV"
          value={cvv}
          onChangeText={setCVV}
          keyboardType="numeric"
        />
        <Button color="green" title="Pay" onPress={() => console.log("Payment processed")} />
      </View>
    </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#008000', // Green border color
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2', // Light gray background
    borderRadius: 5, // Rounded corners for input fields
  },
  card: {
    backgroundColor: "#e0e0e0", // Light gray card background
    margin: 10,
    width: "95%",
    left: 10,
    borderRadius: 10,
  },
  image: {
    width: "50%",
    height: "30%",
    marginBottom: 10,
    marginTop: 40,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  cardNumber: {
    position: "relative",
    bottom: 50,
    right: 70,
    color: "black", // Black text color
    fontSize: 20,
    marginLeft: "20px",
  },
  cardholderName: {
    position: "relative",
    top: 70,
    right: 70,
    color: "black", // Black text color
    fontSize: 20,
    marginLeft: "20px",
  },
  expirationDate: {
    position: "relative",
    left: 170,
    color: "black", // Black text color
    fontSize: 20,
    marginLeft: "20px",
  },
});
export default PaymentPage;
