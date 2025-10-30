// components/CampaignCard.js
import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

// Fonction pour formater la devise (peut être mise dans un fichier 'utils')
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'BIF', minimumFractionDigits: 0 }).format(amount);
};

function CampaignCard({ campaign }) {
  const { title, goal, current, color } = campaign;
  const progress = goal > 0 ? current / goal : 0;

  return (
    <View className="bg-white rounded-3xl p-5 mr-4 shadow-sm" style={{width: 220}}>
      <View className="flex-row justify-between items-start mb-4">
        <Text className="text-gray-500">{title}</Text>
        <View className="bg-pink-100 p-2 rounded-lg">
          <Feather name="trending-up" size={16} color="#ec4899" />
        </View>
      </View>
      <Text className="text-lg font-bold text-gray-900 mb-1">{formatCurrency(current)}</Text>
      <Text className="text-xs text-gray-400">sur {formatCurrency(goal)}</Text>
      <Progress.Bar 
        progress={progress} 
        width={null} 
        color={color}
        unfilledColor="#e5e7eb"
        borderWidth={0}
        className="mt-4 h-2 rounded-full"
      />
    </View>
  );
}

export default CampaignCard;