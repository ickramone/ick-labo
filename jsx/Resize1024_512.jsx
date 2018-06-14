/*
レイヤーオブジェクトへの参照を一旦変数に入れます。
一番最後のレイヤーが背景になります。
背景の場合にopacityに値を設定すると自動的に背景からレイヤーに変換されます。
*/
#target photoshop
$.appEncoding = "UTF-8";

//今の画像の単位を記憶
ref_ruler = app.preferences.rulerUnits;
//画像の単位をピクセルに
app.preferences.rulerUnits =Units.PIXELS
doc = app.activeDocument;
docObj = doc.artLayers;
//画像の変更をせずに解像度の変更
//現在の画像サイズを記憶
ref_width = doc.width;
ref_height = doc.height;
ref_resolution = doc.resolution;
// ドキュメントの解像度が 72ppi でなければ
if (doc.resolution !== 72) {
  // alert("解像度が72ppiではありません。「編集＞画像解像度」から解像度 72 pixel/inch にしてください。");
  //解像度の変更
  doc.resizeImage(ref_width ,ref_height,72);
}

//背景チェック
flag = doc.activeLayer.isBackgroundLayer;
w = doc.width.value;
h = doc.height.value;
//alert(flag);

// 1.正方形サイズか判定　2.2の冪乗サイズか判定　1と２が満たされたらなにもしない
if (flag) {
  docObj[docObj.length - 1].opacity = 100;
  if (w == h) {
//     alert("Pow2で、背景レイヤーあり");
    if (w == 64 || w == 128 || w == 256 || w == 512 || w == 1024 || w == 2048) {
//       alert("Pow2で、2の冪乗で、背景レイヤーあり　→とじる");
      doc.close();
    } else {
//       alert("Pow2で、2の冪乗ではなく、背景レイヤーあり　→変換する");
      resize();
      doc.save();
      doc.close();
    }
  } else {
//     alert("Pow2ではなく、背景レイヤーあり");
    if (w == 64 || w == 128 || w == 256 || w == 512 || w == 1024 || w == 2048) {
//       alert("Pow2ではなく、2の冪乗で、背景レイヤーあり　→変換する");
      resize();
      doc.save();
      doc.close();
    } else {
//       alert("Pow2ではなく、2の冪乗でもなく、背景レイヤーあり　→変換する");
      resize();
      doc.save();
      doc.close();
    }
  }
} else {
  if (w == h) {
//     alert("Pow2で、背景レイヤーなし");
    if (w == 64 || w == 128 || w == 256 || w == 512 || w == 1024 || w == 2048) {
//       alert("Pow2で、2の冪乗で、背景レイヤーなし　→とじる");
      doc.close();
    } else {
//       alert("Pow2で、2の冪乗ではなく、背景レイヤーなし　→変換する");
      resize();
      doc.save();
      doc.close();
    }
  } else {
//     alert("Pow2ではなく、背景レイヤーなし");
    if (w == 64 || w == 128 || w == 256 || w == 512 || w == 1024 || w == 2048) {
//       alert("Pow2ではなく、2の冪乗で、背景レイヤーなし　→変換する");
      resize();
      doc.save();
      doc.close();
    } else {
//       alert("Pow2ではなく、2の冪乗でもなく、背景レイヤーなし　→変換する");
      resize();
      doc.save();
      doc.close();
    }
  }
}



function resize() {
  if (w >= 1025 || h >= 1025) {
        doc.resizeCanvas(2048, 2048, AnchorPosition.TOPLEFT);
  } else if (w >= 513 || h >= 513) {
        doc.resizeCanvas(1024, 1024, AnchorPosition.TOPLEFT);
  } else if (w >= 257 || h >= 257) {
        doc.resizeCanvas(512, 512, AnchorPosition.TOPLEFT);
  } else if (w >= 129 || h >= 129) {
        doc.resizeCanvas(256, 256, AnchorPosition.TOPLEFT);
  } else if (w >= 65 || h >= 65) {
        doc.resizeCanvas(128, 128, AnchorPosition.TOPLEFT);
  } else {
        doc.resizeCanvas(64, 64, AnchorPosition.TOPLEFT);
  }
}
