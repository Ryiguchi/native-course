import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/styles';
import AuthContextProvider from '../store/auth-context';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: Colors.primary100 },
            headerShown: false,
          }}
        />
      </AuthContextProvider>
    </>
  );
}
