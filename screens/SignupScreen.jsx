// Fichier : screens/SignupScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // <-- Changement ici
import { auth } from '../firebase';
import { FontAwesome } from '@expo/vector-icons';

// Renommer le composant
export default function SignupScreen({ navigation }) { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // <-- Ajout du champ de confirmation
  const [loading, setLoading] = useState(false);

  // Créer la fonction pour l'inscription
  const handleSignup = () => {
    // --- Validation Côté Client ---
    if (email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Champs requis', 'Veuillez remplir tous les champs.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe не correspondent pas.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Mot de passe faible', 'Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // Le succès est géré automatiquement par l'écouteur onAuthStateChanged dans App.js
        // Pas besoin de naviguer manuellement ici.
        console.log('Compte créé pour :', userCredentials.user.email);
      })
      .catch(error => {
        let errorMessage = "Une erreur est survenue. Veuillez réessayer.";
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Cette adresse email est déjà utilisée.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Le format de l\'email est invalide.';
        }
        Alert.alert('Erreur d\'inscription', errorMessage);
      })
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View className="p-8 w-full max-w-sm mx-auto">
            {/* --- Logo (identique) --- */}
            <View className="bg-blue-800 w-24 h-24 rounded-full items-center justify-center self-center mb-10 shadow-lg">
              <Text className="text-white text-6xl font-bold">C</Text>
            </View>

            {/* --- Titres (modifiés) --- */}
            <Text className="text-3xl font-bold text-gray-900 text-center">Welcome</Text>
            <Text className="text-gray-500 text-center mb-8 mt-1">Create your account</Text>

            {/* --- Champs de saisie (modifiés) --- */}
            <TextInput
              className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-4 text-lg"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-4 text-lg"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {/* Champ de confirmation ajouté */}
            <TextInput
              className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-6 text-lg"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            {/* --- Bouton d'Inscription (modifié) --- */}
            <TouchableOpacity
              onPress={handleSignup} // <-- Appel de la nouvelle fonction
              disabled={loading}
              className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-800'} rounded-lg py-4 shadow-md`}
            >
              <Text className="text-white text-center font-bold text-lg">
                {loading ? 'Création...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>

            {/* --- Séparateur "or" --- */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-4 text-gray-500">or</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>
            
            {/* --- Connexions sociales (identiques) --- */}
            <View className="flex-row justify-center items-center mb-8">
              <TouchableOpacity className="bg-white p-3 rounded-full shadow-md mx-3">
                <FontAwesome name="facebook-f" size={24} color="#3b5998" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-white p-3 rounded-full shadow-md mx-3">
                <FontAwesome name="google" size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-white p-3 rounded-full shadow-md mx-3">
                <FontAwesome name="linkedin" size={24} color="#0077B5" />
              </TouchableOpacity>
            </View>

            {/* --- Déjà un compte ? (modifié) --- */}
            <View className="flex-row justify-center">
              <Text className="text-gray-500">Already have an account ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className="text-blue-800 font-semibold">Login</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}