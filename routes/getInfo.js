const express = require('express');

const router = express.Router();

const usersPasswords = require('../database configs/usersPasswordsDb');
const favoritesPasswords = require('../database configs/favoritesPasswordsDb');

router.post('/getInfo', (req, res) => {
    const {username} = req.body;
    console.log(`\n Начался процесс отправки данных пользователя на клиент`);
    try {
        usersPasswords.all("SELECT serviceName, password, passwordId FROM usersPasswords WHERE username = ?", [username], (err, rows) => {
            if (err) {
                console.error(`ERROR: `, err);
            } else {
                console.log(`\n Процесс отправки данных на клиент прошёл успешно и завершён`);
                res.json(rows);
            }
        });
    } catch (error) {
        console.log(`\n ${error}`);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
})

router.post('/getFavoritesPasswords', (req, res) => {
    const {username} = req.body;
    console.log(`\n Начался процесс отправки избранныч паролей пользователя на клиент`);
    try {
        favoritesPasswords.all("SELECT serviceName, password, passwordId FROM favoritesPasswords WHERE username = ?", [username], (err, rows) => {
            if (err) {
                console.error(`ERROR: `, err);
            } else {
                console.log(`\n Процесс отправки данных на клиент прошёл успешно`);
                res.json(rows);
            }
        });
    } catch (error) {
        console.log(`\n ${error}`);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
})

module.exports = router;
