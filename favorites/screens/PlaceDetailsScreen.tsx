import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useContext, type FC, useState, useEffect } from 'react';
import OutlinedButton from '../components/ui/OutlinedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { PlacesContext } from '../store/places.context';
import { placeIdFromParamsValidator } from '../utils/zod';
import { Colors } from '../constants/colors';
import { SelectedPlaceContext } from '../store/selectedPlace.context';

const PlaceDetailsScreen: FC = () => {
  const { getPlaceById } = useContext(PlacesContext);
  const [place, setPlace] = useState<Place | null>(null);
  const { setSelectedLocation } = useContext(SelectedPlaceContext);

  const { placeId } = useLocalSearchParams();

  useEffect(() => {
    try {
      const validPlaceId = placeIdFromParamsValidator.parse(placeId);

      const placeFromContext = getPlaceById(validPlaceId);
      if (!placeFromContext) throw new Error('Place not found');

      setPlace(placeFromContext);
    } catch (error) {
      console.log(error);
    }
  }, []);

  function showOnMapHandler() {
    if (!place) return;
    setSelectedLocation({ coords: place?.location, address: place?.address });
    router.push({
      pathname: '/map',
      params: {
        lat: place.location.latitude,
        lng: place.location.longitude,
      },
    });
  }

  if (!place) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place?.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place?.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetailsScreen;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },

  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },

  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  addressContainer: {
    padding: 20,
  },

  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
