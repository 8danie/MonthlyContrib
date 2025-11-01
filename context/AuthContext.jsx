// context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Importer les fonctions Firestore
import { auth, db } from '../firebase'; // Importer db

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // contiendra les données de l'utilisateur de Firestore
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // L'utilisateur est connecté. Allons chercher ses infos dans Firestore.
        const userDocRef = doc(db, 'users', firebaseUser.uid); // Chemin vers son document
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          // On combine l'ID de l'auth avec les données de Firestore
          setUser({ uid: firebaseUser.uid, ...userDoc.data() });
        } else {
          // Cas où l'utilisateur existe dans l'auth mais pas dans la db (rare)
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
        }
      } else {
        // L'utilisateur est déconnecté
        setUser(null);
      }
      
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, [initializing]);

  const value = { user, initializing };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};