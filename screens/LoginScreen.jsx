// Fichier : screens/LoginScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView,
  Platform,
  ScrollView // Ajouté pour les petits écrans
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { FontAwesome } from '@expo/vector-icons'; // Pour les icônes sociales

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Champs requis', 'Veuillez remplir votre email et votre mot de passe.');
      return;
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .catch(error => {
        // Rendre les messages d'erreur plus clairs pour l'utilisateur
        let errorMessage = "Une erreur est survenue. Veuillez réessayer.";
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          errorMessage = 'Email ou mot de passe incorrect.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Le format de l\'email est invalide.';
        }
        Alert.alert('Erreur de connexion', errorMessage);
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
            {/* --- Logo --- */}
            <View className="bg-blue-800 w-24 h-24 rounded-full items-center justify-center self-center mb-10 shadow-lg">
              <Text className="text-white text-6xl font-bold">C</Text>
            </View>

            {/* --- Titres --- */}
            <Text className="text-3xl font-bold text-gray-900 text-center">Welcome back!</Text>
            <Text className="text-gray-500 text-center mb-8 mt-1">Login to your account</Text>

            {/* --- Champs de saisie --- */}
            <TextInput
              className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-4 text-lg"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <TextInput
              className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-6 text-lg"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="password"
            />

            {/* --- Bouton de Connexion --- */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-800'} rounded-lg py-4 shadow-md`}
            >
              <Text className="text-white text-center font-bold text-lg">
                {loading ? 'Connexion en cours...' : 'Login'}
              </Text>
            </TouchableOpacity>

            {/* --- Mot de passe oublié --- */}
            <TouchableOpacity className="mt-4 mb-8">
              <Text className="text-blue-800 text-center">Forgot Password ?</Text>
            </TouchableOpacity>
            
            {/* --- Connexions sociales --- */}
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

            {/* --- Pas de compte ? --- */}
            <View className="flex-row justify-center">
              <Text className="text-gray-500">Don't have an account ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text className="text-blue-800 font-semibold">Sign Up</Text>
            </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}