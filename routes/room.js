const express = require('express');
const router = express.Router();

const { Room } = require('../db.js');

/* GET users */
router.get('/rooms', (req, res, next) => {
    Room.findAll().then(rooms => {
        res.status(200).send(rooms);
    });
});
/* GET user */
router.get('/rooms/:roomId', (req, res, next) => {
    Room.findOne({where : {id: req.params.roomId}}).then(rooms => {
        res.status(200).send(rooms);
    });
});
/*POST  user */
router.post('/room', (req, res, next) => {

    Room.create({

    }).then(room => { 
        console.log(room);
        res.status(200).json({message: "Room enregistrée"});
    });
});

//Put
router.put('/room/:roomId', (req, res, next) => {
    Room.update({
        
    },{ 
        where: { id: req.params.roomId }
    }
    ).then(room => { 
        console.log(room);
        res.status(200).json({message: "Room enregistrée"});
    });
});

//Delete
router.delete('/rooms/:roomId', (req, res, next) => {

    Room.destroy({ 
        where: { id: req.params.roomId }
    }
    ).then(room => {
        console.log(room);
        res.status(200).json({message: "Room delete"});
    });
});

module.exports = router;
