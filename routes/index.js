const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
// router.get('/', (req, res) => {
//     res.render('index', { title: 'BALIRAJA' });
// });
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        user: res.locals.user 
    });
});

module.exports = router;
