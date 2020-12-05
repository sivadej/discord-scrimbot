const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database(':memory:');
const db = new sqlite3.Database('./db-files/database.db');

db.serialize(() => {
  // const stmt = db.prepare('INSERT INTO lorem VALUES (?)');
  // stmt.run('ipsum');
  // stmt.finalize();

  const rando = Math.random().toString();
  db.run('INSERT INTO lorem VALUES (?)', [rando]);

  db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
    console.log(row.id + ': ' + row.info);
  });
});

db.close();

// db.serialize(() => {
//   db.run('SELECT * FROM $', ['test'], (err, row) => {
//     console.log(row);
//   });
// });
// db.close();
