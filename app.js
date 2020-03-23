require('./models/mongodb');
 
const express = require('express');
var app = express();
const path = require('path');
const exphb = require('express-handlebars');
const bodyparser = require('body-parser');
const usersController = require('./controllers/usersController');
const postsController = require('./controllers/postsController');
var session = require('express-session');

app.use(session({
    key: 'expressMvc',
    secret: 'expressMVCSecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

const auth = require('./middleware/auth');

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

//app.use(auth);
 
app.use('/users', usersController);
app.use('/posts', postsController);

app.get('/', (req, res) => {
    res.render('users/signin');
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
