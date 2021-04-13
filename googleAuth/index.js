var express = require('express');
var session = require ('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var app = express();
app.set('view engine','ejs');

const client_ID="12421510705-2t8vgegc7p3dissvnjitpat67lqdejmq.apps.googleusercontent.com";
const client_Secret="lrWDQ63FCoWnC7lmhALHnjNH";

app.use(session({
    secret:'googleAuth',
    saveUninitialized:true,
    resave:true
}))

app.use(passport.initialize());

app.get('/',(req,res)=>{
    res.render('../pages/auth');
});

app.get('/error',(req,res)=>{
    res.send("Error in login with gmail");
});

app.get('/success',(req,res)=>{
    res.send("Successfully login");
});

passport.serializeUser((user,cb)=>{
    return cb(null,user);
})

passport.deserializeUser((obj,cb)=>{
    return cb(null,obj);
})

passport.use(new GoogleStrategy({
    clientID:client_ID,
    clientSecret:client_Secret,
    callbackURL:"http://localhost:3000/auth/google/callback"
},
function(accessToken,refreshToken,profile,done){
    var userprofile;
    return done(null,userprofile);
}))

app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))

app.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/error'},
function(req,res){
    res.render('../pages/success');
}))

const port = process.env.PORT || 3000;
app.listen(port,(err)=>{
    if(err){
        console.log("Error" +err);
    }
    else{
        console.log("Server is Working");
    }
})