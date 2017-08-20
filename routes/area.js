var express = require('express');
var router = express.Router();

/* GET home page. */

/*
router.get('/', function(req, res, next) {
    res.send(
        '<html>' +
            '<title>Get Area Info Page</title>' +
            '<br><br>' +
            '<body>' +
            '<script language="javascript" type="text/javascript">' +
            '<!-- \n' +
            'var person = prompt("Please enter area name", "");' +
            'var xmlHttp = new XMLHttpRequest();' +
            'xmlHttp.onreadystatechange = function() { ' +
            'if (xmlHttp.readyState == XMLHttpRequest.DONE)' +
            'document.write(xmlHttp.responseText);' +
            '};' +
            'xmlHttp.open("GET", "area/" + person, true);' +
            'xmlHttp.send(null);' +
            '//-->' +
            '</script>' +
            'Received Get area' +
            '</body>' +
            '</html>');
});
*/

router.get('/', function (req, res, next) {
    res.render('area', {title: 'Get Area Info Page'}, function (err, html) {
        if (err != null) {
            console.log(err);
        } else {
            console.log(html);
            res.send(html);
        }
    });
});


router.get('/:areaname', function(req, res, next) {
    var coursearray = [];
    var len = router.coursekeys.length;
    var counter = 0;
    var area = '';
    var areaarray = [];
    var course = null;
    if(req.params.areaname == '*') {
        console.log('Returning all courses');
        for(counter = 0; counter <  len; ++counter) {
            coursearray.push(router.coursedata[router.coursekeys[counter]].course_name);
        }
    }
    else {
        console.log('Returning info for ' + req.params.areaname);
        for(counter = 0; counter <  len; ++counter) {
            course = router.coursedata[router.coursekeys[counter]];
            if(course.course_area.toUpperCase() == req.params.areaname.toUpperCase())
                coursearray.push(router.coursedata[router.coursekeys[counter]].course_name);
        }
    }
    res.send(coursearray);
});

module.exports = router;
