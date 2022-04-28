const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/', controller.getDocuments);
router.post('/', controller.createDocument);
router.delete('/:id', controller.deleteDocument);
router.patch('/:id', controller.archivarDocument)


module.exports = router;