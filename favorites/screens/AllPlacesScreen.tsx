import { StyleSheet } from 'react-native';
import { useContext, type FC, useEffect } from 'react';
import PlacesList from '../components/places/PlacesList';
import { PlacesContext } from '../store/places.context';
import { fetchPlaces } from '../utils/database';

const AllPlacesScreen: FC = () => {
  const { places } = useContext(PlacesContext);
  const { setPlacesFromDB } = useContext(PlacesContext);

  useEffect(() => {
    async function fetchplacesFromDB() {
      try {
        const places = (await fetchPlaces()) as Place[];
        setPlacesFromDB(places);
      } catch (error) {
        console.log(error);
      }
    }

    fetchplacesFromDB();
  }, []);

  return <PlacesList places={places} />;
};

export default AllPlacesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
