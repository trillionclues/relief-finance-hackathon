"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { setCookie, deleteCookie } from "cookies-next";
import {
  getAuth,
  GoogleAuthProvider,
  User,
  signInWithPopup,
  UserCredential,
  setPersistence,
  inMemoryPersistence,
  signOut,
} from "firebase/auth";
import app from "@/utils/firebaseConfig";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
setPersistence(auth, inMemoryPersistence);

interface AuthContextProps {
  currentUser: User | null;
  loginWithGoogle: () => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  loginWithGoogle: () => {},
  logout: () => {},
  loading: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const loginWithGoogle = async () => {
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      setCookie("auth_token", token, { maxAge: 60 * 60 * 24 * 7 }); // 7 days

      setCurrentUser(user);
      toast.success("Welcome to Relief Finance!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error("Error during Google sign-in: " + error.message);
      console.error("Google sign-in error:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      deleteCookie("auth_token", { path: "/" });
      setCurrentUser(null);
      toast.success("You're logged out, see ya!");
      router.push("/login");
    } catch (error: any) {
      toast.error("Error during logout: " + error.message);
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, loginWithGoogle, logout, loading }}
    >
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};
