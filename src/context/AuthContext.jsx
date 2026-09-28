import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  findUser,
  createUser,
} from "../data/users";

const AuthContext = createContext(null);

const CURRENT_USER_KEY = "scholarship_current_user";

export function AuthProvider({ children }) {

  // -----------------------------------------
  // CURRENT LOGGED-IN USER
  // -----------------------------------------
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(
      CURRENT_USER_KEY
    );

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error(
        "Unable to read current user:",
        error
      );

      localStorage.removeItem(CURRENT_USER_KEY);

      return null;
    }
  });


  // -----------------------------------------
  // SAVE / REMOVE CURRENT USER
  // -----------------------------------------
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [user]);


  // -----------------------------------------
  // SAFE USER OBJECT
  // Never store password here
  // -----------------------------------------
  function createSafeUser(foundUser) {
    return {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };
  }


  // -----------------------------------------
  // STUDENT LOGIN
  // -----------------------------------------
  function studentLogin(email, password) {
    const foundUser = findUser(
      email,
      password,
      "student"
    );

    if (!foundUser) {
      return {
        success: false,
        message:
          "Invalid student email or password.",
      };
    }

    // Extra role protection
    if (foundUser.role !== "student") {
      return {
        success: false,
        message:
          "This account is not a student account.",
      };
    }

    const safeUser = createSafeUser(foundUser);

    // Student is now logged in
    setUser(safeUser);

    return {
      success: true,
      user: safeUser,
    };
  }


  // -----------------------------------------
  // OFFICER LOGIN
  // -----------------------------------------
  function officerLogin(email, password) {
    const foundUser = findUser(
      email,
      password,
      "officer"
    );

    if (!foundUser) {
      return {
        success: false,
        message:
          "Invalid officer email or password.",
      };
    }

    // Extra role protection
    if (foundUser.role !== "officer") {
      return {
        success: false,
        message:
          "This account is not an officer account.",
      };
    }

    const safeUser = createSafeUser(foundUser);

    // Officer is now logged in
    setUser(safeUser);

    return {
      success: true,
      user: safeUser,
    };
  }


  // -----------------------------------------
  // STUDENT REGISTRATION ONLY
  // -----------------------------------------
  function register(name, email, password) {
    try {

      // createUser() automatically assigns:
      // role: "student"
      //
      // IMPORTANT:
      // We DO NOT call setUser() here.
      // Registration does NOT automatically log
      // the student in.

      const newUser = createUser({
        name,
        email,
        password,
      });

      const safeUser = createSafeUser(newUser);

      return {
        success: true,
        user: safeUser,
        message:
          "Student account created successfully.",
      };

    } catch (error) {

      return {
        success: false,
        message:
          error.message ||
          "Unable to create student account.",
      };
    }
  }


  // -----------------------------------------
  // LOGOUT
  // -----------------------------------------
  function logout() {
    setUser(null);
  }


  // -----------------------------------------
  // AUTH CONTEXT
  // -----------------------------------------
  return (
    <AuthContext.Provider
      value={{
        user,

        // Login
        studentLogin,
        officerLogin,

        // Registration
        register,

        // Logout
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


// -----------------------------------------
// useAuth Hook
// -----------------------------------------
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
