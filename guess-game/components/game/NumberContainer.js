import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Colors from '../../utils/colors';

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

export default NumberContainer;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: Colors.secondary500,
    padding: deviceWidth < 400 ? 12 : 24,
    margin: 24,
    borderRadius: 8,
  },

  text: {
    fontFamily: 'openSansBold',
    color: Colors.secondary500,
    fontSize: deviceWidth < 400 ? 30 : 36,
    fontWeight: 'bold',
  },
});
