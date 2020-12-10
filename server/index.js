require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const nodemailer = require('nodemailer');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const authCtrl = require('./controllers/authController');
const bandCtrl = require('./controllers/bandController');
const forumCtrl = require('./controllers/forumController');

const app = express();

const path = require('path')

app.use(express.static(`${__dirname}/../build`));
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
app.get('/api/bands', authCtrl.getUser);
app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.post('/api/logout', authCtrl.logout);
app.put('/api/bands', authCtrl.editUser);
//nodemailer
app.post('/api/email', authCtrl.email);


app.get('/api/shows', bandCtrl.getAllShows);
app.get('/api/show', bandCtrl.findShow);
app.get('/api/shows/:showid', bandCtrl.getOneShow);
app.get('/api/band/info', bandCtrl.getBandInfo);
app.post('/api/shows', bandCtrl.createShow);
app.post('/api/bands', bandCtrl.addBandInfo);
app.delete('/api/shows/:id', bandCtrl.deleteShow);

app.get('/api/forums', forumCtrl.getAllForums);
app.get('/api/forum', forumCtrl.findForum);
app.post('/api/forums', forumCtrl.addPost);
app.put('/api/forums/:id', forumCtrl.editPost);
app.delete('/api/forums/:id', forumCtrl.deletePost);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
  })

app.listen(SERVER_PORT, () => console.log(`server is on port ${SERVER_PORT}`));
