/*This file will help us connect to the database so we can get
some data out of it*/

//Create the environment
//This is going to be the file that the environment is
// going to be run in
const environment = process.env.Node_ENV || 'development';
console.log(environment);
const config = require('../knexfile')[environment];

module.exports = require('knex')(config);
