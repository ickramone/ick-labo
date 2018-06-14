
//■ここから
//おまじない

#target photoshop

// Photoshopの設定単位を保存
var originalRulerUnits = app.preferences.rulerUnits;
// Photoshopの設定単位をピクセルに変更
app.preferences.rulerUnits = Units.PIXELS;
// Photoshopの不要なダイアログを表示させない
app.displayDialogs = DialogModes.NO;

//ドキュメントサイズを比較して
//縦のほうが大きかったら、1020ピクセルでリサイズ

Doc = app.activeDocument;
H = Doc.height;
W = Doc.width;
if (H>W) {
Doc.resizeImage ((1020/H)*W,(1020/H)*H);
} else {
Doc.resizeImage ((1020/W)*W,(1020/W)*H);
}

// リサイズ
//app.activeDocument.resizeImage(1020);
//W,H