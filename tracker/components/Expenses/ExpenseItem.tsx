import { FC } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';
import { Link } from 'expo-router';

interface ExpenseItemProps {
  expense: Expense;
}

const ExpenseItem: FC<ExpenseItemProps> = ({ expense }) => {
  const { description, date, amount, id } = expense;

  return (
    <Link
      href={{
        pathname: '/manageExpenses',
        params: { expenseId: id },
      }}
      asChild
    >
      <Pressable>
        {({ pressed }) => (
          <View style={[styles.expenseItem, pressed && styles.pressed]}>
            <View>
              <Text style={[styles.textBase, styles.description]}>
                {description}
              </Text>
              <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
            </View>
            <View style={styles.amountContainer}>
              <Text style={[styles.textBase, styles.amount]}>
                ${amount.toFixed(2)}
              </Text>
            </View>
          </View>
        )}
      </Pressable>
    </Link>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },

  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },

  textBase: {
    color: GlobalStyles.colors.primary50,
  },

  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },

  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },

  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
});
