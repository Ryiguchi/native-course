import { FlatList, ListRenderItemInfo } from 'react-native';
import { FC } from 'react';
import ExpenseItem from './ExpenseItem';

interface Props {
  readonly expenses: Expense[];
}

function renderExpenseItem(itemData: ListRenderItemInfo<Expense>) {
  return <ExpenseItem expense={itemData.item} />;
}

const ExpensesList: FC<Props> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={item => item.id}
    />
  );
};

export default ExpensesList;
