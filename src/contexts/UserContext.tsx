import { createContext, ReactNode, useState } from 'react';

import axios from 'axios';

interface UserProviderProps {
  children: ReactNode;
}

interface User {
  avatar_url: string;
  name: string;
  login: string;
}

interface UserContextData {
  user: User;
  userExists: (username: string) => Promise<boolean>;
  singIn: (username: string) => Promise<void>;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>(null);

  async function userExists(username: string) {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`,
      );
      const userFound = response.data;

      return !!userFound;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function singIn(username: string) {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`,
      );
      const githubUser = response.data as User;

      if (githubUser) {
        setUser(githubUser);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        userExists,
        singIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
