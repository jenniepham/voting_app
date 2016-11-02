var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

   passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "https://pickmevote.herokuapp.com/auth/twitter/callback"
      },
      function(token, tokenSecret, profile, cb) {
        User.findOrCreate({ twitterId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));
    


app.use(express.static(__dirname + '/public'));
app.get('/', function(request, response){
   

response.sendFile(__dirname + "/public/index.html"); 

});


app.get("/home", function(request, response){
   response.sendFile(__dirname + "/public/home.html"); 
   
});

app.post('/home/form', function(request, response){
   var form = request.body;
   console.log(form);
   var size = Object.keys(form).length;
   console.log(size);
   response.redirect("/");
   
});

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(request, response) {
    // Successful authentication, redirect home.
    response.redirect('/');
  });


app.listen(process.env.PORT, function(){
    
   console.log("App is online at port " + process.env.PORT); 
});