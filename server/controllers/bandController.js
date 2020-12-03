module.exports = {
    createShow: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.session.user;
        const {title, img, content} = req.body;
        try {
            let newShow = await db.add_show([title, img, content, id])
            res.status(200).send(newShow)
        } catch(err){
            console.log('error in createShow func', err)
            res.sendStatus(401)
        }
    },
    getAllShows: async (req, res) => {
        const db = req.app.get('db');
        try {
            const shows = await db.get_all_shows();
            res.status(200).send(shows)
        } catch(err){
            console.log('err in getAllShows func', err)
            res.sendStatus(402)
        }
    },
    getOneShow: async (req, res) => {
        const db = req.app.get('db');
        const {showid} = req.params;
        try {
            const show = await db.get_one_show(+showid)
            res.status(200).send(show)
        } catch(err){
            console.log('err in getOneShow func', err)
            res.sendStatus(403)
        }
    },
    deleteShow: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        try {
            const shows = await db.delete_show(id)
            res.status(200).send(shows)
        } catch(err){
            console.log('err on deleteShow func, server', err)
            res.sendStatus(404)
        }
    },
    addBandInfo: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.session.user;
        const {band_pic, band_name, band_description, band_genre} = req.body;
        try {
            let bandInfo = await db.add_band_info([band_pic, band_name, band_description, band_genre, id]);
            res.status(200).send(bandInfo)
        } catch(err){
            console.log('err on addbandinfo func, serverside', err)
            res.sendStatus(405)
        }
    },
    getBandInfo: async (req, res) => {
        const db = req.app.get('db');
        // const {id} = req.session.user;
        try {
            let info = await db.get_band_info()
            res.status(200).send(info)
        } catch(err){
            console.log('err on getbandinfo func back end', err)
        }
    },
    findShow: async (req, res) => {
        const db = req.app.get('db');
        const {search} = req.query;
        try {
            let show = await db.search_show(search);
            res.status(200).send(show)
        } catch(err){
            console.log('err on server findshow', err)
            res.sendStatus(501);
        }
    }
}