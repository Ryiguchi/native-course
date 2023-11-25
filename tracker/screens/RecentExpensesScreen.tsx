import { useContext } from 'react';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { ExpensesContext } from '../store/expenses.context';
import { getDateMinusDays } from '../util/date';

const RecentExpensesScreen = () => {
  const { expenses } = useContext(ExpensesContext);

  const recentExpenses = expenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      fallbackText="You don't have any expenses in the last 7 days."
      periodName="Last 7 days"
      expenses={recentExpenses}
    />
  );
};

export default RecentExpensesScreen;
