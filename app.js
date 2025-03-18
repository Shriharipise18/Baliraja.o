
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const engine = require('ejs-mate');
const passport = require('passport');
const session = require('express-session')
dotenv.config();
const themeRoutes = require('./routes/setTheme'); // Import your routes

const app = express();
app.engine('ejs', engine); // Use ejs-mate
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(themeRoutes);
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/farm';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use((req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (!err) {
                req.user = decoded; // Set decoded user in request
                res.locals.user = decoded; // Make user available in EJS
            } else {
                req.user = null;
                res.locals.user = null;
            }
        });
    } else {
        req.user = null;
        res.locals.user = null;
    }
    next();
});

app.use((req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.locals.user = decoded;
            console.log('User decoded:', decoded); // Debugging log
        } catch (err) {
            res.clearCookie('token');
            console.log('Invalid token, clearing cookie');
        }
    }
    next();
});
app.use((req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.locals.user = decoded;
            console.log('User decoded:', decoded); // Debugging log
        } catch (err) {
            res.clearCookie('token');
            console.log('Invalid token, clearing cookie');
        }
    }
    next();
});
app.get('/', (req, res) => {
    const theme = req.cookies.theme || 'default';
    res.render('index', { theme });
});

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
