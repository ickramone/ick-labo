var slice = [].slice;

this.FileSystem = (function() {
  function FileSystem() {}

  FileSystem.objectMerge = function() {
    var dest, j, k, len, obj, objs, v;
    dest = arguments[0], objs = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    for (j = 0, len = objs.length; j < len; j++) {
      obj = objs[j];
      for (k in obj) {
        v = obj[k];
        dest[k] = v;
      }
    }
    return dest;
  };

  FileSystem.objectClone = function(obj) {
    var flags, key, newInstance;
    if ((obj == null) || typeof obj !== 'object') {
      return obj;
    }
    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }
    if (obj instanceof RegExp) {
      flags = '';
      if (obj.global != null) {
        flags += 'g';
      }
      if (obj.ignoreCase != null) {
        flags += 'i';
      }
      if (obj.multiline != null) {
        flags += 'm';
      }
      if (obj.sticky != null) {
        flags += 'y';
      }
      return new RegExp(obj.source, flags);
    }
    newInstance = new obj.constructor();
    for (key in obj) {
      newInstance[key] = clone(obj[key]);
    }
    return newInstance;
  };

  FileSystem.JSONparse = function(str) {
    return new Function("return " + str)();
  };

  FileSystem.JSONstringify = function(obj) {
    var parse, str;
    parse = function(target) {
      var i, j, len, s;
      s = "{";
      for (j = 0, len = target.length; j < len; j++) {
        i = target[j];
        s += "\"" + String(i) + "\"";
        s += ":";
        if (typeof i === "object") {
          s += parse(i);
        } else if (typeof i === "boolean" || typeof i === "number") {
          s += i + ",";
        } else {
          s += "\"" + i + "\",";
        }
      }
      return s += "},";
    };
    str = parse(obj);
    return str.slice(0, -1);
  };

  FileSystem.readJSON = function(path) {
    var conf, json_obj, json_str;
    conf = new File(path);
    if (!conf.exists) {
      return false;
    }
    if (conf.open("r")) {
      json_str = conf.read();
      json_obj = FileSystem.JSONparse(json_str);
      conf.close();
      return json_obj;
    } else {
      return false;
    }
  };

  FileSystem.mkdir = function(path) {
    var dir;
    dir = new Folder(path);
    if (!dir.create()) {
      return false;
    }
    return dir;
  };

  FileSystem.rmdir = function(path) {};

  FileSystem.readdir = function(path) {
    var dir;
    dir = new Folder(path);
    if (!dir.exists) {
      dir = FileSystem.mkdir(path);
    }
    return dir;
  };

  return FileSystem;

})();
