const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    any: {
        type: Schema.Types.Mixed,
    }
}, {
    timestamps: true,
    strict: false
});


module.exports = mongoose.model('Product', productSchema);