import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, getDocs, getDoc, doc, addDoc, setDoc, onSnapshot   } from 'firebase/firestore';

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



const Content = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const category = route.params?.category;

    const [content, setContent] = useState([]);
     const [pressedItem, setPressedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const AdminKey = "QI1bj5XFCcrFjZbb4dh0";

                const loggedInUserDoc = doc(db, "users", AdminKey);
                const loggedInUserSnap = await getDoc(loggedInUserDoc);
                const loggedInUserData = loggedInUserSnap.data();

                if (loggedInUserData && loggedInUserData.module) {
                    // Filter the array to include only items with the specified category
                    const filteredContent = loggedInUserData.module.filter(item => item.category === category);
                    setContent(filteredContent);
                    console.log(filteredContent); // Log the filtered content here
                }
            } catch (error) {
                console.error("Error fetching content:", error);
            }
        };

        fetchData();
    }, [category]); // Include category in the dependency array

    const handlePress = (item) => {
        // Navigate to another page and pass the item as an argument
        navigation.navigate('ContentPage', { item:item });
        setPressedItem(item); // Set the pressed item
    };

    return (
        <View style={styles.container}>
        <ScrollView>
          <View style={styles.contentList}>
            {content.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(item)}
                style={styles.contentItem}
              >
                <Text style={[styles.contentTitle, pressedItem === item && styles.underline]}>
                  {item.title}
                </Text>
                <Text style={styles.contentArrow}>&gt;</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff', // White background
      paddingHorizontal: 20, // Consistent padding
    },
    contentList: { // New style for content list container
      marginVertical: 20, // Add vertical margin for spacing
    },
    contentItem: { // New style for individual content items
      backgroundColor: '#f2f2f2', // Light gray background
      padding: 15,
      borderRadius: 10, // Rounded corners
      marginBottom: 10, // Consistent margin between items
      flexDirection: 'row', // Arrange title and arrow horizontally
      alignItems: 'center', // Align title and arrow vertically
    },
    contentTitle: { // Style for content titles
      fontSize: 18,
      fontWeight: 'bold',
      flex: 1, // Allow title text to expand within available space
    },
    contentArrow: { // Style for content arrow
      fontSize: 20,
      color: '#4d91d8', // Blue arrow color
    },
    underline: { // Existing underline style for pressed items
      textDecorationLine: 'underline',
      textDecorationColor: 'gray',
    },
  });
  


export default Content;
