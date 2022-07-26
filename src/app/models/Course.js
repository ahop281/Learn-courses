const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator')


const Schema = mongoose.Schema

const Course = new Schema(
    {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        image: { type: String, default: '' },
        slug: { type: String, slug: 'title', unique: true },
        videoID: { type: String, default: '' },
    },
    {
        timestamps: true,
    }
)

mongoose.plugin(slug)
Course.plugin(mongooseDelete, { overrideMethods: 'all', deleteAt: true })

module.exports = mongoose.model('Course', Course);