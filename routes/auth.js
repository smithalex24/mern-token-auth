require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcrypt');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

// POST /auth/login route - returns a JWT
router.post('/login', function(req, res, next) {
  console.log('/auth/login post route', req.body);
//Find out if user exists 
  User.findOne({ email: req.body.email })
  .then(function(user) {
  	if(!user || !user.password){
  		return res.status(403).send({message: 'User not found'});
  	}

  	// The user exists. Now we want to validate the password
  	if(!user.authenticated(req.body.password)){
  		//User is invalid
  		return res.status(401).send('Invalid Credentials');
  	}
  		//The user is valid!
  	var token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
  		expiresIn: 60 * 60 * 24

  	});
  	res.send({ user: user, token: token });

  })
  .catch(function(err) {
  	console.log('error was', err);
  	return res.status(503).send('DB error. Sad day.');
  })
});

// POST /auth/signup route - create a user in the DB and then log them in
router.post('/signup', function(req, res, next) {
  //TODO: First check if the user already exists
  console.log('/auth/signup post route', req.body);

  //TODO: First check the user already exists 
  User.findOne({ email: req.body.email })
  .then(function(user) {
  	if(user) {
  		//If the user exists already, don't let them create a duplicate account
  		return res.status(400).send('User exists already');
  	}
  		//Great! This is a new user - let's make them an account!
  		User.create(req.body)
  		.then(function(createdUser) {
  			// Make a token and send it as JSON, so the user can remain logged in
  			var token = jwt.sign(createdUser.toJSON(), process.env.JWT_SECRET, {
  				expiresIn: 60 * 60 * 24 //Expires in 24 hours, in seconds
  			});

  			res.send({ user: createdUser, token: token })
  		})
  		.catch(function(err) {
  			console.log('err', err);
  			res.status(500).send('Could not create user in DB');
  		})
  })
  .catch(function(err) {
  	console.log('err', err);
  	res.status(500).send('Database Error :(')
  });
});

// This is checked on a browser refresh
router.post('/me/from/token', function(req, res, next) {
  // check header or url parameters or post parameters for token
  console.log('find user from token', req.body);
  res.send('keep logged in');
});

module.exports = router;


























