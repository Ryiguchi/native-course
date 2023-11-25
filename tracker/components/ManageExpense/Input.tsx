import { FC } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { GlobalStyles } from '../../constants/styles';

interface InputProps {
  label?: string;
  textInputProps?: TextInputProps;
  style?: StyleProp<ViewStyle>;
  isValid: boolean;
}

const Input: FC<InputProps> = ({ label, style, textInputProps, isValid }) => {
  const inputStyles: StyleProp<TextStyle> = [styles.input];

  if (textInputProps && textInputProps.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (!isValid) {
    inputStyles.push(styles.invalid);
  }

  const labelStyles = [styles.label, !isValid && styles.invalidLabel];

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={labelStyles}>{label}</Text>
      <TextInput style={inputStyles} {...textInputProps} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },

  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },

  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },

  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },

  invalid: {
    backgroundColor: GlobalStyles.colors.error50,
  },

  inputMultiline: {
    minHeight: 100,
    // use this with multiline for android
    textAlignVertical: 'top',
  },
});
