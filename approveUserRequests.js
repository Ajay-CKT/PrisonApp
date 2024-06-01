import React, { useEffect , useState } from 'react';
import { Text, View, Button, StyleSheet, ScrollView } from 'react-native';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs, getDoc, doc, addDoc, setDoc } from 'firebase/firestore';
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
const Req = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const pendingUsersArray = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach(doc => {
        const datas = doc.data();
        if (datas.status === "pending") {
          pendingUsersArray.push({
            name:datas.name,
            role:datas.role,
            phoneno:datas.phoneNumber,
            email:datas.email,
            address:datas.address,
            docid:doc.id
          });
        }
      });
      setPendingUsers(pendingUsersArray);
    };

    fetchRequests();
  }, []);

  const onApprove = async (userId) => {
    try {
      // Create a reference to the document using the userId
      const userRef = doc(db, "users", userId);
      
      // Get the document snapshot
      const userDoc = await getDoc(userRef);
      
      // Check if the document exists
      if (userDoc.exists()) {
        // Get the user data
        const userData = userDoc.data();
        userData.status="approved"
        await setDoc(userRef, userData);
        console.log('User details:', userData);
        // Now you can use the userData as needed
        setPendingUsers(prevUsers => prevUsers.filter(user => user.docid !== userId));
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  

  const onReject = async (userId) => {
    try {
      // Create a reference to the document using the userId
      const userRef = doc(db, "users", userId);
      
      // Get the document snapshot
      const userDoc = await getDoc(userRef);
      
      // Check if the document exists
      if (userDoc.exists()) {
        // Get the user data
        const userData = userDoc.data();
        userData.status="restricted"
        await setDoc(userRef, userData);
        console.log('User details:', userData);
        // Now you can use the userData as needed
        setPendingUsers(prevUsers => prevUsers.filter(user => user.docid !== userId));
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Prisoner Rehabilitation</Text>
        {pendingUsers.map((user, index) => (
          <View key={index} style={styles.userContainer}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.text}>{user.name}</Text>
            <Text style={styles.label}>Role:</Text>
            <Text style={styles.text}>{user.role}</Text>
            <Text style={styles.label}>Mobile Number:</Text>
            <Text style={styles.text}>{user.phoneno}</Text>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.text}>{user.address}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.text}>{user.email}</Text>
            <View style={styles.buttonContainer}>
              <Button style={styles.button} color="#90EE90" title="Approve" onPress={() => onApprove(user.docid)} />
              <Button style={styles.button} color="#F08080" title="Reject" onPress={() => onReject(user.docid)} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#060606',
    minHeight:756,
    // Take up all available space
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: "#ffffff",
    textAlign: "center",
  },
  userContainer: {
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 20,
    // borderColor: '#949bc0',
    padding: 10,
    backgroundColor: '#949bc0',
    // elevation: 4, // Add elevation for box shadow effect on Android
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: "black"
  },
  text: {
    marginBottom: 10,
    color: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  button: {
    borderRadius: 10,
    backgroundColor: '#008000',  // Your button color
    underlayColor: '#008000',  // Same color as background for rounded effect (Android)
    paddingHorizontal: 20,
    paddingVertical: 10,
  }
});


export default Req;
