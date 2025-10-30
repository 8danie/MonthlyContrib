// navigation/AppStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import UploadProofScreen from '../screens/UploadProofScreen';
import HistoryScreen from '../screens/HistoryScreen';
import GroupDetailScreen from '../screens/GroupDetailScreen';
import AddContributionScreen from '../screens/AddContributionScreen';

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
      {/* Ajoutez ici d'autres écrans pour les utilisateurs connectés */}
    </Stack.Navigator>
  );
}