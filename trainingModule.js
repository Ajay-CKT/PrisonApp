import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation ,useRoute} from '@react-navigation/native';
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

const TrainingModule=()=>{
    const navigation = useNavigation();

    const handlePress = (category) => {
        // Handle press action for the selected category
        
        navigation.navigate('Content',{ category: category });


        console.log(`Selected category: ${category}`);
    }

    return(
        <View style={styles.container}>
        <TouchableOpacity style={styles.categoryContainer} onPress={() => handlePress('Mental Health')}>
            <Text style={styles.categoryText}>Mental Health</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryContainer} onPress={() => handlePress('Skill')}>
            <Text style={styles.categoryText}>Skills</Text>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    categoryContainer: {
        width: 250,
        height: 250,
        backgroundColor: '#6875FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
    },
    categoryText: {
        color: '#FFFFFF',
        fontSize: 25,
    },
});

export default TrainingModule