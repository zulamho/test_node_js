const Post = require("../models/Post.model");
const User = require("../models/User.model");
const path = require("path");

module.exports.postController = {
  createPost: async (req, res) => {
    const { author, message, image } = req.body;
    try {
      const post = await Post.create({
        author: req.user.id,
        message,
        pathImage: image,
      });
      res.json(post);
    } catch (err) {
      res.json(err);
    }
  },

  editPost: async (req, res) => {
    try {
      await Post.findByIdAndUpdate(req.params.id, req.body);
      res.json("Запись успешно изменена");
    } catch (err) {
      res.json(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      await Post.findByIdAndRemove(req.params.id);
      res.json("Запись удалена");
    } catch (err) {
      res.json(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const { page = 1, limit = 20 } = req.query;    
    
      const posts = await Post.find().lean()
      const pages = Math.ceil(posts.length / 20);
      console.log(posts)
      const postsPage = await Post.find().lean().limit(limit * 1)
         .skip((page - 1) * limit);
 
      res.json({ postsPage, pages, success: "Услуги успешно загружены" });
    } catch (err) {
      res.json(err);
    }
  },

  
  addImage: async (req, res) => {
    try {
      const img = req.files.image;
      const newFileName = `./image/${
        Math.random() * 10000000000000000
      }${path.extname(img.name)}`;

      img.mv(newFileName, async (err) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            success: "file uploaded",
            image: newFileName,
          });
        }
      });
    } catch (e) {
      res.json(e);
    }
  },
};
