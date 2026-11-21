import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { onAuthStateChanged } from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "./firebase";

import {
  Navigate,
  useLocation,
} from "react-router-dom";

const AuthContext = createContext(null);


// AUTHENTICATION PROVIDER

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        setLoading(true);

        try {
          if (user) {
            setCurrentUser(user);

            const userRef = doc(db, "users", user.uid);
            const userSnapshot = await getDoc(userRef);

            if (userSnapshot.exists()) {
              setUserProfile(userSnapshot.data());
            } else {
              setUserProfile(null);
            }
          } else {
            setCurrentUser(null);
            setUserProfile(null);
          }
        } catch (error) {
          console.error(
            "Authentication profile error:",
            error
          );

          setUserProfile(null);
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


// AUTHENTICATION HOOK

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}


// ROLE-BASED PROTECTED ROUTE

export function ProtectedRoute({
  allowedRole,
  children,
}) {
  const {
    currentUser,
    userProfile,
    loading,
  } = useAuth();

  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}>
        Loading ExamSphere...
      </div>
    );
  }

  // User login nahi hai
  if (!currentUser) {
    return (
      <Navigate
        to={`/login?next=${encodeURIComponent(
          location.pathname + location.search
        )}`}
        replace
      />
    );
  }

  // Firestore profile missing hai
  if (!userProfile || !userProfile.role) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "20px",
      }}>
        <div>
          <h2>Account Profile Not Found</h2>
          <p>
            Your ExamSphere account profile could not be loaded.
            Please contact support.
          </p>
        </div>
      </div>
    );
  }

  // Wrong role ko correct dashboard par bhejna
  if (userProfile.role !== allowedRole) {
    const correctRoute =
      userProfile.role === "teacher"
        ? "/teachers/dashboard"
        : "/students";

    return (
      <Navigate
        to={correctRoute}
        replace
      />
    );
  }

  return children;
}