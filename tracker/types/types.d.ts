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

  interface ScreenComponent extends FC<> {}
}
