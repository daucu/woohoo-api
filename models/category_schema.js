const mongoose = require('mongoose');
const Schema = mongoose.Schema;





const categorySchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    images: {
        image: {
            type: String,
        },
        thumbnail: {
            type: String,
        }
    },
    subcategoriesCount: {
        type: Number,
    },
    subcategories: []
}, {
    timestamps: true,
    strict: false
});

module.exports = mongoose.model('Category', categorySchema);