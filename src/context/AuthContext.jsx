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


export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const storedUser =
      localStorage.getItem("scholarship_current_user");

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });


  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "scholarship_current_user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem(
        "scholarship_current_user"
      );
    }
  }, [user]);


  function login(email, password, role) {

    const foundUser = findUser(
      email,
      password,
      role
    );

    if (!foundUser) {
      return {
        success: false,
        message:
          "Invalid email, password, or account type.",
      };
    }

    const safeUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };

    setUser(safeUser);

    return {
      success: true,
      user: safeUser,
    };
  }


  function register(
    name,
    email,
    password,
    role
  ) {
    try {

      const newUser = createUser({
        name,
        email,
        password,
        role,
      });

      const safeUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      };

      setUser(safeUser);

      return {
        success: true,
        user: safeUser,
      };

    } catch (error) {

      return {
        success: false,
        message: error.message,
      };

    }
  }


  function logout() {
    setUser(null);
  }


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}