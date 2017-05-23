I think this is the solution to the problem described below.

At first I thought a mini webserver was expected because node.js was
specified, and I used express to create the express web server
framework.

To install & run the api/web server, node, npm, and express should
already installed on the target system.

Just run tar -xvzf on the attached compressed tarball.

cd problemsolution

Then run

./installcourseinfo.sh

or

./installcourseinfo.sh {directory path}

With no argument the mini webserver is installed in ${HOME}/coursesapi

The webserver is consistent with the standard express framework.

To start the web server, just

cd {installation directory}

Then run

node .

or

npm start

The vanilla app.js has been modified to load the course data from
Courses.json.

The data and the keys array is inserted into the router structures
area and instructor.

/, /courses/instructor, and /courses/area routes are installed.

The / route sets up a simple web page that allows a user to choose to
get instructor or area information by entering localhost:3000/ the url
entry area of a web browser. A json array is returned with all the
courses in the specified area.

After selecting area or instructor info, the /courses/area route pops
up a request for area which must be a case insensive match,

The /courses/instructor route pops up a request for instructor. If the
submitted string matches any substring in an instructor's name, any
course taught by the matched instructor will be added to the json
array to be returned.

The only tricky aspect to the solution is the following function which
recursively groves through the course data to find the 'instructors'
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

Because I did not write a full front end, to get back to the start
page, the user must enter localhost:3000/ in the url entry area of a
web browser to get back to the start page of the web server.

As an alternative a user can test the API by means of curl, which must
be installed on the user's machine.

The test shell script courseinfotest.sh shows how to use curl to test.

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
