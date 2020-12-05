//sqlite db

const sqlite3 = require('sqlite3');
import { open } from 'sqlite';

export default async function openDb() {
  console.log('connecting to sqlite db');
  return open({
    filename: './db-files/database.db',
    driver: sqlite3.Database,
  });
}
