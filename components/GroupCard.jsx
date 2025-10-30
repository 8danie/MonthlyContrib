// components/GroupCard.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

function GroupCard({ group, onPress }) {
  const { name, members, progress, icon, color } = group;

  return (
    <TouchableOpacity onPress={onPress} className="bg-white p-5 rounded-3xl flex-row items-center justify-between shadow-sm">
      <View className="flex-row items-center space-x-4">
        <View className="p-3 rounded-xl" style={{backgroundColor: `${color}20`}}>
          <FontAwesome5 name={icon} size={24} color={color} />
        </View>
        <View>
          <Text className="text-lg font-bold text-gray-900">{name}</Text>
          <Text className="text-gray-500">{members} Membres</Text>
        </View>
      </View>
      <Progress.Circle 
        size={50} 
        progress={progress} 
        showsText={true}
        color={color}
        unfilledColor="#e5e7eb"
        borderWidth={0}
        thickness={5}
        formatText={() => `${Math.round(progress * 100)}%`}
        textStyle={{ color: color, fontWeight: 'bold', fontSize: 12 }}
      />
    </TouchableOpacity>
  );
}

export default GroupCard;