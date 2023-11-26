import { Stack, Redirect, router } from 'expo-router';
import { Colors } from '../../constants/styles';
import { useContext, useEffect, useLayoutEffect } from 'react';
import { AuthContext } from '../../store/auth-context';
import IconButton from '../../components/ui/IconButton';

const AppLayout = () => {
  const { logout, isAutheneticated, isLoading } = useContext(AuthContext);

  function logoutHandler() {
    logout();
    router.push('/login');
  }

  if (!isAutheneticated && !isLoading) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
        // headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Welcome!',
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={logoutHandler}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default AppLayout;
