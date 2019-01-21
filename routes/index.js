var express = require('express');
var router = express.Router();
var firebaseadmin = require("firebase-admin");

var serviceAccount = require("./../test.json");


firebaseadmin.initializeApp({
  credential: firebaseadmin.credential.cert(serviceAccount),
  databaseURL: "https://cloudninedemo-30c2c.firebaseio.com"
});


router.get('/', function(req, res, next) {
  var db=firebaseadmin.database().ref("/"); 
  db.once("value", function (details) {
    console.log(details.val());
      if(details.val()){
      var arr=Object.keys(details.val()); 
    }
    
    res.render('index', {title: 'Express'});
  });
});


router.get('/getUser', function(req, res, next) {
  var db=firebaseadmin.database().ref("/"); 
  db.once("value", function (details) { 
    console.log(details.val());
    if(details.val()){
      var arr=Object.keys(details.val()); 
      var arrVal=Object.values(details.val());
    }
    if(arr==null && arrVal==null){
      res.render('Nodata',{});
    }
    
    res.render('viewUser', { array:arr , arrVal:arrVal});
  });
});



router.post('/collect', function(req, res, next) {
  var db=firebaseadmin.database().ref("/"+req.body.title); 
  // db.set(obj);
  var obj={
    title:req.body.title,
    author:req.body.author,
    genre:req.body.genre
  }
  db.set(obj);
  var db=firebaseadmin.database().ref("/"); 
  db.once("value", function (details) {
    var arr=Object.keys(details.val());
    var arrVal=Object.values(details.val());
  res.render('formsubmission',{});
});
});

router.post('/delete', function(req, res, next) {
  var y=req.body.delete;
  var z=req.body.update;
  if(y){
  var x=req.body.deleteval;
  console.log(x);
  var db=firebaseadmin.database().ref("/"+x);
  db.set(null)
  .catch(function (error) {
    console.error(error);
  });
  res.render('delete',{});
}
else
{
  var preKey=req.body.preTitle;
  var title=req.body.deleteval;
  var author=req.body.author;
  var genre=req.body.genre;
  var obj={
    title:title,
    author:author,
    genre:genre
  }
  console.log(req.body);
  var db=firebaseadmin.database().ref("/"+preKey);
  db.set(null)
  .catch(function (error) {
    console.error(error);
  });
  var db=firebaseadmin.database().ref("/"+title);
  db.set(obj)
  .catch(function (error) {
    console.error(error);
  });
  res.render('updated',{});
}
});





router.post('/deleteAll', function(req, res) {
  var db=firebaseadmin.database().ref("/"); 
  db.once("value", function (details) { 
    console.log(details.val());
    if(details.val()){
      var arr=Object.keys(details.val()); 
      var arrVal=Object.values(details.val());
    }
  
  db.set(null)
  .catch(function (error) {
    console.error(error);


  });
});
  res.render('delete',{});
  
});

router.post('/updatedata', function(req, res) {
  var preKey=req.body.preTitle;
  var title=req.body.deleteval;
  var author=req.body.author;
  var genre=req.body.genre;
  var obj={
    title:title,
    author:author,
    genre:genre
  }
  console.log(req.body);
  var db=firebaseadmin.database().ref("/"+preKey);
  db.set(null)
  .catch(function (error) {
    console.error(error);
  });
  var db=firebaseadmin.database().ref("/"+title);
  db.set(obj)
  .catch(function (error) {
    console.error(error);
  });
  res.render('updated',{});
});



router.post('/update', function(req, res, next) {
  console.log("here in update",req.body.updateval);
  var x=req.body.updateval;
  var db=firebaseadmin.database().ref("/"+x); 
  db.once("value", function (details) {
    console.log(details.val());
      if(details.val()){
      var arr=Object.keys(details.val()); 
      var arrVal=Object.values(details.val());
    }
    
    res.render('update', {array:arr , arrVal:arrVal});
  
  });
});

router.post('/updated', function(req, res, next) {
  var preKey=req.body.preTitle;
  var title=req.body.title;
  var author=req.body.author;
  var genre=req.body.genre;
  var obj={
    title:title,
    author:author,
    genre:genre
  }
  console.log(req.body);
  var db=firebaseadmin.database().ref("/"+preKey);
  db.set(null)
  .catch(function (error) {
    console.error(error);
  });
  var db=firebaseadmin.database().ref("/"+title);
  db.set(obj)
  .catch(function (error) {
    console.error(error);
  });
  res.render('updated',{});
});

module.exports = router;
