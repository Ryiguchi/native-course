import { StyleSheet, FlatList } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';

function CategoriesScreen({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate('MealsOverview', {
        categoryId: itemData.item.id,
        title: itemData.item.title,
      });
    }

    return <CategoryGridTile category={itemData.item} onPress={pressHandler} />;
  }

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={item => item.id}
      style={styles.screen}
      numColumns={2}
      renderItem={renderCategoryItem}
    ></FlatList>
  );
}

export default CategoriesScreen;

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    // flexDirection: 'row',
  },
});
