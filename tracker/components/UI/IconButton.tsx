import { Ionicons } from '@expo/vector-icons';
import { FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type IoniconsIcon = keyof typeof Ionicons.glyphMap;

interface IconButtonProps {
  readonly icon: IoniconsIcon;
  readonly size: number;
  readonly color: string;
  onPress?: () => void;
}

const IconButton: FC<IconButtonProps> = ({ icon, size, color, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View style={[styles.buttonContainer, pressed && styles.pressed]}>
          <Ionicons name={icon} size={size} color={color} />
        </View>
      )}
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 8,
  },

  pressed: {
    opacity: 0.75,
  },
});
