const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    privateKey: "private_HzNkfeig/K6cstci6TkjYkXDIIc=",
    publicKey: "public_lnBUZ5MpTVlqxtrhSqlmnI6qOFA=",
    urlEndpoint: "https://ik.imagekit.io/your_imagekit_id" // Usually required by ImageKit
});

async function uploadFile(buffer) {

    const result = await imagekit.upload({
        file: buffer.toString("base64"),
        fileName: "image.jpg",
    })

    return result;

}

module.exports = uploadFile; 