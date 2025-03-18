const express = require('express');
const jwt = require('jsonwebtoken');
const CropInfo = require('../models/cropInfo');
const router = express.Router();

router.get('/', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/auth/login');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const cropInfos = await CropInfo.find({ createdBy: req.user.username });
        res.render('profile', {
            title: 'Profile',
            userId: decoded.id,
            cropInfos,
            user: req.user,
        });
    } catch (err) {
        res.clearCookie('token');
        return res.redirect('/auth/login');
    }
});

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        user: res.locals.user // Pass the user object here
    });
});



router.post('/setThreshold', async (req, res) => {
    const { crop, soil, threshold } = req.body;
    try {
        const cropInfo = new CropInfo({ crop, soil, threshold });
        await cropInfo.save();
        res.redirect('/profile');
    } catch (err) {
        res.status(400).send('Error saving threshold');
    }
});

module.exports = router;
