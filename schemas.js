const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/restful-api', {useNewUrlParser: true});

const articleSchema = mongoose.Schema ({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    content: {
        type: String,
        required: [true, 'content is required']
    }
})

const Article = mongoose.connection.model('Article', articleSchema);

module.exports.Article = Article;