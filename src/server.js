"use strict";

var express = require('express'),
    itc = require("itunesconnect"),
    auth = require('basic-auth');

var app = express();
var Report = itc.Report;

// Auth
app.all('*', function (req, res, next) {
    var user = auth(req);

    if (!user) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.sendStatus(401);
    }

    var options = {
        errorCallback: function (err) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            return res.sendStatus(401);
        },
        loginCallback: function (resp) {
        }
    };

    req.itunes = new itc.Connect(user.name, user.pass, options);
    next();
});

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
