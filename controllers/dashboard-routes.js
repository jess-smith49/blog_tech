const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');

//posts 
//need withAuth util
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        
    })
})


//EDIT A POST
router.get('/edit:id', withAuth, (req,res) => {
    
})

//DELETE A POST
router.delete('/delete:id')