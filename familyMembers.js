import React, { useEffect , useState } from 'react';
import { Text, View, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs, getDoc, doc, addDoc, setDoc } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

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

const FamilyMembers=()=>{
  const route = useRoute(); 
  const logedInUser = route.params?.logedInUser;

  const navigation = useNavigation();
    const [pendingUsers, setPendingUsers] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
          const pendingUsersArray = [];
          let lastmsg
          let lastmsgtime
          const querySnapshot = await getDocs(collection(db, "users"));
          querySnapshot.forEach(doc => {
            const datas = doc.data();
            if (datas.role === "Family Member" && datas.status == "approved") {
              // console.log("hii")
              if(datas.message){
                // console.log("msg")
                let message=datas.message
                // console.log(doc.id)
                // console.log(message)
                // Assuming messages is an array containing message objects
                const filteredMessages = message.filter(message => {
  // Check if the senderId matches loggedInUser and receiverId matches doc.id
                const condition1 = message.senderId == logedInUser && message.receiverId == doc.id;
                // Check if the senderId matches doc.id and receiverId matches loggedInUser
                const condition2 = message.senderId == doc.id && message.receiverId == logedInUser;
                // Return true if any of the conditions are met
                return condition1 || condition2;
});
        // console.log(filteredMessages)
                if(filteredMessages.length>0){
                  let thelastmsg=filteredMessages[filteredMessages.length-1]
                  console.log(thelastmsg)
                  lastmsg=thelastmsg.text
                  let convertedHour = '';
                  let convertedMinute = '';
                  let period = '';
                  if (thelastmsg.timestamp) {
                    const timestamp = thelastmsg.timestamp.toDate();
                    const hour = timestamp.getHours();
                    const minute = timestamp.getMinutes();
                    
                    convertedHour = (hour % 12 || 12).toString().padStart(2, '0'); // Convert hour to 12-hour format with leading zero if needed
                    convertedMinute = minute.toString().padStart(2, '0'); // Add leading zero to minutes if needed
                    period = hour < 12 ? 'AM' : 'PM'; // Determine AM or PM
                  }
                  lastmsgtime = `${convertedHour}:${convertedMinute} ${period}`;
                                // console.log(lastmsgtime)
                }else{
                  lastmsg="start the conversation by sending a message"
                  lastmsgtime="0:00:00"
                  // console.log(lastmsgtime)
                }
              }else{
                lastmsg="start the conversation by sending a message"
                lastmsgtime="0:00:00"
                // console.log(lastmsgtime)
              }
              pendingUsersArray.push({
                name:datas.name,
                role:datas.role,
                phoneno:datas.phoneNumber,
                email:datas.email,
                address:datas.address,
                docid:doc.id,
                lastmsg:lastmsg,
                lastmsgtime:lastmsgtime
              });
            }
          });
          setPendingUsers(pendingUsersArray);
        };
    
        fetchRequests();
      }, []);
// alert(logedInUser)
      const handlePress = (userId) => {
        // Navigate to the new page with the user's details
        navigation.navigate('ChatPage', { logedInUser, userId  });
    };

    return(
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {pendingUsers.map((user, index) => (
        <TouchableOpacity key={index} style={styles.messageContainer} onPress={() => handlePress(user.docid)}>
          <View style={styles.messageContent}>
            <View style={styles.info}>
              <Text style={styles.senderName}>{user.name}</Text>
              <Text style={styles.time}>{user.lastmsgtime}</Text>
            </View>
            <Text style={styles.messageText}>{user.lastmsg}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
    )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#1d2331',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 10,
    backgroundColor: '#1d2331',
    
    padding: 10,
    borderBottomWidth: 1, // Adjust the thickness of the border as needed
  borderBottomColor: 'gray',
  },
  messageContent: {
    flex: 1,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  senderName: {
    color:'#ffffff',
    fontSize: 20,
  },
  messageText: {
    fontSize: 14,
    color: '#ffffff',
  },
  time: {
    color: '#ffffff',
    fontSize: 12,
  },
});

  
  

export default FamilyMembers