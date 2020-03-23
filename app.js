require('./models/mongodb');
 
const express = require('express');
var app = express();
const path = require('path');
const exphb = require('express-handlebars');
const bodyparser = require('body-parser');
const usersController = require('./controllers/usersController');
const postsController = require('./controllers/postsController');
const homeController = require('./controllers/homeController');
var session = require('express-session');
const auth = require('./middleware/auth');

app.use(session({
    key: 'expressMvc',
    secret: 'expressMVCSecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

global.config = require('./configs/config');

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use("/public", express.static(__dirname + '/public'));
app.use('/favicon.ico', express.static('public/images/favicon.ico'));
app.use(bodyparser.json());
 
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphb({ extname: 'hbs', defaultLayout: 'mainLayout', layoutDir: __dirname + 'views/layouts/' }));
app.set('view engine', 'hbs');

app.use('/users', usersController);
app.use('/posts', postsController);
app.use('/home', homeController);

app.get('/', auth, (req, res) => {
    res.render('home', { userName: req.body.name});
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
