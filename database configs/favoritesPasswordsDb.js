const sqlite3 = require('sqlite3').verbose();

const favoritesPasswords = new sqlite3.Database('../databases/favoritesPasswords.db');

favoritesPasswords.serialize(() => {
    favoritesPasswords.run(`CREATE TABLE IF NOT EXISTS favoritesPasswords(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    serviceName TEXT,
    password TEXT,
    username TEXT,
    passwordId TEXT
  )`);
});

module.exports = favoritesPasswords;
