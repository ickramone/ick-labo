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

//android
var androArr = [192, 144, 96, 72, 48, 36];

if (flag) {
  docObj[docObj.length - 1].opacity = 100;
  resizeAndro();
} else {
  resizeAndro();
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
function resizeAndro() {
  for (var i = 0; i < androArr.length; i++) {
    activeDocument.resizeImage(androArr[i], androArr[i], 72, ResampleMethod.BICUBICAUTOMATIC);
    docname = androArr[i];
    var options = new ExportOptionsSaveForWeb();
    options.format = SaveDocumentType.PNG;
    options.optimized = true;
    options.PNG8 = false;
    if (docname == 192) {
      pname = 'drawable-xxxhdpi';
    } else if (docname == 144) {
      pname = 'drawable-xxhdpi';
    } else if (docname == 96) {
      pname = 'drawable-xhdpi';
    } else if (docname == 72) {
      pname = 'drawable-hdpi';
    } else if (docname == 48) {
      pname = 'drawable-mdpi';
    } else { //docname == 36
      pname = 'drawable-ldpi';
    }
/*
    //フォルダの存在を調べる
    folderObj = new Folder(doc.path + '/android/' + pname);
    flag = folderObj.exists;
    if (flag == true) {
      alert("フォルダはすでに存在しています！");
    } else {
      alert("フォルダはありませんでした");
    }
*/
    //    doc.exportDocument(File(doc.path + '/android/' + pname + '/' +androArr[i] + '.png'), ExportType.SAVEFORWEB, options);
    doc.exportDocument(File(doc.path + '/android/' + pname + '/' + 'icon.png'), ExportType.SAVEFORWEB, options);
  }
}
s
