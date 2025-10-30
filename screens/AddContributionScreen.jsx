// screens/AddContributionScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function AddContributionScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [group, setGroup] = useState(null); // Pour stocker le groupe sélectionné
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    if (!amount || !group) {
      Alert.alert('Champs requis', 'Veuillez entrer un montant et sélectionner un groupe.');
      return;
    }
    setLoading(true);
    // Logique pour envoyer les données à Firebase...
    console.log({ amount, group, description });
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Succès', 'Votre contribution a été enregistrée.');
      navigation.goBack();
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* --- En-tête --- */}
      <View className="flex-row items-center p-6">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="close" size={32} color="black" />
        </TouchableOpacity>
      </View>
      
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-900 mb-8">Nouvelle Contribution</Text>

        {/* --- Champ Montant --- */}
        <Text className="text-base font-semibold text-gray-600 mb-2">Montant</Text>
        <TextInput
          className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-6 text-lg"
          placeholder="Ex: 50000"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        {/* --- Sélecteur de Groupe (simplifié) --- */}
        <Text className="text-base font-semibold text-gray-600 mb-2">Groupe</Text>
        <TouchableOpacity
            onPress={() => setGroup('Famille & Amis')} // Logique de sélection plus complexe à venir
            className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-6"
        >
            <Text className={`text-lg ${group ? 'text-gray-900' : 'text-gray-400'}`}>
                {group || 'Sélectionner un groupe'}
            </Text>
        </TouchableOpacity>

        {/* --- Champ Description --- */}
        <Text className="text-base font-semibold text-gray-600 mb-2">Description (Optionnel)</Text>
        <TextInput
          className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-8 text-lg"
          placeholder="Ex: Cotisation mensuelle"
          value={description}
          onChangeText={setDescription}
        />

        {/* --- Bouton d'Ajout --- */}
        <TouchableOpacity
          onPress={handleAdd}
          disabled={loading}
          className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-800'} rounded-lg py-4 shadow-md`}
        >
          <Text className="text-white text-center font-bold text-lg">
            {loading ? 'Enregistrement...' : 'Ajouter la Contribution'}
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}