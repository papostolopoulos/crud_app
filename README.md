# crud_app
This is from a tutorial here:
https://www.youtube.com/watch?v=WYa47JkZH_U

## What is used
* postgres for the database
* knex for the database migration, seeds and queries
* express.js for routes and rendering
* handlebars.js for server side view templates
* bootstrap for the ui

## Checklist
* [X] Generate an Express App
  * --git --hds (create git ignore file and use handlebars as the views vehicle)
  * install dependencies
  * npm start for the server (or nodemon)
* [X] Create database and table (knex init)
  * create db (name of db)
  * add knex and pg which is the database driver (npm)
  * knex init (initialize knex)
  * remove all the extra things and keep the development key value pairs (later we add production)
  * knex migrate make:todo (make knex.js) make a migration for the todo table
  * go to the knex file and get rid of what is not needed
  * go to the migrations file and create the tables
  * knex migrate:latest
* [X] Seed table with sample data
  * knex seed:make todo (creates the seeds folder)
  * In the todo table modify the table to have the dummy data
  (dude did it with an array and then a .insert())
  * knex seed:run
* [X] List all records with GET/todo
  * go to app.js to create a beginning route
  * Duplicate the index.js file in the routes folder and change the title in res.render
  * define a new variable in the app.js file for the "require"
  * do a new app.use for ('/todo', todo)
  This means that the url extension /todo runs the file todo.js
  * go to the browser and type "localhost:3000/todo" to confirm
  all is working
  * create a db folder and create a knex.js file. This file will help us connect to the database so we can get some data out of it. See the knex.js file to understand what has been happening
  * update the knexfile.js to have the key value pairs for production within the module exports.
  * in the knex.js file we set the "config" variable and the module.exports. This config variable equals to the object in the knexfile.js. The knexfile.js is pointing to the database that is used for this project.
  * In the module.exports we say require and we are bringing the knex library and we are invoking with the configuration. (module.exports = require('knex')(config)). Consequently, the knex.js file exports this configuration.
  * In the todo.js file we are defining the "knex" variable which requires the db/knex file. This is the active connection to the database.
  * get all the rows from the file from the router.get settings in the todo.js file. In the tutorial, because the dude did a res.render('all'), there was an error when looking on the browser. That is because the file "all" was not set up in the views directory
  * in the views directory set up a file called all.hbs.
  https://www.youtube.com/watch?v=WYa47JkZH_U

  up to 19:37
* [ ] Add bootstrapShow new form with /todo/new
* [ ] Create a record with Post/todo
* [ ] Show one record with GET/todo/:id
* [ ] Show an edit form with GET /todo/:id/edit
* [ ] Update a record with PUT/todo/:id
* [ ] Delete a record with Delete/todo/:id
* [ ] Redirect on create/update/delete
