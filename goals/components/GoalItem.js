import { Pressable, StyleSheet, Text, View } from 'react-native';

function GoalItem({ item, onDeleteItem }) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: '#2a0758' }}
        onPress={onDeleteItem.bind(this, item.id)}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{item.text}</Text>
      </Pressable>
    </View>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },

  pressedItem: {
    opacity: 0.5,
  },

  goalText: {
    padding: 8,
    color: 'white',
  },
});
