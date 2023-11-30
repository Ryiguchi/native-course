import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface IconButtonProps {
  name: keyof typeof Ionicons.glyphMap;
  size: number;
  color?: string;
  onPress: () => void;
}

const IconButton: FC<IconButtonProps> = ({
  name,
  size,
  color = '#000',
  onPress,
}) => {
  return (
    <View>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <Ionicons name={name} size={size} color={color} onPress={onPress} />
      </Pressable>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pressed: {
    opacity: 0.7,
  },
});
