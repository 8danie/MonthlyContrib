// components/Header.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// On passera les données de l'utilisateur en props
function Header({ user }) {
  const defaultAvatar = 'https://i.pravatar.cc/150';

  return (
    <View className="flex-row justify-between items-center mb-6">
      <View className="flex-row items-center space-x-4">
        <Image 
          source={{ uri: user?.avatar || defaultAvatar }} 
          className="w-14 h-14 rounded-full bg-gray-200" // Fond gris en cas de chargement
        />
        <View>
          <Text className="text-gray-500 text-base">Bonjour!</Text>
          <Text className="text-2xl font-bold text-gray-900">{user?.name || 'Utilisateur'}</Text>
        </View>
      </View>
      <TouchableOpacity className="relative">
        <Ionicons name="notifications-outline" size={28} color="black" />
        {/* On affichera le point rouge uniquement s'il y a des notifications */}
        {user?.hasNotifications && (
          <View className="absolute right-0 top-0 w-2 h-2 bg-red-500 rounded-full"></View>
        )}
      </TouchableOpacity>
    </View>
  );
}

export default Header;