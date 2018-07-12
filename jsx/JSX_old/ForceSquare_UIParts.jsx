//単位指定　ピクセル
preferences.rulerUnits = Units.PIXELS;

//フォルダ以下のすべてのPNGを開く
var dirObj = Folder.selectDialog("フォルダを選択してください");
var files = dirObj.getFiles("*.png");

for(var i=0; i<files.length; i++){
    //ファイル開く
    var theDoc = app.open(files[i]);
    theDoc.changeMode(ChangeMode.RGB);

	//縦、横サイズを取得
	// w = activeDocument.width;
	// h = activeDocument.height;
	w = theDoc.width.value;
	h = theDoc.height.value;

	//どちらか長い方のサイズを選ぶ
	if(w > h){
		Long = w;
	}else{
		Long = h;
	}

	//長い方のサイズを2のべき乗数にして、画像サイズをその数の正方形にする
	if(Long <= 128){
		activeDocument.resizeImage(128,128,72,BILINEAR);
	}else if((Long >= 129) && (Long <= 256)){
		activeDocument.resizeImage(256,256,72,BILINEAR);
	}else if((Long >= 257) && (Long <= 512)){
		activeDocument.resizeImage(512,512,72,BILINEAR);
	}else if((Long >= 513) && (Long <= 1536)){
		activeDocument.resizeImage(1024,1024,72,BILINEAR);
	}else{
		activeDocument.resizeImage(2048,2048,72,BILINEAR);
	}

	//保存
	//var SaveDocs = activeDocument.save();
	theDoc.save();
	theDoc.close();
}

