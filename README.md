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
  * go to app.js to create a route. app.js is the beginning of the express app. He did nothing on this step, he just explained.
  * Duplicate the index.js file in the routes folder and change the title in res.render. Name the file "todo.js"
  * define a new variable named "todo" in the app.js file for the "require"
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
* [X] Add bootstrap
  * go to bootstrap / getting started. copy the <link> tag and paste it at layout.hbs. The layout is the container for all the views that are handled in handlebars.
  * In the layout.hbs, he pasted the bootstrap link along with the existing css link.
  * Gave to body the "container" class
  * went to components to get a list-group ul. Then pasted it in the all.hbs page. He is rendering the {{title}} inside the <li> tags
  * he added margin-top in the body tag from the style.css file.
* [X] Show new form with /todo/new
  * Went to the todo.js file to create a new route for the form
  * Created a new.hbs file in the "views" folder
  * Created a form in the new.hbs with a single input. He gave classes in the div tag and an id to the form. He probably knew what to expect from prior work with bootstrap.
  * he went to the "all.hbs" page and created a button which he then converted in an anchor. This button is used for redirecting to the "/todo/new" page
  * Went to bootstrap to check on the colors for the buttons (in css page) and chose btn-primary class for the button.
  * Created a text area tag for the description. Included in a div tag and with a label, same pattern like before with the appropriate ids and classes.
  * Created a priority dropdown, same pattern
  * Created a button with "type = 'submit'".
* [X] Create a record with Post/todo
  * Created a router.post in todo.js for "/"
  * Created function validTodo in order to confirm that some conditions are met in order to accept that the object data is valid
  * Created a "todo" object in the router.post which collects all the req.body arguments
  * Pushed all the data through knex - insert - then
  * updated the "else" statement to provide a 500 error
  * we needed to update the forms. All inputs should have a name. Also the priority field returns as a string but it should be a number.
  * we needed to update the todo variable in order to have a date entry
  * we needed to update the confirmation function in order to confirm that the priority is a number


  40:56 https://www.youtube.com/watch?v=WYa47JkZH_U
* [ ] Show one record with GET/todo/:id
* [ ] Show an edit form with GET /todo/:id/edit
* [ ] Update a record with PUT/todo/:id
* [ ] Delete a record with Delete/todo/:id
* [ ] Redirect on create/update/delete
