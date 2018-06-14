$.appEncoding  =  "UTF-8";
preferences.rulerUnits  =  Units.PIXELS;

//ダイアログボックスを表示させる
var posArr = prompt("x,y軸に指定ピクセルごとのガイドを引く","値を入力してください");
//posArr ダイアログで入力された数字を代入したい　～ピクセルごと
// var posArr  =  [0, 50, 100];//位置%
// var posArr  =  32;//位置%
var dirArr  =  ["Vrtc", "Hrzn"];//向き

function guideWrap (direction, position) {
var id1 = charIDToTypeID("Mk  ");
    var desc1 = new ActionDescriptor();
    var id2 = charIDToTypeID("Nw  ");
        var desc2 = new ActionDescriptor();
        var id3 = charIDToTypeID("Pstn");
        var id4 = charIDToTypeID("#Rlt"); //#Prc パーセント　#Rlt　ピクセル
        desc2.putUnitDouble(id3,id4,position);
        var id5 = charIDToTypeID("Ornt");
        var id6 = charIDToTypeID("Ornt");
        var id7 = charIDToTypeID(direction);
        desc2.putEnumerated(id5,id6,id7);
    var id8 = charIDToTypeID("Gd  ");
    desc1.putObject(id2,id8,desc2);
executeAction(id1, desc1, DialogModes.NO);
}

//ドキュメントのサイズを求める
w = activeDocument.width.value;
h = activeDocument.height.value;
//forでドキュメントサイズから入力した数字を引いて、0以下になるまで繰り返す
times = parseInt(w / posArr); //ドキュメントサイズから何回ガイドが引けるか
for(var i = 0; i <= times; times--){
  for(var j = 0; j < dirArr.length; j++){
        guideWrap (dirArr[j], posArr * times);
      }
}

/*
for(var  i = 0; i < posArr.length; i++){
    for(var  j = 0; j < dirArr.length; j++){
        guideWrap (dirArr[j], posArr[i]);
    }
}
*/
