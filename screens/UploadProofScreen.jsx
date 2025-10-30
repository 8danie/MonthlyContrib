// Fichier : screens/UploadProofScreen.js (Version corrigée et robuste)
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, TextInput, ActivityIndicator, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

export default function UploadProofScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null); // Renommé pour plus de clarté
  const [comment, setComment] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Fonction unifiée pour la sélection d'image
  const selectImage = async (useCamera) => {
    let result;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5, // Compression pour un upload plus rapide
    };

    try {
      if (useCamera) {
        // Demander la permission pour la caméra
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          Alert.alert("Permission requise", "Vous devez autoriser l'accès à la caméra pour prendre une photo.");
          return;
        }
        result = await ImagePicker.launchCameraAsync(options);
      } else {
        // Demander la permission pour la galerie
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permission requise", "Vous devez autoriser l'accès à la galerie pour choisir une photo.");
            return;
        }
        result = await ImagePicker.launchImageLibraryAsync(options);
      }

      // --- LA CORRECTION EST ICI ---
      // On vérifie que l'action n'a pas été annulée ET que le tableau assets existe et n'est pas vide
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
        console.error("Erreur ImagePicker : ", error);
        Alert.alert("Erreur", "Impossible de charger l'image.");
    }
  };

  const handleSubmit = async () => {
    if (!imageUri) {
      Alert.alert('Image manquante', 'Veuillez sélectionner une image du bordereau.');
      return;
    }
    setIsUploading(true);

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      
      const storage = getStorage();
      const filename = `${auth.currentUser.uid}-${Date.now()}`;
      const storageRef = ref(storage, `proofs/${filename}`);

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      
      const date = new Date();
      const contributionId = `${auth.currentUser.uid}_${date.getFullYear()}-${date.getMonth() + 1}`;
      const contributionRef = doc(db, 'contributions', contributionId);
      
      await setDoc(contributionRef, {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        status: 'pending_review',
        proofImageURL: downloadURL,
        submissionDate: date,
        comment: comment,
      }, { merge: true }); // 'merge: true' est une bonne pratique

      Alert.alert('Succès', 'Votre preuve de paiement a été soumise pour validation.');
      navigation.goBack();

    } catch (error) {
      console.error("Erreur d'upload : ", error);
      Alert.alert('Erreur', "Une erreur est survenue lors de l'envoi.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View className="flex-1 p-6 bg-gray-50">
      <TouchableOpacity onPress={() => selectImage(false)} className="bg-blue-100 border border-blue-300 rounded-lg p-4 items-center mb-3">
        <Text className="text-blue-700 font-semibold">Choisir depuis la galerie</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => selectImage(true)} className="bg-green-100 border border-green-300 rounded-lg p-4 items-center mb-6">
        <Text className="text-green-700 font-semibold">Prendre une photo</Text>
      </TouchableOpacity>
      
      {imageUri && <Image source={{ uri: imageUri }} className="w-full h-56 rounded-lg mb-6 border border-gray-200" />}
      
      <TextInput
        className="w-full bg-white border border-gray-300 rounded-lg h-24 p-4 mb-6"
        placeholder="Ajouter un commentaire (optionnel)"
        value={comment}
        onChangeText={setComment}
        multiline
        textAlignVertical="top"
      />

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isUploading}
        className={`w-full rounded-lg h-14 justify-center items-center ${isUploading ? 'bg-gray-400' : 'bg-blue-600'}`}
      >
        {isUploading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-lg">Soumettre ma preuve</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}