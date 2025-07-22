const express = require("express");
const router = express.Router();

const users = require('../database configs/db');
const usersPasswords = require('../database configs/usersPasswordsDb');
const favoritesPasswords = require('../database configs/favoritesPasswordsDb');

router.post("/getAllPasswordsStatistic", async (req, res) => {
    const {role} = req.body;
    console.log(`\n Начат процесс передачи статистических данных на клиент`);
    try {
        if (role === 'admin') {
            usersPasswords.all('SELECT serviceName, password, passwordId FROM usersPasswords', (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`\n Процесс передачи данных завершён`);
                    res.json(rows.length);
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
})

router.get("/getUsersCounter", async (req, res) => {
    console.log(`\n Начат процесс передачи статистических данных на клиент`);
    try {
        users.all('SELECT username, password FROM users', (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`\n Процесс передачи данных завершён`);
                res.json(rows.length);
            }
        })
    } catch (error) {
        console.log(error);
    }
})

router.get("/getAllUsers", async (req, res) => {
    console.log(`\n Начат процесс передачи статистических данных на клиент`);
    try {
        users.all('SELECT username, password, userRole FROM users', (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`\n Процесс передачи данных завершён`);
                res.json(rows);
            }
        })
    } catch (error) {
        console.log(error);
    }
})

router.delete("/deleteUser", async (req, res) => {
    console.log(`\n Начат процесс передачи статистических данных на клиент`);
    const { username, deleteUserRole, currentUserRole } = req.body;
    try {
        if (currentUserRole !== 'admin') {
            return res.status(403).json({ error: "Недостаточно прав" });
        }

        if (deleteUserRole === 'admin') {
            return res.status(400).json({ error: "Нельзя удалить администратора" });
        }

        await new Promise((resolve, reject) => {
            users.run('DELETE FROM users WHERE username = ?', [username], function(err) {
                if (err) return reject(err);
                if (this.changes === 0) {
                    return reject(new Error("Пользователь не найден"));
                }
                resolve();
            });
        });
        console.log(`\n Процесс удаления пользователя завершён`);
        res.json({ success: true, message: "Пользователь успешно удалён" });

    } catch (error) {
        console.error("Ошибка при удалении пользователя:", error);

        if (error.message === "Пользователь не найден") {
            return res.status(404).json({ error: error.message });
        }

        res.status(500).json({ error: "Ошибка сервера" });
    }
});

router.get("/getFavoritesCounter", async (req, res) => {
    console.log(`\n Начат процесс передачи статистических данных на клиент`);
    try {
        favoritesPasswords.all('SELECT serviceName, passwordId FROM favoritesPasswords', (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`\n Процесс передачи данных завершён`);
                res.json(rows.length);
            }
        })
    } catch (error) {
        console.log(error);
    }
})

router.get("/getAdminUsersCounter", async (req, res) => {
    const userRole = "admin";
    console.log(`\n Начат процесс передачи статистических данных на клиент`);
    try {
        users.all('SELECT username FROM users WHERE userRole = ?', [userRole],(err, rows) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`\n Процесс передачи данных завершён`);
                res.json(rows.length);
            }
        })
    } catch (error) {
        console.log(error);
    }
})

router.get("/getDefaultUsersCounter", async (req, res) => {
    const userRole = "user";
    console.log(`\n Начат процесс передачи статистических данных на клиент`);
    try {
        users.all('SELECT username FROM users WHERE userRole = ?', [userRole],(err, rows) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`\n Процесс передачи данных завершён`);
                res.json(rows.length);
            }
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
