const mongoose = require('mongoose');

const DocumentSchema =new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    date: { type: Date, default: Date.now },
    content: { type: String, require: true },
    author: { type: String, require: true },
    archiveDate: { type: Date }
});

module.exports = mongoose.model("document", DocumentSchema);