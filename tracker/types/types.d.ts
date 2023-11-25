import { FC } from 'react';

export {};

declare global {
  type RootStackParamList = {
    manageExpenses: { expenseId: string } | undefined;
  };

  interface Expense {
    id: string;
    amount: number;
    date: Date;
    description: string;
  }

  type ExpenseInputData = Omit<Expense, 'id'>;

  interface ScreenComponent extends FC<> {}
}
