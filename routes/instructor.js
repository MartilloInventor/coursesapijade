var express = require('express');
var router = express.Router();

/* GET home page. */
/*
router.get('/', function(req, res, next) {
    res.send(
        '<html>' +
            '<title>Get Instructor Info Page</title>' +
            '<br><br>' +
            '<body>' +
            '<script language="javascript" type="text/javascript">' +
            '<!-- \n' +
            'var person = prompt("Please enter instructor name", "");' +
            'var xmlHttp = new XMLHttpRequest();' +
            'xmlHttp.onreadystatechange = function() { ' +
            'if (xmlHttp.readyState == XMLHttpRequest.DONE)' +
            'document.write(xmlHttp.responseText);' +
            '};' +
            'xmlHttp.open("GET", "instructor/" + person, true);' +
            'xmlHttp.send(null);' +
            '//-->' +
            '</script>' +
            'Received Get instructor' +
            '</body>' +
            '</html>');
});
*/

router.get('/', function (req, res, next) {
    res.render('instructor', {title: 'Get Instructor Info Page'}, function (err, html) {
        if (err != null) {
            console.log(err);
        } else {
            console.log(html);
            res.send(html);
        }
    });
});


router.get('/:person', function(req, res, next) {
    var coursearray = [];
    var len = router.coursekeys.length;
    var counter = 0;
    var instructor = '';
    var instructorarray = [];
    var course = null;
    if(req.params.person == '*') {
        console.log('Returning all courses');
        for(counter = 0; counter <  len; ++counter) {
            coursearray.push(router.coursedata[router.coursekeys[counter]].course_name);
        }
    }
    else {
        console.log('Returning info for ' + req.params.person);
        for(counter = 0; counter <  len; ++counter) {
            course = router.coursedata[router.coursekeys[counter]];
            instructorarray = addAllInstructors(course, instructorarray);
            instructorarray = uniq(instructorarray);
            if(instructorMatch(instructorarray, req.params.person)) {
                coursearray.push(router.coursedata[router.coursekeys[counter]].course_name);
            }
            instructorarray = [];
        }
    }
    res.send(coursearray);
});

function instructorMatch(arr, person) {
    var len = arr.length;
    var counter = 0;
    var pattern = new RegExp(person.toUpperCase());
    
    for(counter = 0; counter < len; ++counter) {
        if(pattern.exec(arr[counter].toUpperCase()) != null) {
            return true;
        }
    }
    return false;
}

function addAllInstructors(obj, concatedlist) {
    if (!(Boolean(obj) && typeof obj == 'object'
          && Object.keys(obj).length > 0)) {
        return concatedlist;
    }
    Object.keys(obj).forEach(function(key) {
        if(key == 'instructors') {
            concatedlist = concatedlist.concat(obj[key]);
        } else if (typeof(obj[key]) == 'object') {
            concatedlist = concatedlist.concat(addAllInstructors(obj[key], []));
        } 
        return concatedlist;
    });
    return concatedlist;
}

function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || (item.toUpperCase() != ary[pos - 1].toUpperCase());
    })
}

module.exports = router;
