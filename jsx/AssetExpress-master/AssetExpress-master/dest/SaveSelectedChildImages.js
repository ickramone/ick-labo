
/*
<javascriptresource>
<name>レイヤーサイズで子レイヤー書出し</name>
<category>web</category>
</javascriptresource>
 */


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


  function RGB(color_string)
  {
    this.ok = false;
    if (color_string.charAt(0) == '#') {
        color_string = color_string.substr(1,6);
    }
    color_string = color_string.replace(/ /g,'');
    color_string = color_string.toLowerCase();
    var color_defs = [
        {
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3])
                ];
            }
        },
        {
            re: /^(\w{2})(\w{2})(\w{2})$/,
            example: ['#00ff00', '336699'],
            process: function (bits){
                return [
                    parseInt(bits[1], 16),
                    parseInt(bits[2], 16),
                    parseInt(bits[3], 16)
                ];
            }
        },
        {
            re: /^(\w{1})(\w{1})(\w{1})$/,
            example: ['#fb0', 'f0f'],
            process: function (bits){
                return [
                    parseInt(bits[1] + bits[1], 16),
                    parseInt(bits[2] + bits[2], 16),
                    parseInt(bits[3] + bits[3], 16)
                ];
            }
        }
    ];
    for (var i = 0; i < color_defs.length; i++) {
        var re = color_defs[i].re;
        var processor = color_defs[i].process;
        var bits = re.exec(color_string);
        if (bits) {
            channels = processor(bits);
            this.r = channels[0];
            this.g = channels[1];
            this.b = channels[2];
            this.ok = true;
        }

    }
    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);
    this.toRGB = function () {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    }
    this.toHex = function () {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;
        return '#' + r + g + b;
    }
  }
;


var FolderUtil;

FolderUtil = (function() {
  function FolderUtil() {}

  return FolderUtil;

})();

var SettingDialog,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

