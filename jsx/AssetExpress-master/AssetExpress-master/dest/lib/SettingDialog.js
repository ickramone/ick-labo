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
