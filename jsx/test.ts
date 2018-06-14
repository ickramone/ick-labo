///<reference path="./photoshop.d.ts/dist/cc/ps.types.d.ts"/>
///<reference path="./photoshop.d.ts/dist/cc/es.d.ts"/>
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

var foo = 123;
class Bar {
    static bar: number;
    bar: number;
}
var bar = new Bar();
alert(bar);

function getBMI(weight: number, tall: number): number {
  return weight / (tall * tall);
}

var bmi = getBMI(65, 1.75);

var pos = activeDocument.bounds;
alert(pos[0] + pos[1]);

var doc = activeDocument.bounds;
var docs = parseInt(doc[0].unitvalue);
alert(docs[0]);
