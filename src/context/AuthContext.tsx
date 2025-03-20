import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  userProfile: UserProfile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<UserCredential>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}

interface UserProfile {
  uid: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  plan: "free" | "premium";
  createdAt: number;
  lastLogin: number;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Initialize user profile in Firestore
      const userProfileData: UserProfile = {
        uid: result.user.uid,
        email: result.user.email || "",
        displayName: result.user.displayName || "",
        photoURL: result.user.photoURL || "",
        plan: "free",
        createdAt: Date.now(),
        lastLogin: Date.now(),
      };

      await setDoc(doc(db, "users", result.user.uid), userProfileData);
      setUserProfile(userProfileData);
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
      const result = await signInWithPopup(auth, provider);

      // Check if user profile exists, if not create one
      const userProfileRef = doc(db, "users", result.user.uid);
      const userProfileSnap = await getDoc(userProfileRef);

      if (!userProfileSnap.exists()) {
        const userProfileData: UserProfile = {
          uid: result.user.uid,
          email: result.user.email || "",
          displayName: result.user.displayName || "",
          photoURL: result.user.photoURL || "",
          plan: "free",
          createdAt: Date.now(),
          lastLogin: Date.now(),
        };

        await setDoc(userProfileRef, userProfileData);
        setUserProfile(userProfileData);
      } else {
        // Update last login
        await setDoc(userProfileRef, { lastLogin: Date.now() }, { merge: true });
        setUserProfile(userProfileSnap.data() as UserProfile);
      }

      return result;
    } catch (error) {
      console.error("Google sign in error:", error);
      throw error;
    }
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser) throw new Error("No authenticated user");

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await setDoc(userDocRef, data, { merge: true });

      // If display name is being updated, update it in Firebase Auth as well
      if (data.displayName && data.displayName !== currentUser.displayName) {
        await updateProfile(currentUser, { displayName: data.displayName });
      }

      // Update local state
      setUserProfile((prev) => (prev ? { ...prev, ...data } : null));
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };

  // Fetch user data from Firestore when auth state changes
  const fetchUserProfile = async (user: User) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as UserProfile;
        // Update lastLogin
        await setDoc(userDocRef, { lastLogin: Date.now() }, { merge: true });
        setUserProfile({ ...userData, lastLogin: Date.now() });
      } else {
        // Create a new profile if it doesn't exist (shouldn't happen normally)
        const newUserProfile: UserProfile = {
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          plan: "free",
          createdAt: Date.now(),
          lastLogin: Date.now(),
        };
        await setDoc(userDocRef, newUserProfile);
        setUserProfile(newUserProfile);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        await fetchUserProfile(user);
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    userProfile,
    signIn,
    signUp,
    logout,
    signInWithGoogle,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
