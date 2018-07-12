// 単位指定　ピクセル
preferences.rulerUnits = Units.PIXELS;

// フォルダ以下のすべてのPNGを開く
var dirObj = Folder.selectDialog("フォルダを選択してください");
	if (dirObj != null){
		// OK押した場合
		//サブフォルダ内のファイルも
		//var files = dirObj.getAllFiles(rootFolderObj, ["*.png"]);
		var files = dirObj.getFiles("*.png");
		for(var i=0; i<files.length; i++){
			// ファイル開く
			var theDoc = app.open(files[i]);
			// パスと名前取得
			var fPath = theDoc.path;
			var filename = theDoc.name;
			// カンバスサイズリサイズ
			// ファイル名"2から始まる数字"にマッチ→130px
			if(filename.match(/^2[0-9]/i)){
				theDoc..resizeCanvas(192,108,AnchorPosition.MIDDLECENTER);

				// 保存
				activeDocument.save();
			}else{
			}
		}
	}else{
	}



