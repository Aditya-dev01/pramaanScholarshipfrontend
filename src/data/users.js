export const USERS_KEY = "scholarship_users";

// -----------------------------------------
// Predefined accounts
// -----------------------------------------
export const defaultUsers = [
  {
    id: "user-001",
    name: "Demo Student",
    email: "student@example.com",
    password: "student123",
    role: "student",
  },

  // Officer account
  // This account cannot be created from
  // the public registration page.
  {
    id: "user-002",
    name: "Scholarship Officer",
    email: "officer@example.com",
    password: "officer123",
    role: "officer",
  },
];

// -----------------------------------------
// Get all users
// -----------------------------------------
export function getUsers() {
  const storedUsers = localStorage.getItem(USERS_KEY);

  if (!storedUsers) {
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(defaultUsers)
    );

    return defaultUsers;
  }

  try {
    const users = JSON.parse(storedUsers);

    // Make sure stored data is actually an array
    if (!Array.isArray(users)) {
      throw new Error("Invalid users data");
    }

    return users;
  } catch (error) {
    console.error("Unable to read users:", error);

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(defaultUsers)
    );

    return defaultUsers;
  }
}

// -----------------------------------------
// Save users
// -----------------------------------------
export function saveUsers(users) {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
}

// -----------------------------------------
// Find user by email + password + role
// -----------------------------------------
export function findUser(email, password, role) {
  const users = getUsers();

  return users.find(
    (user) =>
      user.email.toLowerCase() ===
        email.toLowerCase() &&
      user.password === password &&
      user.role === role
  );
}

// -----------------------------------------
// Find user by email
// -----------------------------------------
export function findUserByEmail(email) {
  const users = getUsers();

  return users.find(
    (user) =>
      user.email.toLowerCase() ===
      email.toLowerCase()
  );
}

// -----------------------------------------
// Create USER
// IMPORTANT:
// Public registration can ONLY create students.
// -----------------------------------------
export function createUser({
  name,
  email,
  password,
}) {
  const users = getUsers();

  const normalizedEmail = email
    .trim()
    .toLowerCase();

  const existingUser = users.find(
    (user) =>
      user.email.toLowerCase() ===
      normalizedEmail
  );

  if (existingUser) {
    throw new Error(
      "An account with this email already exists."
    );
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: "student",
  };

  const updatedUsers = [
    ...users,
    newUser,
  ];

  saveUsers(updatedUsers);

  return newUser;
}
