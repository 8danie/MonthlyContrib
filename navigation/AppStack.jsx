// navigation/AppStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// VÉRIFIEZ SCRUPULEUSEMENT CES LIGNES D'IMPORT
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import GroupDetailScreen from '../screens/GroupDetailScreen';
import AddContributionScreen from '../screens/AddContributionScreen';
// Assurez-vous aussi que UploadProofScreen est bien importé si vous l'utilisez
import UploadProofScreen from '../screens/UploadProofScreen';
import CreateGroupScreen from '../screens/CreateGroupScreen';
import CreateCampaignScreen from '../screens/CreateCampaignScreen';


const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Upload" component={UploadProofScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="GroupDetail" component={GroupDetailScreen} />
      <Stack.Screen 
        name="AddContribution" 
        component={AddContributionScreen} 
        options={{ presentation: 'modal' }} 
      />

      {/* Écrans Admin */}
      <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
      <Stack.Screen name="CreateCampaign" component={CreateCampaignScreen} />
    </Stack.Navigator>
  );
}