const mongoose = require('mongoose');

module.exports = class ConfigHandler {
    constructor(uri) {
        mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
        const db = mongoose.connection;
        db.on('error', console.error);
        db.once('open', () => console.log('open'));
    }

    async get(model, guildId) {
        const result = await model.find({ guildId }).exec();
        return result.length > 0 ? result[0] : undefined;
    }

    async set(model, document) {
        const result = await model.findOneAndUpdate({ guildId: document.guildId }, document).exec();

        if (result === null) {
            return await model.create(document);
        } else {
            return result;
        }
    }
};
