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
        const {showid} = req.params;
        try {
            const shows = await db.delete_show(+showid)
            res.status(200).send(shows)
        } catch(err){
            console.log('err on deleteShow func', err)
            res.sendStatus(404)
        }
    }
}