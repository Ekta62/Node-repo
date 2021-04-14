const express = require('express');
const app=express();
const session = require('express-session');
const passport = require('passport');

app.set('view engine','ejs');

const TwitterStrategy = require('passport-twitter').Strategy;
const client_ID="E3en3gSiNbJpVN13loqzyxsTh";
const client_Secret="4L00fUXcKRdlJ6pfXIejrEeyWrJaG89AkjCilE5wBo1J5IyYw4";

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

passport.use(new TwitterStrategy({
    consumerKey:client_ID,
    consumerSecret:client_Secret,
    callbackURL:"http://localhost:3000/auth/twitter/callback"
},
function(accessToken,refreshToken,profile,done){
    userProfile=profile;
    return done(null,userProfile);
}));

app.get('/auth/twitter',passport.authenticate('twitter',{scope:['profile','email']}));

app.get('/auth/twitter/callback',passport.authenticate('twitter',{failureRedirect:'/error'}),
function(req,res){
    res.redirect('/success');
})

const port = process.env.PORT || 3000;

app.listen(port,()=>{console.log('App listening on port' +port)});