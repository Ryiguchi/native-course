import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  token: '',
  isAutheneticated: false,
  authenticate: (token: string) => {},
  logout: () => {},
  isLoading: false,
};

export const AuthContext = createContext<AuthContextType>(initialState);

type AuthContextType = typeof initialState;

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');

      if (token) {
        setToken(token);
      }
      setIsLoading(false);
    }

    checkAuth();
  }, []);

  function authenticate(token: string) {
    setToken(token);
    AsyncStorage.setItem('token', token);
  }

  async function logout() {
    setToken('');
    await AsyncStorage.removeItem('token');
  }

  const value = {
    token,
    isAutheneticated: !!token,
    authenticate,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
