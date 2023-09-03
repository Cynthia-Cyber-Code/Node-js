# Node-js
Projet Node.js Séquence2

# Back-end
## Getting Started with Express generator

This project was bootstrapped with [Express generator](https://github.com/expressjs/generator).
With ### npx express bookingApp-CynthiaF --no-view

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000).

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Add a bdd format Postgres
## PostgreSQL also known as Postgres, is a free and open-source relational database management system.

  * Creation of the Database with dedicated tables and fields
      *Use the framwork express
  * Implementation of CRUD(Create, read, update, delete) for the different routes of the database
    * Use sequelize, Sequelize is a promise-based Node.js ORM tool for Postgres.
    * Use sequelize CLI, This is lhe Sequelize Command Line Interface (CLI).
       create following folders: 
         * config, contains config file, which tells CLI how to connect with database
         * models, contains all models for your project
         * migrations, contains all migration files
         * seeders, contains all seed files
  * Creation of different db (db-development, db-production, db-test)
  * Add test for the route GET: http://localhost:3000/api/reservations with Jest ans Supertest
   * Jest, Testing Web Frameworks
   * [Supertest](https://github.com/visionmedia/supertest)
  * Deployment with ElephantSQL
