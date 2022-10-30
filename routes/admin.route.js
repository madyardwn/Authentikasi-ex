const router = require('express').Router();
const { adminController } = require('../controllers/index.controller');

router.get('/users', adminController.getUsers);

router.get('/user/:id', adminController.getProfile);

router.post('/update-role', adminController.updateRole);

module.exports = router;