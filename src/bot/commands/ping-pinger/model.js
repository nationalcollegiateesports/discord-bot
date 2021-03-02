const mongoose = require('mongoose');

// See: https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose

let model;

try {
    model = mongoose.model('Pinger');
} catch (error) {
    model = mongoose.model('Pinger', {
        guildId: String,
        id: String,
        url: String
    });
}

module.exports = model;
