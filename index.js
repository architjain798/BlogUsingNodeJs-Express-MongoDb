const { response } = require('express');
const express = require('express');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const { request } = require('http');
const port = 8000;
const path = require('path');


const app = express();
app.use(express.static('assets'))

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}
)


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


app.get('/', async (request, response) => {
    /*
    const articles = [
        {
            title: 'Test Article',
            createdAt: new Date,
            description: 'Test description'
        },
        {
            title: 'Test Article',
            createdAt: new Date,
            description: 'Test description'
        }
    ]; */
    const articles = await Article.find().sort({ createdAt: 'desc' })
    response.render('articles/home', {
        articles: articles
    });
})

app.listen(port, (err) => {
    if (err) {
        console.log('error in running');
    }
    console.log('server is running', port);
})
app.use('/articles', articleRouter);