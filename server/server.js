const express = require('express');
const cors = require('cors');
const app = express();

const authRouter = require('../routes/auth');
const passwordRouter = require('../routes/passwords');
const getInfoRouter = require('../routes/getInfo');
const favoritesPasswordRouter = require('../routes/favoritesPasswords');
const userRouter = require('../routes/userProfile');
const adminRouter = require('../routes/adminFunctions');

app.use(express.json());

app.use(cors());
app.use('/auth', authRouter);
app.use('/passwords', passwordRouter);
app.use('/getInfo', getInfoRouter);
app.use('/favorites', favoritesPasswordRouter);
app.use('/userProfile', userRouter);
app.use('/adminFunctions', adminRouter)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
