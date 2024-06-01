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

const AddTrainingModules = () => {
    const route = useRoute();
    const logedInUser = route.params?.logedInUser;

    const [category, setCategory] = useState('Mental Health');
    const [title, setTitle] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [steps, setSteps] = useState('');

    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
    }

    const handleAddTrainingModule = async() => {
        // Add your logic to save the training module to Firebase
        console.log(logedInUser)
        const loggedInUserDoc = doc(db, "users", logedInUser);
        const loggedInUserSnap = await getDoc(loggedInUserDoc);
        const loggedInUserData = loggedInUserSnap.data();

        const name=loggedInUserData.name
        const email=loggedInUserData.email
        const password=loggedInUserData.password
        const language=loggedInUserData.language
        const phoneNumber=loggedInUserData.phoneNumber
        const role=loggedInUserData.role
        const status=loggedInUserData.status
        
        const usermodule={
            category:category,
            title:title,
            imageurl:imageURL,
            steps:steps
        }

        let modules=[]
        if(loggedInUserData.module){
            modules=loggedInUserData.module
            modules.push(usermodule)
        }else{
            modules.push(usermodule)
        }
        await setDoc(loggedInUserDoc, {name:name,email:email,password:password,language:language,phoneNumber:phoneNumber,role:role,status:status,module:modules});
        setCategory('Mental Health');
        setTitle('');
        setImageURL('');
        setSteps('');
    }

    

    return (
        <View style={styles.container}>
            <View style={styles.category}>
                <Text style={styles.label}>Category:</Text>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={[styles.button, category === 'Mental Health' && styles.selectedButton]}
                        onPress={() => handleCategoryChange('Mental Health')}
                    >
                        <Text style={[styles.buttonText, category === 'Mental Health' && { color: '#FFFFFF' }]}>Mental Health</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, category === 'Skill' && styles.selectedButton]}
                        onPress={() => handleCategoryChange('Skill')}
                    >
                        <Text style={[styles.buttonText, category === 'Skill' && { color: '#FFFFFF' }]}>Skill</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TextInput
                style={styles.input}
                onChangeText={text => setTitle(text)}
                value={title}
                placeholder="Title"
                placeholderTextColor="#949BC0"
            />

            <TextInput
                style={styles.input}
                onChangeText={text => setImageURL(text)}
                value={imageURL}
                placeholder="Image URL"
                placeholderTextColor="#949BC0"
            />

            <TextInput
                style={styles.input}
                onChangeText={text => setSteps(text)}
                value={steps}
                placeholder="Steps"
                placeholderTextColor="#949BC0"
                multiline={true}
                numberOfLines={4}
            />
            <Button title="Add Training Module" onPress={handleAddTrainingModule} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#161616'
    },
    category: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginRight: 10,
        color: '#FFFFFF'
    },
    buttonGroup: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#6875FF',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    selectedButton: {
        backgroundColor: '#AAAAAA',
    },
    buttonText: {
        fontSize: 16,
        color: '#FFFFFF'
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: '#FFFFFF'
    }
});

export default AddTrainingModules;
