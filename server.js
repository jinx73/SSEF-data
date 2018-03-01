var express = require('express');
var fs = require('fs');
var app = express();

function readContent(callback) {
    fs.readFile("/JX/CS/SSEF/data.txt", "utf8", function (err, content) {
        if (err) return callback(err)
        callback(null, content)
    })
}
function parseProject(jsonObj){
  //60 - finals, 20 - file submitted, 10 - registered, 5 - saved
  var all = [
    {
      school: "NUSH",
      projects: 0,
      final: {
        total: 0,
        bi: 0,
        cm: 0,
        ph: 0,
        ma: 0,
        cs: 0
      },
      fileSubmitted: {
        total: 0,
        bi: 0,
        cm: 0,
        ph: 0,
        ma: 0,
        cs: 0
      },
      registered: {
        total: 0,
        bi: 0,
        cm: 0,
        ph: 0,
        ma: 0,
        cs: 0
      }
    },
    {
      school: "RI",
      projects: 0,
      final: {
        total: 0,
        bi: 0,
        cm: 0,
        ph: 0,
        ma: 0,
        cs: 0
      },
      fileSubmitted: {
        total: 0,
        bi: 0,
        cm: 0,
        ph: 0,
        ma: 0,
        cs: 0
      },
      registered: {
        total: 0,
        bi: 0,
        cm: 0,
        ph: 0,
        ma: 0,
        cs: 0
      }
    },
    {
      school: "HCI",
      projects: 0,
      final: {
        total: 0,
        bi: 0,
        cm: 0,
        ph: 0,
        ma: 0,
        cs: 0
      },
      fileSubmitted: {
        total: 0,
        bi: 0,
        cm: 0,
        ph: 0,
        ma: 0,
        cs: 0
      },
      registered: {
        total: 0,
        bi: 0,
        cm: 0,
        ph: 0,
        ma: 0,
        cs: 0
      }
    },
    {
      school: "NJC",
      projects: 0,
      final: {
        total: 0,
        bi: 0,
        cm: 0,
        ph: 0,
        ma: 0,
        cs: 0
      },
      fileSubmitted: {
        total: 0,
        bi: 0,
        cm: 0,
        ph: 0,
        ma: 0,
        cs: 0
      },
      registered: {
        total: 0,
        bi: 0,
        cm: 0,
        ph: 0,
        ma: 0,
        cs: 0
      }
    }
  ];
  for(var i = 0; i< Object.keys(jsonObj).length; i++){
    var schList = ["NUS HIGH SCHOOL OF MATHEMATICS AND SCIENCE", "RAFFLES INSTITUTION", "HWA CHONG INSTITUTION", "NATIONAL JUNIOR COLLEGE"];
    var statusList = ["60", "20", "10"];
    var status = ["final", "fileSubmitted", "registered"];
    var bi = ["AS", "BI", " BM", "BE", "CB", "CO", "EE", "MI", "PS", "TM", "EA"];
    var ph = ["ES", "EP", "MS", "PH", "EM"];
    var cm = ["CH", "EC"];
    var ma = ["MA"];
    var cs = ["RO", "SS"];
    if(schList.indexOf(jsonObj[i]['school']) != -1){
      all[schList.indexOf(jsonObj[i]['school'])]['projects']++;
      if(statusList.indexOf(jsonObj[i]['status']) != -1 && jsonObj[i]['category1'] != 'JBO' && jsonObj[i]['category1'] != 'JCH' && jsonObj[i]['category1'] != 'JCO' && jsonObj[i]['category1'] != 'JMA' && jsonObj[i]['category1'] != 'JPH' ){
        all[schList.indexOf(jsonObj[i]['school'])][status[statusList.indexOf(jsonObj[i]['status'])]]['total']++;
        if(bi.indexOf(jsonObj[i]['category1']) != -1){
          all[schList.indexOf(jsonObj[i]['school'])][status[statusList.indexOf(jsonObj[i]['status'])]]['bi']++;
        }else if(cm.indexOf(jsonObj[i]['category1']) != -1){
          all[schList.indexOf(jsonObj[i]['school'])][status[statusList.indexOf(jsonObj[i]['status'])]]['cm']++;
        }else if(ph.indexOf(jsonObj[i]['category1']) != -1){
          all[schList.indexOf(jsonObj[i]['school'])][status[statusList.indexOf(jsonObj[i]['status'])]]['ph']++;
        }else if(ma.indexOf(jsonObj[i]['category1']) != -1){
          all[schList.indexOf(jsonObj[i]['school'])][status[statusList.indexOf(jsonObj[i]['status'])]]['ma']++;
        }else if(cs.indexOf(jsonObj[i]['category1']) != -1){
          all[schList.indexOf(jsonObj[i]['school'])][status[statusList.indexOf(jsonObj[i]['status'])]]['cs']++;
        }
      }
    }
  }
  return all;
}

app.get("/", function(req, res){
  readContent(function (err, content) {
      var jsonObj = JSON.parse(content);
      var list = parseProject(jsonObj);
      res.render('index.ejs', {projects: list})
  })
})

app.listen('8080');
console.log('App listenining at port 8080');
