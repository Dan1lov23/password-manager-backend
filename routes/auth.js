const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const db = require('../database configs/db');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log(`\n Начался процесс регистрации пользователя`);
    if (!username || !password) {

        return res.status(400).json({ error: `Имя пользователя и пароль обязательны` });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        const role = `user`;

        const stmt = db.prepare('INSERT INTO users (username, password, userRole) VALUES (?, ?, ?)');
        stmt.run(username, hashedPassword, role, function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    console.log(`\n Пользователь с таким именм уже существует, процесс регистрации завершён`);
                    return res.status(400).json({ error: `Пользователь с таким именем уже существует` });
                }
                return res.status(500).json({ error: 'Ошибка сервера' });
            }
            console.log(`\n Пользователь зарегестрирован, процесс регистрации завершён`);
            res.json({ message: `Пользователь успешно зарегистрирован`, userId: this.lastID });
        });
        stmt.finalize();
    } catch (error) {
        console.log(`\n Ошибка сервера ${error}`);
        res.status(500).json({ error: `Ошибка сервера` });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`\n Процесс авторизации начат, данные с клиента: имя пользователя - ${username}, пароль - ${password}`);
    try {
        db.get("SELECT username, password, userRole FROM users WHERE username = ?", [username], (err, rows) => {
            if (err) {
                console.error(`ERROR: `, err);
            } else {
                const check = async() => {
                    if (rows !== undefined) {
                        console.log(`\n Пользователь с таким именем найден`);

                        const user = rows;
                        console.log(user);

                        const decryptedPassword = await bcrypt.compare(password, user.password);

                        if (decryptedPassword) {
                            console.log(`\n Польователь успешно вошёл в аккаунт`);
                            const token = jwt.sign({ id: user.id }, 'SECRET_KEY', { expiresIn: '1h' });
                            res.json({marker: 'true', token: token, role: user.userRole});
                        } else {
                            res.json({marker: 'false', body: 'Пароль не правильный'});
                        }
                    } else {
                        console.log(`\n Пользователь с никнеймом ${username} не найден`);
                        res.json({marker: 'false', body: 'Нерпавльный логин или пароль'});
                    }
                }
                check();
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
})

module.exports = router;