SettingDialog = (function() {
  function SettingDialog(windowName) {
    this.onClickedCancel = bind(this.onClickedCancel, this);
    this.onClickedOK = bind(this.onClickedOK, this);
    var obj;
    this.rect = {
      x: 0,
      y: 0,
      w: 400,
      h: 300
    };
    this.by = 20;
    this.kx = 20;
    this.kw = 80;
    this.vh = 20;
    this.vx = this.kx + this.kw;
    this.vw = this.rect.w - this.kw - this.kx * 2;
    this.bm = 30;
    obj = {
      dialog: {
        orientation: 'column',
        alignChildren: ['fill', 'top']
      }
    };
    this.uDlg = new Window('dialog', windowName, [this.rect.x, this.rect.y, this.rect.w, this.rect.h]);
  }

  SettingDialog.prototype.getArrayFromInput = function(arr) {
    var buf, i, j, ref, ref1, res;
    if (arr !== "") {
      if (arr.indexOf('..') !== -1) {
        res = [];
        buf = arr.split("..");
        for (i = j = ref = buf[0], ref1 = buf[1]; ref <= ref1 ? j <= ref1 : j >= ref1; i = ref <= ref1 ? ++j : --j) {
          res.push(i);
        }
        return res;
      } else if (arr.indexOf(',') !== -1) {
        return arr.split(",");
      } else if (arr.indexOf(' ') !== -1) {
        return arr.split(" ");
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  SettingDialog.prototype.setWidth = function(width) {
    this.rect.w = width;
    this.vx = this.kx + this.kw;
    return this.vw = this.rect.w - this.kw - this.kx * 2;
  };

  SettingDialog.prototype.addInputTextWithLabel = function(key, val) {
    this.uDlg.add("statictext", [this.kx, this.by, this.kw + this.kx, this.vh + this.by], key);
    this.uDlg[key] = this.uDlg.add("edittext", [this.vx, this.by, this.vw + this.vx, this.vh + this.by], val);
    return this.by += this.bm;
  };

  SettingDialog.prototype.addRadioButtonWithLabel = function(settings) {
    var group, i, k, ref, ref1, ref2, v, x;
    group = settings.groupName;
    this.uDlg[group] = this.uDlg.add("panel", [this.kx, this.by, this.kw + this.vw + this.kx, this.by + this.vh * 3], group);
    i = 0;
    ref = settings.values;
    for (k in ref) {
      v = ref[k];
      x = i * 100 + this.kx;
      this.uDlg[group][k] = this.uDlg[group].add("radiobutton", [x, 0, x + this.kw, this.vh * 3], v.text);
      this.uDlg[group][k].value = (ref1 = v.value) != null ? ref1 : false;
      this.uDlg[group][k].onClick = (ref2 = v.onClick) != null ? ref2 : function() {};
      i += 1;
    }
    return this.by += this.bm * 2.5;
  };

  SettingDialog.prototype.addIntentButton = function(ok, cancel, height) {
    var width, x;
    width = (this.rect.w - this.kx * 2 - 10) / 2;
    x = this.kx;
    this.uDlg.okBtn = this.uDlg.add("button", [x, this.by, x + width, height + this.by], ok, {
      name: ok
    });
    this.uDlg.cancelBtn = this.uDlg.add("button", [x + width + 10, this.by, x + width * 2 + 10, height + this.by], cancel, {
      name: cancel
    });
    this.uDlg.okBtn.onClick = this.onClickedOK;
    this.uDlg.cancelBtn.onClick = this.onClickedCancel;
    return this.by += height;
  };

  SettingDialog.prototype.onClickedOK = function() {
    return this.uDlg.close();
  };

  SettingDialog.prototype.onClickedCancel = function() {
    return this.uDlg.close();
  };

  SettingDialog.prototype.showWindow = function() {
    this.uDlg.bounds = [this.rect.x, this.rect.y, this.rect.w, this.by + this.vh];
    this.uDlg.center();
    return this.uDlg.show();
  };

  return SettingDialog;

})();

var AssetExpress,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

AssetExpress = (function() {
  function AssetExpress() {
    this.saveGIF = bind(this.saveGIF, this);
    this.savePNG = bind(this.savePNG, this);
    this.saveJPG = bind(this.saveJPG, this);
    var active, all, json, ref, ref1;
    this.baseDir = activeDocument.path;
    json = FileSystem.readJSON(this.baseDir + "/" + this.defaultConfig.config_file);
    all = (ref = json["*.psd"]) != null ? ref : {};
    active = (ref1 = json[activeDocument.name]) != null ? ref1 : {};
    this.config = FileSystem.objectMerge(this.defaultConfig, all, active);
  }

  AssetExpress.prototype.createConfig = function() {
    var configFile, createFile, file;
    file = this.config["config_file"];
    configFile = new File(activeDocument.path + "/" + file);
    createFile = function(message) {
      var fp, txt;
      fp = configFile.open("w");
      if (fp) {
        txt = '{\n\t\"*.psd\":{\n\t\t\"images_dir\":\"./\",\n\t\t\"bg_color\":null,\n\t\t\"resize_even\":false,\n\t\t\"jpg\":{ \"quality\":80 },\n\t\t\"gif\":{ \"colors\":256 },\n\t\t\"png\":{ \"colors\":256, \"PNG8\":0 }\n\t}\n}';
        configFile.write(txt);
        alert(file + "を" + message);
        return configFile.close();
      }
    };
    if (configFile.exists) {
      if (confirm(file + "はすでに存在します。上書きしますか？")) {
        return createFile("上書きました");
      }
    } else {
      return createFile("作成しました");
    }
  };

  AssetExpress.prototype.imagesDir = function() {
    var dir;
    return dir = FileSystem.readdir(activeDocument.path + "/" + this.config.images_dir);
  };

  AssetExpress.prototype.even = function(num) {
    if (this.config["resize_even"]) {
      if (num * 0.5 - (num * 0.5 >> 0) !== 0) {
        return num + 1;
      } else {
        return num;
      }
    } else {
      return num;
    }
  };

  AssetExpress.prototype.getColor = function(color) {
    var _color, c;
    _color = new RGB(color);
    c = new RGBColor();
    c.red = _color.r;
    c.green = _color.g;
    c.blue = _color.b;
    return c;
  };

  AssetExpress.prototype.fillLayer = function(color) {
    var c;
    c = new RGBColor();
    c.red = color.r;
    c.green = color.g;
    c.blue = color.b;
    activeDocument.selection.selectAll();
    return activeDocument.selection.fill(c, ColorBlendMode.NORMAL, 100, false);
  };

  AssetExpress.prototype.parseName = function(layer) {
    var dir, docname, dp, getName, getOption, name, newname, obj, opt, option, paa, pap, pas, path, pp, ref, replaceAll, res, suffix;
    res = "";
    dp = this.config["docname_placeholder"];
    pp = this.config["parent_placeholder"];
    pap = this.config["option_prefix"];
    pas = this.config["option_separator"];
    paa = this.config["option_assignment"];
    getName = function(target) {
      var _n, _pn;
      _n = target.name;
      _pn = target.parent.name;
      if (_n.indexOf(pp) !== -1) {
        if (_pn.indexOf(pp) !== -1) {
          res = _n.replace(pp, "") + res;
          return getName(target.parent);
        } else {
          res = _n.replace(pp, _pn) + res;
          return res;
        }
      } else {
        res += _n;
        return res;
      }
    };
    replaceAll = function(expression, org, dest) {
      return expression.split(org).join(dest);
    };
    getOption = function(path) {
      var _arr, data, i, index, j, len, query, query_arr, query_str;
      index = path.lastIndexOf(pap) === -1 ? 0 : path.lastIndexOf(pap);
      query = path.lastIndexOf(pap) === -1 ? "" : path.slice(path.lastIndexOf(pap));
      data = {};
      if (query !== "") {
        query_str = replaceAll(query, pap, "");
        query_arr = query_str.split(pas);
        for (j = 0, len = query_arr.length; j < len; j++) {
          i = query_arr[j];
          _arr = i.split(paa);
          data[_arr[0]] = _arr[1];
        }
      }
      return {
        index: index,
        query: query,
        data: data
      };
    };
    newname = getName(layer);
    docname = activeDocument.name.slice(0, -4);
    path = replaceAll(res, dp, docname);
    option = getOption(path);
    path = replaceAll(path, option.query, "");
    dir = path.slice(0, path.lastIndexOf("/") + 1);
    suffix = option.index ? path.slice(path.lastIndexOf(this.config["suffix"]), option.index) : path.slice(path.lastIndexOf(this.config["suffix"]));
    name = replaceAll(path, dir, "");
    name = replaceAll(name, suffix, "");
    opt = FileSystem.objectMerge((ref = this.config.option) != null ? ref : {}, option.data);
    obj = {
      dir: dir,
      name: name,
      suffix: suffix,
      option: opt
    };
    return obj;
  };

  AssetExpress.prototype.getMatchNameLayerAtLayers = function(layers, name) {
    var i, j, len;
    for (j = 0, len = layers.length; j < len; j++) {
      i = layers[j];
      if (i.name.match(name)) {
        return i;
      }
    }
    return false;
  };

  AssetExpress.prototype.isBtn = function() {
    var _off, _on, length, lst;
    lst = activeDocument.activeLayer.layerSets;
    _on = this.getMatchNameLayerAtLayers(lst, "on");
    _off = this.getMatchNameLayerAtLayers(lst, "off");
    length = lst.length === 2;
    return _on && _off && length;
  };

  AssetExpress.prototype.createBtn = function(layer) {
    var _off, _on, h, l, w;
    l = layer;
    _on = this.getMatchNameLayerAtLayers(l.layerSets, "on").merge();
    _off = this.getMatchNameLayerAtLayers(l.layerSets, "off").merge();
    _off.translate(-_off.bounds[0], -_off.bounds[1]);
    _on.translate(-_on.bounds[0], -_on.bounds[1] + _off.bounds[3]);
    w = l.bounds[2] - l.bounds[0];
    h = l.bounds[3] - l.bounds[1];
    if (activeDocument.width < w || activeDocument.height < h) {
      activeDocument.resizeCanvas(w, h);
      return l.translate(-l.bounds[0], -l.bounds[1]);
    }
  };

  AssetExpress.prototype.createNewDocument = function(n, w, h, o, m, f) {
    var doc;
    doc = app.documents.add(w, h, 72, n.name, m, f);
    activeDocument.selection.selectAll();
    if (this.config.bg_color != null) {
      this.fillLayer(new RGB(this.config.bg_color));
    }
    activeDocument.paste();
    return activeDocument.activeLayer.opacity = o;
  };

  AssetExpress.prototype.saveJPG = function(d, n) {
    var fileObj, jpgOpt;
    FileSystem.readdir(d + "/" + n.dir);
    fileObj = new File(d + "/" + n.dir + n.name + n.suffix);
    jpgOpt = new ExportOptionsSaveForWeb();
    FileSystem.objectMerge(jpgOpt, {
      quality: 80,
      format: SaveDocumentType.JPEG,
      optimized: true
    }, this.config.jpg);
    return activeDocument.exportDocument(fileObj, ExportType.SAVEFORWEB, jpgOpt);
  };

  AssetExpress.prototype.savePNG = function(d, n) {
    var fileObj, pngOpt;
    FileSystem.readdir(d + "/" + n.dir);
    fileObj = new File(d + "/" + n.dir + n.name + n.suffix);
    pngOpt = new ExportOptionsSaveForWeb();
    FileSystem.objectMerge(pngOpt, {
      colors: 256,
      quality: 0,
      format: SaveDocumentType.PNG,
      dither: Dither.NONE,
      matteColor: backgroundColor.rgb,
      colorReduction: ColorReductionType.SELECTIVE,
      transparencyDither: Dither.NONE
    }, this.config.png);
    return activeDocument.exportDocument(fileObj, ExportType.SAVEFORWEB, pngOpt);
  };

  AssetExpress.prototype.saveGIF = function(d, n) {
    var fileObj, gifOpt;
    FileSystem.readdir(d + "/" + n.dir);
    fileObj = new File(d + "/" + n.dir + n.name + n.suffix);
    gifOpt = new ExportOptionsSaveForWeb();
    FileSystem.objectMerge(gifOpt, {
      colors: 256,
      quality: 0,
      format: SaveDocumentType.COMPUSERVEGIF,
      dither: Dither.NONE,
      matteColor: backgroundColor.rgb,
      colorReduction: ColorReductionType.SELECTIVE,
      transparencyDither: Dither.NONE
    }, this.config.gif);
    return activeDocument.exportDocument(fileObj, ExportType.SAVEFORWEB, gifOpt);
  };

  AssetExpress.prototype.saveImage = function(layer, diameter) {
    var _h, _w, b, bounds, d, h, l, n, o, saveWithDiameter, w, x1, x2, y1, y2;
    l = layer;
    d = this.imagesDir();
    o = l.opacity;
    n = this.parseName(layer);
    saveWithDiameter = (function(_this) {
      return function(fn) {
        var originName;
        if (diameter === 2) {
          originName = n.name;
          n.name = originName + _this.config["@2x_suffix"];
          fn(d, n);
          activeDocument.resizeImage(w * 0.5, h * 0.5);
          n.name = originName;
        } else if (diameter === 0.5) {
          activeDocument.resizeImage(w * 0.5, h * 0.5);
          n.name += _this.config["@.5x_suffix"];
        }
        return fn(d, n);
      };
    })(this);
    if (n.suffix === ".jpg" || n.suffix === ".png" || n.suffix === ".gif") {
      if (l.layers && l.visible) {
        l = l.duplicate();
        activeDocument.activeLayer = l;
        if (this.isBtn(l)) {
          this.createBtn(l);
        }
        activeDocument.activeLayer.merge();
        activeDocument.activeLayer.allLocked = false;
        b = activeDocument.activeLayer.bounds;
        if (!([0] === 0 && b[1] === 0 && b[2] === 0 && b[3] === 0)) {
          bounds = activeDocument.activeLayer.bounds;
          x1 = bounds[0];
          y1 = bounds[1];
          x2 = bounds[2];
          y2 = bounds[3];
          bounds = [[x1, y1], [x2, y1], [x2, y2], [x1, y2]];
          activeDocument.selection.select(bounds);
          activeDocument.selection.copy();
          b = activeDocument.selection.bounds;
          _w = Number(b[2] - b[0]);
          _h = Number(b[3] - b[1]);
          w = this.even(_w);
          h = this.even(_h);
          switch (n.suffix) {
            case ".jpg":
              this.createNewDocument(n, w, h, o, NewDocumentMode.RGB, DocumentFill.BACKGROUNDCOLOR);
              saveWithDiameter(this.saveJPG);
              break;
            case ".png":
              this.createNewDocument(n, w, h, o, NewDocumentMode.RGB, DocumentFill.TRANSPARENT);
              saveWithDiameter(this.savePNG);
              break;
            case ".gif":
              this.createNewDocument(n, w, h, o, NewDocumentMode.RGB, DocumentFill.TRANSPARENT);
              saveWithDiameter(this.saveGIF);
          }
          activeDocument.close(SaveOptions.DONOTSAVECHANGES);
          activeDocument.selection.deselect();
        }
        return activeDocument.activeLayer.remove();
      }
    }
  };

  AssetExpress.prototype.saveSelectedImage = function(diameter) {
    if (diameter) {
      return this.saveImage(activeDocument.activeLayer, diameter);
    } else {
      return this.saveImage(activeDocument.activeLayer);
    }
  };

  AssetExpress.prototype.saveImageDocSize = function(layer, diameter) {
    var d, n, originName, saveWithDiameter;
    d = this.imagesDir();
    n = this.parseName(layer);
    originName = n.name;
    saveWithDiameter = (function(_this) {
      return function(fn) {
        var su;
        if (diameter === 2) {
          su = _this.config["@2x_suffix"];
          n.name = originName + su;
          fn(d, n);
          open(new File(d + "/" + n.dir + "/" + n.name + n.suffix));
          activeDocument.resizeImage(activeDocument.width * 0.5, activeDocument.height * 0.5);
          n.name = originName;
          fn(d, n);
          return activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        } else if (diameter === 0.5) {
          fn(d, n);
          open(new File(d + "/" + n.dir + "/" + n.name + n.suffix));
          activeDocument.resizeImage(activeDocument.width * 0.5, activeDocument.height * 0.5);
          fn(d, n);
          return activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        } else {
          return fn(d, n);
        }
      };
    })(this);
    switch (n.suffix) {
      case ".jpg":
        return saveWithDiameter(this.saveJPG);
      case ".png":
        return saveWithDiameter(this.savePNG);
      case ".gif":
        return saveWithDiameter(this.saveGIF);
    }
  };

  AssetExpress.prototype.saveSelectedImageDocSize = function(diameter) {
    if (diameter) {
      return this.saveImageDocSize(activeDocument.activeLayer, diameter);
    } else {
      return this.saveImageDocSize(activeDocument.activeLayer);
    }
  };

  AssetExpress.prototype.saveChildImages = function(layer, diameter) {
    var _layer, j, len, ref;
    ref = layer.layerSets;
    for (j = 0, len = ref.length; j < len; j++) {
      _layer = ref[j];
      if (diameter) {
        this.saveImage(_layer, diameter);
      } else {
        this.saveImage(_layer);
      }
    }
    return alert("finish");
  };

  AssetExpress.prototype.saveSelectedChildImages = function(diameter) {
    if (diameter) {
      return this.saveChildImages(activeDocument.activeLayer, diameter);
    } else {
      return this.saveChildImages(activeDocument.activeLayer);
    }
  };

  AssetExpress.prototype.defaultConfig = {
    "images_dir": "./",
    "bg_color": null,
    "resize_even": false,
    "jpg": {
      "quality": 80
    },
    "gif": {
      "colors": 256
    },
    "png": {
      "PNG8": 0,
      "colors": 256
    },
    "config_file": "psd-config.json",
    "option_prefix": "?",
    "option_separator": "&",
    "option_assignment": "=",
    "suffix": ".",
    "docname_placeholder": "@",
    "parent_placeholder": "^",
    "@2x_suffix": "@2x",
    "@.5x_suffix": ""
  };

  return AssetExpress;

})();

var ax;

ax = new AssetExpress();

ax.saveSelectedChildImages();
