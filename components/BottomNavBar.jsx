// components/BottomNavBar.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

// On reçoit maintenant 'navigation' en prop pour pouvoir déclencher des actions
export default function BottomNavBar({ navigation }) {
  const activeTab = 'Accueil'; 

  return (
    <View className="absolute bottom-0 w-full bg-white/90 border-t border-gray-200 h-20 flex-row justify-around items-center pt-2 backdrop-blur-sm">
      <TouchableOpacity 
        onPress={() => navigation.navigate('Home')}
        className="items-center"
      >
        <Ionicons name="home" size={28} color={activeTab === 'Accueil' ? '#6366f1' : 'gray'} />
        <Text className={`text-xs ${activeTab === 'Accueil' ? 'text-indigo-600' : 'text-gray-500'}`}>Accueil</Text>
      </TouchableOpacity>
      
      {/* ... autres boutons ... */}
      <TouchableOpacity className="items-center">
        <Ionicons name="calendar-outline" size={28} color={activeTab === 'Échéances' ? '#6366f1' : 'gray'} />
        <Text className={`text-xs ${activeTab === 'Échéances' ? 'text-indigo-600' : 'text-gray-500'}`}>Échéances</Text>
      </TouchableOpacity>
      
      {/* --- LE BOUTON + EST MAINTENANT FONCTIONNEL --- */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('AddContribution')}
        className="bg-indigo-600 w-16 h-16 rounded-full items-center justify-center -mt-12 shadow-lg shadow-indigo-300"
      >
        <Feather name="plus" size={32} color="white" />
      </TouchableOpacity>
      
      {/* ... autres boutons ... */}
      <TouchableOpacity className="items-center">
        <Ionicons name="document-text-outline" size={28} color={activeTab === 'Rapports' ? '#6366f1' : 'gray'} />
        <Text className={`text-xs ${activeTab === 'Rapports' ? 'text-indigo-600' : 'text-gray-500'}`}>Rapports</Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="items-center">
        <Ionicons name="people-outline" size={28} color={activeTab === 'Membres' ? '#6366f1' : 'gray'} />
        <Text className={`text-xs ${activeTab === 'Membres' ? 'text-indigo-600' : 'text-gray-500'}`}>Membres</Text>
      </TouchableOpacity>
    </View>
  );
}