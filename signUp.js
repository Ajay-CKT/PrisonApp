import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity,  ScrollView ,ImageBackground } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs, doc, addDoc, setDoc } from 'firebase/firestore';
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
const usersCollection = collection(db, 'users');



const SignUpScreen = ({ navigation }) => {
  const handleSignInPress = () => {
    navigation.navigate('SignIn');
  };
  const [showOptionsModal, setShowOptionsModal] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowOptionsModal(false);
  };


  const handleSignUp = async () => {
    try {
      // Logic for signing up based on selected option and input values
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Language:', language);
      console.log('Address:', address);
      console.log('Phone Number:', phoneNumber);
      console.log('role:', selectedOption);
  
      switch (selectedOption) {
        case 'Normal User':
        case 'Family Member':
          // Logic for signing up as a normal user
          try {
            let count=0;
            const data = await getDocs(collection(db, "users"));
            data.forEach(async(doc)=>{
              let datas=doc.data()
              // console.log(datas)
              // alert(datas.phoneNumber)
              if(phoneNumber==datas.phoneNumber && email == datas.email){
                console.log(phoneNumber==datas.phoneNumber && email == datas.email)
                count=1;
              }
            })
            if(count==0){
              const userData = {
                name: name,
                email: email,
                password: password,
                role: selectedOption,
                language: language,
                address:address,
                phoneNumber: phoneNumber,
                status: "approved",
              };
    
              // Add user data to Firestore
              await addDoc(collection(db, "users"), userData);
    
              console.log('User data added successfully:', userData);
              alert('User signed up successfully!');
            }else{
              alert("user already exists")
            }
            // Reset form fields
            setName('');
            setEmail('');
            setPassword('');
            setLanguage('');
            setAddress('');
            setPhoneNumber('');
            setSelectedOption(null);
  
            // Show success message to the user
          } catch (error) {
            console.error('Error signing up as a normal user:', error);
            alert('Error signing up as a normal user. Please try again later.');
          }
          break;
        case 'Lawyer':
        case 'Clinic':
          // Logic for signing up as a lawyer or clinic
          try {
            let count=0;
            const data = await getDocs(collection(db, "users"));
            data.forEach(async(doc)=>{
              let datas=doc.data()
              // console.log(datas)
              // alert(datas.phoneNumber)
              if(phoneNumber==datas.phoneNumber && email == datas.email){
                console.log(phoneNumber==datas.phoneNumber && email == datas.email)
                count=1;
              }
            })
            if(count==0){
              const userData = {
                name: name,
                email: email,
                password: password,
                role: selectedOption,
                language: language,
                address:address,
                phoneNumber: phoneNumber,
                status: "pending",
              };
    
              // Add user data to Firestore
              await addDoc(collection(db, "users"), userData);
    
              console.log('User data added successfully:', userData);
              alert('User signed up successfully!');
            }else{
              alert("user already exists")
            }
            // Reset form fields
            setName('');
            setEmail('');
            setPassword('');
            setLanguage('');
            setAddress('');
            setPhoneNumber('');
            setSelectedOption(null);
  
          } catch (error) {
            console.error('Error signing up:', error);
            alert('Error signing up. Please try again later.');
          }
          break;
        default:
          // Handle unexpected case
          break;
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  


  const renderSignUpForm = () => {
    switch (selectedOption) {
      case 'Normal User':
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Language"
              value={language}
              onChangeText={(text) => setLanguage(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
          </>
        );
      case 'Clinic':
      case 'Lawyer':
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Language"
              value={language}
              onChangeText={(text) => setLanguage(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
          </>
        );
        case 'Family Member':
          return (
            <>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Language"
                value={language}
                onChangeText={(text) => setLanguage(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={(text) => setAddress(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
              />
            </>
          )
      default:
        return null;
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
    <View style={styles.container}>
    <ImageBackground
        source={{ uri: 'https://images.ctfassets.net/lwoaet07hh7w/LegacyHeroImage_8d44fd03b0e390e22db03f35cac2aa7604ad6e96/633fa6a3eadea0ae92fd5bd6af9b1ada/Prison-Window.jpg' }}
        style={styles.backgroundImage}
      >
      <Modal
        visible={showOptionsModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowOptionsModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.optionsContainer}>
            <TouchableOpacity onPress={() => handleOptionSelect('Normal User')}>
              <Text style={styles.option}>Prisoner</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOptionSelect('Lawyer')}>
              <Text style={styles.option}>Lawyer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOptionSelect('Clinic')}>
              <Text style={styles.option}>Clinic</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOptionSelect('Family Member')}>
              <Text style={styles.option}>Family Member</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.signUpForm}>{renderSignUpForm()}</View>
      <Button  color="black" title="Sign Up" onPress={handleSignUp} />
      <View style={styles.signUpTextContainer}>
        <Text>
          If you already have an account,{' '}
          <Text onPress={handleSignInPress} style={styles.signUpText}>
            SignIn
          </Text>
        </Text>
      </View>
      </ImageBackground>
    </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  contentContainer:{
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  }, backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position:"relative",
    marginTop:"100",
    width:'100%',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor:"white",
    color:"black",
  },
  signUpText: {
    color: 'white',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"transparent"
  },
  optionsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  option: {
    fontSize: 18,
    padding: 10,
  },
  signUpForm: {
    width: '100%',
    // backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  signUpTextContainer: {
    position: 'absolute',
    bottom: 40,
    color: "white",
  },
});


export default SignUpScreen;
