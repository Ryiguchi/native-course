import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

const db = SQLite.openDatabase('places.db');

export function init() {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
        );
        `,
        [],
        () => resolve(void 0),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
}

export function insertPlace(place: Place) {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `
        INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)
        `,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.latitude,
          place.location.longitude,
        ],
        (_, result) => resolve(result.insertId),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `
        SELECT * FROM places
        `,
        [],
        (_, result) => {
          const places: Place[] = [];

          for (const row of result.rows._array) {
            places.push(
              new Place(
                row.title,
                row.imageUri,
                row.address,
                {
                  latitude: row.lat,
                  longitude: row.lng,
                },
                row.id
              )
            );
          }

          resolve(places);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
}
