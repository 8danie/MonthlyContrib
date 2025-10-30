// screens/GroupDetailScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

// Données fictives (on passera les données du groupe via la navigation)
const groupData = {
  name: 'Famille & Amis',
  membersCount: 23,
  progress: 0.70,
  icon: 'users',
  color: '#ec4899',
  totalCollected: 700000,
  goal: 1000000,
};

const membersData = [
  { id: '1', name: 'Livia Vaccaro', avatar: 'https://i.pravatar.cc/150?u=livia', status: 'Paid' },
  { id: '2', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=john', status: 'Paid' },
  { id: '3', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=jane', status: 'Pending' },
  { id: '4', name: 'Mike Ross', avatar: 'https://i.pravatar.cc/150?u=mike', status: 'Paid' },
];

const formatCurrency = (amount) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'BIF', minimumFractionDigits: 0 }).format(amount);

const MemberItem = ({ item }) => (
  <View className="bg-white p-4 rounded-2xl flex-row items-center justify-between mb-3">
    <View className="flex-row items-center space-x-3">
      <Image source={{ uri: item.avatar }} className="w-12 h-12 rounded-full" />
      <Text className="text-base font-semibold text-gray-800">{item.name}</Text>
    </View>
    <View className={`px-3 py-1 rounded-full ${item.status === 'Paid' ? 'bg-green-100' : 'bg-yellow-100'}`}>
      <Text className={`font-semibold ${item.status === 'Paid' ? 'text-green-700' : 'text-yellow-700'}`}>{item.status}</Text>
    </View>
  </View>
);

export default function GroupDetailScreen({ navigation, route }) {
  // const { group } = route.params; // Pour récupérer les données du groupe cliqué

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* --- En-tête --- */}
      <View className="flex-row items-center p-6">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* --- Carte Résumé du Groupe --- */}
      <View className="px-6">
        <View className="bg-white p-6 rounded-3xl shadow-sm mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center space-x-4">
              <View className="p-3 rounded-xl" style={{ backgroundColor: `${groupData.color}20` }}>
                <FontAwesome5 name={groupData.icon} size={24} color={groupData.color} />
              </View>
              <View>
                <Text className="text-2xl font-bold text-gray-900">{groupData.name}</Text>
                <Text className="text-gray-500">{groupData.membersCount} Membres</Text>
              </View>
            </View>
            <Text className="text-xl font-bold" style={{ color: groupData.color }}>{`${groupData.progress * 100}%`}</Text>
          </View>
          <Text className="text-lg font-bold text-gray-900">{formatCurrency(groupData.totalCollected)}</Text>
          <Text className="text-sm text-gray-500">collectés sur {formatCurrency(groupData.goal)}</Text>
          <Progress.Bar
            progress={groupData.progress}
            width={null}
            color={groupData.color}
            unfilledColor="#e5e7eb"
            borderWidth={0}
            className="mt-4 h-2.5 rounded-full"
          />
        </View>
      </View>

      {/* --- Titre de la liste des membres --- */}
      <Text className="text-xl font-bold text-gray-900 px-6 mb-4">Statut des Membres</Text>
      
      {/* --- Liste des membres --- */}
      <FlatList
        data={membersData}
        renderItem={({ item }) => <MemberItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
}