// screens/admin/CreateCampaignScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase'; // Adapter le chemin

export default function CreateCampaignScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [color, setColor] = useState('#3b82f6'); // Valeur par défaut
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleCreateCampaign = async () => {
    if (!title || !goal) {
      Alert.alert('Champs requis', 'Le titre et l\'objectif sont obligatoires.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'campaigns'), {
        title: title,
        goal: parseFloat(goal),
        color: color,
        isActive: isActive,
        current: 0, // Initialisé à 0
      });
      setLoading(false);
      Alert.alert('Succès', 'La campagne a été créée avec succès.');
      navigation.goBack();
    } catch (error) {
      console.error("Erreur de création de la campagne:", error);
      setLoading(false);
      Alert.alert('Erreur', 'Impossible de créer la campagne.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* --- En-tête --- */}
      <View className="flex-row items-center p-6">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900 ml-4">Créer une Campagne</Text>
      </View>
      
      <View className="p-6">
        {/* --- Titre de la Campagne --- */}
        <Text className="text-base font-semibold text-gray-600 mb-2">Titre de la Campagne</Text>
        <TextInput
          className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-6 text-lg"
          placeholder="Ex: Fonds d'Urgence"
          value={title}
          onChangeText={setTitle}
        />

        {/* --- Objectif Financier --- */}
        <Text className="text-base font-semibold text-gray-600 mb-2">Objectif (en BIF)</Text>
        <TextInput
          className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-6 text-lg"
          placeholder="Ex: 5000000"
          value={goal}
          onChangeText={setGoal}
          keyboardType="numeric"
        />

        {/* --- Couleur (Hex) --- */}
        <Text className="text-base font-semibold text-gray-600 mb-2">Couleur (Hexadécimal)</Text>
        <TextInput
          className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-8 text-lg"
          placeholder="Ex: #3b82f6"
          value={color}
          onChangeText={setColor}
          autoCapitalize="none"
        />

        {/* --- Statut Actif --- */}
        <View className="flex-row items-center justify-between mb-10">
            <Text className="text-lg text-gray-700">Rendre la campagne active ?</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#818cf8" }}
                thumbColor={isActive ? "#4f46e5" : "#f4f3f4"}
                onValueChange={() => setIsActive(previousState => !previousState)}
                value={isActive}
            />
        </View>

        {/* --- Bouton de Création --- */}
        <TouchableOpacity
          onPress={handleCreateCampaign}
          disabled={loading}
          className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-800'} rounded-lg py-4 shadow-md`}
        >
          <Text className="text-white text-center font-bold text-lg">
            {loading ? 'Création...' : 'Créer la Campagne'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}