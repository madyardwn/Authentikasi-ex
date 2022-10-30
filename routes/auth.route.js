const router = require('express').Router();
const passport = require('passport');
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');
const { registerValidator } = require('../middlewares/validators');
const { authController } = require('../controllers/index.controller');

router.get(
  '/login',
  ensureLoggedOut({ redirectTo: '/' }),
  authController.getLogin
);

router.post(
  '/login',
  ensureLoggedOut({ redirectTo: '/' }),
  passport.authenticate('local', {
    // successRedirect: '/',
    successReturnToOrRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })
);

router.get(
  '/register',
  ensureLoggedOut({ redirectTo: '/' }),
  authController.getRegister
);

router.post(
  '/register',
  ensureLoggedOut({ redirectTo: '/' }),
  registerValidator,
  authController.authRegister
);

router.get(
  '/logout',
  ensureLoggedIn({ redirectTo: '/' }),
  authController.logout
);

module.exports = router;