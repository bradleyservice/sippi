module.exports = {
    getAllForums: async (req, res) => {
        const db = req.app.get('db');
        try {
            let forums = await db.get_all_forums();
            res.status(200).send(forums);
        } catch(err){
            console.log('err on getallforums func server', err);
            res.sendStatus(402);
        }
    }
}