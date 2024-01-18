import * as SQLite from "expo-sqlite";
import { formatDate } from "../utility";

const db = SQLite.openDatabase("expenses.db");

export function createExpensesTableIfNotExist() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const sql = `create table if not exists expenses (
        id integer primary key autoincrement, 
        amount real not null,
        date date not null,
        description text not null
      );`;
      tx.executeSql(
        sql,
        [],
        (_, __) => resolve(),
        (_, e) => reject(e)
      );
    });
  });

  return promise;
}

export function selectExpenses() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const sql = `select * from expenses`;
      tx.executeSql(
        sql,
        [],
        (_, { rows }) => {
          for (let expense of rows._array) {
            expense.date = new Date(expense.date);
          }
          resolve(rows._array);
        },
        (_, e) => reject(e)
      );
    });
  });

  return promise;
}

export function addExpense({ amount, date, description }) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const sql = `insert into expenses (amount, date, description)
      values (?, ?, ?)`;
      tx.executeSql(
        sql,
        [amount, formatDate(date), description],
        (_, { insertId }) => resolve(insertId),
        (_, e) => reject(e)
      );
    });
  });
  return promise;
}

export function editExpense({ id, amount, date, description }) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const sql = `update expenses set amount = ?, date = ?, description = ? where id = ?`;
      tx.executeSql(
        sql,
        [amount, formatDate(date), description, id],
        (_, __) => resolve(),
        (_, e) => reject(e)
      );
    });
  });
  return promise;
}

export function deleteExepnse(id) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const sql = `delete from expenses where id = ?`;
      tx.executeSql(
        sql,
        [id],
        (_, __) => resolve(),
        (_, e) => reject(e)
      );
    });
  });
  return promise;
}
