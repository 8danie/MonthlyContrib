// components/ContributionCard.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';

function ContributionCard({ status, onSeeHistory }) {
  const { progress = 0, nextDueDate = 'N/A' } = status || {};

  return (
    <View className="bg-indigo-600 rounded-3xl p-6 mb-8 shadow-lg shadow-indigo-300">
      <View className="flex-row justify-between items-center">
        <View className="space-y-2 flex-1">
          <Text className="text-white font-semibold text-lg">Votre cotisation est à jour !</Text>
          <Text className="text-indigo-200 text-sm">Prochain paiement : {nextDueDate}</Text>
          <TouchableOpacity 
            onPress={onSeeHistory} 
            className="bg-white/30 rounded-full py-2 px-5 self-start mt-2"
          >
            <Text className="text-white font-bold">Voir l'historique</Text>
          </TouchableOpacity>
        </View>
        <Progress.Circle 
          size={80} 
          progress={progress} 
          showsText={true}
          color={'#fff'}
          unfilledColor={'rgba(255, 255, 255, 0.3)'}
          borderWidth={0}
          thickness={8}
          formatText={() => `${Math.round(progress * 100)}%`}
          textStyle={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}
        />
      </View>
    </View>
  );
}

export default ContributionCard;