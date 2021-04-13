var express = require('express');
var session = require('express-session');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;


var app = express();
app.set('view engine','ejs');

passport.serializeUser(function(user, cb) {
    return cb(null, user);
  });
  passport.deserializeUser(function(obj,cb) {
    return cb(null, obj);
  });
const client_ID="E3en3gSiNbJpVN13loqzyxsTh";
const client_Secret="4L00fUXcKRdlJ6pfXIejrEeyWrJaG89AkjCilE5wBo1J5IyYw4";

app.use(session({
    secret:'twitterAuth',
    saveUninitialized:true,
    resave:true,
}));


app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.render('../pages/auth');
});

app.get('/error',(req,res)=>{
    res.send("Error in login with twitter");
});
app.get('/success',(req,res)=>{
    res.send("Successfully login");
});
app.get('/auth/twitter/callback',passport.authenticate('twitter',{failureRedirect:'/error'},
function(req,res){
    res.render('../pages/success');
}))

passport.use(new TwitterStrategy({
    consumerKey:client_ID,
    consumerSecret:client_Secret,
    callbackURL:"http://localhost:3000/auth/twitter/callback"
},
function(access,refreshToken,profile,done){
    var userprofile=profile;
    return done(null,userprofile);
}
))
app.get('/auth/twitter',passport.authenticate('twitter',{scope:['profile','email']}))



const port = process.env.PORT || 3000;
app.listen(port,(err)=>{
    if(err){
        console.log("Error" + err);
    }
    else{
        console.log("Server Works");
    }
});