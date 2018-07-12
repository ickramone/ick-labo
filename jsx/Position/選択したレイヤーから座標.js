#
target Photoshop
$.appEncoding = "UTF-8";
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.POINTS;

//メインスクリプトはここから
var doc = app.activeDocument;
var actlayers = doc.activeLayer;
var layers = doc.layers;
var arr = []; //テキストレイヤーに渡す配列
searchBase();
//関数findLayerの前にレイヤー名を検索して、グローバル変数として基準座標を取得する
function searchBase() {
  var findBase = function(actlayers) {
    for (var i = 0; i < actlayers.length; i++) {
      var item = actlayers[i]; //レイヤーを取得
      var name = actlayers[i].name; //名前を取得
      var posxy = actlayers[i].bounds; // 座標を取得
      var w = activeDocument.width.value; //ドキュメントの横幅
      var x = parseInt(posxy[0]); //x座標　ドキュメントのセンターから
      var y = parseInt(posxy[1]);
      pos = name + ":  [x]" + x + ", [y]" + y;
      var regB = /(^Base)(.*)/; //正規表現マッチ用 ^Baseが配列1　.*が配列2　なはず
      if (item.name == match(regP)) {
        //そのレイヤーの座標を取得して変数に代入
        //この場合選択したレイヤー内に一つしか存在しないのが前提
        arr.push(pos);
      }
      if (item.typename == "LayerSet") {
        found_item = findBase(item.layers);
        if (found_item) {
          //子レイヤーがあれば、座標を取得して変数に代入
          arr = arr.concat(found_item);
        }
      }
    }
    alert(baseX + ":" + baseY);
  }
}