import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailsScreen from "./screens/MealDetailsScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FavoritesScreen from "./screens/FavoritesScreen";
import { Ionicons } from "@expo/vector-icons";
import FavoritesContextProvider from "./store/context/favorites.context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        ...styles.headerOptions,
        drawerContentStyle: { backgroundColor: "#351401" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#351401",
        drawerActiveBackgroundColor: "#e4baa1",
        drawerStyle: { paddingTop: 50, backgroundColor: "#351401" },
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <FavoritesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="MealsCategories"
            screenOptions={{
              ...styles.headerOptions,
              animation: "slide_from_left",
            }}
          >
            <Stack.Screen
              name="Drawer"
              component={DrawerNavigator}
              options={{
                title: "All Categories",
                headerShown: false,
                // headerStyle: { backgroundColor: "#351401" },
                // headerTitleStyle: { color: '#fff' },
                // headerTintColor: '#fff',
              }}
            />

            <Stack.Screen
              name="MealsOverview"
              component={MealsOverviewScreen}
              options={({ route, navigation }) => ({
                // title: route.params.title,
                headerRight: () => (
                  <Button
                    title="Go Back"
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="MealDetails"
              component={MealDetailsScreen}
              // options={({ navigation }) => ({
              //   headerRight: () => (
              //     <Button
              //       title="Save"
              //       onPress={() => {
              //         console.log('SAVE');
              //       }}
              //     />
              //   ),
              // })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  headerOptions: {
    headerStyle: { backgroundColor: "#351401" },
    headerTitleStyle: { color: "#fff" },
    headerTintColor: "#fff",
    contentStyle: { backgroundColor: "#3f2f25" },
    sceneContainerStyle: { backgroundColor: "#3f2f25" },
    headerTitleAlign: "center",
  },
});
