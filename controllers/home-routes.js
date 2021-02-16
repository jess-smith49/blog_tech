const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');

//GET ALL POSTS FOR HOME PAGE
router.get('/', (req, res) => {
    Post.findAll({
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
        const posts = dbPostData.map(post => post.get({plain: true}));
        res.render('all-posts', {
            posts,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

//SINGLE POST
router.get('/post/:id', (req, res) => {
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

        const post = dbPostData.get({plain: true})
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        res.status(500).json(err);
    })
})


router.get('/login', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/sign-up', (req,res) => {
    if(req.secure.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('sign-up');
})

module.exports = router;