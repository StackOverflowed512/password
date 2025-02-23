const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./users.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    name TEXT
  )`);

  db.run(`INSERT INTO user (username, password, name) VALUES 
    ('admin', 'admin123', 'App Administrator'),
    ('deepak', 'mypassword', 'Deepak Patil'),
    ('testuser', 'testpass', 'Test User')
  `, (err) => {
    if (err) console.log("Users already exist or error inserting:", err);
    else console.log("Users inserted successfully");
  });
});

db.close();