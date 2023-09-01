// 1. Importer Sequelize
const {Sequelize, DataTypes} = require("sequelize");
//const Sequelize = require("sequelize").Sequelize;

// 2. Implémenter la configuration postgreSQL
// const sequelize = new Sequelize("postgres://cynthia@127.0.0.1:5432/postgres")
const sequelize = new Sequelize("postgres://fogrsquk:Bw91aWhF93qjYxhBPvAVxEVir5owjA6I@trumpet.db.elephantsql.com/fogrsquk")


// 3. Création d'un modèle
const Reservation = sequelize.define('Reservation', {
    // Model attributes are defined here
    number_of_customers: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reservation_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    reservation_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    reservation_note: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    reservation_status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
  // Other model options go here
});

const Spot = sequelize.define('Spot', {

});

const Room = sequelize.define('Room', {

});

const User = sequelize.define('User', {
    user_role: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    user_password:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

Reservation.sync({ force: true }).then(() => {
    console.log("The table for the Reservation model was just (re)created!")
})

module.exports = {
    Reservation,
    User,
    Room,
    Spot
};

// `sequelize.define` also returns the model
// console.log(Reservation === sequelize.models.Reservation); // true

// Reservation.sync({ force: true }).then(() => {
//     console.log("The table for the Reservation model was just (re)created!")
// })

// Spot.sync({ force: true }).then(() => {
//     console.log("The table for the Spot model was just (re)created!")
// })

// Room.sync({ force: true }).then(() => {
//     console.log("The table for the Room model was just (re)created!")
// })

// User.sync({ force: true }).then(() => {
//     console.log("The table for the User model was just (re)created!")
// })

// const r1 = Reservation.build({
//     number_of_customers: 3,
//     reservation_date: "2024-01-01",
//     reservation_name: "Alex",
//     reservation_note: "vue sur la mer",
//     reservation_status: 1,
// });

// r1.save().then(
//     () => console.log("Réservation enregistrée")
// )