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

app.use("/public", express.static(__dirname + '/public'));
app.use('/favicon.ico', express.static('public/images/favicon.ico'));
app.use(bodyparser.json());
 
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphb({ extname: 'hbs', defaultLayout: 'mainLayout', layoutDir: __dirname + 'views/layouts/' }));
app.set('view engine', 'hbs');
 
app.use('/users', usersController);

app.get('/', (req, res) => {
    res.render('users/signin');
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));