const sqlite3 = require('sqlite3').verbose();

const usersPasswords = new sqlite3.Database('../databases/usersPasswords.db');

usersPasswords.serialize(() => {
    usersPasswords.run(`CREATE TABLE IF NOT EXISTS usersPasswords(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    serviceName TEXT,
    password TEXT,
    username TEXT,
    passwordId TEXT
  )`);
});

module.exports = usersPasswords;
