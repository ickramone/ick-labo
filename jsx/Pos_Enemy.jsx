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

// エネミー詳細の中心座標
var stdx = 238;
var stdy = 469;
// 選択しているレイヤーの座標を取得
var pos = activeDocument.activeLayer.bounds;
var x = pos[0];
var y = pos[1];
var w = parseInt(pos[2] - pos[0], 10);
var h = parseInt(pos[3] - pos[1], 10);
var cx = parseInt(w/2 + x, 10);
var cy = parseInt(h/2 + y, 10);
//alert(x + " " + y);
//alert(w + " " + h);
//alert("cx" + cx + " cy " + cy);
var resx = parseInt(cx - stdx);
var resy = parseInt(cy - stdy);
//alert("resx" + resx + " resy " + resy);
var lay = activeDocument.activeLayer;
lay.name = lay.name + " " + resx + " " + resy;
//alert(lay.name);
