import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import colors from "../constants/colors";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { formatDate } from "../utility";
import {
  ExpensesContext,
  ExpensesDispatchContext,
  expensesActions,
} from "../context/ExpensesContext";
import { addExpense, deleteExepnse, editExpense } from "../helpers/database";
import { Snackbar } from "react-native-paper";

export default function EditExpensesScreen({ navigation, route }) {
  const { expenses } = useContext(ExpensesContext);
  const expenseId = route.params?.expenseId;
  const expense = expenses.find((e) => e.id === expenseId);
  const isEditing = Boolean(expense);

  const [amount, setAmount] = useState(
    isEditing ? expense.amount.toString() : ""
  );
  const [date, setDate] = useState(isEditing ? expense.date : new Date());
  const [description, setDescription] = useState(
    isEditing ? expense.description : ""
  );

  const [amountValid, setAmountValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const amountBackground = amountValid
    ? colors.blue.darker
    : colors.red.errorBackground;
  const descriptionBackground = descriptionValid
    ? colors.blue.darker
    : colors.red.errorBackground;

  const [databaseError, setDataBaseError] = useState();

  const dispatch = useContext(ExpensesDispatchContext);

  useLayoutEffect(() => {
    async function deleteDispatch() {
      try {
        await deleteExepnse(expenseId);
      } catch (e) {
        setDataBaseError(e.toString());
        return;
      }
      dispatch({
        type: expensesActions.delete,
        payload: { id: expense.id },
      });
      navigation.goBack();
    }
    function confirm() {
      Alert.alert("Delete Expense?", "Are you sure you want to delete?", [
        { text: "Delete", onPress: deleteDispatch },
        { text: "Cancel" },
      ]);
    }
    const options = {
      title: isEditing ? "Edit Expense" : "Add Expense",
    };
    if (isEditing) {
      options.headerRight = () => {
        return (
          <Button
            title="Delete"
            color={colors.red.errorBackground}
            onPress={confirm}
          />
        );
      };
    }
    navigation.setOptions(options);
  }, []);

  async function submit() {
    let newId = null;
    try {
      if (!isEditing) {
        newId = await addExpense({ amount, date, description });
      } else {
        await editExpense({ id: expenseId, amount, date, description });
      }
    } catch (e) {
      setDataBaseError(e);
      return;
    }
    const action = {
      type: isEditing ? expensesActions.edit : expensesActions.add,
      payload: {
        expense: {
          id: newId || expense.id,
          amount: +amount,
          date: date,
          description: description,
        },
      },
    };
    if (validate()) {
      dispatch(action);
      navigation.goBack();
    }
  }

  function validate() {
    let result = true;
    if (Number.isNaN(amount) || +amount <= 0) {
      setAmountValid(false);
      result = false;
    }
    if (description.trim().length === 0) {
      setDescriptionValid(false);
      result = false;
    }
    return result;
  }

  function showDatePicker() {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (_, selectedDate) => setDate(selectedDate),
      mode: "date",
      accentColor: colors.blue.darker,
    });
  }

  function handleAmountChange(value) {
    setAmount(value);
    setAmountValid(true);
  }

  function handleDescriptionChange(value) {
    setDescription(value);
    setDescriptionValid(true);
  }

  console.log("database error: " + databaseError);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount</Text>
      <View style={styles.amountContainer}>
        <Text style={styles.currency}>E£</Text>
        <TextInput
          value={amount}
          onChangeText={handleAmountChange}
          style={[
            styles.textInput,
            { flex: 1, backgroundColor: amountBackground },
          ]}
          selectionColor={colors.green.regular}
          keyboardType="decimal-pad"
        />
      </View>
      <Text style={styles.label}>Date</Text>
      <View style={styles.amountContainer}>
        <Pressable style={{ flex: 2 }} onPress={showDatePicker}>
          <Text style={[styles.currency, { flex: 1 }]}>{formatDate(date)}</Text>
        </Pressable>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "stretch" }}>
          <Button
            title="Choose Date"
            color={colors.blue.darker}
            onPress={showDatePicker}
          />
        </View>
      </View>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[
          styles.textInput,
          styles.descriptionInput,
          { backgroundColor: descriptionBackground },
        ]}
        multiline={true}
        textAlignVertical="top"
        value={description}
        onChangeText={handleDescriptionChange}
      />
      <View style={styles.submitContainer}>
        <Button color={colors.blue.darker} title="Done" onPress={submit} />
      </View>
      <Snackbar
        visible={!!databaseError}
        onDismiss={() => setDataBaseError(null)}
      >
        Database Error
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    padding: 10,
    backgroundColor: colors.blue.darkest,
  },
  label: {
    color: colors.blue.lighter,
    fontSize: 18,
    marginBottom: 3,
  },
  textInput: {
    fontSize: 18,
    backgroundColor: colors.blue.darker,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    color: colors.green.lighter,
    borderColor: colors.blue.regular,
    borderWidth: 3,
  },
  amountContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 10,
  },
  currency: {
    backgroundColor: colors.blue.darker,
    paddingVertical: 5,
    fontSize: 18,
    borderRadius: 6,
    marginRight: 10,
    paddingHorizontal: 5,
    color: colors.green.lighter,
    borderColor: colors.blue.regular,
    borderWidth: 3,
    textAlign: "center",
  },
  descriptionInput: {
    width: "100%",
    flex: 1,
    marginBottom: 10,
  },
  submitContainer: {
    width: "100%",
  },
});
