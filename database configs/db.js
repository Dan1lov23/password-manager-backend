const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../databases/users.db');
const usersPasswords = new sqlite3.Database('../databases/usersPasswords.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    userRole TEXT 
  )`);
});

usersPasswords.serialize(() => {
    usersPasswords.run(`CREATE TABLE IF NOT EXISTS usersPasswords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    serviceName TEXT UNIQUE,
    password TEXT,
    username TEXT   
  )`);
});

module.exports = db;
