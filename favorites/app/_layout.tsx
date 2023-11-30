import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import IconButton from '../components/ui/IconButton';
import { Colors } from '../constants/colors';
import SelectedPlaceProvider from '../store/selectedPlace.context';
import PlacesProvider from '../store/places.context';
import { init } from '../utils/database';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    async function initializeDB() {
      try {
        await init();

        setDbInitialized(true);
      } catch (error) {
        console.log(error);
      }
    }

    initializeDB();
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && dbInitialized) {
      SplashScreen.hideAsync();
    }
  }, [loaded, dbInitialized]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <PlacesProvider>
      <SelectedPlaceProvider>
        <StatusBar />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  name="add"
                  color={tintColor}
                  size={24}
                  onPress={() => router.push('/addPlace')}
                />
              ),
            }}
          />
          <Stack.Screen
            name="addPlace"
            options={{ title: 'Add a New Place' }}
          />
          <Stack.Screen name="map" options={{ title: 'Map' }} />
          <Stack.Screen name="details" options={{ title: 'Details' }} />
        </Stack>
      </SelectedPlaceProvider>
    </PlacesProvider>
  );
}
