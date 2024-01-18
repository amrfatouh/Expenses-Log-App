import { StyleSheet, View } from "react-native";
import ExpensesList from "../components/ExpensesList";
import { useContext } from "react";
import { ExpensesContext } from "../context/ExpensesContext";

export default function AllExpensesScreen() {
  const { expenses } = useContext(ExpensesContext);

  return (
    <View style={styles.container}>
      <ExpensesList expenses={expenses} />
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
