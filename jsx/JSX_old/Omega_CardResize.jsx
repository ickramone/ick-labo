// 単位指定　ピクセル
preferences.rulerUnits = Units.PIXELS;

// フォルダ以下のすべてのPNGを開く
var dirObj = Folder.selectDialog("フォルダを選択してください");
	if (dirObj != null){
		// OK押した場合
		var files = dirObj.getFiles("*.png");
		for(var i=0; i<files.length; i++){
			// ファイル開く
			var theDoc = app.open(files[i]);
			// パスと名前取得
			var fPath = theDoc.path;
			var filename = theDoc.name;
			// リサイズ
			// ファイル名"_i"にマッチ→100px
			// それ以外は512px
			if(filename.match(/cd.*_i/i)){
				theDoc.resizeImage(100,100,72);
				// フォルダ生成＆保存
				foldername = fPath + "/thum";
				folderObj = new Folder(foldername);
				//フォルダが存在するかチェック
				var flag = folderObj.exists;
				if (!flag) 
					{
					// 存在しなければ作成
					folderObj.create();
					}
				// PNGファイル作成
				fileObj = new File( folderObj + "/" + filename);
				pngOpt = new PNGSaveOptions(); 
				theDoc.saveAs(fileObj, pngOpt, true, Extension.LOWERCASE);
				theDoc.close(SaveOptions.DONOTSAVECHANGES);
			}else{
				theDoc.resizeImage(512,512,72);
				foldername = fPath + "/org";
				folderObj = new Folder(foldername);
				//フォルダが存在するかチェック
				var flag = folderObj.exists;
				if (!flag) 
					{
					// 存在しなければ作成
					folderObj.create();
					}
				fileObj = new File( folderObj + "/" + filename);
				pngOpt = new PNGSaveOptions(); 
				theDoc.saveAs(fileObj, pngOpt, true, Extension.LOWERCASE);
				theDoc.close(SaveOptions.DONOTSAVECHANGES);
			}
		}
	}else{
	}



