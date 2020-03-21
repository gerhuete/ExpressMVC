require('./models/mongodb');
 
const express = require('express');
var app = express();
const path = require('path');
const exphb = require('express-handlebars');
const bodyparser = require('body-parser');
 
const usersController = require('./controllers/usersController');

app.use(bodyparser.urlencoded({
extended: true
}));

app.get('/', (req, res) => {
    res.render('users/signin');
});

app.use(express.static(path.join(__dirname, 'content')));

app.use('/favicon.ico', express.static('content/images/favicon.ico'));

app.use(bodyparser.json());
 
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphb({ extname: 'hbs', defaultLayout: 'mainLayout', layoutDir: __dirname + 'views/layouts/' }));
app.set('view engine', 'hbs');
 
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
 
app.use('/users', usersController);