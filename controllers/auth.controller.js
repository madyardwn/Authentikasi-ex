const { validationResult } = require('express-validator');
const passport = require('passport');
const User = require('../models/user.model');

module.exports = {
    getLogin: async (req, res, next) => {
        res.render('login');
    },

    postLogin: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('error', errors.array()[0].msg);
            return res.redirect('/auth/login');
        }
        // if admin
        if (req.body.email === process.env.ADMIN_EMAIL) {
            passport.authenticate('local', {
                successRedirect: '/admin/users',
                failureRedirect: '/auth/login',
                failureFlash: true,
            })(req, res, next);
        } else if (req.body.email === process.env.MODERATOR_EMAIL) {
            passport.authenticate('local', {
                successRedirect: '/moderator/users',
                failureRedirect: '/auth/login',
                failureFlash: true,
            })(req, res, next);
        } else {
            passport.authenticate('local', {
                successRedirect: '/user/profile',
                failureRedirect: '/auth/login',
                failureFlash: true,
            })(req, res, next);
        }

    },

    getRegister: async (req, res, next) => {
        res.render('register');
    },

    authRegister: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                errors.array().forEach((error) => {
                    req.flash('error', error.msg);
                });
                res.render('register', {
                    email: req.body.email,
                    messages: req.flash(),
                });
                return;
            }

            const { email } = req.body;
            const doesExist = await User.findOne({ email });
            if (doesExist) {
                req.flash('warning', 'Username/email already exists');
                res.redirect('/auth/register');
                return;
            }
            const user = new User(req.body);
            await user.save();
            req.flash(
                'success',
                `${user.email} registered succesfully, you can now login`
            );
            res.redirect('/auth/login');
        } catch (error) {
            next(error);
        }
    },

    logout: async (req, res, next) => {
        req.logout();
        res.redirect('/');
    }
}