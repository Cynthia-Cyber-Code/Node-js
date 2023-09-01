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

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

// Sign-up (Inscription)
app.post('/signup', async (req, res) => {
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword);
    const user = {
        username: req.body.username,
        password: hashedPassword
    };
    users.push(user); // Ajoute au tableau users l'utilisateur en cours
    // TODO: Ajouter l'utilisateur dans la base de données
    
    res.status(201).json({message: "Utilisateur créé"});
});

// Sign-in (Connexion)
app.post('/signin', async (req, res) => {
    const user = users.find(u => u.username === req.body.username);
    // TODO: Récupérer l'utilisateur depuis la base de données

    if (!user) return res.status(400).send("Nom d'utilisateur ou mot de passe incorrect");
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Nom d'utilisateur ou mot de passe incorrect");

    const payload = {
        username: user.username,
      // Vous pouvez ajouter d'autres propriétés ici
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 60 * 60 * 24 });
    res.json({message: token});
});

// Implémentation des routes
app.use('/api', verifyJWT, indexRouter);
app.use('/api', verifyJWT, usersRouter);
app.use('/api', verifyJWT, roomsRouter);
app.use('/api', verifyJWT, spotsRouter);

// Exporte app
module.exports = app;
