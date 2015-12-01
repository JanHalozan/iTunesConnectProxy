"use strict";

var express = require('express'),
    itc = require("itunesconnect"),
    auth = require('./auth.js');

var app = express();
var Report = itc.Report;

app.use(auth.handler);

app.get('/total-downloads', function (req, res) {
    req.itunes.request(Report('timed').time(1, 'days').interval('day'), function (error, result) {
        if (error !== null) {
            return res.status(500).send({error: 'Something blew up.'});
        }

        var data = result[0].data[0];
        res.send(data);
    });
});

var port = parseInt(process.env.PORT || "3001", 10);
app.listen(port, function () {
    console.log("Server running on " + port);
});
