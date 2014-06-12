(function(glob){
	"use strict";
	var URI;
	URI = function(url){
		if (!(this instanceof URI)) {
			return new URI(url);
		}
		if (url === undefined) {
			if (location !== undefined) {
				url = location.href;
			} else {
				url = "";
			}
		}
		var expressions = {}, parts = {}, query = {}, src;
		expressions.data_uri = new RegExp(
		"^" +
			"(?:" +
				// $1 protocol
				"([a-z\\u00a1-\\uffff0-9]+-?)\\:" +
				// $4 data
				"(?:(.*))" +
			")$"
		);
		expressions.valid_url = new RegExp(
			"^" +
				"(?:" +
					// $1 protocol
					"([a-z\\u00a1-\\uffff0-9]+-?)?" +
					"(?:(?:\\:)?//)"+
					// $2 username:password
					"(?:((?:\\S*)(?::\\S*)?)@)?" +
					// $3 Hostname
					"("+
						"(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}"+
						"(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])"+
						"|"+
						"(?:(?:[a-z\\u00a1-\\uffff0-9]|[a-z\\u00a1-\\uffff0-9][a-z0-9\\u00a1-\\uffff\\-]*[a-z0-9\\u00a1-\\uffff])\\.)*"+
						"(?:[a-z\\u00a1-\\uffff]|[a-z\\u00a1-\\uffff][a-z0-9\\u00a1-\\uffff\\-]*[a-z0-9\\u00a1-\\uffff])"+
						"|"+
						"(?:"+
							"(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))"+
							"|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))"+
							"|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))"+
							"|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))"+
							"|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))"+
							"|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))"+
							"|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))"+
							"|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))"+
						")"+
					")"+
					// $4 Port
					"(?::(\\d{2,5}))?" +
				")?" +
				// $5 Path
				"("+
					"(?:(?:[\\/])|(?:\\.{2})||(?:\\.{1})|(?:^[a-z\\u00a1-\\uffff]))" +
					"(?:[^\\?^#^:]*)" +
				")?" + 
				// $6 Query
				"(?:\\?([^\\#]+)*)?"+
				// $7 Hash
				"(?:\\#(.*))?"+
			"$", "i"
		);
		var objectsAreEqual = function(x, y) {
			var p;
			var empty = true;
			for (p in y) {
				if (y.hasOwnProperty(p)) {
					empty = false;
					if(typeof(y[p]) !== typeof(x[p])) {return false;}
					if((y[p]===null) !== (x[p]===null)) {return false;}
					switch (typeof(y[p])) {
						case 'undefined':
							if (typeof(x[p]) !== undefined) {return false;}
							break;
						case 'object':
							if (y[p]!==null && x[p]!==null && (y[p].constructor.toString() !== x[p].constructor.toString() || !objectsAreEqual(y[p],x[p]))) {return false;}
							break;
						case 'function':
							if (y[p].toString() !== x[p].toString()) {return false;}
							break;
						default:
							if (y[p] !== x[p]) {return false;}
					}
				}
			}
			if(empty){
				for (p in x) {
					if (x.hasOwnProperty(p)) {
						return false;
					}
				}
				return true;
			} else{
				return true;
			}
		};
		var parse = function(url) {
			var parsed = expressions.valid_url.exec(url);
			if(parsed){
				src = (parsed[0]) || null;
				parts.protocol = (parsed[1]) || null;
				parts.userinfo = (parsed[2]) || null;
				if(parts.userinfo){
					var pos = parts.userinfo.indexOf(':');
					if (pos > -1) {
						parts.username = parts.userinfo.substring(0,pos);
						parts.password = parts.userinfo.substring(pos+1);
					}else{
						parts.username = parts.userinfo;
						parts.password = null;
					}
				}else{
					parts.username = null;
					parts.password = null;
				}
				parts.hostname = (parsed[3]) ? encodeURIComponent(parsed[3]) : null;
				parts.port = (parsed[4]) || null;
				parts.path =  (parsed[5]) ? encodeURI(parsed[5]) : null;
				if(parts.path){
					parts.path = normalizePath(parts.path);
					updatePathSegments();
				}
				parts.queryString  = (parsed[6]) ? encodeURI(parsed[6]) : null;
				parts.fragment  = (parsed[7]) ? encodeURI(parsed[7]) : null;
				return true;
			} else {
				parsed = expressions.data_uri.exec(url);
				if(parsed){
					src = (parsed[0]) || null;
					parts.protocol = (parsed[1]) || null;
					parts.data = (parsed[2]) || null;
					return true;
				}
			}
			return false;
		};
		var normalizePath = function(path) {
			var parent, pos;
			path = path.replace(/(\/(\.\/)+)|\/{2,}/g, '/');
			while (true) {
				parent = path.indexOf('/../');
				if (parent === -1) {
					break;
				} else if (parent === 0) {
					path = path.substring(3);
					break;
				}
				pos = path.substring(0, parent).lastIndexOf('/');
				if (pos === -1) {
					pos = parent;
				}
				path = path.substring(0, pos) + path.substring(parent + 3);
			}
			return path;
		};
		var parseQuery = function(string) {
			//not perfect, won't support complex arrays
			if (string === undefined) {
				string = parts.queryString;
			}
			string = decodeURI(string);
			if(string){
				var queryString = {};
				string.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"),function($0, $1, $2, $3) {
					var qString = $1;
					if(qString.match(/\[\]$/)){
						qString = qString.replace(/\[\]$/, '');
						if(queryString[qString]){
							queryString[qString].push($3);
						}else{
							queryString[qString] = [];
							queryString[qString].push($3);
						}
					}else{
						queryString[qString] = $3;
					}
				});
				return queryString;
			} else {
				return null;
			}
		};
		var updateQueryString = function(obj, prefix) {
			var str = [];
			for(var p in obj) {
				if (obj.hasOwnProperty(p)) {
					var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
					str.push(typeof v == "object" ? updateQueryString(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
				}
			}
			return parts.queryString = str.join("&");
		};
		var updatePathSegments = function(){
			var pos = parts.path.lastIndexOf('/');
			if (pos > -1) {
				parts.directory = parts.path.substring(0, pos+1);
				parts.filename  = parts.path.substring(pos+1);
			} else {
				parts.directory = '/';
				parts.filename  = parts.path;
			}
			pos = parts.filename.lastIndexOf('.');
			if (pos > -1) {
				parts.suffix = parts.filename.substring(pos+1);
			}else{
				parts.suffix = null;
			}
		};
		/* Public Methods */
		
		/** src() */
		this.src = function(set) {
			if(set === undefined){
				return src;
			}
			if(this.isURL(set)){
				parts = {}; 
				query = {};
				src = '';
				parse(set);
				if(parts.queryString){
					query = parseQuery(parts.queryString);
				}
				return this;
			} 
			return false;
		};
		/** parse() */
		this.parse = function(set) {
			return this.src(set).getParts();
		}
		/** url() */
		this.url = function() {
			return this.computed;
		}
		/** computed() */
		this.computed = function() {
			var computedURL = "";
			computedURL += (parts.protocol) ? parts.protocol + "://" : '';
			computedURL += (parts.username && parts.password) ? parts.username + ":" + parts.password + '@' : '';
			computedURL += (parts.username && !parts.password) ? parts.username + '@' : '';
			computedURL += (parts.hostname) || '';
			computedURL += (parts.port) ? ':' + parts.port : '';
			computedURL += (parts.path) || '';
			computedURL += (parts.queryString) ? '?' + parts.queryString : '';
			computedURL += (parts.fragment) ? '#' + parts.fragment : '';
			return computedURL;
		};
		/** protocol() */
		this.protocol = function(set){
			if(set === undefined){
				return parts.protocol;
			}
			parts.protocol = String(set);
			return this;
		};
		/** userinfo() */
		this.userinfo = function(set){
			if(set === undefined){
				return parts.username +':'+ parts.password;
			} 
			var pos = set.indexOf(':');
			if (pos > -1) {
				parts.username = encodeURI(set.substring(0,pos));
				parts.password = encodeURI(set.substring(pos+1));
				parts.userinfo = parts.username +':'+parts.password;
			}else{
				parts.username = encodeURI(set);
				parts.password = null;
				parts.userinfo = parts.username;
			}
			return this;
		};
		/** username() */
		this.username = function(set){
			if(set === undefined){
				return parts.username;
			}
			parts.username = encodeURI(String(set));
			return this;
		};
		/** password() */
		this.password = function(set){
			if(set === undefined){
				return parts.password;
			}
			parts.password = encodeURI(String(set));
			return this;
		};
		/** hostname() */
		this.hostname = function(set){
			if(set === undefined){
				return parts.hostname;
			}
			parts.hostname = encodeURI(String(set));
			return this;
		};
		/** port() */
		this.port = function(set){
			if(set === undefined){
				return parseInt(parts.port,10);
			}
			parts.port = parseInt(set,10);
			return this;
		};
		/** path() */
		this.path = function(set){
			if(set === undefined){
				return parts.path;
			}
			parts.path = encodeURI(String(set));
			updatePathSegments();
			return this;
		};
		/** normalizePath() */
		this.normalizePath = function(path) {
			return normalizePath(path);
		};
		/** directory() */
		this.directory = function(set){
			if(set === undefined){
				return parts.directory;
			}
			parts.directory = encodeURI(String(set));
			parts.path = parts.directory + parts.filename;
			return this;
		};
		/** cd() */
		this.cd = function(cd){
			var dir;
			dir = this.normalizePath(parts.directory+cd);
			dir = (dir.substr(-1) == '/') ? dir : dir += '/';
			parts.directory = dir;
			parts.path = encodeURI(String(parts.directory)) + parts.filename;
			return this;
		};
		/** filename() */
		this.filename = function(set){
			if(set === undefined){
				return parts.filename;
			}
			parts.filename = encodeURIComponent(String(set));
			parts.path = parts.directory + parts.filename;
			return this;
		};
		/** suffix() */
		this.suffix = function(set){
			if(set === undefined){
				return parts.suffix;
			}
			parts.suffix = encodeURIComponent(String(set));
			var pos = parts.filename.lastIndexOf('.');
			if (pos > -1) {
				parts.filename = parts.filename.substring(0, pos) +"."+ parts.suffix;
			}
			parts.path = parts.directory + parts.filename;
			return this;
		};
		/** queryString() */
		this.queryString = function(set){
			if(set === undefined){
				return parts.queryString;
			}
			parts.queryString = encodeURI(String(set));
			return this;
		};
		/** query() */
		this.query = function(set){
			if(set === undefined){
				return query;
			}
			if (typeof set === 'string') {
				return query[set];
			}
			if (typeof set === 'object') {
				query = set;
				updateQueryString(query);
				return this;
			}
			return false;
		};
		/** addQuery(). */
		this.addQuery = function(obj) {
			var prop;
			if (typeof obj === 'object') {
				for (prop in obj){
					if (obj.hasOwnProperty(prop)) {
						query[prop] = encodeURI(String(obj[prop]));
					}
				}
				updateQueryString(query);
				return this;
			}
			return false;
		};
		/** removeQuery() */
		this.removeQuery = function(name, index) {
			if (typeof name === 'string') {
				if (typeof index === 'number') {
					delete query[name][index];
					updateQueryString(query);
					return this;
				} else {
					delete query[name];
					updateQueryString(query);
					return this;
				}
			}
			return false;
		};
		/** fragment() */
		this.fragment = function(set){
			if(set === undefined){
				return parts.fragment;
			}
			parts.fragment = encodeURI(String(set));
			return this;
		};
		/** getParts() */
		this.getParts = function(){
			return parts;
		};
		/** isEqual() */
		this.isEqual = function(url,strict,includeQuery) {
			// Strict comparison will not compare absolute to relative urls
			// includeQuery will compare query strings
			var equal = true;

			if (typeof url === 'string') {
				url = new URI(url);
			}
			if (url === undefined) {
				return false;
			}

			strict = (strict === undefined || strict === false) ? false : strict;
			includeQuery = (includeQuery === undefined || includeQuery === false) ? false : includeQuery;

			if( parts.hostname && url.hostname() ){
				equal = (parts.hostname === url.hostname());
			}
			if(equal){
				equal = (parts.path === url.path());
			}
			if(strict){
				equal = (parts.hostname === url.hostname());
			}
			if(equal && includeQuery){
				equal = objectsAreEqual(query,url.query());
			}

			return equal;
		};
		/** setBase() */
		this.setBase = function(base) {
			if (base === undefined) {
				base = new URI(location.href);
			}
			if (typeof base === 'string') {
				base = new URI(base);
			}
			parts.protocol = base.protocol();
			parts.userinfo = base.userinfo();
			parts.username = base.username();
			parts.password = base.password();
			parts.port = base.port();
			parts.hostname = base.hostname();
			return this;
		};
		/** isRelative() */
		this.isRelative = function(url) {
			if (url === undefined) {
				url = this;
			}
			if (typeof url === 'string') {
				url = new URI(url);
			}
			return !(url.hostname());
		};
		/** isAbsolute() */
		this.isAbsolute = function(url){
			return !(this.isRelative(url));
		};
		/** isURL() */
		this.isURL = function(url) {
			return expressions.valid_url.test(url);
		};

		//Now do stuff
		if(parse(url)){
			if(parts.queryString){
				query = parseQuery(parts.queryString);
			}
			return this;
		}
		return false;
	//Fin
	};

	// Publish existence of object
	if (typeof module !== "undefined" && module.exports) {
		module.exports = URI;
	} else if (typeof define !== "undefined") {
		 define([], function() { return URI; });
	} else {
		glob.URI = URI;
	}
})(this);
