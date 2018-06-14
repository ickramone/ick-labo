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
