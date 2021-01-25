//REQUIRE MODELS
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//ASSOCIATIONS
Comment.belongsTo(User);

Post.belongsTo(User);

Post.hasMany(Comment);

module.exports = {User, Post, Comment};