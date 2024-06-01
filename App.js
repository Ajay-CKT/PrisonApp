import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import SignInScreen from './screens/signIn';
import SignUpScreen from './screens/signUp';
import PrisonerPage from './screens/prisonerPage'
import AdminPage from './screens/adminPage'
import ApproveUserRequests from './screens/approveUserRequests'
import ManageAccounts from './screens/manageAccounts'
import LawyerInfoPage from './screens/lawyersInfoPage'
import Clinicinfopage from './screens/clinecInfoPage';
import Prisonerinfopage from './screens/PrisonerInfoPage';
import AddTrainingModules from './screens/addTrainingModules';
import TrainingModule from './screens/trainingModule';
import Content from './screens/contents';
import ContentPage from './screens/contentPage'
import LawyerLandingPage from './screens/toLawyerPage';
import PendingCases from './screens/pendingCasesDisplay'
import FamilyMembers from './screens/familyMembers';
import ListOfUsers from './screens/ListofUsers'
import ViewChatPage from './screens/ViewChatPage';
import PaymentScreen from './screens/Payment';
import PaymentPage from './screens/PaymentPage';
// import ChatPage from './screens/chatpage'
import ChatPage  from './screens/chatpage';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="PrisonerPage" component={PrisonerPage} />
      <Stack.Screen name="AdminPage" component={AdminPage} />
      <Stack.Screen name="ApproveUserRequests" component={ApproveUserRequests} />
      <Stack.Screen name="ManageAccounts" component={ManageAccounts} />
      <Stack.Screen name="LawyerInfoPage" component={LawyerInfoPage} />
      <Stack.Screen name="Clinicinfopage" component={Clinicinfopage} />
      <Stack.Screen name="Prisonerinfopage" component={Prisonerinfopage} />
      <Stack.Screen name="AddTrainingModules" component={AddTrainingModules} />
      <Stack.Screen name="TrainingModule" component={TrainingModule} />
      <Stack.Screen name="Content" component={Content} />
      <Stack.Screen name="ContentPage" component={ContentPage} />
      <Stack.Screen name="LawyerLandingPage" component={LawyerLandingPage} />
      <Stack.Screen name="PendingCases" component={PendingCases} />
      <Stack.Screen name="FamilyMembers" component={FamilyMembers} />
      {/* <Stack.Screen name="ChatPage" component={ChatPage} /> */}
      <Stack.Screen name="ChatPage" component={ChatPage}></Stack.Screen>
      <Stack.Screen name="ListOfUsers" component={ListOfUsers}></Stack.Screen>
      <Stack.Screen name="ViewChatPage" component={ViewChatPage}></Stack.Screen>
      <Stack.Screen name="PaymentScreen" component={PaymentScreen}></Stack.Screen>
      <Stack.Screen name="PaymentPage" component={PaymentPage}></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
