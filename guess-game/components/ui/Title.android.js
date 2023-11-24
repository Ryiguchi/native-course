import { StyleSheet, Text, Platform } from 'react-native';

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'openSansBold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    padding: 12,
    // borderWidth: Platform.OS === 'ios' ? 0 : 2,
    // borderWidth: Platform.select({
    //   ios: 6,
    //   android: 2,
    // }),
    borderWidth: 2,
    borderColor: 'white',
    width: 300,
    maxWidth: '80%',
  },
});
