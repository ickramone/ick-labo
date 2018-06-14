$.appEncoding = "UTF-8";
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.POINTS;
// リターン（改行）コードを変数に指定
var CR = String.fromCharCode(13);

// テキストレーヤーに文字を入力する
var doc = app.activeDocument;
var layerObj = doc.artLayers;
var newLay = layerObj.add(); //新規レイヤー
newLay.kind = LayerKind.TEXT; // レイヤー種別をテキストレイヤーに設定
//入力する文字
var testText = 'test -275,512' + CR;
newLay.name = testText; //レイヤー名
newLay.textItem.contents = testText; // テキストレイヤーに文字列を設定
newLay.textItem.position = Array(100, 100); // レイヤー位置を指定（配列）。フォントのベースラインが基準？
newLay.textItem.size = 16; // フォントサイズ。
//カラーに描画色をセット
var textColor = new SolidColor;
textColor.rgb.red = 200;
textColor.rgb.green = 200;
textColor.rgb.blue = 200;
// textColor.rgb.hexValue = 'FAF9EF';  //Hexで指定することもできる
newLay.textItem.color = textColor; // フォントの色　RGB
newLay.textItem.font = "M+ 2c-regular"; // フォント名。


// newLay.textItem.name = testText;
