import { FC, ReactNode, createContext, useState } from 'react';
import { DUMMY_EXPENSES } from '../components/Expenses/ExpensesOutput';

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (expense: Expense) => void;
};

const initialState = {
  expenses: DUMMY_EXPENSES,
  addExpense: (expense: Omit<Expense, 'id'>) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (expense: Expense) => {},
};

export const ExpensesContext = createContext<ExpensesContextType>(initialState);

interface ExpenseProviderProps {
  children: ReactNode;
}

const ExpensesContextProvider: FC<ExpenseProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(DUMMY_EXPENSES);

  function addExpense(expense: Omit<Expense, 'id'>) {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };

    setExpenses(currentExpenses => {
      if (currentExpenses.length === 0) {
        return [newExpense];
      } else {
        return [...currentExpenses, newExpense];
      }
    });
  }

  function deleteExpense(id: string) {
    setExpenses(currentExpenses =>
      currentExpenses.filter(expense => expense.id !== id)
    );
  }

  function updateExpense(updateExpense: Expense) {
    const index = expenses.findIndex(
      (expense: Expense) => expense.id === updateExpense.id
    );

    setExpenses(currentExpenses => {
      const temp = [...currentExpenses];
      temp.splice(index, 1, updateExpense);

      return temp;
    });
  }

  const value = {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
