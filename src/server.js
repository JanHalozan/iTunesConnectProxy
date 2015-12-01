"use strict";

var express = require('express'),
    itc = require("itunesconnect"),
    auth = require('./auth.js');

var app = express();
var Report = itc.Report;

app.use(auth.handler);

app.get('/total-downloads/:interval?', function (req, res) {
    var interval = parseInt(req.params.interval, 10);
    if (isNaN(interval)) {
        interval = 1;
    }

    req.itunes.request(Report('ranked').time(interval, 'days'), function (error, result) {
        if (error !== null) {
            return res.status(500).send({error: 'Something blew up.'});
        }

        res.send(result);
    });
});

var port = parseInt(process.env.PORT || "3001", 10);
app.listen(port, function () {
    console.log("Server running on " + port);
});
