const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const schemas = require(__dirname + '/schemas.js');

const Article = schemas.Article;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));


app.route('/articles')
  
  .get( async function (req, res) {
    try {
      await Article.find({}, function (err, articles) {
      res.json(articles);
    });
    } catch (error) {
      res.send(error);
    }
  })
  
  .post( async function (req, res) {
    try {
      await Article.insertMany([{
        title: 'API',
        content: 'API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer.'
      }, {
        title:'Bootstrap',
        content:'This is a framework developed by Twitter that contains pre-made front-end templates for web design'
      }, {
        title:'DOM',
        content:'The Document Object Model is like an API for interacting with our HTML'
      }, {
        title: 'Jack Bauer',
        content: 'Jack Bauer once stepped into quicksand. The quicksand couldn\'t escape and nearly drowned.'
      }, {
        title: 'REST',
        content: 'REST is short for REpresentational State Transfer. It\'s an architectural style for designing APIs.'
      }], (error) => {
        res.send(error);
      });
      res.redirect('/articles');
    } catch (error) {
      res.send(error);
    }
  })

  .delete( async function (req, res) {   
    try {
      await Article.deleteMany();
      res.send('All articles have been erased');
    } catch (error) {
      res.send(error);
    }
  });

///////////////////////////Requests targeting a specific article///////////

app.route('/articles/:articleName')
  
  .get( async function (req, res, next) {
  
    let articleName = req.params.articleName;

    try {
      const article = await Article.findOne({ title: articleName }, function( error, article ) {
        if (!article) {
          res.send('Article has not been created yet');
        }
      })
      res.json(article);
    } catch(error) {
      res.send(error);
    }
  })

  .post( async function (req, res) {

    let title = req.body.title;
    let content = req.body.content;

    try {
      await Article.create({ title, content });
      res.redirect('/articles');
    } catch (error) {
      res.send(error);
    }
  })
  
  .delete( async function (req, res) {

    let article_to_delete = req.params.articleName;

    try {
      await Article.deleteOne({ title: article_to_delete });
      res.send('Article ' + article_to_delete + ' has been successfully deleted');
    } catch (error) {
      res.send(error);
    }
  })

  .put(async function (req, res) {

    let article_to_update = req.params.articleName;
    let new_title = req.body.title;
    let new_content = req.body.content; 

    try {
      await Article.findOneAndUpdate({ title: article_to_update }, {title: new_title, content: new_content}, function ( error, article ) {
        if (!article) {
          res.send('Cannot update a non-existing article');
        } else {
          res.redirect('/articles/' + article_to_update);
        }
      });
    } catch (error) {
      res.send(error);
    }
  })

  .patch(async function (req, res) {

    let article_to_update = req.params.articleName;

    try {
      await Article.findOneAndUpdate({ title: article_to_update }, { $set: req.body }, function ( error, article ) {
        if (!article) {
          res.send('Cannot update a non-existing article');
        } else {
          res.redirect('/articles');
        }
      });
    } catch (error) {
      res.send(error);
    }
  })

app.listen(3000, function() {
  console.log('Server started on port 3000');
});