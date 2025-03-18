// const express = require('express');
// const User = require('../models/user');
// const jwt = require('jsonwebtoken');
// const router = express.Router();

// router.get('/signup', (req, res) => {
//     res.render('signup');
// });

// router.post('/signup', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = new User({ username, password });
//         await user.save();
//         res.redirect('/auth/login');
//     } catch (err) {
//         res.status(400).send('Error creating user');
//     }
// });

// router.get('/login', (req, res) => {
//     res.render('login');
// });

// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (user && await user.matchPassword(password)) {
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.cookie('token', token, { httpOnly: true });
//         res.redirect('/profile');
//     } else {
//         res.status(400).send('Invalid credentials');
//     }
// });

// module.exports = router;
const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signup');
});


router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.redirect('/auth/login');
    } catch (err) {
        res.status(400).send('Error creating user');
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await user.matchPassword(password)) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/profile');
    } else {
        res.status(400).send('Invalid credentials');
    }
});

// Logout route
router.post('/logout', (req, res) => {
    res.clearCookie('token').redirect('/');
});


module.exports = router;

