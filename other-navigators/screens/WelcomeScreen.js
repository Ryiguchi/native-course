import { View, Text, StyleSheet, Button } from 'react-native';
import Animated from 'react-native-reanimated';
import {
  useSharedValue,
  withSpring,
  withDecay,
  withTiming,
  withSequence,
} from 'react-native-reanimated';

function WelcomeScreen() {
  const width = useSharedValue(100);

  function handlePress() {
    width.value = withSequence(width.value + 50);
  }

  return (
    <View style={styles.rootContainer}>
      <Text>
        This is the <Text style={styles.highlight}>"Welcome"</Text> screen!
      </Text>
      <Animated.View
        style={{
          width,
          height: 100,
          backgroundColor: 'violet',
          borderRadius: 20,
        }}
      ></Animated.View>
      <Button title="Click Me" onPress={handlePress} />
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  highlight: {
    fontWeight: 'bold',
    color: '#eb1064',
  },
});
