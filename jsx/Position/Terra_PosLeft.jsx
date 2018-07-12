$.appEncoding = "UTF-8";
var CR = String.fromCharCode(13);
var fileName = File.saveDialog("保存ファイル名を入力");

var fileObj = new File(fileName);
var nest = 0;


if ( fileObj.open('w') ) {

  for (var i = 0; i < activeDocument.layers.length; i++) {
    var layer = activeDocument.layers[i];
    get_layer_pos(layer, fileObj, nest);
  }
  fileObj.close();

}
function get_layer_pos(target, fileObj, nest) {
  var bounds = target.bounds;

  for (var i = 0; i < bounds.length; i++) {
    bounds[i] = parseInt(bounds[i]);
  };

  // 高さと幅も取れるよ。
  var w = bounds[2] - bounds[0] ;
  var h = bounds[3] - bounds[1] ;
  var c = Math.round(bounds[2]*0.5) ;

  var x = bounds[0];
  var y = bounds[1];

  // インデント用のコードだよ。要らないなら消そう。
  var length = 15;
  var name = "";
  for (var i = 0; i < nest; i++) {
    length -= 2;
    name += "  ";
  };
  name += target.name;
  length -= target.name.length;

  for (var i = 0; i < length; i++) {
    name += " ";
  };

  // ファイル書き出し
  fileObj.write ( name + ':[x] ' + x + '\t\t[y] ' + y + CR );

  if(target.layers){
    for (var i = 0; i < target.layers.length; i++) {
      get_layer_pos(target.layers[i], fileObj, nest+1);
    };
  }
}
