/*
    アクティブなレイヤーを再帰的に取得して、テキストレイヤーに文字列を入力する
*/

#target photoshop
//レイヤーセットを辿るための関数
function follw_LayerSets(doc){
  var arr = [];
  var CR = String.fromCharCode(13);  // リターン（改行）コードを変数に指定
  var ChildLyaers= doc.layers;
  for (var i = 0; i < ChildLyaers.length; i++){
    if (ChildLyaers[i].typename == "LayerSet"){
			//レイヤーセットの場合の処理
			//再帰処理
			follw_LayerSets(ChildLyaers[i]);
		}
    names = ChildLyaers[i].name; //レイヤー名を取得
    arr.push(names); //配列に格納
    $.writeln(names); //Photoshopでコンソール出力するときに使う
  }
return arr.join(CR);
}

var doc = activeDocument;//作業するドキュメントの参照
// output = follw_LayerSets(doc);
// $.writeln(output);
var layerObj = doc.artLayers;
var newLay = layerObj.add(); //新規レイヤー
newLay.kind = LayerKind.TEXT; // レイヤー種別をテキストレイヤーに設定
newLay.textItem.position = Array(100, 100); // レイヤー位置を指定（配列）。フォントのベースラインが基準？
newLay.textItem.size = 16; // フォントサイズ。
newLay.textItem.font = "M+ 2c-regular"; // フォント名。
// 関数follw_LayerSets(doc)から帰ってきた配列
output = follw_LayerSets(doc);
newLay.textItem.contents = output; // テキストレイヤーに文字列を設定
// スタイルを適用　予めフォトショ内で作成しておくこと　今回は"TerraPOStext"
layerObj[0].applyStyle("TerraPOStext");


/*
app.bringToFront();
//ドキュメントが開かれているかどうか判別
if (app.documents.length ==0){
	//ドキュメントが開かれていない場合処理なし
}else{

}
*/
