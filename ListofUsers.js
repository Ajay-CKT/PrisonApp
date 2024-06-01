import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Button, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert  } from 'react-native';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs, getDoc, doc, addDoc, setDoc, onSnapshot  } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

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

const ListOfUsers = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);
    const [selectedUser1, setSelectedUser1] = useState(null);
    const [selectedUser2, setSelectedUser2] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        // Filter users for the second picker based on the selection of the first picker
        if (selectedUser1) {
            setFilteredUsers(users.filter(user => user.id !== selectedUser1));
        } else {
            setFilteredUsers(users);
        }
    }, [selectedUser1, users]);

    const handleSendValues = () => {
        // Navigate to the new page and pass the selected values as route parameters
        if (selectedUser1 && selectedUser2) {
            navigation.navigate('ViewChatPage', { logedInUser: selectedUser1, userId: selectedUser2 });
        } else {
            // Show an alert or do something else to indicate that both options need to be selected
            alert('Please select both users before viewing chat.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Select first user:</Text>
            <Picker
                selectedValue={selectedUser1}
                onValueChange={(itemValue, itemIndex) => setSelectedUser1(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Select user..." value={null} />
                {users.map(user => (
                    <Picker.Item key={user.id} label={user.name} value={user.id} />
                ))}
            </Picker>

            <Text style={styles.label}>Select second user:</Text>
            <Picker
                selectedValue={selectedUser2}
                onValueChange={(itemValue, itemIndex) => setSelectedUser2(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Select user..." value={null} />
                {filteredUsers.map(user => (
                    <Picker.Item key={user.id} label={user.name} value={user.id} />
                ))}
            </Picker>

            <Button title="View chat" onPress={handleSendValues} color="#687eff" disabled={!selectedUser1 || !selectedUser2} />
        </View>
    );

};

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#131313',
},
label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
},
picker: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#333',
},
});

export default ListOfUsers;