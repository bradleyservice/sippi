const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const {EMAIL, PASSWORD} = process.env;

module.exports = {
    register: async (req, res) => {
        // see if user exists (we don't want it to)
        // store user on db
        // log user in on session and send user to front end
        const db = req.app.get('db');
        const {email, username, password} = req.body;
        try {
            let [foundUser] = await db.check_user(email);
            if(foundUser){
                return res.status(403).send('Email already exists')
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            let [newUser] = await db.add_user([email, username, hash]);
            req.session.user = newUser
            res.status(200).send(req.session.user)
        } catch(err){
            console.log('error on register function', err)
        }
    },
    login: async (req, res) => {
        // see if a user exists
        // check the password
        // log user in on session and send user to front end
        const db = req.app.get('db');
        const {email, password} = req.body;
        try {
            const [foundUser] = await db.check_user(email);
            if(foundUser){
                const comparePassword = foundUser.password;
                const authenticated = bcrypt.compareSync(password, comparePassword)
                if(authenticated){
                    delete foundUser.password;
                    req.session.user = foundUser;
                    res.status(200).send(req.session.user)
                } else {
                    res.status(403).send('Incorrect login information')
                }
            } else {
                res.status(403).send('Incorrect login information')
            }
        } catch(err){
            console.log('erron on login function', err)
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getUser: (req, res) => {
        res.status(200).send(req.session.user)
    },
    editUser: async (req, res) => {
        //want the user to be able to update their profile picture once they log in
        //and not worry about it during the register phase
        const db = req.app.get('db');
        const {img, username} = req.body;
        const {id} = req.session.user;
        try {
            const [updatedUser] = await db.edit_user([id, img, username])
            req.session.user = updatedUser;
            res.status(200).send(req.session.user)
        } catch(err){
            console.log('error on edituser function', err)
        }
    },
    email: async (req, res) => {
        // nodemailer backend function/layout
        const {name, message, email, title, image} = req.body;
        try {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                }
            });
            let info = await transporter.sendMail({
                from: `'${name}' <${email}>`,
                replyTo: `${email}`,
                to: EMAIL,
                subject: title,
                text: message,
                html: `<div>${message}</div>
                <img src="cid:unique@nodemailer.com"/>`,
                attachments: [
                    {
                        filename: 'license.txt',
                        path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
                    },
                    {
                        cid: 'unique.nodemailer.com',
                        path: image
                    }
                ]
            }, (err, res) => {
                if(err){
                    console.log('err', err)
                } else {
                    // console.log('res', res)
                    res.status(200).send(info)
                }
            })
        } catch(err){
            console.log('err on nodemailer', err)
            res.sendStatus(502)
        }
    }
}