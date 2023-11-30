import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { type FC, useContext } from 'react';
import OutlinedButton from '../ui/OutlinedButton';
import { Colors } from '../../constants/colors';
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location';
import { getAddress, getMapPreview } from '../../utils/location';
import { router } from 'expo-router';
import { isZodError } from '../../utils/zod';
import { SelectedPlaceContext } from '../../store/selectedPlace.context';

const LocationPicker: FC = () => {
  const [status, requestPermission] = useForegroundPermissions();

  const { selectedLocation, setSelectedLocation } =
    useContext(SelectedPlaceContext);

  function pickOnMapHandler() {
    router.push('/map');
  }

  async function requestPermissionHandler() {
    if (status?.status === PermissionStatus.UNDETERMINED) {
      const { granted } = await requestPermission();

      return granted;
    }

    if (status?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location permissions to use this app'
      );
    }

    return true;
  }

  async function locateUserHandler() {
    const hasPermisssion = await requestPermissionHandler();

    if (!hasPermisssion) return;

    try {
      const location = await getCurrentPositionAsync();

      const { coords } = location;

      const address = await getAddress(coords.latitude, coords.longitude);

      const locationData = {
        address,
        coords,
      };

      setSelectedLocation(locationData);
    } catch (error) {
      const errormessage = isZodError(error)
        ? error.errors[0].message
        : 'Please try again later';

      Alert.alert('Could not fetch location', errormessage);
      return;
    }
  }

  let mapPreview = <Text>No location picked yet.</Text>;

  if (selectedLocation) {
    mapPreview = (
      <Image
        source={{
          uri: getMapPreview(
            selectedLocation.coords.latitude,
            selectedLocation.coords.longitude
          ),
        }}
        style={styles.image}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{mapPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={locateUserHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
