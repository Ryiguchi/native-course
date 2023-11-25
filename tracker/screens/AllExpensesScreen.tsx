import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses.context';

const AllExpensesScreen = () => {
  const { expenses } = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      fallbackText="You don't have any expenses."
      periodName="Total"
      expenses={expenses}
    />
  );
};

export default AllExpensesScreen;
