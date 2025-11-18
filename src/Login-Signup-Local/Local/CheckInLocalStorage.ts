import AsyncStorage from '@react-native-async-storage/async-storage';

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const USERS_KEY = '@local_users';
const CURRENT_USER_KEY = '@current_user';

const readJson = async <T>(key: string): Promise<T | null> => {
  const value = await AsyncStorage.getItem(key);
  if (!value) {
    return null;
  }
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.warn(`Failed to parse data for ${key}`, error);
    return null;
  }
};

const writeJson = async (key: string, data: unknown) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

export const getStoredUsers = async (): Promise<StoredUser[]> => {
  const users = await readJson<StoredUser[]>(USERS_KEY);
  return users ?? [];
};

export const saveUsers = async (users: StoredUser[]) => {
  await writeJson(USERS_KEY, users);
};

export const registerUser = async (user: Omit<StoredUser, 'id'>) => {
  const users = await getStoredUsers();
  const emailExists = users.some(
    (existingUser) =>
      existingUser.email.trim().toLowerCase() === user.email.trim().toLowerCase(),
  );

  if (emailExists) {
    throw new Error('User already exists with this email');
  }

  const newUser: StoredUser = {
    ...user,
    id: Date.now().toString(),
  };

  await saveUsers([...users, newUser]);
  return newUser;
};

export const findUserByCredentials = async (
  email: string,
  password: string,
): Promise<StoredUser | null> => {
  const users = await getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const foundUser = users.find(
    (user) =>
      user.email.trim().toLowerCase() === normalizedEmail && user.password === password,
  );

  return foundUser ?? null;
};

export const persistLoggedInUser = async (user: StoredUser | null) => {
  if (!user) {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
    return;
  }
  await writeJson(CURRENT_USER_KEY, user);
};

export const getPersistedLoggedInUser = async (): Promise<StoredUser | null> => {
  return readJson<StoredUser>(CURRENT_USER_KEY);
};

export const clearAllAuthData = async () => {
  await AsyncStorage.multiRemove([USERS_KEY, CURRENT_USER_KEY]);
};

