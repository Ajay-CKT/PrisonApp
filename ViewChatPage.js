import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Button, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs, getDoc, doc, addDoc, setDoc, onSnapshot  } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';


const firebaseConfig = {
    // Your Firebase config
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

const ViewChatPage=()=>{
    const route = useRoute();
    const logedInUser = route.params?.logedInUser;
    const senderId = route.params?.userId;

    const [messages, setMessages] = useState([]);
    const scrollViewRef = useRef();

    useEffect(() => {
        const loggedInUserDocRef = doc(db, "users", logedInUser);
        const unsubscribe = onSnapshot(loggedInUserDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                if (data && data.message) {
                    setMessages(data.message);
                    // Scroll to the bottom when new messages are received
                    if (scrollViewRef.current) {
                        scrollViewRef.current.scrollToEnd({ animated: true });
                    }
                }
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                style={styles.messageContainer}
                contentContainerStyle={styles.contentContainer}
                onContentSizeChange={() => {
                    scrollViewRef.current.scrollToEnd({ animated: true });
                }}
            >
                {messages.filter((msg, index) => {
                    const isSenderReceiverPair =
                        (msg.senderId === logedInUser && msg.receiverId === senderId) ||
                        (msg.senderId === senderId && msg.receiverId === logedInUser);

                    return isSenderReceiverPair;
                }).map((filteredMsg, index) => {
                    let convertedHour = '';
                    let convertedMinute = '';
                    let period = '';

                    if (filteredMsg.timestamp) {
                        const timestamp = filteredMsg.timestamp.toDate();
                        const hour = timestamp.getHours();
                        const minute = timestamp.getMinutes();

                        convertedHour = (hour % 12 || 12).toString().padStart(2, '0');
                        convertedMinute = minute.toString().padStart(2, '0');
                        period = hour < 12 ? 'AM' : 'PM';
                    }

                    const time = `${convertedHour}:${convertedMinute} ${period}`;

                    return (
                        <View key={index} style={filteredMsg.senderId === logedInUser ? styles.containerRight : styles.containerLeft}>
                            {filteredMsg.senderId === logedInUser ? (
                                <>
                                    <View style={styles.messageContainerRight}>
                                        <Text style={styles.textRight}>
                                            {filteredMsg.text}
                                        </Text>
                                    </View>
                                    <Text style={[styles.timeRight, styles.timeSpacing]}>
                                        {time}
                                    </Text>
                                </>
                            ) : (
                                <>
                                    <Text style={[styles.timeLeft, styles.timeSpacing]}>
                                        {time}
                                    </Text>
                                    <View style={styles.messageContainerLeft}>
                                        <Text style={styles.textLeft}>
                                            {filteredMsg.text}
                                        </Text>
                                    </View>
                                </>
                            )}
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messageContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    contentContainer: {
        paddingVertical: 10,
    },
    containerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 10,
        marginBottom: 2,
        marginTop: 2,
        backgroundColor: "green",
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 10,
        marginLeft: "auto",
        maxWidth: "90%"
    },
    containerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 10,
        marginBottom: 2,
        marginTop: 2,
        backgroundColor: "gray",
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 10,
        marginRight: "auto",
    },
    textRight: {
        textAlign: 'right',
        color: 'white',
        flexWrap: 'wrap',
    },
    textLeft: {
        textAlign: 'left',
        color: 'white',
        flex: 0,
        flexWrap: 'wrap',
    },
    timeSpacing: {
        marginLeft: 5,
        marginRight: 5,
    },
    messageContainerRight: {
        maxWidth: '70%',
        backgroundColor: 'green',
        padding: 8,
        borderRadius: 8,
        marginRight: 10,
    },
    messageContainerLeft: {
        maxWidth: '70%',
        backgroundColor: 'gray',
        padding: 8,
        borderRadius: 8,
        marginLeft: 10,
    },
});

export default ViewChatPage;
