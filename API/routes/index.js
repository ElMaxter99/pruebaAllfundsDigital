const express = require('express');
const documents = require('../apiServices/documents/routes');

const router = express.Router();

router.use('/documents', documents);

module.exports = router;
