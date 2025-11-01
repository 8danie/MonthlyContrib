// screens/admin/CreateGroupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase'; // Adapter le chemin

export default function CreateGroupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [icon, setIcon] = useState('users'); // Valeur par défaut
  const [color, setColor] = useState('#ec4899'); // Valeur par défaut
  const [loading, setLoading] = useState(false);

  const handleCreateGroup = async () => {
    if (!name || !goal) {
      Alert.alert('Champs requis', 'Le nom et l\'objectif sont obligatoires.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'groups'), {
        name: name,
        goal: parseFloat(goal),
        icon: icon,
        color: color,
        membersCount: 0, // Initialisé à 0
        progress: 0,     // Initialisé à 0
      });
      setLoading(false);
      Alert.alert('Succès', 'Le groupe a été créé avec succès.');
      navigation.goBack();
    } catch (error) {
      console.error("Erreur de création du groupe:", error);
      setLoading(false);
      Alert.alert('Erreur', 'Impossible de créer le groupe.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        {/* --- En-tête --- */}
        <View className="flex-row items-center p-6">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900 ml-4">Créer un Groupe</Text>
        </View>
        
        <View className="p-6">
          {/* --- Nom du Groupe --- */}
          <Text className="text-base font-semibold text-gray-600 mb-2">Nom du Groupe</Text>
          <TextInput
            className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-6 text-lg"
            placeholder="Ex: Famille & Amis"
            value={name}
            onChangeText={setName}
          />

          {/* --- Objectif Financier --- */}
          <Text className="text-base font-semibold text-gray-600 mb-2">Objectif (en BIF)</Text>
          <TextInput
            className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-6 text-lg"
            placeholder="Ex: 1000000"
            value={goal}
            onChangeText={setGoal}
            keyboardType="numeric"
          />

          {/* --- Icône (Simplifié) --- */}
          <Text className="text-base font-semibold text-gray-600 mb-2">Nom de l'icône (FontAwesome5)</Text>
          <TextInput
            className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-6 text-lg"
            placeholder="Ex: users, briefcase, running"
            value={icon}
            onChangeText={setIcon}
            autoCapitalize="none"
          />

          {/* --- Couleur (Hex) --- */}
          <Text className="text-base font-semibold text-gray-600 mb-2">Couleur (Hexadécimal)</Text>
          <TextInput
            className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-8 text-lg"
            placeholder="Ex: #ec4899"
            value={color}
            onChangeText={setColor}
            autoCapitalize="none"
          />

          {/* --- Bouton de Création --- */}
          <TouchableOpacity
            onPress={handleCreateGroup}
            disabled={loading}
            className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-800'} rounded-lg py-4 shadow-md`}
          >
            <Text className="text-white text-center font-bold text-lg">
              {loading ? 'Création...' : 'Créer le Groupe'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}