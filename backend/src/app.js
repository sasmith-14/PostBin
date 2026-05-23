const express = require('express');
const multer = require('multer');
const uploadFile = require('./services/service.storage');
const postModel = require('./db/models/post.model');

const upload = multer({ storage: multer.memoryStorage() });

const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/post', upload.single('image'), async (req, res) => {

    const file = await uploadFile(req.file.buffer);
    console.log("Uploaded Image URL:", file.url);

    const post = new postModel({
        image: file.url,
        caption: req.body.caption
    });

    await post.save();

    res.status(201).json({
        message: "Post created",
    });
})

app.get('/feed', async (req, res) => {

    const posts = await postModel.find();
    return res.status(200).json(posts);

})

module.exports = app;
