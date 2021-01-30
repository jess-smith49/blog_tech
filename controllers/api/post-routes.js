const router = require('router').Router();
const {Post, User, Comment} = require('../../models');


//GET ONE POST
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_title',
            'post_body'
        ],
        include: [
            {
               model: Comment,
               attributes: ['id', 'comment_text', 'post_id'],
               include: {
                   model: User,
                   attributes: ['username']
               }
            },
            {
                model: User,
                attributes: ['username']
            }  
        ]
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'No post found.'})
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        res.status(500).json(err);
    })
      
});

//CREATE A POST
router.post('/', withAuth, (req, res) => {
    Post.create({
        post_title: req.body.post_title,
        post_body: req.body.post_body,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        res.status(500).json(err)
    })
});



//UPDATE A POST
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            post_title: req.body.post_title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'No post found.'})
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
})




//DELETE A POST
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'No post found.'})
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

module.exports = router;

