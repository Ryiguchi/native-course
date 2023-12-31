import { Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { StyleSheet } from 'react-native';
import { FC } from 'react';
import Button from './Button';

interface ErrorOverlayProps {
  message: string;
  onConfirm: () => void;
}

const ErrorOverlay: FC<ErrorOverlayProps> = ({ message, onConfirm }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An Error Occurred!</Text>
      <Text style={[styles.text]}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },

  text: {
    textAlign: 'center',
    marginBottom: 8,
    color: 'white',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
