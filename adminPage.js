import React from 'react';
import { View, Button, StyleSheet,ScrollView } from 'react-native';
import { useNavigation ,useRoute} from '@react-navigation/native';

const AdminPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const logedInUser = route.params?.logedInUser;

  const handleApproveRequests = () => {
    navigation.navigate('ApproveUserRequests'); // Navigate to screen for approving account requests
  };

  const handleManageAccounts = () => {
    navigation.navigate('ManageAccounts'); // Navigate to screen for managing accounts
  };

  const handleAddTrainingModules = () => {
    navigation.navigate('AddTrainingModules',{ logedInUser: logedInUser }); // Navigate to screen for adding training modules
  };

  const ToSeeChat=()=>{
    navigation.navigate('ListOfUsers',{ logedInUser: logedInUser });
  }

  // const Payment=()=>{
  //   navigation.navigate('PaymentPage');
  // }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Approve Account Requests"
          onPress={handleApproveRequests}
          color="#6875ff" // Set button color to the same as container background color
          titleStyle={styles.buttonText} // Apply styles for button text
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Manage Accounts"
          onPress={handleManageAccounts}
          color="#6875ff" // Set button color to the same as container background color
          titleStyle={styles.buttonText} // Apply styles for button text
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Add Training Modules"
          onPress={handleAddTrainingModules}
          color="#6875ff" // Set button color to the same as container background color
          titleStyle={styles.buttonText} // Apply styles for button text
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Chat Page"
          onPress={ToSeeChat}
          color="#6875ff" // Set button color to the same as container background color
          titleStyle={styles.buttonText} // Apply styles for button text
        />
      </View>
      </View>
      // <View style={styles.buttonContainer}>
        // <Button
          // title="Payment"
          // onPress={Payment}
          // color="#6875ff" 
          // titleStyle={styles.buttonText} 
        // />
      // </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#131313', // Single color for both container and buttons
  },
  buttonContainer: {
    width: '80%',
    // height:"10%",
    borderRadius:20,
    overflow:"hidden",
    marginTop:20,
    // aspectRatio: 6, // Aspect ratio to maintain the width-height ratio
    marginBottom: 10,
  },
  buttonText: {
    textAlignVertical: 'center', // Vertically center the button text
  },
});

export default AdminPage;
