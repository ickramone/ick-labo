(function() {
	var CSVConverter = function() {
		this.lines = [];
		this.textGroups = [];
		this.pathGroups = [];
		this.textWords = null;
		this.variables = app.activeDocument.variables;
		this.path = String(app.documents[0].fullName).replace(app.documents[0].name, "");
 
		//CSVの何列目に画像ファイルの項目があるか
		this.imageIndex = 3; //3列目
 
		for (var i = 0, n = this.variables.length; i < n; i++) {
			var group = this.variables[i].pageItems[0];
			if (group.textFrames.length != 0) {
				this.textGroups.push(group);
			}
		}
 
		for (i = 0, n = this.variables.length; i < n; i++) {
			group = this.variables[i].pageItems[0];
			if (group.pathItems.length != 0) {
				this.pathGroups.push(group);
			}
		}
	};
 
	CSVConverter.prototype = {
		read: function() {
			var path = File.openDialog("CSVファイルを選択してください。");
			if (! path) {
				return;
			}
			var csv = new File(path);
 
			if (! csv.open("r", "", "")) {
				return;
			}
 
			this.lines = [];
			var text = csv.read();
			var lines = text.split(String.fromCharCode(10));
 
			for (var i = 0, n = lines.length; i < n; i++) {
				var line = lines[i];
 
				if (! line) {
					continue;
				}
 
				if (i == 0) {
					this.textWords = line.split(",");
				} else {
					this.lines.push(line.split(","));
				}
			}
 
			csv.close();
		},
		writeText: function() {
			for (var i = 0, n = this.textGroups.length; i < n; i++) {
				var textFrames = this.textGroups[i].textFrames;
 
				for (var j = 0, o = textFrames.length; j < o; j++) {
					try {
						var textFrame = textFrames[j];
						var text = String(textFrame.contents);
 
						for (var key in this.textWords) {
							if (text.indexOf(this.textWords[key]) != -1) {
								textFrame.contents = this.lines[i][key];
							}
						}
					} catch (e) {}
				}
			}
		},
		writeImage: function() {
			for (var i = 0, n = this.pathGroups.length; i < n; i++) {
				var groups = this.pathGroups[i];
				var paths = [];
 
				if (groups.pathItems.length != 0) {
					paths = groups.pathItems;
				}
 
				for (var j = 0, o = paths.length; j < o; j++) {
					try { 
						var rect = paths[j];
						var file = new File(this.path + this.lines[i][this.imageIndex - 1]);
						var pItem = activeDocument.placedItems.add();
						pItem.file = file;
						this._createPosition(pItem, rect);
						var mask = activeDocument.pathItems.rectangle(rect.top, rect.left, rect.width, rect.height);
						mask.stroke = true;
						mask.filled = true;
						var holder = app.activeDocument.groupItems.add();
						pItem.move(holder, ElementPlacement.PLACEATEND);
						mask.move(holder, ElementPlacement.PLACEATBEGINNING);
						holder.clipped = true;
						rect.remove();
					} catch (e) {}
				}
			}
		},
		_createPosition: function(targetA, targetB) {
			var widthA = targetA.width;
			var widthB = targetB.width;
			var heightA = targetA.height;
			var heightB = targetB.height;
 
			targetA.left = targetB.left;
			targetA.top = targetB.top;
 
			if (widthA > widthB) {
				targetA.left = targetA.left - ((widthA - widthB) / 2);
			}
 
			if (heightA > heightB) {
				targetA.top = targetA.top + ((heightA - heightB) / 2);
			}
		}
	};
 
	var converter = new CSVConverter();
	converter.read();
	converter.writeText();
	converter.writeImage();
})();
