const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth.routes');
const getUsersRouter = require('./routes/getUsers.routes')
const deleteUsersRouter = require('./routes/deleteUsers.routes')
const corsMiddleware = require('./middlewares/cors.middleware');
const path = require('path');
const app = express();

app.use(corsMiddleware)
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/getUsers', getUsersRouter);
app.use('/api/deleteUsers', deleteUsersRouter);

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => { 
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
};

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUrl'), {
        })
        app.listen(PORT, () => console.log(`app has been started... ${PORT}`));
    } catch (e) {
        console.log("server error", e.message);
        process.exit(1);
    }
}

start()


