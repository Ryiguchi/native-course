import { FC, ReactNode, createContext, useState } from 'react';
import { DUMMY_EXPENSES } from '../components/Expenses/ExpensesOutput';

const initialState = {
  expenses: DUMMY_EXPENSES,
  addExpense: (expense: Expense) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (id: string, expense: ExpenseInputData) => {},
  setFetchedExpenses: (expenses: Expense[]) => {},
};

type ExpensesContextType = typeof initialState;

export const ExpensesContext = createContext<ExpensesContextType>(initialState);

interface ExpenseProviderProps {
  children: ReactNode;
}

const ExpensesContextProvider: FC<ExpenseProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(DUMMY_EXPENSES);

  function addExpense(expense: Expense) {
    setExpenses(currentExpenses => {
      return [...currentExpenses, expense];
    });
  }

  function deleteExpense(id: string) {
    setExpenses(currentExpenses =>
      currentExpenses.filter(expense => expense.id !== id)
    );
  }

  function updateExpense(id: string, updateExpense: ExpenseInputData) {
    const index = expenses.findIndex((expense: Expense) => expense.id === id);

    const expenseWithId = {
      ...updateExpense,
      id,
    };

    setExpenses(currentExpenses => {
      const temp = [...currentExpenses];
      temp.splice(index, 1, expenseWithId);

      return temp;
    });
  }

  function setFetchedExpenses(expenses: Expense[]) {
    expenses.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setExpenses(expenses);
  }

  const value = {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
    setFetchedExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
