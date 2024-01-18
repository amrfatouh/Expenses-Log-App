import { StyleSheet, View } from "react-native";
import ExpensesList from "../components/ExpensesList";
import { useContext } from "react";
import { ExpensesContext } from "../context/ExpensesContext";

export default function AllExpensesScreen() {
  const { expenses } = useContext(ExpensesContext);
  const filteredExpenses = expenses.filter((e) => {
    let currentDate = e.date.getTime();
    let sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return currentDate > sevenDaysAgo;
  });

  return (
    <View style={styles.container}>
      <ExpensesList expenses={filteredExpenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
