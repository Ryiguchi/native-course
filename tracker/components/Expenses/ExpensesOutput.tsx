import { View } from '../Themed';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

export const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'A pair of pants',
    amount: 49.99,
    date: new Date('2022-11-19'),
  },
  {
    id: 'e3',
    description: 'A new computer',
    amount: 1899.99,
    date: new Date('2023-10-19'),
  },
  {
    id: 'e4',
    description: 'A pair of headphones',
    amount: 219.99,
    date: new Date('2023-11-15'),
  },
  {
    id: 'e5',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e6',
    description: 'A pair of pants',
    amount: 49.99,
    date: new Date('2023-11-24'),
  },
  {
    id: 'e7',
    description: 'A new computer',
    amount: 1899.99,
    date: new Date('2023-11-23'),
  },
  {
    id: 'e8',
    description: 'A pair of headphones',
    amount: 219.99,
    date: new Date('2023-11-25'),
  },
];

interface ExpensesOutputProps {
  readonly expenses: Expense[];
  readonly periodName: string;
  fallbackText: string;
}

const ExpensesOutput: FC<ExpensesOutputProps> = ({
  expenses,
  periodName,
  fallbackText,
}) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={periodName} expenses={expenses} />
      {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    // backgroundColor: GlobalStyles.colors.primary700,
  },

  infoText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
