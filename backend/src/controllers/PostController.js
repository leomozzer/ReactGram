const Post = require('../models/Post');
// const pathResized = require('')
const sharp = require('sharp');
const path = require('path')
const fs = require('fs');
module.exports = {
    async index(req, res){
        const posts = await Post.find().sort('-createdAt');
        return res.json(posts);
    },

    async store(req, res){
        const {author, place, description, hashtags} = req.body;
        const {filename : image} = req.file;
        const [name] = image.split('.');
        const fileName = `${name}.jpg`;
        await sharp(req.file.path)
            .resize(500)
            .jpeg({quality: 100})
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )
        fs.unlink(req.file.path)
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image : fileName,
        });
        req.io.emit('post', post);
        return res.json(post);
    },

    async delete(req, res){
        const id = req.params.id;
        const post = await Post.findById(id);
        const deletePost = await Post.deleteOne(post);
        fs.access('./uploads/resized', error => {
            if(!error){
                fs.unlink(`./uploads/resized/${post.image}`)
            }else{
                console.log(error)
            }
        })
        const currentPosts = await Post.find().sort('-createdAt');
        req.io.emit('delete', currentPosts);
        return res.json(currentPosts);
    },

    async addComment(req, res){
        const id = req.params.id;
        const newComment = {
            author : req.query.author,
            text : req.query.text
        }
        const post = await Post.findById(id);
        const newArray = [newComment, ...post.comments]
        const update = await Post.findByIdAndUpdate({_id : id}, {comments : newArray})
        const currentPosts = await Post.find().sort('-createdAt');
        req.io.emit('comment', currentPosts);
        return res.json(currentPosts);
    }

}