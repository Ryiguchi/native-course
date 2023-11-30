export {};

declare global {
  type Coords = {
    latitude: number;
    longitude: number;
  };

  type LocationData = {
    coords: Coords;
    address: string;
  };

  interface Place {
    id?: number;
    title: string;
    imageUri: string;
    address: string;
    location: Coords;
  }

  type RootStackParamList = {
    addPlace: { pickedLocation: string } | undefined;
    allPlaces: { place: Place } | undefined;
    details: { placeId: number } | undefined;
  };
}
