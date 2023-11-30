import { FC, ReactNode, createContext, useState } from 'react';

interface PlacesContext {
  places: Place[];
  addPlace: (place: Place) => void;
  deletePlace: (placeId: number) => void;
  setPlacesFromDB: (places: Place[]) => void;
  getPlaceById: (placeId: number) => Place | undefined;
}

const initialState: PlacesContext = {
  places: [] as Place[],
  addPlace: (place: Place) => {},
  deletePlace: (placeId: number) => {},
  setPlacesFromDB: (places: Place[]) => {},
  getPlaceById: (placeId: number) => undefined,
};

export const PlacesContext = createContext<PlacesContext>(initialState);

export const PlacesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [places, setPlaces] = useState<Place[]>([]);

  function addPlace(place: Place) {
    setPlaces(currentPlaces => [...currentPlaces, place]);
  }

  function deletePlace(placeId: number) {
    setPlaces(currentPlaces => currentPlaces.filter(p => p.id !== placeId));
  }

  function setPlacesFromDB(places: Place[]) {
    setPlaces(places);
  }

  function getPlaceById(placeId: number) {
    return places.find(p => p.id === placeId);
  }

  const value = {
    places,
    addPlace,
    deletePlace,
    setPlacesFromDB,
    getPlaceById,
  };

  return (
    <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>
  );
};

export default PlacesProvider;
