var bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  express = require("express"),
  cors = require('cors'),
  jwt = require('jsonwebtoken');
app = express()

mongoose.connect("mongodb://localhost/Angular5Exam")

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions))

app.options('/posts/:id', cors())
app.use(bodyParser.json())

var userSchema = new mongoose.Schema({
  Username: String,
  Password: String,
})
var likeSchema = new mongoose.Schema({
  author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  date: {
    type: Date,
    default: Date.now
  }
})

var postSchema = new mongoose.Schema({
  title: String,
  body: String,
  createdBy: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  liked: {
    type: Boolean,
    default: false
  },
  showComment: {
    type: Boolean,
    default: false
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  likes: [likeSchema]
})

var commentSchema = mongoose.Schema({
  text: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  }

});


var Post = mongoose.model("Post", postSchema),
  User = mongoose.model("User", userSchema),
  Comment = mongoose.model("Comment", commentSchema),
  Like = mongoose.model("Like", likeSchema)

app.post('/signup', function (req, res) {
  User.create(req.body, function (err, data) {
    if (!err) {
      res.send(data)
    } else {
      console.log(err)
    }
  })
})

app.post('/login', function (req, res) {
  User.findOne({
    Username: req.body.Username,
    Password: req.body.Password
  }, function (err, data) {
    if (!err && data != null) {
      var token = jwt.sign({
        'uname': data.Username
      }, 'devalla-secret-key', {
        expiresIn: '1h'
      });
      res.send({
        "loggedIn": true,
        'token': token,
        "user": data
      });
    } else {
      console.log(err);
    }
  })
})

app.use(function (req, res, next) {
  var token = req.headers.authorization;
  if (token) {
    jwt.verify(token, 'devalla-secret-key', function (err, decoded) {
      if (err) {
        console.log('Error');
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    console.log("hi")
  }
});




app.post('/posts', function (req, res) {
  Post.create(req.body, function (err, data) {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  })
})

app.get('/posts', function (req, res) {
  Post.find({}).populate("comments").exec(function (err, data) {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  })
})

app.get('/posts/:id', function (req, res) {
  Post.findById(req.params.id).populate("comments").exec(function (err, data) {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  })
})

app.put("/posts/:id", function (req, res) {
  Post.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    if (!err) {
      res.send(data)
    } else {
      console.log(err)
    }
  })
})

app.put("/posts/like/:id", function (req, res) {
  Post.findById(req.params.id, function (err, data) {
    if (!err && data!=null) {
      let liked = false,
        len = data.likes.length
      for (let i = 0; i < len; i++) {
        if (data.likes[i].author == req.body._id) {
          liked = true
          data.likes.splice(i, 1)
          data.save()
          break
        }
      }
      if (!liked) {
        data.likes.push({
          author:req.body._id
        })
        data.save(function (err, data) {
          res.send({
            flag: "like successful"
          })
        })
      } else {
        res.send({
          flag: "already liked"
        })
      }

    } else {
      console.log(err)
    }
  })
})


app.put("/posts/comment/:id", function (req, res) {
  Comment.create(req.body, function (err, comment) {
    if (!err) {
      Post.findById(req.params.id, function (err, post) {
        post.comments.push(comment)
        post.save(function (err, post) {
          if (!err) {
            res.send(post)
          }
        })
      })
    } else {
      console.log(err)
    }
  })
})

app.delete("/posts/:id", function (req, res) {
  Post.findByIdAndRemove(req.params.id, function (err) {
    if (!err) {
      res.send({
        "flag": "success"
      })
    } else {
      console.log(err)
    }
  })
})



app.listen(2000, function () {
  console.log("sandbox application is running on port 2000");
});
