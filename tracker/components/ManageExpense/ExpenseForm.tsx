import { Alert, StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import { FC, useEffect, useState } from 'react';
import Button, { Modes } from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { formValidator } from '../../types/zod';
import { GlobalStyles } from '../../constants/styles';
import { isZodError } from '../../util/error';

const inputsInitialState = {
  date: { value: '', isValid: true },
  amount: { value: '', isValid: true },
  description: { value: '', isValid: true },
};

interface ExpenseFormProps {
  onCancel: () => void;
  onSubmit: (expenseData: Expense | ExpenseInputData) => void;
  submitButtonLabel: string;
  defaultValues: Expense | undefined;
}

type InputValuesKeys = keyof typeof inputsInitialState;

const ExpenseForm: FC<ExpenseFormProps> = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState(inputsInitialState);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!defaultValues) return;

    const formattedValues = {
      date: { value: getFormattedDate(defaultValues.date), isValid: true },
      amount: { value: defaultValues.amount.toString(), isValid: true },
      description: { value: defaultValues.description, isValid: true },
    };

    setInputs(formattedValues);
  }, []);

  function inputChangedHandler(
    inputIdentifier: InputValuesKeys,
    enteredValue: string
  ) {
    setInputs(currentInputs => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    try {
      const expenseData = formValidator.parse(inputs);

      onSubmit(expenseData);
    } catch (error: any) {
      if (isZodError(error)) {
        const inputField = error.errors[0].path[0] as InputValuesKeys;
        setInputs(currentInputs => {
          return {
            ...currentInputs,
            [inputField]: {
              value: currentInputs[inputField].value,
              isValid: false,
            },
          };
        });
        setErrorMessage(error.errors[0].message);
      } else {
        setErrorMessage('Invalid Input.');
      }
    }
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          textInputProps={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
          isValid={inputs.amount.isValid}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          textInputProps={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            autoCorrect: false,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputs.date.value,
          }}
          isValid={inputs.date.isValid}
        />
      </View>
      <Input
        label="Description"
        textInputProps={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}
        isValid={inputs.description.isValid}
      />
      {formIsInvalid && <Text style={styles.errorText}>{errorMessage}</Text>}
      <View style={styles.buttonsContainer}>
        <Button mode={Modes.FLAT} onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },

  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rowInput: {
    flex: 1,
  },

  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },

  invalid: {
    borderColor: 'red',
    borderWidth: 2,
  },
});
