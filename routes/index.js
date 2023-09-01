const express = require('express');
const router = express.Router();

const { Reservation } = require('../db.js');

/* GET */
router.get('/reservations', function(req, res, next) {
  Reservation.findAll().then(Reservations => {
    // Send all reservations to Client
    res.send(Reservations);
});
  // res.json({ message: res.message});
  // res.json({
  //   "reservations": [
  //     {
  //       id: 1,
  //       number_of_customers: 3,
  //       reservation_date: "2021-01-01",
  //       reservation_name: "Jean",
  //       reservation_note: "Pas de note",
  //       reservation_status: 1,
  //       spot:1
  //     }
  //   ]
  // })
});

//Post
router.post('/reservation', (req, res, next) => {

  const reservation_date = req.body.reservation_date; 
  const number_of_customers = req.body.number_of_customers;
  const reservation_name = req.body.reservation_name;
  const id_spot = req.body.id_spot;
  const id_room = req.body.id_room;
  const reservation_note = req.body.reservation_note;
  const reservation_status = 1;

  Reservation.create({
      number_of_customers: number_of_customers,
      reservation_date: reservation_date,
      reservation_name: reservation_name,
      id_spot: id_spot,
      reservation_note: reservation_note,
      reservation_status: reservation_status
  }).then(reservation => { 
    // if(!userId && (typeof userId !== "number" || !Number.isInteger(userId))) {
    //   res.status(422).json({error: "Le user n'est pas bon"})
    // }
    if(typeof reservation_date !== "string") {
      res.status(422).json({error: "La date n'est n'est pas bon(on attend un format date)"})
    }
    if(typeof number_of_customers !== 'number'|| !Number.isInteger(number_of_customers)) {
      res.status(422).json({error: "Le nombre de convive n'est pas bon(Un nombre entier est attendu)"})
    }
    if(!id_spot && !id_room) {
      res.status(422).json({error: "Vous devez renseigner un spot ou une room"})
    }
    if(typeof reservation_name !== "string") {
      res.status(422).json({error: "Le nom de la réservation n'est pas bon(Un nom est attendu)"})
    }
    if(typeof reservation_status !== "number" || !Number.isInteger(reservation_status)) {
      res.status(422).json({error: "Le status est incorrecte"})
    }
    console.log(reservation);
    res.status(200).json({message: "Reservation enregistrée"});
  });
});

//Put
router.put('/reservation/:userId', (req, res, next) => {

  // const id = req.params.userId;
  const reservation_date = req.body.reservation_date; 
  const number_of_customers = req.body.number_of_customers;
  const reservation_name = req.body.reservation_name;
  const id_spot = req.body.id_spot;
  const id_room = req.body.id_room;
  const reservation_note = req.body.reservation_note;
  const reservation_status = 1;

  Reservation.update({
      number_of_customers: number_of_customers,
      reservation_date: reservation_date,
      reservation_name: reservation_name,
      id_spot: id_spot,
      reservation_note: reservation_note,
      reservation_status: reservation_status
  },{ where: { id: req.params.userId }}
  ).then(reservation => {
    if(typeof reservation_date !== "string") {
      res.status(422).json({error: "La date n'est n'est pas bon(on attend un format date)"})
    }
    if(typeof number_of_customers !== 'number'|| !Number.isInteger(number_of_customers)) {
      res.status(422).json({error: "Le nombre de convive n'est pas bon(Un nombre entier est attendu)"})
    }
    if(!id_spot && !id_room) {
      res.status(422).json({error: "Vous devez renseigner un spot ou une room"})
    }
    if(typeof reservation_name !== "string") {
      res.status(422).json({error: "Le nom de la réservation n'est pas bon(Un nom est attendu)"})
    }
    if(typeof reservation_status !== "number" || !Number.isInteger(reservation_status)) {
      res.status(422).json({error: "Le status est incorrecte"})
    }
    console.log(reservation);
    res.status(200).json({message: "Reservation modifiée"});
  });
});

//Delete
router.delete('/reservation/:userId', (req, res, next) => {

  Reservation.destroy({ 
    where: { id: req.params.userId }
  }
  ).then(reservation => {
    console.log(reservation);
    res.status(200).json({message: "Reservation delete"});
  });
});

module.exports = router;
