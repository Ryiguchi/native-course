import { FC, useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from 'expo-router';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses.context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import {
  axiosDeleteExpense,
  axiosUpdateExpense,
  storeExpense,
} from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { getErrorMessage } from '../util/error';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const ManageExpensesScreen: FC = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { deleteExpense, updateExpense, addExpense, expenses } =
    useContext(ExpensesContext);

  const { expenseId } = useLocalSearchParams<{ expenseId?: string }>();

  const isEditing = !!expenseId;

  const selectedExpense = expenses.find(expense => expense.id === expenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEditing, navigation]);

  function confirmErrorHandler() {
    setError(null);
  }

  async function deleteExpenseHandler() {
    if (!expenseId) return;

    try {
      setIsLoading(true);
      await axiosDeleteExpense(expenseId);
      deleteExpense(expenseId);
      navigation.goBack();
    } catch (error: any) {
      setError(getErrorMessage(error));
      setIsLoading(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData: ExpenseInputData) {
    setIsLoading(true);

    try {
      if (isEditing) {
        await axiosUpdateExpense(expenseId, expenseData);
        updateExpense(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch (error: any) {
      setError(getErrorMessage(error));
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={confirmErrorHandler} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        defaultValues={selectedExpense}
      />

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

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
