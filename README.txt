PROBLEM DESCRIPTION

The included JSON file is an object that contains courses that are
keyed to a unique ID. Each course contains a terms object and within
that each term contains an array of instructors. Using Node.JS, write
an API with two routes. One route that returns only the courses that
had been taught by a particular instructor for any term and one route
that returns all courses taught in a specific area. API routes should
follow the convention

   http://localhost:port/courses/instructor/:name
   http://localhost:port/courses/area/:area

so that

   http://localhost:port/courses/instructor/na

returns all courses taught by anyone whose name includes 'na'. This
should be case insensitive

   http://localhost:port/courses/area/CS

returns all courses taught with a course_area of 'CS'

PROBLEM SOLUTION

[Ignore ./installcourseinfo.sh, which is how I set up the solution
before I integrated it with maven. Nowadays to create the base github
repository for an express project, I use express {dirname} to create
the starting point for my web server project. Then I add a pom.xml
like the one in this project, import the sources into an Intellij
project, make the project a maven project, and then use the VCS tab to
import into the appropriate version control system. At this point one
can just run mvn clean install either from the command line or through
the IDE.]

If one is not starting from scratch and instead is starting from the
github repository, just clone from the following.

   https://github.com/MartilloInventor/coursesapi

The pom.xml shows one way to integrate node, npm, and maven.

Run the following.

mvn clean install
npm start

The vanilla app.js has been modified to load the course data from
Courses.json. (Just search for Courses.json in the file to see how to
load the data.)

The data and the keys array is inserted into the router structures
area and instructor.

   /, /courses/instructor, and /courses/area routes are installed.

The / route sets up a simple web page that allows a user to choose to
get instructor or area information by entering the following

   localhost:3000/

into the url entry area of a web browser.

After selecting area, the /courses/area route pops up a request for
area which must be a case insensitive match.

The /courses/instructor route pops up a request for instructor. If the
submitted string matches any substring in an instructor's name, any
course taught by the matched instructor will be added to the json
array to be returned.

The only tricky aspect to the solution is the following function which
recursively grovels through the course data to find the 'instructors'
key.

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

It's a bit more general than needed but a non-general solution is
considerably longer and harder to understand.

BTW, if you understand how the above function works, you probably have
a good understanding of the use of closures in node/javascript.

This URL has a basic discussion of Javascript closures.

    http://javascriptissexy.com/understand-javascript-closures-with-ease/

Because I did not write a full front end, to get back to the start
page, the user must enter

    localhost:3000/

in the url entry area of a web browser to get back to the start page
of the web server.

Clicking on the back function of the browser will also work.

As an alternative a user can test the API by means of curl, which must
be installed on the user's machine.

The test shell script courseinfotest.sh shows how to use curl to test.


