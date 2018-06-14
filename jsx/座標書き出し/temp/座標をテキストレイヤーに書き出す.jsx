$.appEncoding = "UTF-8";
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.POINTS;
// リターン（改行）コードを変数に指定
var CR = String.fromCharCode(13);
var fileName = File.saveDialog("保存ファイル名を入力");

var fileObj = new File(fileName);
var nest = 0;


if ( fileObj.open('w') ) {

  for (var i = 0; i < activeDocument.layers.length; i++) {
    var layer = activeDocument.layers[i];
    get_layer_pos(layer, fileObj, nest);
  }
  fileObj.close();

}

function get_layer_pos(target, fileObj, nest) {
    var bounds = target.bounds;

    for (var i = 0; i < bounds.length; i++) {
        bounds[i] = parseInt(bounds[i]);
    };

    // 高さと幅も取れるよ。
    var w = bounds[2] - bounds[0] ;
    var h = bounds[3] - bounds[1] ;
    var x = bounds[0];
    var y = bounds[1];
    var ww = activeDocument.width.value;
    var hh = activeDocument.height.value;
    var c = Math.round(ww*0.5) ;

    // インデント用のコードだよ。要らないなら消そう。
    // var length = 15;
    var name = "";
    for (var i = 0; i < nest; i++) {
        // length -= 2;
        name += "  ";
    };
    name += target.name;
    // length -= target.name.length;

    /* for (var i = 0; i < length; i++) {
        name += " ";
    };
*/

    // ファイル書き出し
    //入力する文字
    var writeText = name + ': ' + (x-c) + ', ' + y + CR;
    fileObj.write (writeText);
    textLayers();

    if(target.layers){
        for (var i = 0; i < target.layers.length; i++) {
            get_layer_pos(target.layers[i], fileObj, nest+1);
        };
    }

function textLayers() {
// テキストレーヤーに文字を入力する
var doc = app.activeDocument;
var layerObj = doc.artLayers;
var newLay = layerObj.add(); //新規レイヤー
newLay.kind = LayerKind.TEXT; // レイヤー種別をテキストレイヤーに設定
// newLay.name = writeText; //レイヤー名
newLay.textItem.contents = writeText; // テキストレイヤーに文字列を設定
newLay.textItem.position = Array(100, txtPosY); // レイヤー位置を指定（配列）。フォントのベースラインが基準？
newLay.textItem.size = 16; // フォントサイズ。
//カラーに描画色をセット
var textColor = new SolidColor;
textColor.rgb.red = 200;
textColor.rgb.green = 200;
textColor.rgb.blue = 200;
// textColor.rgb.hexValue = 'FAF9EF';  //Hexで指定することもできる
newLay.textItem.color = textColor; // フォントの色　RGB
newLay.textItem.font = "M+ 2c-regular"; // フォント名。

//座標をY100ｐｘずつずらす
var txtPosY = 0;


}

}


