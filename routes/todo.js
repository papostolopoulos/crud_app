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


//FUNCTION DECLARATIONS
//Validation function for confirming if the todo object data is valid
function validTodo(todo) {
  return typeof todo.title === 'string' &&
  todo.title.trim() !== '' &&
  typeof todo.priority !== 'undefined' &&
  !isNaN(Number(todo.priority));
}


//Function that sends the response and renders content for the GET
function respondAndRenderTodo(req, res, viewName) {
  let id = req.params.id
  console.log(req.params.id);
  if (typeof id !== "undefined") {
   knex("todo") //select todo
   .select() //select everything from todo
   .where({"id": id}) //limit to the particular id
   .first() //LIMIT 1 (SQL)
   .then(todo => {
     console.log(todo);
     res.render(viewName, {
       id: id,
       title: todo.title,
       priority: todo.priority,
       description: todo.description,
       done: todo.done,
       date: todo.date
     });
   });
 }
 else {
   res.status(404);
   res.render("error",  () => {
     message: "Invalid ID";
   });
 }
}


//For POST and for PUT
function validateTodoInsertUpdateRedirect(req, res, callback) {
  if (validTodo(req.body)) {

    //Variable that collects the data from the different form components
    let todo = {
      title: req.body.title,
      description: req.body.description,
      priority: Number(req.body.priority)
      // date: new Date() //put in the router.put and router.post instead
    };

    callback(todo);
  }

  else {
    // respond with an error
    res.status(500)
    res.render('error', {
      message: "Invalid todo"
    });
  }
}


//ROUTES
//Route for the form page / new entry
router.get('/new', (req, res) => {
  res.render('new');
});


//Route for individual entries
router.get('/:id', (req, res) => {
  respondAndRenderTodo(req, res, "single")
});


//Route for editing the existing entries
router.get("/:id/edit", (req, res) => {
  // let id = req.params.id;
  respondAndRenderTodo(req, res, "edit");
});


//Route for getting the data from the form
router.post('/', (req, res) => {
  console.log(req.body);
  validateTodoInsertUpdateRedirect(req, res, (todo) => {
    todo.date = new Date();
    //Insert in database
    knex("todo") //give me the todo table
    .insert(todo, 'id') //insert the todo variable, I also want to return the id (First he thought he wanted to return the hgfdtkk whole todo columns (asterisc))
    .then(ids => { //use the data from the entry by calling it "todos" as an argument. This is an array of length one (only one entry)
      const id = ids[0]; //we define that id equals to the first (and only) element of the array (ids[0])
      res.redirect(`/todo/${id}`); //redirecting to the right page
    });
  });

  //old code:
  // if (validTodo(req.body)) {
  //
  //   //Variable that collects the data from the different form components
  //   let todo = {
  //     title: req.body.title,
  //     description: req.body.description,
  //     priority: Number(req.body.priority),
  //     date: new Date()
  //   };
  //
  //   //Insert in database
  //   knex("todo") //give me the todo table
  //   .insert(todo, 'id') //insert the todo variable, I also want to return the id (First he thought he wanted to return the hgfdtkk whole todo columns (asterisc))
  //   .then(ids => { //use the data from the entry by calling it "todos" as an argument. This is an array of length one (only one entry)
  //     const id = ids[0]; //we define that id equals to the first (and only) element of the array (ids[0])
  //     res.redirect(`/todo/${id}`); //redirecting to the right page
  //   });
  // }
  //
  // else {
  //   // respond with an error
  //   res.status(500)
  //   res.render('error', {
  //     message: "Invalid todo"
  //   });
  // }

});


//Update an existing entry with put
router.put('/:id', (req, res) =>{
  console.log(req.body);
  validateTodoInsertUpdateRedirect(req, res, (todo) => {
    todo.date = new Date();
    //Insert in database
    knex("todo") //give me the todo table
    .where("id", req.params.id)
    .update(todo, 'id') //insert the todo variable, I also want to return the id (First he thought he wanted to return the hgfdtkk whole todo columns (asterisc))
    .then(() => { //use the data from the entry by calling it "todos" as an argument. This is an array of length one (only one entry)
    console.log("rainbow");
      res.redirect(`/todo/${req.params.id}`); //redirecting to the right page
    });
  });
});

router.delete('/:id', (req,res) =>{
  let id = req.params.id
  if (typeof id !== "undefined") {
   knex("todo") //select todo
   .select() //select everything from todo
   .where({"id": id}) //limit to the particular id
   .del() //delete the entry
   .then(todo => {
     console.log('todo', todo);
     res.redirect('/todo');
   });
 }
 else {
   res.status(404);
   res.render("error",  () => {
     message: "Invalid ID";
   });
 }
});

module.exports = router;
