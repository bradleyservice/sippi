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
    },
    addPost: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.session.user;
        const {title, img, content} = req.body;
        try {
            let post = await db.add_forum_post([title, img, content, id])
            res.status(200).send(post)
        } catch(err){
            console.log('err with addpost func server side', err)
            res.sendStatus(402)
        }
    },
    editPost: async (req, res) => {
        const db = req.app.get('db');
        const {newTitle, newImg, newContent} = req.body;
        try {
            const posts = await db.edit_post([newTitle, newImg, newContent, +req.params.id, req.session.user.id])
            res.status(200).send(posts)
        } catch(err){
            console.log('err on editpost serverside', err)
            res.sendStatus(405)
        }
    },
    findForum: async (req, res) => {
        const db =req.app.get('db');
        const {search} = req.query;
        try {
            let forum = await db.search_forum(search)
            res.status(200).send(forum)
        } catch(err){
            console.log('err on find forum func, back end', err);
            res.sendStatus(406);
        }
    },
    deletePost: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        try {
            const posts = await db.delete_post(+id)
            res.status(200).send(posts)
        } catch(err){
            console.log('err on deletepost func, server', err);
            res.sendStatus(407);
        }
    }
}