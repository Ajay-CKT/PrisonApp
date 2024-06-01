import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation , useRoute } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const route = useRoute(); 
  const logedInUser = route.params?.logedInUser;

  //  alert(logedInUser)
  const handleLawyerClick = () => {
    // Handle click for Lawyer section
    // console.log('Lawyer section clicked');
    navigation.navigate('LawyerInfoPage',{ logedInUser: logedInUser });
  };

  const handleClinicClick = () => {
    // Handle click for Clinic section
    console.log('Clinic section clicked');
    navigation.navigate('Clinicinfopage',{ logedInUser: logedInUser });
  };

  const handleModuleClick = () => {
    // Handle click for Module section TrainingModule
    console.log('Module section clicked');
    navigation.navigate('TrainingModule',{ logedInUser: logedInUser });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.section} onPress={handleLawyerClick}>
        <Text style={styles.sectionTitle}>Lawyer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.section} onPress={handleClinicClick}>
        <Text style={styles.sectionTitle}>Clinic</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.section} onPress={handleModuleClick}>
        <Text style={styles.sectionTitle}>Training Module</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    justifyContent:'center'
  },
  section: {
    backgroundColor: '#949cb0',
    borderRadius: 20,
    marginTop: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    color:"#ffffff",
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HomeScreen;
