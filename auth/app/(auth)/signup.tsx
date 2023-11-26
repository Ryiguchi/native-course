import { useContext, useState } from 'react';
import AuthContent from '../../components/Auth/AuthContent';
import { createUser } from '../../util/auth';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../../store/auth-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticatng] = useState(false);
  const { authenticate } = useContext(AuthContext);

  async function signUpHandler({ email, password }: Credentials) {
    setIsAuthenticatng(true);

    try {
      const token = await createUser(email, password);
      authenticate(token);
      router.push('/');
    } catch (error: any) {
      Alert.alert('Signup failed', error.message);
    }
    setIsAuthenticatng(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
