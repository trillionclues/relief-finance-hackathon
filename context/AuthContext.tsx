"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  User,
  getRedirectResult,
} from "firebase/auth";
import app from "@/utils/firebaseConfig";
import { useRouter } from "next/navigation";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

interface AuthContextProps {
  currentUser: User | null;
  loginWithGoogle: () => void;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  loginWithGoogle: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const loginWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, provider);
      toast.success("Redirecting to Google Sign In...");
    } catch (error: any) {
      toast.error("Error during Google sign-in: " + error.message);
    }
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          setCurrentUser(result.user);
          toast(`Welcome back ${result.user.displayName}!`, {
            type: "success",
          });
          router.push("/dashboard");
        }
      })
      .catch((error) => {
        toast("Error getting redirect result", { type: "error" });
      });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loginWithGoogle }}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};
