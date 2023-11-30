import { Alert, StyleSheet } from 'react-native';
import {
  useState,
  type FC,
  useLayoutEffect,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  MapPressEvent,
} from 'react-native-maps';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import IconButton from '../components/ui/IconButton';
import { SelectedPlaceContext } from '../store/selectedPlace.context';
import { getAddress } from '../utils/location';
import { coordParamsValidator } from '../utils/zod';

const MapScreen: FC = () => {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [isSelecting, setIsSelecting] = useState(true);
  const { setSelectedLocation } = useContext(SelectedPlaceContext);
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const { lat, lng } = useLocalSearchParams();

  useEffect(() => {
    if (!lat || !lng) return;

    try {
      const validCoords = coordParamsValidator.parse({ lat, lng });

      setIsSelecting(false);
      setCoords({ latitude: validCoords.lat, longitude: validCoords.lng });
    } catch (error) {
      console.log(error);
    }
  }, [lat, lng]);

  const savePickedLocationHandler = useCallback(async () => {
    if (!coords) {
      Alert.alert('No location picked!', 'Please pick a location on the map', [
        { text: 'Okay' },
      ]);
      return;
    }

    const address = await getAddress(coords.latitude, coords.longitude);

    const locationData = {
      address,
      coords,
    };

    setSelectedLocation(locationData);
    router.back();
  }, [coords]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }: { tintColor: string }) => {
        if (!isSelecting) return null;
        return (
          <IconButton
            name="save"
            color={tintColor}
            size={24}
            onPress={savePickedLocationHandler}
          />
        );
      },
    });
  }, [savePickedLocationHandler, navigation, isSelecting]);

  const mapRegion = {
    latitude: 59.3484083,
    longitude: 17.8820049,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event: MapPressEvent) {
    if (!isSelecting) return;

    setCoords(event.nativeEvent.coordinate);
  }

  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {coords && <Marker coordinate={coords} title="Picked Location" />}
    </MapView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
