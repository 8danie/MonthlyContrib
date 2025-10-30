// screens/HistoryScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Données fictives
const historyData = [
  { id: '1', date: '30 Sep, 2024', amount: 50000, status: 'Paid', type: 'Mensuelle' },
  { id: '2', date: '31 Aug, 2024', amount: 50000, status: 'Paid', type: 'Mensuelle' },
  { id: '3', date: '15 Aug, 2024', amount: 25000, status: 'Paid', type: 'Fonds d\'Urgence' },
  { id: '4', date: '31 Jul, 2024', amount: 50000, status: 'Paid', type: 'Mensuelle' },
  { id: '5', date: '30 Jun, 2024', amount: 50000, status: 'Paid', type: 'Mensuelle' },
];

const formatCurrency = (amount) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'BIF', minimumFractionDigits: 0 }).format(amount);

// Le composant pour chaque ligne de l'historique
const HistoryItem = ({ item }) => (
  <View className="bg-white p-5 rounded-2xl flex-row items-center justify-between mb-4 shadow-sm">
    <View className="flex-row items-center space-x-4">
      <View className="bg-green-100 p-3 rounded-full">
        <Ionicons name="checkmark-done" size={24} color="green" />
      </View>
      <View>
        <Text className="text-base font-bold text-gray-800">{item.type}</Text>
        <Text className="text-sm text-gray-500">{item.date}</Text>
      </View>
    </View>
    <Text className="text-base font-semibold text-gray-800">{formatCurrency(item.amount)}</Text>
  </View>
);

export default function HistoryScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* --- En-tête de la page --- */}
      <View className="flex-row items-center justify-between p-6">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        
        {/* Assurez-vous que votre titre est bien dans un composant Text */}
        <Text className="text-2xl font-bold text-gray-900">Historique</Text>
        
        {/* Cet espaceur est une View, donc c'est correct */}
        <View className="w-10" /> 
      </View>

      {/* --- Liste des transactions --- */}
      <FlatList
        data={historyData}
        renderItem={({ item }) => <HistoryItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
}