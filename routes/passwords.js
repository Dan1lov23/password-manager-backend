const express = require('express');

const router = express.Router();

const usersPasswords = require('../database configs/usersPasswordsDb');

router.post('/addNewPassword', (req, res) => {
    const { serviceName, password, username, id } = req.body;
    console.log(`\n Начат процесс добавления нового пароля а базу данных`);
    try {
        const stmt = usersPasswords.prepare('INSERT INTO usersPasswords (serviceName, password, username, passwordId) VALUES (?, ?, ?, ?)');
        stmt.run(serviceName, password, username, id, function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    console.log('Ошибка на сервере');
                }
                return res.status(500).json({ error: 'Ошибка сервера' });
            }
            console.log('\n Задача добавлена в базу данных');
            res.json({ message: 'Задача добавлена' });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

router.delete('/deleteTask', (req, res) => {
    const { passwordId, username } = req.body;
    console.log(`\n Начат процесс поиска и удаления задачи из базы данных`)
    try {
        usersPasswords.run("DELETE FROM usersPasswords WHERE passwordId = ?", [passwordId], (err, rows) => {
            if (err) {
                console.error(`ERROR: `, err);
            } else {
                console.log(`\n Задача найдена, начинается процесс удаления`);
                usersPasswords.all("SELECT serviceName, password, passwordId FROM usersPasswords WHERE username = ?", [username], (err, rows) => {
                    if (err) {
                        console.error(`ERROR: `, err);
                    } else {
                        console.log(`\n ${rows}`)
                        res.json("success");
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
})

router.post('/updatePassword', (req, res) => {
    const { newServiceName, newPassword, passwordId } = req.body;
    console.log(`\n Начался процесс обновления данных пользователя`);
    try {
        usersPasswords.run("UPDATE usersPasswords SET serviceName = ?, password = ? WHERE passwordId = ?", [newServiceName, newPassword, passwordId], (err, rows) => {
            if (err) {
                console.error(`ERROR: `, err);
            } else {
                console.log(`\n Обнолвение данных прошло успешно`);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
})

module.exports = router;
