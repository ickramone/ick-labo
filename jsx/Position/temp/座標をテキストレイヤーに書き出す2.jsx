LayText();

function LayText(){

    var lay = activeDocument.layers;
    // var txtPosY = 0;

    var findLayer = function(lay){

    for (var i = 0; i < lay.length; i++) {
        var zahyo = lay[i].bounds;
    //    var w = parseInt(bounds[2] - bounds[0]);
    //    var h = parseInt(bounds[3] - bounds[1]);
        var x = parseInt(zahyo[2] / 2);
        var y = parseInt(zahyo[1]);
    
            if (item.typename === "LayerSet") {
                found_lay = findLayer(lay);
                $.writeln("child");
                    if (findLayer){
                        
                }
        	}
    //    $.writeln(lay[i].name + ": " + bounds[0] + " " + bounds[1] + " " + bounds[2] + " " + bounds[3] );
        $.writeln(lay[i].name + ": [x]" + x + ", [y]" + y );
        writeText = lay[i].name + ": [x]" + x + ", [y]" + y ;

/*
    // テキストレーヤーに文字を入力する
    var doc = app.activeDocument;
    var layerObj = doc.artLayers;
    var newLay = layerObj.add(); //新規レイヤー
    newLay.kind = LayerKind.TEXT; // レイヤー種別をテキストレイヤーに設定
    newLay.textItem.position = Array(100, txtPosY); // レイヤー位置を指定（配列）。フォントのベースラインが基準？
    newLay.textItem.size = 16; // フォントサイズ。
    //カラーに描画色をセット
    var textColor = new SolidColor;
    textColor.rgb.red = 200;
    textColor.rgb.green = 200;
    textColor.rgb.blue = 200;
    // textColor.rgb.hexValue = 'FAF9EF';  //Hexで指定することもできる
    newLay.textItem.color = textColor; // フォントの色　RGB
    newLay.textItem.font = "M+ 2c-regular"; // フォント名。
    // newLay.name = writeText; //レイヤー名
    newLay.textItem.contents = writeText; // テキストレイヤーに文字列を設定
    
    txtPosY += 30;
*/
    	}


	}

}


