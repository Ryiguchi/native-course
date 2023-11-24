import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

function CardDetails({ meal, textStyle, titleStyle }) {
  const { title, duration, complexity, affordability } = meal;
  return (
    <>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <View style={styles.details}>
        <Text style={[styles.detailItem, textStyle]}>{duration}m</Text>
        <Text style={[styles.detailItem, textStyle]}>
          {complexity.toUpperCase()}
        </Text>
        <Text style={[styles.detailItem, textStyle]}>
          {affordability.toUpperCase()}
        </Text>
      </View>
    </>
  );
}

export default CardDetails;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    margin: 8,
  },

  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
