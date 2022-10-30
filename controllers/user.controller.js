module.exports = {
    root: (req, res, next) => {
        res.render('index');
    },

    getProfile: async (req, res, next) => {
        // console.log(req.user);
        const person = req.user;
        res.render('profile', { person });
    }
}