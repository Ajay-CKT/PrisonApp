import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image,Dimensions } from 'react-native';
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

const { height: screenHeight } = Dimensions.get('window');

const ContentPage=()=>{
    const route = useRoute();
    const item = route.params?.item;
    console.log(item)
    return(
        <ScrollView>
            <View  style={[styles.container, { height: screenHeight }]}>
                <Image source={{ uri: item.imageurl }} style={styles.image} />
                <View style={styles.content}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text>{item.steps}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        height:"",
    },
    image: {
        width: "100%",
        height: "30%",
        marginBottom: 10,
        resizeMode: 'contain',
    },title:{
        fontSize:30,
    },content:{
        height:"60%",
        padding:10,
    }
});


export default  ContentPage