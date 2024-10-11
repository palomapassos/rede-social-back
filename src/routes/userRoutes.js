const express = require("express");
const { createNewTable, createUser, updateUser, deleteUser, getUser, getUsers } = require("../controllers/userController");

const router = express.Router();

// Create Table
router.post('/createTable', createNewTable);

// CRUD users
router.post('/createUser', createUser);
router.put('/updateUser', updateUser);
router.delete('/deleteUser/:id', deleteUser);
router.get('/userById/:id', getUser);
router.get('/allUsers', getUsers);

module.exports = router;