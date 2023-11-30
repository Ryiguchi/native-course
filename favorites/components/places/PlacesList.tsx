import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { FC } from 'react';
import PlaceItem from './PlaceItem';
import { Colors } from '../../constants/colors';
import { router } from 'expo-router';

interface PlacesListProps {
  places: Place[];
}

const PlacesList: FC<PlacesListProps> = ({ places }) => {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places found. Maybe start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={item =>
        item.id ? item.id!.toString() : Date.now().toString()
      }
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },

  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
