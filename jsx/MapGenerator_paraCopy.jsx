var doc = app.activeDocument;
var laySet = doc.layerSets; //artLayers
var flag = true;
var lay = doc.activeLayer;
var fpath = activeDocument.path;
var fname = lay.name;
//ファイル名から拡張子を消す
var docname = doc.name;
var docnam = docname.split('.');//文字列をドット(.)で分割
var dnam = docnam[0];
/*
ファイル名　0015_01_003
(docname + "_01_" + fname + ".png")
*/
// Textureフォルダが存在しない場合は作成する
var dir = new Folder(fpath + '/Texture');
if (! dir.exists) dir.create();

//ある名前のレイヤーセットが存在するか
try {
  n = laySet["MAP"];
} catch (e) {
  flag = false;
}
if (flag) {
//  alert("レイヤーが存在します");
//  alert(lay);
//  alert(n);
  lay = n;
} else {
  alert("レイヤーがありません");
}

//レイヤーセット内のレイヤー総数を求める
var m = lay.artLayers.length;
var cutLay = lay.artLayers;
// alert("レイヤーセット内のレイヤー総数："+m);

for (var i=0; i < m; i++) {
  doc.activeLayer = cutLay[i]; //順番にアクティブししていく
  layerName = cutLay[i].name; //レイヤー名を保存しとく
  // alert(layerName);
  // 切り抜き処理の関数
  doCutImages();
  // alert(cutLay[i]);
}


//切り抜き処理の関数
function doCutImages() {
//  選択範囲作成 左上と右下の座標「左　上　右　下」の順番
var pos = cutLay[i].bounds;
x1 = parseInt(pos[0]);
y1 = parseInt(pos[1]);
x2 = parseInt(pos[2]);
y2 = parseInt(pos[3]);
// alert("("+x1+","+y1+")-("+x2+","+y2+")");

setSelection (y1,x1,y2,x2);
// 0017_01レイヤーをアクティブにして、選択範囲で画像をコピー
doc.activeLayer = doc.artLayers[dnam + "_01"]; //0017_01をアクティブに
doc.selection.copy();
//新規ドキュメント作成　2048*2048
app.documents.add(x2 - x1, y2 - y1);
//ペースト
activeDocument.paste();

//PNG書き出し
fileObj = new File(fpath + "/Texture/" + dnam + "_01_" + layerName + ".png");
// alert(fileObj);
pngOpt = new ExportOptionsSaveForWeb();
pngOpt.format = SaveDocumentType.PNG;
pngOpt.PNG8 = false;
activeDocument.exportDocument(fileObj, ExportType.SAVEFORWEB, pngOpt);
//ドキュメンとを閉じる
activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}


/////////////////////////選択範囲作成////////////////////////////
function setSelection (tp,lft,btm,rgt)
    {
    try {
        var d = new ActionDescriptor();
        var r = new ActionReference();
        r.putProperty(stringIDToTypeID("channel"), stringIDToTypeID("selection"));
        d.putReference(stringIDToTypeID("null"), r);
        var d1 = new ActionDescriptor();
        d1.putUnitDouble(stringIDToTypeID("top"), stringIDToTypeID("pixelsUnit"), tp);
        d1.putUnitDouble(stringIDToTypeID("left"), stringIDToTypeID("pixelsUnit"), lft);
        d1.putUnitDouble(stringIDToTypeID("bottom"), stringIDToTypeID("pixelsUnit"), btm);
        d1.putUnitDouble(stringIDToTypeID("right"), stringIDToTypeID("pixelsUnit"), rgt);
        d.putObject(stringIDToTypeID("to"), stringIDToTypeID("rectangle"), d1);
        executeAction(stringIDToTypeID("set"), d, DialogModes.NO);
        }
    catch (e) { throw(e); }
    }
