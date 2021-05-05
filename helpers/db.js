import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('user.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL);',
        [],
        () => {
          resolve();
          console.log("db initializated");
        },
        (_, err) => {
          reject(err);
          console.log("db  not initializated");
        }
      );
    });
  });
  return promise;
};

export const insertPlace = (id, name, email) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO user (id, name, email) VALUES (?, ?, ?);`,
        [id, name, email],
        (_, result) => {
          resolve(result);
          
        },
        (_, err) => {
          reject(err);
          
        }
      );
    });
  });
  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM user',
        [],
        (_, result) => {
          resolve(result);
          
        },
        (_, err) => {
          reject(err);
          
        }
      );
    });
  });
  return promise;
};