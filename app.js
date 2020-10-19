//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://admin-rama:Milano7137@cluster0.j1tz7.gcp.mongodb.net/blogPostDB',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String
    
  },
  author: {
    type: String,
    required: true,
  },
  textDate: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model('Post', postSchema);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const homeStartingContent =
  'Welcome to this simple blogpost website. Feel free to compose a new post and publish it to this Journal. Thank you!';
const aboutContent = `Created as an exercise in a Webdeveloper course. I've set up a server using Node.js/Express with ejs templates to render the pages. The posts are stored in a MongoDB database and are managed by the ODM Mongoose`;
const contactContent = `My name is Rama Sabajo. living in Amsterdam. At the moment I'm looking for a job opportunity to grow as a front-end developer. Feel free to contact me.`;

app.get('/', (req, res) => {
  Post.find({}, (err, foundPosts) => {
    if (err) {
      console.log(err);
    } else {
      const sortedPosts = foundPosts.sort((a, b) => b.date.localeCompare(a.date));
      res.render('home', {
        startingContent: homeStartingContent,
        posts: sortedPosts,
      });
    }
  });
});

app.get('/about', (req, res) => {
  res.render('about', { aboutContent: aboutContent });
});

app.get('/contact', (req, res) => {
  res.render('contact', { contactContent: contactContent });
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.post('/compose', (req, res) => {
  const numberDate = date.getDateNumber();
  const textDate = date.getDateText();

  const newPost = new Post({
    title: req.body.postTitle,
    body: req.body.postBody,
    author: req.body.postAuthor,
    textDate: textDate,
    date: numberDate,
  });
console.log(newPost);

  newPost.save(err => {
    if (!err) {
      res.redirect('/');
    } else {
      console.log(err)
    }
  });
});

app.get('/posts/:id', (req, res) => {
  const requestedPostId = req.params.id;

  Post.findOne({ _id: requestedPostId }, (err, foundPost) => {
    if (err) {
      console.log(err);
    } else {
      res.render('post', {
        title: foundPost.title,
        body: foundPost.body,
        author: foundPost.author,
        textDate: foundPost.textDate
      });
    }
  });
});

let port = process.env.PORT;
if (port == null || port == '') {
  port = 3000;
}

app.listen(port, function () {
  console.log('Server started succesfully');
});
