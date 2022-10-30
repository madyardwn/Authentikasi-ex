const router = require('express').Router();
const { moderatorController } = require('../controllers/index.controller');

router.get('/users', moderatorController.getUsers);

router.get('/user/:id', moderatorController.getProfile);

router.post('/update-role', moderatorController.updateRole);

module.exports = router;