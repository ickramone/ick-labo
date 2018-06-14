var doc = app.activeDocument; //アクティブドキュメントを取得
var layers = doc.layers; //アクティブレイヤー
var doclay = doc.artLayers; //レイヤー
var arr = [];
test();

function test() {
  var lay = layers.length;
  var i;
  //レイヤー分だけループ
  for (i = 0; i < lay; i++) {
    var item = layers[i]; //レイヤーを取得
    var name = layers[i].name; //名前を取得
    var type = layers[i].kind; //レイヤータイプ Layer.Kind.TEXT
    // var type2 = item.typename; //レイヤータイプ artlayer layerSet
    var posxy = layers[i].bounds; // 座標を取得
    var docw = activeDocument.width.value; //ドキュメントの横幅
    var w = parseInt(posxy[2] - posxy[0]);
    var h = parseInt(posxy[3] - posxy[1]);
    var x = parseInt(posxy[0]); //x座標
    var x2 = parseInt(posxy[0] - (docw / 2)); //x座標　ドキュメントのセンターから
    var y = parseInt(posxy[1]);
    pos = x + " " + y + " W:" + w + " H:" + h;

    //レイヤーの種類がテキストレイヤーだった場合、
    if (type === LayerKind.TEXT) {
      var fntsize = parseInt(item.textItem.size) + "px "; //テキストサイズ
      var justifi = item.textItem.justification; //justification.CENTER RIGHT LEFT
      if (justifi === Justification.CENTER) {
        justifi = "center";
      } else if (justifi === Justification.LEFT) {
        justifi = "left";
      } else {
        justifi = "right";
      }
      var color = item.textItem.color; //  solidcolorが帰る
      color.rgb.hexValue = '88FF78'; // Hexで指定
      /* テキストカラーを取得する時
      var R = 0;
      var G = 0;
      var B = 0;
      R = Math.round(item.textItem.color.rgb.red);
      G = Math.round(item.textItem.color.rgb.green);
      B = Math.round(item.textItem.color.rgb.blue);
      var rgb = "R:" + R + "G:" + G + "B:" + B;
      */
      //名前を追加
      // arr.push(prefix + item + " : " + pos);
      //alert(name + " " + fntsize + ", " + pos);
      arr.push(name + " " + fntsize + " " + justifi + " " + pos);
    } else {
      arr.push(name + " " + pos);
      //alert(name + " " + pos);
    }
  }
}

for (var i = 0; i < arr.length; i++) {
  $.writeln(arr[i]);
}

/*
配列を正規表現でマッチさせる
-もしくは数字から始まり、1~4繰り返し＋半角スペース＋-もしくは数字から始まり、1~4繰り返し　にマッチした配列の[0]がｘ[1]がy テキストレイヤーのポジションに代入
*/
result = arr[1].match(/[-\d]{1,4}\s/g);
$.writeln(result);
$.writeln(result[0]);
$.writeln(result[1]);
//  数字＋pxにマッチする配列があれば、テキストレイヤーの文字色を緑色に
//テキストレイヤーの文字列を検索して