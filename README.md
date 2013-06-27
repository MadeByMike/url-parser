# URL Parser
I know there are a few different examples of these out in the wild but none I could find were as simple as this.
## Initialise a new URL Parser object
Initialise a new URL Parser object. 
```javascript
var simple = new URL("http://www.example.com");
var simpler = new URL(); // Use current location
var simplest = URL();
```
## .getParts ()
_This method does not accept any parameters_
Returns an array containing all URL components.
```javascript
example = URL("http://username:password@www.example.com:8080/path/to/file/index.html?query=foo#bar");
result = example.getParts();
// Results =
{
directory: "/path/to/file/",
filename: "index.html",
fragment: "bar",
hostname: "www.example.com",
password: "password",
path: "/path/to/file/index.html",
port: "8080",
protocol: "http",
queryString: "query=foo",
suffix: "html",
userinfo: "username:password",
username: "username"
}
```
## .protocol ([protocol]) 
Set or retrieve the url protocol.
```javascript
example = new URL("http://www.example.com");
example.protocol(); // Returns "http"
example.protocol("https"); // Sets protocol, new URL https://www.example.com
```
## .userinfo ([userinfo]) 
Set or retrieve the user info
```javascript
example = new URL("http://username:password@www.example.com/");
example.userinfo(); // Returns "username:password"
example.userinfo("admin:123456"); // Set userinfo, new URL http://admin:123456@www.example.com/
```
## .username ([username]) 
Set or retrieve the username
```javascript
example = new URL("http://username:password@www.example.com/");
example.username(); // Returns "username"
example.username("admin"); // Set username, new URL http://admin:password@www.example.com/
```
## .password ([password]) 
Set or retrieve the password
```javascript
example = new URL("http://username:password@www.example.com/");
example.password(); // Returns "password"
example.password("123456"); // Set password, new URL http://username:123456@www.example.com/
```
## .hostname ([hostname])  
Set or retrieve the hostname
```javascript
example = new URL("http://www.example.com/");
example.hostname(); // Returns "www.example.com"
example.hostname("example.com"); // Set hostname, new URL http://example.com/
```
## .port ([port]) 
Set or retrieve the port
```javascript
example = new URL("http://www.example.com:8080/");
example.port(); // Returns "8080"
example.port(4545); // Set hostname, new URL http://www.example.com:4545/
```
## .path ([path]) 
Set or retrieve the path
```javascript
example = new URL("http://www.example.com/path/to/page.html");
example.path(); // http://www.example.com/path/to/page.html
example.path("/new/path/to/page.html"); // Set hostname, new URL http://www.example.com/new/path/to/page.html
```
## .directory ([directory]) 
Set or retrieve the directory
```javascript
example = URL("http://example.com/path/to/page.html");
example.directory(); // Returns "/path/to/"
example.directory("/new/path/"); // Set directory, new URL http://example.com/new/path/page.html
```
## .cd (directory) 
Change the directory terminal style. Rather than replace the directory this function will allow you to manipulate the directory wih a familiar syntax
```javascript
example = URL("http://example.com/one/two/three/four/five/index.html");
example.cd("../../new"); // Change directory, new url http://example.com/one/two/three/new/index.html
example.cd("./new/"); // Change directory, new url http://example.com/one/two/three/new/new/index.html 
```
## .filename ([filename]) 
Set or retrieve the filename
```javascript
example = URL("http://example.com/path/to/page.html");
example.filename(); // Returns "page.html"
example.filename("page2.html"); // Set filename, new URL http://example.com/new/path/page2.html
```
## .suffix ([suffix]) 
Set or retrieve the file suffix
```javascript
example = URL("http://example.com/path/to/page.html");
example.suffix(); // Returns "html"
example.suffix("php"); // Set suffix, new URL http://example.com/new/path/page.php
```
## .queryString ([queryString]) 
Set or retrieve the queryString
```javascript
example = URL("http://example.com?query=1");
example.queryString(); // Returns "query=1"
example.queryString("query=2"); // Set queryString, new URL http://example.com?query=2
```
The following are alternative methods for working with the queryString as an object
## .query ([queryObject]) 
Set or retrieve the query string as an object
```javascript
example = URL("http://example.com?query=1");
example.query(); // Returns {query: 1}
example.query({query2: 2, query3: 3}); // Set query, new URL http://example.com?query2=2&query3=3
example.query("query2"); // Retrieve value of "query2", Returns "2"
```
## .addQuery (queryObject) 
Add one or more items to the query string
```javascript
example = URL("http://example.com?query=1");
example.addQuery({query2: 2, query3: 3}); // Add 2 items to the query string, new URL http://example.com?query=1&query2=2&query3=3
example.addQuery({query3: 0}); // Will replace query3, new URL http://example.com?query=1&query2=2&query3=0
```
## .removeQuery (name,[index]) 
Remove a specific item from the query
```javascript
example = URL("http://example.com?query=1&array[]=1&array[]=2");
example.removeQuery("query"); // Remove "query", new URL http://example.com?array[]=1&array[]=2
example.removeQuery("array", 1); // Remove the 2nd index of "array", new URL http://example.com?array=1
```
## .fragment ([fragment]) 
Set or retrieve the fragment
```javascript
example = URL("http://example.com/#anchor");
example.fragment(); // Returns "anchor"
example.fragment("newanchor"); // Set fragment, new URL http://example.com/#newanchor
```
## .isAbsolute ([url]) 
Returns true if the url is absolute
```javascript
example = URL("http://example.com");
example.isAbsolute(); // Returns true
example.isAbsolute("/relative/url/index.html"); // Returns false
```
## .isEqual (url,[strict],[includeQuery]) 
<div class="parameters">
_Accepts a string or URL object, strict &amp; includeQuery are both flags_

