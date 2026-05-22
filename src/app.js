const express = require('express');
const multer = require('multer');
const uploadFile = require('./services/service.storage');

const upload = multer({ storage: multer.memoryStorage() });

const app = express();

app.use(express.json());

app.post('/post', upload.single('image'), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    
    const file = await uploadFile(req.file.buffer);
    console.log("Uploaded Image URL:", file.url);
    
    res.json({ message: "Post created successfully", url: file.url });
})

module.exports = app;
