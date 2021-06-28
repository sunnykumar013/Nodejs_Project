var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var ejs = require('ejs');
var engine = require('ejs-mate');
var fileUpload = require('express-fileupload');

var app = express();

mongoose.connect('mongodb+srv://user1:sunny123@pinterest.iv5jn.mongodb.net/pinterest?retryWrites=true&w=majority',function(err){
  if(err){
    console.log(err);
  }else {
    console.log('connected to db');
  }
})

//midlware
app.use(fileUpload());
app.use(express.static(__dirname +'/public'));
app.engine('ejs',engine);
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended : true
}));
app.use(morgan('dev'));

require('./routes/main')(app);
require('./routes/pins')(app);


app.listen(8090,function(err){
  if(err){
    console.log(err);
  }else {
    console.log('connected to port 8090');
  }
})
