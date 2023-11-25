import { FC, useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from 'expo-router';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button, { Modes } from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses.context';

const ManageExpensesScreen: FC = () => {
  const navigation = useNavigation();
  const { deleteExpense, updateExpense, addExpense } =
    useContext(ExpensesContext);
  const { expenseId } = useLocalSearchParams<{ expenseId?: string }>();

  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEditing, navigation]);

  function deleteExpenseHandler() {
    if (!expenseId) return;

    deleteExpense(expenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      updateExpense({
        id: expenseId,
        description: 'test',
        amount: 19.99,
        date: new Date('2023-11-24'),
      });
    } else {
      addExpense({
        description: 'test',
        amount: 19.99,
        date: new Date('2023-11-24'),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button mode={Modes.FLAT} onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    // backgroundColor: GlobalStyles.colors.primary700,
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

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
