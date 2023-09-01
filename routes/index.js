const express = require('express');
const router = express.Router();

const { Reservation } = require('../db.js');

/* /reservations */
// router.get('/reservations', function(req, res, next) {
//   res.json(
//     { "reservations": [
//       {
//         id: 1,
//         number_of_customers: 3,
//         reservation_date: '2021-01-01',
//         reservation_name: 'Jean',
//         reservation_note: 'Pas de note',
//         reservation_status: 1,
//         spot: 1
//     }]
//     }
//   )
// });

// router.post('/reservations', function(req, res, next) {
//   const {id_user, id_spot, id_room, number_of_customers, reservation_date, reserveration_name, reservation_note, reservation_status } = req.body;
//   console.log(req.body);

//   if (typeof number_of_customers !== 'number' || !Number.isInteger(number_of_customers)) {
//     res.status(422).json({error: "Le format du nombre de convive n'est pas bon (Nombre d'entier attendu)"});
//   }

//   if (!id_spot && !id_room) {
//     res.status(422).json({message:"Vous devez renseigner un spot ou une room"});
//   }

//   // ...

//   res.json({message: 'Réservation enregistrée'});
// });

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

//Put
router.delete('/reservation/:userId', (req, res, next) => {

  Reservation.destroy({ 
    where: { id: req.params.userId }
  }
  ).then(reservation => {
    console.log(reservation);
    res.status(200).json({message: "Reservation delete"});
  });
});



// const userId = req.body.userId
  // const reservation_date = req.body.date; //possibilité de le configurer avec regex
  // const number_of_customers = req.body.nbUser;
  // const reservation_name = req.body.name;
  // const id_spot = req.body.id_spot;
  // const id_room = req.body.id_room;
  // const reservation_note = req.body.note;
  // const reservation_status = 1;

  // console.log(number_of_customers, reservation_date, reservation_name, reservation_note, reservation_status);

  // res.json({message: "Reservation enregistrée"});


// router.post('/api/reservations', function(req, res, next) {
//   const nbUser = req.body.nbUser;
//   console.log(nbUser);

//   if (typeof nbUser !== 'number' || !Number.isInteger(nbUser)) {
//     res.status(422).json({error: "Le format du nombre de convive n'est pas bon (Nombre d'entier attendu)"})
//   }

//   // Logique

//   res.json({message: 'Réservation enregistrée'})
// });
// router.post("/", (req, res) => {
//   const message = req.body.message;
//   res.json({ message: message});
// });

//Put
// router.put("/", (req, res) => {
//   res.json({ message: req.body.message});
// });

//Delete
// router.delete("/", (req, res) => {
//   res.json({ message: req.body.message});
// });

// const r1 = Reservation.build({
//   number_of_customers: 3,
//   reservation_date: "2024-01-01",
//   reservation_name: "Alex",
//   reservation_note: "vue sur la mer",
//   reservation_status: 1,
// });

// r1.save().then(
//   () => console.log("Réservation enregistrée")
// )

module.exports = router;
