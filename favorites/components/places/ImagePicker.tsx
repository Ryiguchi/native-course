import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import React, { FC, useContext, useState } from 'react';
import {
  ImagePickerAsset,
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from 'expo-image-picker';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../ui/OutlinedButton';
import { SelectedPlaceContext } from '../../store/selectedPlace.context';

const ImagePicker: FC = () => {
  const [status, requestPermission] = useCameraPermissions();

  const { selectedImage, setSelectedImage } = useContext(SelectedPlaceContext);

  async function requestPermissionHandler() {
    if (status?.status === PermissionStatus.UNDETERMINED) {
      const { granted } = await requestPermission();

      return granted;
    }

    if (status?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app'
      );
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await requestPermissionHandler();

    if (!hasPermission) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
      aspect: [16, 9],
    });

    if (image.canceled) return;

    setSelectedImage(image.assets[0].uri);
  }

  let imagePreview = <Text>No image picked yet.</Text>;

  if (selectedImage) {
    imagePreview = (
      <Image source={{ uri: selectedImage }} style={styles.image} />
    );
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
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
});
