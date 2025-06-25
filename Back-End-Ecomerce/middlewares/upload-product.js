const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = 'public/images/products';

        if (req.baseUrl.includes('/users')) {
            folder = 'public/images/users';
        }

        cb(null, folder);
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (error, buffer) => {
            if (error) return cb(error);

            const filename = buffer.toString('hex') + path.extname(file.originalname);

            cb(null, filename);
        });
    }
});

const upload = multer({ storage }).single('image');

module.exports = upload;
