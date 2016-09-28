var https = require("https");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var gh = require('parse-github-url'); // use to break the url user provides into various parts
var moment = require('moment'); // for Parse, validate, manipulate, and display dates in JavaScript.
var router = express.Router();
var Promise = require('bluebird');
var _ = require('underscore-node');

router.post('/gitAccess', function(req, res){
    var url = gh(req.body.url);
    var userName = url.owner;
    var repo = url.name;
    var currentDate = new Date();
    var pastDay = moment(currentDate).subtract(24, 'hours').format("MM-DD-YYYY HH:mm:ss");
    var pastWeek = moment(currentDate).subtract(7, 'days').format("MM-DD-YYYY HH:mm:ss");
    var options = {
        host: "api.github.com",
        path: '/repos/' + userName + '/' + repo + '/issues',
        method: 'GET',
        headers: {'User-Agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'}
    }
    var request1 = https.request(options, function (response) {
        var body = '';
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            var json = JSON.parse(body);
            var currentDate = new Date();
            getPastDayIssues(json,pastDay, pastWeek).then(function(data){
                res.send({"total" : data});
            });

        });
    })
    request1.on('error', function (e) {
        console.error('and the error is ' + e);
    });
    request1.end();
});

function getPastDayIssues(issues, pastDate, pastWeek) {
    return new Promise(function (resolve, reject) {
        var i=0;var j=0;var k=0;
        var total = {};
        total.all = issues.length;
        _.forEach(issues, function(data){
            var createdDate = new Date(data.created_at);
            var createdAt = moment(createdDate).format("MM-DD-YYYY HH:mm:ss");

        //Comparing the dates using Moment and adding it to an object
            if(moment(createdAt).isAfter(pastDate)){
                i = i+1;
                total.pastDay = i;
            }
            else if((moment(createdAt).isAfter(pastWeek)) &&( moment(createdAt).isBefore(pastDate))){
                j = j+1;
                total.pastWeek = j;
            }
            else if((moment(createdAt).isBefore(pastWeek)) ){
                k = k+1;
                total.pastAll = k;
            }
        });
        resolve(total);
    });
}

module.exports = router;