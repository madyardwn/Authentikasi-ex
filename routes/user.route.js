const router = require('express').Router();
const { userController } = require('../controllers/index.controller');

router.get('/profile', userController.getProfile);

router.get('/', userController.root);

module.exports = router;