$.appEncoding  =  "UTF-8";
//今の画像の単位を記憶
ref_ruler = app.preferences.rulerUnits;
//画像の単位をピクセルに
app.preferences.rulerUnits =Units.PIXELS
//画像の変更をせずに解像度の変更
//現在の画像サイズを記憶
ref_width = activeDocument.width;
ref_height = activeDocument.height;
ref_resolution = activeDocument.resolution;
// ドキュメントの解像度が 72ppi でなければ
if (activeDocument.resolution !== 72) {
  // alert("解像度が72ppiではありません。「編集＞画像解像度」から解像度 72 pixel/inch にしてください。");
  //解像度の変更
  activeDocument.resizeImage(ref_width ,ref_height,72);
}

//DOTレイヤーに基準となるドットをうち、選択範囲にしてからこのスクリプトを実行する
// エネミー詳細の中心座標
var stdx = 196;
var stdy = 602;
// 再度アクティブレイヤーにするときの名前を保存
var doc = app.activeDocument;
var lay = doc.activeLayer;
var target = lay.name;
//alert(target);
//alert(lay);

//Xは右方向へ+、左方向へ-
//Yは上方向へ-、下方向へ+
// ｘ座標　任意に選んだ点からレイヤーの座標を取得
var dpos = doc.selection.bounds;
//alert("ｘ座標" + dpos[0], 10);

// 選択しているレイヤーの座標を取得
var pos = lay.bounds;
//alert("y座標" + pos[3], 10);

var resx = parseInt(dpos[0] - stdx, 10);
var resy = parseInt(stdy - pos[3], 10);
alert("x座標" + resx + " y座標 " + resy);
lay.name = lay.name + " " + resx + " " + resy;
//alert(lay.name);
