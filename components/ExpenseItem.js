import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import { formatDate } from "../utility";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../constants/screenNames";
import { ExpensesContext } from "../context/ExpensesContext";
import { useContext } from "react";

export default function ExpenseItem({ expenseId }) {
  const navigation = useNavigation();
  const { expenses } = useContext(ExpensesContext);
  const expense = expenses.find((e) => e.id === expenseId);

  function editExpense() {
    navigation.navigate(screenNames.EditExpensesScreen, {
      expenseId: expenseId,
    });
  }

  return (
    <Pressable onPress={editExpense}>
      <View style={styles.itemContainer}>
        <View style={styles.numbersContainer}>
          <Text style={styles.amount}>E£ {expense.amount.toFixed(2)}</Text>
          <Text style={styles.text}>{formatDate(expense.date)}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{expense.description}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    backgroundColor: colors.blue.darker,
    marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 3,
    borderColor: colors.blue.regular,
  },
  numbersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  textContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  amount: {
    color: colors.green.lighter,
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    color: colors.green.regular,
    fontSize: 16,
  },
});
