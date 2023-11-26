import { Stack } from 'expo-router';
import { Colors } from '../../constants/styles';

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="signup" options={{ title: 'Signup' }} />
    </Stack>
  );
};

export default AuthLayout;
