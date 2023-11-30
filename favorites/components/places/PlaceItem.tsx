import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { FC } from 'react';
import { Colors } from '../../constants/colors';
import { Link } from 'expo-router';

interface PlaceItemProps {
  place: Place;
}

const PlaceItem: FC<PlaceItemProps> = ({ place }) => {
  return (
    <Link
      href={{ pathname: '/details', params: { placeId: place.id! } }}
      style={styles.item}
      asChild
    >
      <Pressable style={({ pressed }) => pressed && styles.pressed}>
        <Image style={styles.image} source={{ uri: place.imageUri }} />
        <View style={styles.info}>
          <Text style={styles.title}>{place.title}</Text>
          <Text style={styles.address}>{place.address}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },

  pressed: {
    opacity: 0.7,
  },

  image: {
    flex: 1,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    height: 100,
  },

  info: {
    flex: 2,
    padding: 12,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.gray700,
  },

  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});
