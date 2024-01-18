import { FlatList, StyleSheet, View } from "react-native";
import colors from "../constants/colors";
import ExpenseItem from "../components/ExpenseItem";
import ListEmptyComponent from "../components/ListEmptyComponent";

export default function ExpensesList({ expenses }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={(itemData) => <ExpenseItem expenseId={itemData.item.id} />}
        style={styles.flatList}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.blue.darkest,
    padding: 10,
  },
  flatList: {
    flex: 1,
    width: "100%",
  },
});
