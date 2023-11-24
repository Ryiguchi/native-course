import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { MEALS } from "../data/dummy-data";
import { useContext, useLayoutEffect, useState } from "react";
import CardDetails from "../components/CardDetails";
import MealItemList from "../components/MealItemList";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favorites.context";

function MealDetailsScreen({ route, navigation }) {
  const { ids, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const { mealId } = route.params;

  const isFavorite = ids.includes(mealId);

  const meal = MEALS.find((meal) => meal.id === mealId);

  const {
    imageUrl,
    title,
    ingredients,
    steps,
    isGlutenFree,
    isVegetarian,
    isLactoseFree,
    id,
  } = meal;

  useLayoutEffect(() => {
    if (!mealId) return;

    navigation.setOptions({
      headerRight: () => (
        <IconButton
          title="Save"
          onPress={changeFavoritesStatusHandler}
          icon={isFavorite ? "star" : "star-outline"}
          color="white"
        />
      ),
      headerTitle: () => (
        <View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.headerStyles}
          >
            {title}
          </Text>
        </View>
      ),
    });
  }, [mealId, navigation, isFavorite, changeFavoritesStatusHandler]);

  function changeFavoritesStatusHandler() {
    const isFavorite = ids.find((id) => id === mealId);
    if (isFavorite) {
      removeFavorite(mealId);
    } else {
      addFavorite(mealId);
    }
  }

  return (
    <ScrollView style={styles.screen}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <CardDetails
        meal={meal}
        titleStyle={styles.detailTitleStyle}
        textStyle={styles.detailTextStyle}
      />
      <MealItemList listItems={ingredients} title="Ingredients" />
      <MealItemList listItems={steps} title="Steps" />
    </ScrollView>
  );
}

export default MealDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    marginBottom: 30,
  },

  image: {
    width: "100%",
    height: 350,
  },

  detailTextStyle: {
    color: "#e0c19d",
  },

  detailTitleStyle: {
    fontSize: 22,
    color: "white",
  },

  headerStyles: {
    fontSize: 20,
    color: "white",
    marginRight: 100,
  },
});
