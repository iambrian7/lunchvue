const express = require("express");
var path = require('path');
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const lunchRoutes = require("./api/routes/lunches");
const groupRoutes = require("./api/routes/groups");
const userRoutes = require('./api/routes/user');
var commentsRoutes = require('./api/routes/comments_gmail');

var databaseName = 'test'
var atlas_uri = 'mongodb://brian123:brian123@mongodbcluster-free1-shard-00-00-7juzj..net:27017,cluster-free1-shard-00-01-7juzj.mongodb.net:27017' + 
',cluster-free1-shard-00-02-7juzj.mongodb.net:27017' + 
`/${databaseName}` + 
'?ssl=true&replicaSet=cluster-free1-shard-0&authSource=admin&retryWrites=true'


// var uri = 'mongodb://iambrian:bkcbkc07!@' +
//   'MY_SERVER-shard-00-00-clv3h.mongodb.net:27017,' +
//   'MY_SERVER-shard-00-01-clv3h.mongodb.net:27017,' +
//   'MY_SERVER-shard-00-02-clv3h.mongodb.net:27017/MY_DATABASE' +
//   'ssl=true&replicaSet=MY_REPLICASET_NAME-shard-0&authSource=MY_ADMIN_DATABASE';

// mongoose.connect(uri,{
//    // useMongoClient: true,
//     useNewUrlParser: true
//   });

//var atlas_uri = `mongodb://brian123:brian123@cluster-free1-7juzj.mongodb.net/${databaseName}?retryWrites=true`
// mongodb+srv://brian123:brian123@cluster-free1-7juzj.mongodb.net/test?retryWrites=true


  var options = {useNewUrlParser: true}
  mongoose.connect(atlas_uri, options, function(error) {
   if (error){
     console.log(`error connecting to test ${error}`)
   } else {
     console.log(`mongoose connected with ${atlas_uri} : test`)
   }

  });
// commenting out example code  
// mongoose.connect(
//   "mongodb://node-shop:" +
//     process.env.MONGO_ATLAS_PW +
//     "@node-rest-shop-shard-00-00-wovcj.mongodb.net:27017,node-rest-shop-shard-00-01-wovcj.mongodb.net:27017,node-rest-shop-shard-00-02-wovcj.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin",
//   {
//     useMongoClient: true
//   }
// );
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// seed admin
const UserController = require('./api/controllers/user');
UserController.seed_admin()
//var seed = require()


// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/lunches", lunchRoutes);
app.use("/group", groupRoutes);
app.use("/user", userRoutes);
app.use('/comments', commentsRoutes);
var go = path.join(__dirname, '../', 'client')
console.log(`static is ${go}`)
console.log(`static is ${path.join(__dirname, 'public')}`)
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(go));

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
