const UsersController = require('../controllers/app');
const express = require('express');
const router = express.Router();
const multer  = require('multer'); 
const upload = multer({ dest: __dirname + '/uploads/' });

router.route('/upload').post(upload.single('file'), UsersController.uploadCsv);

module.exports = router;