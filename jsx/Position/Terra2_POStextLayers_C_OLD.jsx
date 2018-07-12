
$.appEncoding = "UTF-8";
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.POINTS;

RaiseLayername();

function RaiseLayername() {
  var padString = " ";
  var findLayer = function(layers, pad) {
    var arr = [];

    //レイヤー分だけループ
    for (var i = 0; i < layers.length; i++) {
      //レイヤーを取得
      var item = layers[i];

      //名前を取得
      var name = layers[i].name;

      //名前の頭に階層分だけのスペースを追加
      var prefix = "";
      for (var n = 0; n < pad; n++) {
        prefix += padString;
      }


      // 座標を取得
      var posxy = layers[i].bounds;
      var x = parseInt(posxy[2] / 2);
      var y = parseInt(posxy[1]);
      pos = layers[i].name + ":  [x]" + x + ", [y]" + y;

      //名前を追加
      //            arr.push(prefix + item + " : " + pos);
      arr.push(pos);


      //フォルダだったら中身の捜索(再帰呼び出し)
      if (item.typename == "LayerSet") {
        found_item = findLayer(item.layers, pad + 1);
        if (found_item) {
          //子レイヤーがあれば、結合
          arr = arr.concat(found_item);
        }
      }
    }

    return arr;
  }

  //メインスクリプトはここから
  var doc = app.activeDocument; //アクティブドキュメントを取得
  var layers = findLayer(doc.layers, 0); //レイヤー名を取得
  // リターン（改行）コードを変数に指定
  var CR = String.fromCharCode(13);

  // テキストレーヤーに文字を入力する
  var layerObj = doc.artLayers;
  var newLay = layerObj.add(); //新規レイヤー
  newLay.kind = LayerKind.TEXT; // レイヤー種別をテキストレイヤーに設定
  newLay.textItem.position = Array(100, 100); // レイヤー位置を指定（配列）。フォントのベースラインが基準？
  newLay.textItem.size = 16; // フォントサイズ。
  //カラーに描画色をセット
  // var textColor = new SolidColor;
  // textColor.rgb.red = 200;
  // textColor.rgb.green = 200;
  // textColor.rgb.blue = 200;
  // textColor.rgb.hexValue = 'FAF9EF';  //Hexで指定することもできる
  // newLay.textItem.color = textColor; // フォントの色　RGB
  newLay.textItem.font = "M+ 2c-regular"; // フォント名。
  // newLay.name = writeText; //レイヤー名
  newLay.textItem.contents = layers.join(CR); // テキストレイヤーに文字列を設定
  // スタイルを適用　予めフォトショ内で作成しておくこと　今回は"TerraPOStext"
  layerObj[0].applyStyle("TerraPOStext");

  //    alert("RaiseLayername\n"+layers.join("\n"));//一覧を表示
}