Returns true if both urls resolve to the same location.
```javascript
example = URL("http://example.com/path/to/file/index.html");
example2 = URL("http://example.com/path/to/file/index.html");
// Basic usage will allow comparison between an absolute and relative urls
example.isEqual("/path/to/file/index.html"); // Returns true
example.isEqual("http://example.com/redundant/../path/to/file/index.html"); // Returns true, same location
example.isEqual(example2); // Returns true
// Strict comparison will only all absolute with absolute and relative with relative comparision
example.isEqual("/path/to/file/index.html", true); // Returns false
example.isEqual("http://example.com/path/to/file/index.html", true); Returns true
example.isEqual("http://example.com/redundant/../path/to/file/index.html"); // Returns true, same location
// includeQuery will factor the query string into the comparision
example = URL("http://example.com/path/to/file/index.html?query=1&query2=2");
example.isEqual("/path/to/file/index.html", false, true); // Returns false
example.isEqual("/path/to/file/index.html?query2=2&query=1", false, true); // Returns true, query order doesn"t matter
```
## .isRelative ([url]) 
Returns true if the url is relative
```javascript
example = URL("http://example.com");
example2 = URL("/relative/url/index.html");
example.isRelative(); // Returns false
example.isRelative("http://example.com"); // Returns false
example.isRelative("/relative/url/index.html"); // Returns true
example.isRelative(example2); // Returns true
```
## .isURL (url) 
Returns true if the url is valid
```javascript
example = URL();
example.isURL("http://---------"); // Returns false
example.isURL("http://example.com"); // Returns true
```
## .normalizePath (path) 
Normalise a url or path string
```javascript
example = URL();
example.normalizePath("http://example.com/redundant/../path/./index.html"); // Returns "http:/example.com/path/index.html"
example.normalizePath("/redundant/../path/./"); // Returns "/path/"
```
## .setBase ([base]) 
Make a url relative to a new base.
```javascript
example = URL("http://example.com/path/to/file/index.html");
example2 = URL("https://github.com/");
example.setBase(); // Set the base to the current window location
example.setBase("http://username:password@www.example.org:8080/path/is/irrelevant"); // Set base, new url http://username:password@www.example.org:8080/path/to/file/index.html
example.setBase(example2); // Set base, new url https://github.com/path/to/file/index.html
example.setBase(""); // Set base, new url /path/to/file/index.html 
```
## .computed () 
<div class="parameters">
_This method does not accept any parameters_

Returns the full encoded URL
```javascript
example = URL("http://example.com/one/two/../../index.html?query=abc");
example.computed(); // Returns http://example.com/index.html?query=abc
example.filename("home.html").queryString("");
example.computed(); // Returns http://example.com/home.html 
```
## .src ([reset]) 
Returns the origional source string that the URL object was set with. This will not change unless the object is redefined or reset by passing this method a new string.
```javascript
example = URL("http://example.com/one/two/../../index.html?query=abc");
example.computed(); // Returns http://example.com/index.html?query=abc
example.filename("home.html").queryString("");
example.computed(); // Returns http://example.com/home.html
example.src(); // Remains unchanged, returns "http://example.com/one/two/../../index.html?query=abc" 
```
 
