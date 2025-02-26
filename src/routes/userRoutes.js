const express = require("express");
const { createTables, createUser, updateUser, deleteUser, getUser, getUsers, createPost, deletePost, getPosts, auth } = require("../controllers/userController");

const { verifyTokenMiddleware } = require("../middlewares/verifyToken.js");

const generalRoutes = express.Router();
const onlyAuthRoutes = express.Router();

onlyAuthRoutes.use(verifyTokenMiddleware);

// Create Users Table e Posts Table
generalRoutes.post('/createTables', createTables);

// Auth
generalRoutes.post('/auth', auth);

// CRUD users
generalRoutes.post('/createUser', createUser);
onlyAuthRoutes.put('/updateUser', updateUser);
onlyAuthRoutes.delete('/deleteUser/:id', deleteUser);
onlyAuthRoutes.get('/userById/:id', getUser);
onlyAuthRoutes.get('/allUsers', getUsers);

// posts
onlyAuthRoutes.post('/createPost', createPost);
onlyAuthRoutes.delete('/deletePost/:id', deletePost);
onlyAuthRoutes.get('/allPosts', getPosts);



module.exports = { generalRoutes, onlyAuthRoutes };