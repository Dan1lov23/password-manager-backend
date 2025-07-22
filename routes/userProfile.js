const express = require('express');

const router = express.Router();

const bcrypt = require("bcrypt");

const users = require('../database configs/db');

router.post('/updateParams', async (req, res) => {
    const {newUsername, newPassword, username} = req.body;
    const newHashedPassword = await bcrypt.hash(newPassword, 5);
    console.log(`\n Начат процесс изменения параметров профиля пользователя`);
    try {
        users.all("UPDATE users SET username = ?, password = ? WHERE username = ?", [newUsername, newHashedPassword, username], (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`\n Операция обновления данных профиля прошла успешно`);
            }
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
