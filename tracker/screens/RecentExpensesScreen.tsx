import { useContext } from 'react';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { ExpensesContext } from '../store/expenses.context';
import { getDateMinusDays } from '../util/date';
import { useGetExpenses } from '../util/http';
import { Text } from 'react-native';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import { getErrorMessage } from '../util/error';

const RecentExpensesScreen = () => {
  const { expenses } = useContext(ExpensesContext);
  const { isFetching, isError, resetError } = useGetExpenses();

  function confirmErrorHandler() {
    resetError();
  }

  if (isFetching || !expenses) {
    return <LoadingOverlay />;
  }

  if (isError) {
    return (
      <ErrorOverlay
        message={getErrorMessage(isError)}
        onConfirm={confirmErrorHandler}
      />
    );
  }

  const recentExpenses =
    expenses?.filter(expense => {
      const today = new Date();
      const date7DaysAgo = getDateMinusDays(today, 7);

      const expenseDate = new Date(expense.date);

      return expenseDate > date7DaysAgo;
    }) || [];

  return (
    <ExpensesOutput
      fallbackText="You don't have any expenses in the last 7 days."
      periodName="Last 7 days"
      expenses={recentExpenses}
    />
  );
};

export default RecentExpensesScreen;
