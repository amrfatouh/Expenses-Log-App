import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import EditExpensesScreen from "./screens/EditExpensesScreen";
import AllExpensesScreen from "./screens/AllExpensesScreen";
import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import screenNames from "./constants/screenNames";
import colors from "./constants/colors";
import { Ionicons, Entypo } from "@expo/vector-icons";
import {
  ExpensesContextProvider,
  ExpensesDispatchContext,
} from "./context/ExpensesContext";
import { useContext, useEffect } from "react";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ExpensesContainer() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: colors.blue.darker },
        headerTitleStyle: { color: colors.green.lighter },
        headerTintColor: colors.green.lighter,
        tabBarStyle: { backgroundColor: colors.blue.darker },
        tabBarActiveTintColor: colors.green.lighter,
        tabBarInactiveTintColor: "white",
        tabBarActiveBackgroundColor: colors.blue.darker,
        tabBarInactiveBackgroundColor: colors.blue.darkest,
        tabBarLabelPosition: "beside-icon",
        headerRight: () => (
          <View style={{ marginRight: 15 }}>
            <Button
              title="Add Expense"
              color={colors.blue.darker}
              onPress={() =>
                navigation.navigate(screenNames.EditExpensesScreen)
              }
            />
          </View>
        ),
      })}
    >
      <Tab.Screen
        name={screenNames.AllExpensesScreen}
        component={AllExpensesScreen}
        options={{
          title: "All Expenses",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "wallet" : "wallet-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.RecentExpensesScreen}
        component={RecentExpensesScreen}
        options={{
          title: "Recent Expenses",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ExpensesContextProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.blue.darker },
            headerTitleStyle: { color: colors.green.lighter },
            headerTintColor: colors.green.lighter,
          }}
        >
          <Stack.Screen
            name={screenNames.ExpensesContainer}
            component={ExpensesContainer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={screenNames.EditExpensesScreen}
            component={EditExpensesScreen}
            options={{ title: "Edit Expenses" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
