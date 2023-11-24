import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import UserScreen from './screens/UserScreen';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#3C0A6B' },
            headerTintColor: '#fff',
            // tabBarLabelPosition: 'beside-icon',
            tabBarLabelStyle: { fontSize: 14 },
            tabBarStyle: { height: 60, paddingVertical: 10 },
            tabBarActiveTintColor: '#3C0A6B',
          }}
        >
          <Tabs.Screen
            name="Welcome Screen"
            tabBarLabel="Welcome Screen"
            title="Welcome Screen"
            component={WelcomeScreen}
            options={{
              tabBarIcon: (color, size) => (
                <Ionicons name="home" color={color} size={24} />
              ),
              tabBarBadge: 4,
            }}
          />
          <Tabs.Screen
            name="User"
            tabBarLabel="User Screen"
            title="User Screen"
            component={UserScreen}
            options={{
              tabBarIcon: (color, size) => (
                <Ionicons name="person" color={color} size={24} />
              ),
              tabBarBadge: 4,
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </>
  );
}
