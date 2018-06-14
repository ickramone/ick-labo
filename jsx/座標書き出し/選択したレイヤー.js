/*
動作条件
　選択レイヤに背景レイヤが含まれているときにはエラー
　選択レイヤがない場合もエラー
実用上はあまり問題ないのでとりあえず無視
選択したレイヤーをレイヤーグループにして、そのレイヤーの配列を取得
レイヤーセットにしたものはUndoで元に戻す
選択途中にレイヤーセットがあり、そのレイヤーセットも選択していると
選択されたレイヤーセットの子供レイヤーは反映されないようだ
なので、レイヤーセットは選択しないようにすること
*/
#
target Photoshop
$.appEncoding = "UTF-8";
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.POINTS;

getSelectedLayers = function() {
  //----------------レイヤからグループ
  var idGrp = stringIDToTypeID("groupLayersEvent");
  var descGrp = new ActionDescriptor();
  var refGrp = new ActionReference();
  refGrp.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
  descGrp.putReference(charIDToTypeID("null"), refGrp);
  executeAction(idGrp, descGrp, DialogModes.ALL); //外部関数にして呼び出しすると妙に遅いので注意だ
  //================== トレーラーのレイヤを取得
  var resultLayers = new Array();
  var doc = app.activeDocument;
  var doclayers = doc.activeLayer.layers;
  for (var ix = 0; ix < doclayers.length; ix++) {
    //座標を取得
    var posxy = doclayers[ix].bounds; // 座標を取得
    var x = parseInt(posxy[0]); //x座標
    var y = parseInt(posxy[1]); //y座標
    //レイヤー名+座標x,yを合体させて、配列に入れる
    resultLayers.push(doclayers[ix] + "," + x + "," + y);
  }
  // =================== UNDOバッファを使用して復帰
  var id8 = charIDToTypeID("slct");
  var desc5 = new ActionDescriptor();
  var id9 = charIDToTypeID("null");
  var ref2 = new ActionReference();
  var id10 = charIDToTypeID("HstS");
  var id11 = charIDToTypeID("Ordn");
  var id12 = charIDToTypeID("Prvs");
  ref2.putEnumerated(id10, id11, id12);
  desc5.putReference(id9, ref2);
  executeAction(id8, desc5, DialogModes.NO);
  //配列を返す
  return resultLayers;
  //選択レイヤの復帰はUNDOが勝手にやるので何もしない
}
//getSelectedLayers()は選択したレイヤーの配列を返す
var local = getSelectedLayers();
alert(local[0] + local[1] + local[2]);

/*
つまり、getSelectedLayers関数内の配列に座標も入れ込んでおけば
というか、、
選択したレイヤーをグループにして、
新規ドキュメントを作って
そこで座標を取得して
配列に格納
新規ドキュメンは閉じる
もとのドキュメントに戻って
配列をもとに
テキストレイヤーに書き出す
だけでもいいかも


スクリプトリスナーから
// 選択したレイヤーを複製して新規ドキュメントに
function dupLayer() {
  var id35 = charIDToTypeID("Mk  ");
  var desc6 = new ActionDescriptor();
  var id36 = charIDToTypeID("null");
  var ref2 = new ActionReference();
  var id37 = charIDToTypeID("Dcmn");
  ref2.putClass(id37);
  desc6.putReference(id36, ref2);
  var id38 = charIDToTypeID("Usng");
  var ref3 = new ActionReference();
  var id39 = charIDToTypeID("Lyr ");
  var id40 = charIDToTypeID("Ordn");
  var id41 = charIDToTypeID("Trgt");
  ref3.putEnumerated(id39, id40, id41);
  desc6.putReference(id38, ref3);
  executeAction(id35, desc6, DialogModes.NO);
  var id42 = stringIDToTypeID("trim");
  var desc7 = new ActionDescriptor();
  var id43 = stringIDToTypeID("trimBasedOn");
  var id44 = stringIDToTypeID("trimBasedOn");
  var id45 = charIDToTypeID("Trns");
  desc7.putEnumerated(id43, id44, id45);
  var id46 = charIDToTypeID("Top ");
  desc7.putBoolean(id46, true);
  var id47 = charIDToTypeID("Btom");
  desc7.putBoolean(id47, true);
  var id48 = charIDToTypeID("Left");
  desc7.putBoolean(id48, true);
  var id49 = charIDToTypeID("Rght");
  desc7.putBoolean(id49, true);
  executeAction(id42, desc7, DialogModes.NO);
}

function trim() {
// ============================トリミング===========================
var idtrim = stringIDToTypeID( "trim" );
    var desc9 = new ActionDescriptor();
    var idtrimBasedOn = stringIDToTypeID( "trimBasedOn" );
    var idtrimBasedOn = stringIDToTypeID( "trimBasedOn" );
    var idTrns = charIDToTypeID( "Trns" );
    desc9.putEnumerated( idtrimBasedOn, idtrimBasedOn, idTrns );
    var idTop = charIDToTypeID( "Top " );
    desc9.putBoolean( idTop, true );
    var idBtom = charIDToTypeID( "Btom" );
    desc9.putBoolean( idBtom, true );
    var idLeft = charIDToTypeID( "Left" );
    desc9.putBoolean( idLeft, true );
    var idRght = charIDToTypeID( "Rght" );
    desc9.putBoolean( idRght, true );
executeAction( idtrim, desc9, DialogModes.NO );
}

*/