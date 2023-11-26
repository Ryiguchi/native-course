import { useContext, useState } from 'react';
import AuthContent from '../../components/Auth/AuthContent';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import { loginUser } from '../../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../../store/auth-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticatng] = useState(false);
  const { authenticate } = useContext(AuthContext);

  async function logInHandler({ email, password }: Credentials) {
    setIsAuthenticatng(true);

    try {
      const token = await loginUser(email, password);
      authenticate(token);
      // await AsyncStorage.setItem('token', token);
      router.push('/');
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
    }
    setIsAuthenticatng(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin={true} onAuthenticate={logInHandler} />;
}

export default LoginScreen;
