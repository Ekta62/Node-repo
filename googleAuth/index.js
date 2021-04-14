const express = require('express');
const app=express();
const session = require('express-session');
const passport = require('passport');

app.set('view engine','ejs');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const client_ID="12421510705-2t8vgegc7p3dissvnjitpat67lqdejmq.apps.googleusercontent.com";
const client_Secret="lrWDQ63FCoWnC7lmhALHnjNH";

var userProfile;

app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/',function(req,res){
    res.render('../pages/auth');
})

app.get('/success',(req,res)=>res.send(userProfile));
app.get('/error',(req,res)=>res.send('Error in logging'));

passport.serializeUser(function(user,cb){
    cb(null,user);
})
passport.deserializeUser(function(obj,cb){
    cb(null,obj);
})

passport.use(new GoogleStrategy({
    clientID:client_ID,
    clientSecret:client_Secret,
    callbackURL:"http://localhost:3000/auth/google/callback"
},
function(accessToken,refreshToken,profile,done){
    userProfile=profile;
    return done(null,userProfile);
}));

app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

app.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/error'}),
function(req,res){
    res.redirect('/success');
})

const port = process.env.PORT || 3000;

app.listen(port,()=>{console.log('App listening on port' +port)});