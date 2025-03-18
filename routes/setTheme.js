
const express = require('express');
const router = express.Router();
router.post('/setTheme', (req, res) => {
    const { theme } = req.body;
    if (!theme) {
        return res.status(400).send('Theme not selected');
    }

    res.cookie('theme', theme, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); // Store theme for 30 days
    res.redirect('back'); // Go back to the previous page
});

module.exports = router;

