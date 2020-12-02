require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const authCtrl = require('./controllers/authController');
const bandCtrl = require('./controllers/bandController');

const app = express();

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    console.log('db up')
}).catch(err => console.log(err))

//ENDPOINTS
app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.post('/api/logout', authCtrl.logout);
app.put('/api/bands', authCtrl.editUser);
app.get('/api/bands', authCtrl.getUser);
app.post('/api/shows', bandCtrl.createShow);
app.get('/api/shows', bandCtrl.getAllShows);
app.get('/api/shows/:showid', bandCtrl.getOneShow);
app.delete('/api/shows/:id', bandCtrl.deleteShow);
app.post('/api/bands', bandCtrl.addBandInfo);
app.get('/api/band/info', bandCtrl.getBandInfo);


app.listen(SERVER_PORT, () => console.log(`server is on port ${SERVER_PORT}`));
