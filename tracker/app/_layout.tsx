import { Stack } from 'expo-router';

import { useColorScheme } from 'react-native';
import { defaultHeaderStyles, defaultContentStyles } from '../constants/styles';
import ExpensesContextProvider from '../store/expenses.context';
import { StatusBar } from 'expo-status-bar';

export default function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <Stack
          screenOptions={{
            ...defaultHeaderStyles,
            ...defaultContentStyles,
            animation: 'slide_from_bottom',
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen
            name="manageExpenses"
            options={{
              presentation: 'modal',
            }}
          />
        </Stack>
      </ExpensesContextProvider>
    </>
    // </ThemeProvider>
  );
}
