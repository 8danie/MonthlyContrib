// context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Assurez-vous que ce chemin est correct

// 1. Créer le contexte
export const AuthContext = createContext();

// 2. Créer le "Provider" (fournisseur)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // onAuthStateChanged retourne une fonction "unsubscribe"
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (initializing) {
        setInitializing(false);
      }
    });

    // Nettoyer l'écouteur lors du démontage du composant
    return unsubscribe;
  }, [initializing]);

  // La valeur fournie par le contexte
  const value = {
    user,
    initializing,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. (Optionnel mais recommandé) Créer un hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  return useContext(AuthContext);
};