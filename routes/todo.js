const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

/* This router is mounted at http://localhost:3000/todo
This means that every route defined on this file, is going
to be prepended after /todo
*/

//Route for the /todo page
router.get('/', (req, res) => {
  knex('todo') //get todo table
    .select() //select everything from the table
    .then(todos => { //use the data from the table by calling it "todos" as an argument
      res.render('all', { todos: todos }); //render everything named as "all"
    });
});


//Route for the form page
router.get('/new', (req, res) => {
  res.render('new');
});

//Validation function for confirming if the todo object data is valid
function validTodo(todo) {
  return typeof todo.title === 'string' &&
  todo.title.trim() !== '' &&
  typeof todo.priority !== 'undefined' &&
  !isNaN(Number(todo.priority));
}

//Route for getting the data from the form
router.post('/', (req, res) => {
  console.log(req.body);
  if (validTodo(req.body)) {

    //Variable that collects the data from the different form components
    const todo = {
      title: req.body.title,
      description: req.body.description,
      priority: Number(req.body.priority),
      date: new Date()
    };

    //Insert in database
    knex("todo") //give me the todo table
    .insert(todo, 'id') //insert the todo variable, I also want to return the id (First he thought he wanted to return the hgfdtkk whole todo columns (asterisc))
    .then(ids => { //use the data from the entry by calling it "todos" as an argument. This is an array of length one (only one entry)
      const id = ids[0]; //we define that id equals to the first (and only) element of the array (ids[0])
      res.redirect(`/todo/${id}`); //redirecting to the right page
    });



  }
  else {
    // respond with an error
    res.status(500)
    res.render('error', {
      message: "Invalid todo"
    });
  }
});

module.exports = router;
