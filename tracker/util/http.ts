import axios, { AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ExpensesContext } from '../store/expenses.context';

type DBReturnType = { [key: string]: Expense };

function formatData(data: DBReturnType) {
  let formattedExpenses: Expense[] = [];
  for (const id in data) {
    const formattedExpense = {
      ...data[id],
      id: id,
    };
    formattedExpenses.push(formattedExpense);
  }

  return formattedExpenses;
}

export async function storeExpense(expenseData: ExpenseInputData) {
  const url = `${process.env.EXPO_PUBLIC_DB_ROOT_URL!}/expenses.json`;

  try {
    const response = await axios.post(url, expenseData);
    return response.data.name;
  } catch (error: any) {
    console.log(error);
  }
}

export function useGetExpenses() {
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState<Error | null>(null);
  const [expenses, setExpenses] = useState<Expense[] | null>(null);

  const { setFetchedExpenses } = useContext(ExpensesContext);

  const url = `${process.env.EXPO_PUBLIC_DB_ROOT_URL!}/expenses.json`;

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      setIsError(null);

      try {
        const response: AxiosResponse<DBReturnType> = await axios.get(url);

        setExpenses(formatData(response.data));
        setFetchedExpenses(formatData(response.data));
      } catch (error: any) {
        setIsError(error);
      } finally {
        setIsFetching(false);
      }
    }

    getExpenses();
  }, []);

  function resetError() {
    setIsError(null);
  }

  return {
    expenses,
    isFetching,
    isError,
    resetError,
  };
}

export function axiosUpdateExpense(id: string, expenseData: ExpenseInputData) {
  const url = `${process.env.EXPO_PUBLIC_DB_ROOT_URL!}/expenses/${id}.json`;

  return axios.put(url, expenseData);
}

export function axiosDeleteExpense(id: string) {
  const url = `${process.env.EXPO_PUBLIC_DB_ROOT_URL!}/expenses/${id}.json`;

  return axios.delete(url);
}
