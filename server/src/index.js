const express = require('express');
const router = express.Router();

router.use('/api/v1', require('./routes/app'));

module.exports = router;