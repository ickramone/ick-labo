$.appEncoding = "UTF-8";
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.POINTS;
// リターン（改行）コードを変数に指定
var CR = String.fromCharCode(13);

// テキストレーヤーに上記文字列を入力させる
var doc = app.activeDocument;
var layerObj = doc.artLayers;
var newLay = layerObj.add(); //新規レイヤー
newLay.kind = LayerKind.TEXT; // レイヤー種別をテキストレイヤーに設定


var testText = 'test -275,512' + CR;

newLay.name = testText;

newLay.textItem.contents = testText; // テキストレイヤーに文字列を設定
newLay.textItem.position = Array(100, 100); // レイヤー位置を指定（配列）。フォントのベースラインが基準？
newLay.textItem.font = "M+ 1c"; // フォント名。
newLay.textItem.size = 16; // フォントサイズ。
newLay.textItem.color = Array(255, 255, 255); // フォントの色　RGB


// newLay.textItem.name = testText;
