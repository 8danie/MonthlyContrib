// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import ContributionCard from '../components/ContributionCard';
import CampaignCard from '../components/CampaignCard';
import BottomNavBar from '../components/BottomNavBar';
import { collection, query, where, getDocs } from 'firebase/firestore'; // Importer les fonctions
import { db } from '../firebase'; // Importer db

// ... (Imports des composants) ...

export default function HomeScreen({ navigation }) {
  const { user } = useAuth(); // Récupérer l'utilisateur avec toutes ses infos
  
  const [campaigns, setCampaigns] = useState([]);
  const [groups, setGroups] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true); // État de chargement

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return; // Ne rien faire si l'utilisateur n'est pas encore chargé

      try {
        setLoading(true);

        // --- 1. Charger les groupes de l'utilisateur ---
        if (user.groupIds && user.groupIds.length > 0) {
        const groupsQuery = query(collection(db, 'groups'), where('__name__', 'in', user.groupIds));
        const groupsSnapshot = await getDocs(groupsQuery);
        const groupsData = groupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGroups(groupsData);
      } else {
        // Si l'utilisateur n'est dans aucun groupe, on met simplement un tableau vide.
        setGroups([]);
      }

        // --- 2. Charger les campagnes actives ---
        const campaignsQuery = query(collection(db, 'campaigns'), where('isActive', '==', true));
        const campaignsSnapshot = await getDocs(campaignsQuery);
        const campaignsData = campaignsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCampaigns(campaignsData);

        // --- 3. Charger le statut de cotisation personnel ---
        // Cela pourrait être directement dans le document de l'utilisateur
        setStatus({
          progress: user.contributionProgress || 0,
          nextDueDate: user.nextDueDate || 'N/A',
        });

      } catch (error) {
        console.error("Erreur de chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]); // Re-lancer le chargement si l'objet 'user' change

  // Afficher un indicateur de chargement pendant que les données arrivent
  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#4f46e5" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false} className="px-6 pt-6">
        
        <Header user={user} />
        
        <ContributionCard 
          status={status} 
          onSeeHistory={() => navigation.navigate('History')} 
        />

        <Text className="text-2xl font-bold text-gray-900 mb-4">Collectes en cours</Text>
        <FlatList
          horizontal
          data={campaigns}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => console.log("Naviguer vers la campagne:", item.title)}>
              <CampaignCard campaign={item} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          // ...
        />
        
        <Text className="text-2xl font-bold text-gray-900 mb-4">Groupes de Cotisation</Text>
        <View className="space-y-4 mb-24">
          {groups.map(group => (
            <GroupCard 
              key={group.id} 
              group={group}
              onPress={() => navigation.navigate('GroupDetail', { groupId: group.id })}
            />
          ))}
        </View>
        <View className="flex-row justify-around p-2 bg-yellow-100">
            <Button title="Créer Groupe" onPress={() => navigation.navigate('CreateGroup')} />
            <Button title="Créer Campagne" onPress={() => navigation.navigate('CreateCampaign')} />
        </View>

      </ScrollView>

      <BottomNavBar navigation={navigation} />
    </SafeAreaView>
  );
}