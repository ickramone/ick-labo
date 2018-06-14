
/*
レイヤーオブジェクトへの参照を一旦変数に入れます。
一番最後のレイヤーが背景になります。
背景の場合にopacityに値を設定すると自動的に背景からレイヤーに変換されます。
*/
$.appEncoding = "UTF-8";
preferences.rulerUnits = Units.PIXELS;
flag = activeDocument.activeLayer.isBackgroundLayer;
docObj = activeDocument.artLayers;
w = activeDocument.width.value;
h = activeDocument.height.value;
//alert(flag);

if (flag) {
  docObj[docObj.length - 1].opacity = 100;
  resize();
} else {
  resize();
}

activeDocument.save();
activeDocument.close();

function resize() {
  if (w > 513) {
    activeDocument.resizeCanvas(1024, 1024, AnchorPosition.TOPLEFT);
  } else if (h > 513) {
    activeDocument.resizeCanvas(1024, 1024, AnchorPosition.TOPLEFT);
  } else {
    activeDocument.resizeCanvas(512, 512, AnchorPosition.TOPLEFT);
  }
}
