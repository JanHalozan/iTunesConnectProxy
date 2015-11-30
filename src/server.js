var Databox = require('databox');
var itc = require("itunesconnect");
var dateFormat = require('dateformat');

var client = new Databox({
    push_token: '26rpbwew6w4k0040g8k8koww8040coww'
});

var Report = itc.Report;
var itunes = new itc.Connect('apps@zepppelin.com', 'Ze3pelin');

var date = new Date();
date.setDate(date.getDate() - 1); // We're always pushing for yesterday

var datetime = dateFormat(date, "yyyy-mm-dd hh:MM:ss");

itunes.request(Report.ranked().time(1, 'days'), function(error, result) {
   if (error != null) {
      // TODO: Write error message somewhere
      return;
   }

   client.push({
       key: 'totalDownloads',
       value: result[0].units,
       date: datetime
   });
});

itunes.request(Report.ranked().time(1, 'days').group('location'), function(error, result) {
   if (error != null) {
      // TODO: Write error message somewhere
      return;
   }

   var kpis = [];

   for (var i = 0; i < result.length; ++i) {
      kpis.push({
         key: 'downloads',
         value: result[i].units,
         attributes: {
            country: result[i].title
         },
         date: datetime
      });
   }

   client.insertAll(kpis);
});
