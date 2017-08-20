var express = require('express');
var router = express.Router();
/*
router.get('/', function(req, res, next) {
    res.send
    ('<html>' +
     '<title>Course Info Start Page</title>' + 
     '<br><br>' + 
     '<body>' + 
     '<a href="/courses/instructor">select instructor</a>' +
     '<br><br>' +
     '<a href="/courses/area">select area</a>' +     
     '</body>' +
     '</html>'
    );
});
*/

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Course Info Start Page'}, function (err, html) {
        if (err != null) {
            console.log(err);
        } else {
            console.log(html);
            res.send(html);
        }
    });
});

module.exports = router;
