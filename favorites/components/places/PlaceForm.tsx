import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { type FC, useContext } from 'react';
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../ui/Button';
import { SelectedPlaceContext } from '../../store/selectedPlace.context';
import { router } from 'expo-router';
import { Place } from '../../models/place';
import { PlacesContext } from '../../store/places.context';
import { insertPlace } from '../../utils/database';

const PlaceForm: FC = () => {
  const {
    enteredTitle,
    selectedImage,
    selectedLocation,
    setEnteredTitle,
    clearSelectedPlace,
  } = useContext(SelectedPlaceContext);

  const { addPlace } = useContext(PlacesContext);

  function changeTiltleHandler(enteredText: string) {
    setEnteredTitle(enteredText);
  }

  async function addPlaceHandler() {
    if (!enteredTitle || !selectedImage || !selectedLocation) return;

    const coords = {
      latitude: selectedLocation.coords.latitude,
      longitude: selectedLocation.coords.longitude,
    };

    const place = new Place(
      enteredTitle,
      selectedImage,
      selectedLocation?.address,
      coords
    );

    try {
      await insertPlace(place);
      addPlace(place);
      clearSelectedPlace();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTiltleHandler}
          value={enteredTitle}
        />
        <ImagePicker />
        <LocationPicker />
      </View>
      <Button onPress={addPlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },

  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },

  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
