// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// module.exports = app;

// Modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Fichier de routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/room');
const spotsRouter = require('./routes/spot');

// Implémente l'app qui est une instance d'express
const app = express();

const SECRET_KEY = 'secretkey23456';

const users = [];

const verifyJWT = (req, res, next) => {
        const token = req.header('Authorization');
    
        if(!token) return res.status(401).json({ auth: false, message: 'Veuillez ajouter un token' });
    
        try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
        } catch (e) {
        res.status(400).json({ auth: false, message: 'Token inccorect.' });
        }
};

app.post("/signup", async (req, res) => {
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword);

    const user = {
        username: req.body.username,
        password: hashedPassword
    };
    users.push(user); // Ajout au tableau users l'utilisateur en cours

    //TODO: Ajout l'utilisateur dans la base de donnée

    console.log(users);
    res.status(201).json({message: "Utilisateur créé"})
});

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Implémentation des routes
app.use('/api', verifyJWT, indexRouter);
app.use('/api', verifyJWT, usersRouter);
app.use('/api', verifyJWT, roomsRouter);
app.use('/api', verifyJWT, spotsRouter);

// Exporte app
module.exports = app;
