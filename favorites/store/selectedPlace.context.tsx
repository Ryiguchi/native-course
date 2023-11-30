import { FC, ReactNode, createContext, useState } from 'react';

const initialState = {
  enteredTitle: '',
  selectedImage: '',
  selectedLocation: null as LocationData | null,
  setEnteredTitle: (title: string) => {},
  setSelectedImage: (imageUri: string) => {},
  setSelectedLocation: (location: LocationData) => {},
  clearSelectedPlace: () => {},
};

type SelectedPlace = typeof initialState;

export const SelectedPlaceContext = createContext<SelectedPlace>(initialState);

const SelectedPlaceProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );

  function clearSelectedPlace() {
    setEnteredTitle('');
    setSelectedImage('');
    setSelectedLocation(null);
  }

  const value = {
    enteredTitle,
    selectedImage,
    selectedLocation,
    setEnteredTitle,
    setSelectedImage,
    setSelectedLocation,
    clearSelectedPlace,
  };

  return (
    <SelectedPlaceContext.Provider value={value}>
      {children}
    </SelectedPlaceContext.Provider>
  );
};

export default SelectedPlaceProvider;
