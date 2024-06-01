import React, { useState } from 'react';
import { View,ImageBackground, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
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

const SignInScreen = ({ navigation }) => {
  let logedInUser;
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input

  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  const handleSignIn = async () => {
    // Logic for signing in
    try {
      let count = 0
      let user=null;
      const data = await getDocs(collection(db, "users"));
      data.forEach(async (doc) => {
        let datas = doc.data()
        if(datas.email==email && datas.password==password){
          user=doc.data();
          logedInUser=doc.id
          count=1
        }
      })
      if(count==1){
        if(user.status=="approved"){
          if(user.role=="Normal User"){
            navigation.navigate('PrisonerPage',{ logedInUser: logedInUser });
          }else if(user.role == 'Lawyer'){
            navigation.navigate('LawyerLandingPage',{ logedInUser: logedInUser });
          }else if(user.role == 'Clinic'){
            navigation.navigate('Prisonerinfopage',{ logedInUser: logedInUser });
          }else if(user.role == 'Family Member'){
            navigation.navigate('LawyerInfoPage',{ logedInUser: logedInUser });
          }else if(user.role == 'admin'){
            navigation.navigate('AdminPage',{ logedInUser: logedInUser })
          }
          //navigate to the priosner  page
        }else if(user.status=="pending"){
          alert("Your account is not approved by admin")
        }
      }else{
        alert("email and password incorrect")
      }
    } catch (e) {
      console.error('Error signing in:', e);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.ctfassets.net/lwoaet07hh7w/LegacyHeroImage_8d44fd03b0e390e22db03f35cac2aa7604ad6e96/633fa6a3eadea0ae92fd5bd6af9b1ada/Prison-Window.jpg' }}
        style={styles.backgroundImage}
      >
      <Text style={styles.heading}>Prisoner Rehabilitation</Text>
      {/* <Image source={{ uri: 'https://st3.depositphotos.com/1919403/32580/v/450/depositphotos_325804604-stock-illustration-businessman-break-chain-get-freedom.jpg' }} style={styles.image} /> */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email} // Bind value to state variable
        onChangeText={setEmail} // Update state on change
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password} // Bind value to state variable
        onChangeText={setPassword} // Update state on change
      />
      <Button color="black" title="Sign In" onPress={() => handleSignIn()} /> 
      <View style={styles.signUpTextContainer}>
        <Text>
          If you don't have an account,{' '}
          <Text onPress={handleSignUpPress} style={styles.signUpText}>
            SignUp
          </Text>
        </Text>
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#00a2e2",
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontWeight: '700',
    fontSize: 20, // Set the font size to 20 (adjust as needed)
    position: "relative",
    top: -70,
    color:"white",
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
  image: {
    position:"relative",
    top:-100,
    width: "50%",
    height: "20%",
    // marginBottom: 10,
    
},
  signUpTextContainer: {
    position: 'absolute',
    bottom: 90,
    color: "white",
  },
  signUpText: {
    // display:"block",
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 20,
    color: "white",
  },
});

export default SignInScreen;
