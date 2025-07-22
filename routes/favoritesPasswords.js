const express = require('express');
const router = express.Router();

const favoritesPasswords = require('../database configs/favoritesPasswordsDb');

router.post('/addFavoritePassword', async (req, res) => {
    const { serviceName, password, username, id } = req.body;
    try {
        const stmt = favoritesPasswords.prepare('INSERT INTO favoritesPasswords (serviceName, password, username, passwordId) VALUES (?, ?, ?, ?)');
        stmt.run(serviceName, password, username, id, function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    console.log('Ошибка на сервере');
                }
                return res.status(500).json({ error: 'Ошибка сервера' });
            }
            res.json({ message: 'Задача добавлена' });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
})

router.delete('/deleteFavoritePassword', async (req, res) => {
    const { passwordId } = req.body;
    try {
        favoritesPasswords.get('DELETE FROM favoritesPasswords WHERE passwordId = ?', [passwordId], (err, rows) => {
            if (err) {
                console.error(`ERROR: `, err);
            } else {
                res.json("Удаление прошло успешно");
            }
        })
    } catch (error) {
        console.log(`\n error`)
        res.status(500).json({ error: 'Ошибка сервера' });
    }})

module.exports = router;
