import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Platform,
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';

function CategoryGridTile({ category, onPress }) {
  const color = { backgroundColor: category.color };

  // const navigation = useNavigation();

  return (
    <View style={styles.gridITem}>
      <Pressable
        style={({ pressed }) => [
          pressed ? styles.buttonPressed : null,
          styles.button,
        ]}
        android_ripple={{ color: '#ccc' }}
        onPress={onPress}
      >
        <View style={[styles.innerContainer, color]}>
          <Text style={styles.title}>{category.title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CategoryGridTile;

const screenWidth = Dimensions.get('window').width;
const boxSize =
  (screenWidth - 32 - 32) / 2 > 175 ? 175 : (screenWidth - 32 - 32) / 2;

const styles = StyleSheet.create({
  gridITem: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
    elevation: 4,
    width: boxSize,
    height: boxSize,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },

  button: {
    flex: 1,
  },

  buttonPressed: {
    opacity: 0.5,
  },

  innerContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
});
