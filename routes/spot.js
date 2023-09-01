const express = require('express');
const router = express.Router();

const { Spot } = require('../db.js');

/* GET spots */
router.get('/spots', (req, res, next) => {
    Room.findAll().then(rooms => {
        res.status(200).send(rooms);
    });
});
// /* GET user */
// router.get('/rooms/:roomId', (req, res, next) => {
//     Room.findOne({where : {id: req.params.roomId}}).then(rooms => {
//         res.status(200).send(rooms);
//     });
// });
/*POST  spot */
router.post('/spot', (req, res, next) => {

    Spot.create({

    }).then(spot => { 
        console.log(spot);
        res.status(200).json({message: "Room enregistrée"});
    });
});

//Put
router.put('/spot/:spotId', (req, res, next) => {
    Spot.update({
        
    },{ 
        where: { id: req.params.spotId }
    }
    ).then(spot => { 
        console.log(spot);
        res.status(200).json({message: "Spot enregistrée"});
    });
});

//Delete
router.delete('/spot/:spotId', (req, res, next) => {

    Spot.destroy({ 
        where: { id: req.params.spotId }
    }
    ).then(spot => {
        console.log(spot);
        res.status(200).json({message: "Room delete"});
    });
});

module.exports = router;
