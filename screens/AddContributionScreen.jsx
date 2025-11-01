// screens/AddContributionScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { addDoc, collection, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

export default function AddContributionScreen({ navigation }) {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null); // Renommé pour plus de clarté
  const [availableGroups, setAvailableGroups] = useState([]); // Pour stocker les groupes de l'utilisateur
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Charger les groupes de l'utilisateur au montage de l'écran
  useEffect(() => {
    const fetchUserGroups = async () => {
      if (user?.groupIds && user.groupIds.length > 0) {
        const groupsQuery = query(collection(db, 'groups'), where('__name__', 'in', user.groupIds));
        const groupsSnapshot = await getDocs(groupsQuery);
        const groupsData = groupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAvailableGroups(groupsData);
      }
    };
    fetchUserGroups();
  }, [user]);

  const handleAdd = async () => {
    // On vérifie maintenant selectedGroup
    if (!amount || !selectedGroup) {
      Alert.alert('Champs requis', 'Veuillez entrer un montant et sélectionner un groupe.');
      return;
    }
    setLoading(true);

    try {
      await addDoc(collection(db, 'contributions'), {
        amount: parseFloat(amount),
        // On utilise maintenant l'objet 'selectedGroup'
        groupId: selectedGroup.id,
        groupName: selectedGroup.name,
        userId: user.uid,
        userName: user.name || user.email, // Utiliser l'email si le nom n'est pas dispo
        description: description,
        createdAt: serverTimestamp(),
      });

      setLoading(false);
      Alert.alert('Succès', 'Votre contribution a été enregistrée.');
      navigation.goBack();

    } catch (error) {
      console.error("Erreur d'enregistrement:", error);
      setLoading(false);
      Alert.alert('Erreur', 'Impossible d\'enregistrer la contribution.');
    }
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

        {/* --- Sélecteur de Groupe (Amélioré) --- */}
        <Text className="text-base font-semibold text-gray-600 mb-2">Groupe</Text>
        {/* Pour l'instant, on va juste permettre de sélectionner le premier groupe de la liste */}
        {/* Idéalement, ici, vous utiliseriez un Modal ou un Picker pour afficher `availableGroups` */}
        <TouchableOpacity
            onPress={() => {
                // Pour l'exemple, on sélectionne le premier groupe disponible.
                // Dans une vraie app, ouvrez un modal de sélection ici.
                if (availableGroups.length > 0) {
                    setSelectedGroup(availableGroups[0]);
                } else {
                    Alert.alert("Aucun groupe", "Vous n'êtes membre d'aucun groupe.");
                }
            }}
            className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-6"
        >
            <Text className={`text-lg ${selectedGroup ? 'text-gray-900' : 'text-gray-400'}`}>
                {selectedGroup ? selectedGroup.name : 'Sélectionner un groupe'}
            </Text>
        </TouchableOpacity>

        {/* ... Champs Description et Bouton d'Ajout inchangés ... */}
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