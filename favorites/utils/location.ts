import axios, { AxiosError } from 'axios';
import { Alert } from 'react-native';

function isAxiosError(error: Error | AxiosError): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

export function getMapPreview(latitude: number, longitude: number) {
  return process.env.EXPO_PUBLIC_MAPS_URL?.replaceAll(
    '<<latitude>>',
    latitude.toString()
  ).replaceAll('<<longitude>>', longitude.toString());
}

export async function getAddress(latitude: number, longitude: number) {
  const url = process.env
    .EXPO_PUBLIC_GEO_URL!.replace('<<lat>>', latitude.toString())
    .replace('<<lng>>', longitude.toString());

  try {
    const response = await axios.get(url);

    return response.data.results[0].formatted_address;
  } catch (error: any) {
    const errorMessage = isAxiosError(error)
      ? error.message
      : 'Try again later.';

    Alert.alert('Could not fetch location!', errorMessage, [{ text: 'Okay' }]);
  }
}
