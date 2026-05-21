const express = require('express')
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const app = express();

app.use(express.json());

app.post('/post', upload.single('image'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.json({ message: "Post created successfully" });
})

module.exports = app;
