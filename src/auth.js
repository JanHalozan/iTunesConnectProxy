"use strict";

var itc = require("itunesconnect"),
    basicAuth = require('basic-auth');

module.exports = {
    handler: function (req, res, next) {
        var user = basicAuth(req);

        if (!user) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            return res.sendStatus(401);
        }

        var options = {
            errorCallback: function (error) {
                res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
                return res.sendStatus(401);
            },
            loginCallback: function (response) {
            }
        };

        req.itunes = new itc.Connect(user.name, user.pass, options);
        next();
    }
};
