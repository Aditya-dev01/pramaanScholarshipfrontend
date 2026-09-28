export const USERS_KEY = "scholarship_users";


export const defaultUsers = [
  {
    id: "user-001",
    name: "Demo Student",
    email: "student@example.com",
    password: "student123",
    role: "student",
  },

  {
    id: "user-002",
    name: "Demo Officer",
    email: "officer@example.com",
    password: "officer123",
    role: "officer",
  },
];


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
    return JSON.parse(storedUsers);
  } catch (error) {
    console.error("Unable to read users:", error);

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(defaultUsers)
    );

    return defaultUsers;
  }
}


export function saveUsers(users) {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
}


export function findUser(email, password, role) {
  const users = getUsers();

  return users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password &&
      user.role === role
  );
}


export function findUserByEmail(email) {
  const users = getUsers();

  return users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase()
  );
}


export function createUser({
  name,
  email,
  password,
  role,
}) {
  const users = getUsers();

  const existingUser = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    throw new Error(
      "An account with this email already exists."
    );
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    password,
    role,
  };

  const updatedUsers = [
    ...users,
    newUser,
  ];

  saveUsers(updatedUsers);

  return newUser;
}