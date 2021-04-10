var express = require('express');
var app = express();
app.get('/', (req, res) => {
        res.sendFile(__dirname + "/form.html");
    }),
app.get('/admin', (req, res) => {
        res.sendFile(__dirname + "/form.html");
    }),
app.get('/login', (req, res) => {
        res.sendFile(__dirname + "/form.html");
    }),
    app.listen(3000);