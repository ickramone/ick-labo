// アクティブドキュメントを取得
var myDoc = activeDocument;

// レイヤーを作成
myDoc.artLayers.add();
// 表示レイヤーを結合
myDoc.mergeVisibleLayers();
// 非表示レイヤーがあれば
if ( myDoc.layers.length > 1 ) {
	for ( var i = 0; i < myDoc.layers.length; i++ ) {
		if ( myDoc.layers[i].visible == false ) {
			// 非表示レイヤーを削除
			myDoc.layers[i].remove();
			i--;
		}
	}
}

// フルパスを取得（ファイル名を含む）
var myFullPath = myDoc.fullName.fsName.toString();
// パスを取得（ファイル名を除く）
var myPath = myDoc.path.fsName.toString()  + "\\";
// 拡張子をカット
var targetName = myFullPath.substring(0, myFullPath.lastIndexOf("."));
// パスをカット
targetName = targetName.replace(myPath, "");

// レイヤー名を変更
myDoc.layers[0].name = targetName;

// 保存して閉じる
myDoc.close(SaveOptions.SAVECHANGES);
