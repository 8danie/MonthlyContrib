// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

// Import de nos composants modulaires
import Header from '../components/Header';
import ContributionCard from '../components/ContributionCard';
import CampaignCard from '../components/CampaignCard';
import GroupCard from '../components/GroupCard';
import BottomNavBar from '../components/BottomNavBar'; // <-- 2. IMPORTER LE NOUVEAU COMPOSANT

// ... (vos données fictives DUMMY_... restent ici pour l'instant) ...
const DUMMY_CAMPAIGNS = [
  { id: 1, title: 'Fonds d\'Urgence', goal: 5000000, current: 3500000, color: '#3b82f6' },
  { id: 2, title: 'Projet Communautaire', goal: 10000000, current: 2500000, color: '#f97316' },
];
const DUMMY_GROUPS = [
  { id: 1, name: 'Famille & Amis', members: 23, progress: 0.70, icon: 'users', color: '#ec4899' },
  { id: 2, name: 'Collègues de Bureau', members: 30, progress: 0.52, icon: 'briefcase', color: '#8b5cf6' },
  { id: 3, name: 'Club de Sport', members: 30, progress: 0.87, icon: 'running', color: '#f59e0b' },
];
const DUMMY_STATUS = {
  progress: 0.85,
  nextDueDate: 'Oct 31, 2024',
};


export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  
  const [userData, setUserData] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [groups, setGroups] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setUserData({ name: 'Livia Vaccaro', avatar: 'https://i.pravatar.cc/150?u=livia', hasNotifications: true });
    setCampaigns(DUMMY_CAMPAIGNS);
    setGroups(DUMMY_GROUPS);
    setStatus(DUMMY_STATUS);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false} className="px-6 pt-6">
        
        <Header user={userData} />
        
        <ContributionCard 
          status={status} 
          onSeeHistory={() => navigation.navigate('History')}
        />

        <Text className="text-2xl font-bold text-gray-900 mb-4">Collectes en cours</Text>
        <FlatList
          horizontal
          data={campaigns}
          renderItem={({ item }) => <CampaignCard campaign={item} />}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          className="-mx-6 px-6 mb-8"
        />
        
        <Text className="text-2xl font-bold text-gray-900 mb-4">Groupes de Cotisation</Text>
        <View className="space-y-4 mb-24">
          {groups.map(group => (
            <GroupCard 
              key={group.id} 
              group={group}
              onPress={() => navigation.navigate('GroupDetail', { group: group })}
            />
          ))}
        </View>

      </ScrollView>

      {/* On utilise simplement le composant importé ici */}
      <BottomNavBar navigation={navigation} />
    </SafeAreaView>
  );
}

// 1. SUPPRIMER la fonction "function BottomNavBar() { ... }" qui était ici.