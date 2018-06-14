#target photoshop
$.appEncoding = "UTF-8";

preferences.rulerUnits = Units.PIXELS;
flag = activeDocument.activeLayer.isBackgroundLayer;
doc = app.activeDocument;
docObj = app.activeDocument.artLayers;
//解像度チェック　画像の変更をせずに解像度の変更
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
//背景チェック
w = activeDocument.width.value;
h = activeDocument.height.value;
//alert(flag);

//ios
var iosArr = [1024, 512, 180, 167, 152, 120, 80, 76, 58, 40, 29];

if (flag) {
  docObj[docObj.length - 1].opacity = 100;
  resizeiOS();
} else {
  resizeiOS();
}

fukki();


//復帰
function fukki() {
  var desc = new ActionDescriptor();
  var revertID = charIDToTypeID('Rvrt');
  try {
    app.executeAction(revertID, desc, DialogModes.NO);
  } catch (e) {
    alert('一度も保存されていませんので、保存してください。');
    activeDocument.close(SaveOptions.PROMPTTOSAVECHANGES);
  }
}

//選択した元レイヤー（1024の画像）に対してリサイズを行う
function resizeiOS() {
  for (var i = 0; i < iosArr.length; i++) {
    activeDocument.resizeImage(iosArr[i], iosArr[i], 72, ResampleMethod.BICUBICAUTOMATIC);
    var docname = iosArr[i];
    //var docname = doc.name;
    var options = new ExportOptionsSaveForWeb();
    options.format = SaveDocumentType.PNG;
    options.optimized = true;
    options.PNG8 = false;
    doc.exportDocument(File(doc.path+'/ios/' + docname + '.png'), ExportType.SAVEFORWEB, options);
  }
}
