import Ionicon from '@expo/vector-icons/Ionicons';
import { Link, Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import {
  defaultHeaderStyles,
  defaultTabBarStyles,
  defaultContentStyles,
} from '../../constants/styles';
import IconButton from '../../components/UI/IconButton';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicon>['name'];
  color: string;
}) {
  return <Ionicon size={24} style={{ marginBottom: -10 }} {...props} />;
}

export default function TabLayout() {
  // const colorScheme = useColorScheme();
  const colorScheme = useColorScheme();

  function onPressHandler() {}

  return (
    <Tabs
      screenOptions={{
        ...defaultHeaderStyles,
        ...defaultTabBarStyles,
        ...defaultContentStyles,
        headerRight: ({ tintColor }) => (
          <Link href="/manageExpenses" asChild>
            <IconButton icon="add" size={24} color={tintColor || '#fff'} />
          </Link>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          ...defaultContentStyles,

          tabBarIcon: ({ color }) => (
            <TabBarIcon name="hourglass" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="allExpenses"
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',

          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
