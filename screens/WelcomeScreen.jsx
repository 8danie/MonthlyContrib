import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons'; // Utiliser une icône plus adaptée

const { width } = Dimensions.get('window');

// 'navigation' est une prop passée par React Navigation.
export default function WelcomeScreen({ navigation }) {
  return (
    // 1. Conteneur Principal
    // On utilise le même fond gris clair que l'écran de Login
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 flex justify-around items-center my-8 mx-4">

        {/* 2. Le Bloc "Logo" et Titre */}
        {/* On reprend l'idée du cercle bleu pour une cohérence de marque */}
        <View className="items-center">
          <View 
            className="bg-blue-800 rounded-full items-center justify-center shadow-2xl" 
            style={{ 
              width: width * 0.5, 
              height: width * 0.5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.2,
              shadowRadius: 20,
              elevation: 20,
            }}
          >
            {/* Une icône qui évoque la productivité, pour remplacer le "C" */}
            <FontAwesome5 name="wallet" size={width * 0.25} color="white" />
          </View>
          
          {/* Les titres avec la même police et les mêmes couleurs */}
          <Text className="text-4xl font-extrabold text-gray-900 text-center mt-12">
            Task Manager
          </Text>
          <Text className="text-gray-500 text-center text-lg mt-2 max-w-xs">
            Organize your projects and boost your productivity.
          </Text>
        </View>

        {/* 3. Le Bouton d'Action */}
        {/* On réutilise le style exact du bouton de Login */}
        <View className="w-full items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')} // Navigue vers Login
            className="w-4/5 bg-blue-800 rounded-lg py-4 shadow-md"
          >
            <Text className="text-white text-center font-bold text-lg">
              Let's Start
            </Text>
          </TouchableOpacity>
        
          {/* Lien pour s'inscrire, comme sur la page de Login */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-500">First time here? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text className="text-blue-800 font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
    </SafeAreaView>
  );
}