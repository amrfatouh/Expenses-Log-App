import { createContext, useEffect, useReducer } from "react";
import * as SQLite from "expo-sqlite";
import {
  createExpensesTableIfNotExist,
  selectExpenses,
} from "../helpers/database";

const DUMMY_EXPENSES = [
  {
    id: Math.random(),
    amount: 2.5,
    date: new Date("2023-01-12"),
    description: "pencil",
  },
  {
    id: Math.random(),
    amount: 1.2656,
    date: new Date("2023-01-12"),
    description: "pencil",
  },
  {
    id: Math.random(),
    amount: 1.2656,
    date: new Date("2023-01-12"),
    description: "pencil",
  },
  {
    id: Math.random(),
    amount: 1.2656,
    date: new Date("2023-01-12"),
    description: "pencil",
  },
  {
    id: Math.random(),
    amount: 1.2656,
    date: new Date("2023-01-12"),
    description: "pencil",
  },
];

export const ExpensesContext = createContext([]);
export const ExpensesDispatchContext = createContext(null);

export function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  useEffect(() => {
    dispatch({ type: expensesActions.loading });
    createExpensesTableIfNotExist()
      .then(async (_) => {
        const expenses = await selectExpenses();
        dispatch({
          type: expensesActions.set,
          payload: { expenses: expenses },
        });
      })
      .catch((e) => {
        dispatch({ type: expensesActions.error, payload: { error: e } });
      });
  }, []);

  return (
    <ExpensesContext.Provider value={expensesState}>
      <ExpensesDispatchContext.Provider value={dispatch}>
        {children}
      </ExpensesDispatchContext.Provider>
    </ExpensesContext.Provider>
  );
}

export const expensesActions = {
  add: "add",
  edit: "edit",
  delete: "delete",
  set: "set",
  loading: "loading",
  loadingFinished: "loadingFinished",
  error: "error",
};

function expensesReducer(state, action) {
  switch (action.type) {
    case expensesActions.add: {
      return {
        ...state,
        expenses: [...state.expenses, action.payload.expense],
      };
    }
    case expensesActions.edit: {
      const newExpenses = state.expenses.map((expense) => {
        if (expense.id === action.payload.expense.id)
          return { ...action.payload.expense };
        else return { ...expense };
      });
      return { ...state, expenses: newExpenses };
    }
    case expensesActions.delete: {
      const newExpenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
      return { ...state, expenses: newExpenses };
    }
    case expensesActions.set: {
      return {
        ...state,
        expenses: [...action.payload.expenses],
        loading: false,
      };
    }
    case expensesActions.loading: {
      return {
        ...state,
        loading: true,
      };
    }
    case expensesActions.loadingFinished: {
      return {
        ...state,
        loading: false,
      };
    }
    case expensesActions.error: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    }
    default: {
      throw Error("unknown expenses action type: " + action.type);
    }
  }
}
