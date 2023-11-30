import { Pressable, StyleSheet, Text } from 'react-native';
import type { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

interface OutlinedButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  children: React.ReactNode;
  onPress?: () => void;
}

const OutlinedButton: FC<OutlinedButtonProps> = ({
  icon,
  children,
  onPress,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons
        style={styles.icon}
        name={icon}
        color={Colors.primary500}
        size={18}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
    borderWidth: 1,
    borderColor: Colors.primary500,
  },

  pressed: {
    opacity: 0.7,
  },

  icon: {
    marginRight: 6,
  },

  text: {
    color: Colors.primary500,
  },
});
