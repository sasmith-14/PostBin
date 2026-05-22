const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: "public_lnBUZ5MpTVlqxtrhSqlmnI6qOFA=",
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(buffer) {

    const result = await imagekit.upload({
        file: buffer.toString("base64"),
        fileName: "image.jpg",
    })

    return result;

}

module.exports = uploadFile; 