import { useLayoutEffect } from "react";
// import { useNavigation, useRoute } from '@react-navigation/native';
import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealsList from "../components/MealsList/MealsList";

function MealsOverviewScreen({ navigation, route }) {
  // const route = useRoute();
  // const navigation = useNavigation();

  const { categoryId } = route.params;

  const filteredMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(categoryId)
  );

  // runs simultanious with component instead of after
  useLayoutEffect(() => {
    const title = CATEGORIES.find(
      (category) => category.id === categoryId
    ).title;

    navigation.setOptions({
      title,
    });
  }, [categoryId, navigation]);

  return <MealsList items={filteredMeals} />;
}

export default MealsOverviewScreen;
