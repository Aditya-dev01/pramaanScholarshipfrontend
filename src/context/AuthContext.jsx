import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

const CURRENT_USER_KEY = "scholarship_current_user";

const API_URL =
  "https://scholarship-management-system-0hfy.onrender.com";

// --------------------------------------------------
// DEMO ACCOUNTS
// --------------------------------------------------

const DEMO_STUDENT = {
  id: "demo-student",
  name: "Demo Student",
  email: "student@example.com",
  password: "student123",
  role: "student",
};

const DEMO_OFFICER = {
  id: "demo-officer",
  name: "Demo Officer",
  email: "officer@example.com",
  password: "officer123",
  role: "officer",
};

// --------------------------------------------------
// AUTH PROVIDER
// --------------------------------------------------

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Unable to read current user:", error);
      localStorage.removeItem(CURRENT_USER_KEY);
      return null;
    }
  });

  // ------------------------------------------------
  // SAVE USER
  // ------------------------------------------------

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

  // ------------------------------------------------
  // REMOVE PASSWORD FROM USER OBJECT
  // ------------------------------------------------

  function createSafeUser(foundUser, expectedRole) {
    return {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: expectedRole || foundUser.role,
    };
  }

  // ------------------------------------------------
  // BACKEND LOGIN
  // ------------------------------------------------

  async function loginFromBackend(email, password, role) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        return {
          success: false,
          message:
            "The server returned an invalid response.",
        };
      }

      if (!response.ok) {
        return {
          success: false,
          message:
            data.message ||
            data.msg ||
            "Invalid email or password.",
        };
      }

      // Backend may return the user in different places.
      const backendUser =
        data.user ||
        data.details?.user ||
        data.details?.row ||
        data.details;

      if (!backendUser) {
        return {
          success: false,
          message: "Login response did not contain user information.",
        };
      }

      // IMPORTANT:
      // Keep the role selected during login.
      const safeUser = createSafeUser(
        backendUser,
        role
      );

      // Extra safety check.
      if (safeUser.role !== role) {
        return {
          success: false,
          message: "Account role does not match selected login role.",
        };
      }

      setUser(safeUser);

      return {
        success: true,
        user: safeUser,
      };
    } catch (error) {
      console.error("Backend login error:", error);

      return {
        success: false,
        message:
          "Unable to connect to the server. Please try again later.",
      };
    }
  }

  // ------------------------------------------------
  // STUDENT LOGIN
  // ------------------------------------------------

  async function studentLogin(email, password) {
    const cleanEmail = email.trim().toLowerCase();

    // Demo student
    if (
      cleanEmail === DEMO_STUDENT.email &&
      password === DEMO_STUDENT.password
    ) {
      const safeUser = createSafeUser(
        DEMO_STUDENT,
        "student"
      );

      setUser(safeUser);

      return {
        success: true,
        user: safeUser,
      };
    }

    // Real backend student
    return await loginFromBackend(
      cleanEmail,
      password,
      "student"
    );
  }

  // ------------------------------------------------
  // OFFICER LOGIN
  // ------------------------------------------------

  async function officerLogin(email, password) {
    const cleanEmail = email.trim().toLowerCase();

    // Demo officer
    if (
      cleanEmail === DEMO_OFFICER.email &&
      password === DEMO_OFFICER.password
    ) {
      const safeUser = createSafeUser(
        DEMO_OFFICER,
        "officer"
      );

      setUser(safeUser);

      return {
        success: true,
        user: safeUser,
      };
    }

    // Real backend officer
    return await loginFromBackend(
      cleanEmail,
      password,
      "officer"
    );
  }

  // ------------------------------------------------
  // UNIFIED LOGIN
  // ------------------------------------------------

  async function login(email, password, role) {
    if (role === "officer") {
      return await officerLogin(email, password);
    }

    return await studentLogin(email, password);
  }

  // ------------------------------------------------
  // REGISTER
  // ------------------------------------------------

  async function register(name, email, password) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        return {
          success: false,
          message:
            "The server returned an invalid response.",
        };
      }

      if (!response.ok) {
        return {
          success: false,
          message:
            data.message ||
            data.msg ||
            "Registration failed.",
        };
      }

      return {
        success: true,
        message:
          data.message ||
          data.msg ||
          "Student account created successfully.",
      };
    } catch (error) {
      console.error("Registration error:", error);

      return {
        success: false,
        message:
          "Unable to connect to the server. Please try again later.",
      };
    }
  }

  // ------------------------------------------------
  // LOGOUT
  // ------------------------------------------------

  function logout() {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        studentLogin,
        officerLogin,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// --------------------------------------------------
// HOOK
// --------------------------------------------------

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
