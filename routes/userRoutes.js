const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create', userController.createUser);
router.patch('/update', userController.updateUser);
router.delete('/delete', userController.deleteUser);
router.get('/list', userController.getAllUser)

module.exports = router;