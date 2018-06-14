$.appEncoding = "UTF-8";
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.POINTS;

//メインスクリプトはここから

var doc = app.activeDocument;
var layers = doc.layers;
var arr = []; //テキストレイヤーに渡す配列
//関数findLayerの前にレイヤー名を検索して、グローバル変数として基準座標を取得する

searchBase();

CreateTextLayers();

function searchBase(){
	var findBase = function( layers ){
		var item = layers[i]; //レイヤーを取得
		var name = layers[i].name; //名前を取得
		var posxy = layers[i].bounds; // 座標を取得
		var regP = /(LC_Base)(\d+)/; //正規表現マッチ用 LC_Baseが配列0　\d+が配列1　なはず
		for(var i=0; i < layers.length; i++){ 
			//レイヤー名が「LC_Base[0-9]」であれば
			if(item.name == match(regP)) {
				//そのレイヤーの座標を取得して
				//正規表現でマッチした名前で変数を生成する base + 数 + [x,y]
				//その変数に座標を代入
				eval("var base" + regP[1] + "x" + "= posxy[0] ;" , "var base" + regP[1] + "y" + "= posxy[1] ;");
				// var base1x = posxy[0];  親となるレイヤーの座標X
				// var base1y = posxy[1];  親となるレイヤーの座標Y
				writeIn(eval("var base" + regP[1] + "x" + "= posxy[0] ;" , "var base" + regP[1] + "y" + "= posxy[1] ;"));
			}
			if(item.typename == "LayerSet"){
				found_item = findBase(item.layers);
					if(found_item){
						//子レイヤーがあれば、結合
						//上と同じで、変数を生成する
						if(item.name == match(regP)) {
							eval("var base" + regP[1] + "x" + "= posxy[0] ;" , "var base" + regP[1] + "y" + "= posxy[1] ;");
							// var base1x = posxy[0];  親となるレイヤーの座標X
							// var base1y = posxy[1];  親となるレイヤーの座標Y
							writeIn(eval("var base" + regP[1] + "x" + "= posxy[0] ;" , "var base" + regP[1] + "y" + "= posxy[1] ;"));
						}
					}
				}
			}
		}
}


function CreateTextLayers(){
  var findLayer = function( layers ){
		for(var i=0; i < layers.length; i++){ 
			var item = layers[i]; //レイヤーを取得
			var name = layers[i].name; //名前を取得
			var posxy = layers[i].bounds; // 座標を取得
			var w = activeDocument.width.value; //ドキュメントの横幅
			var x = parseInt(posxy[0] - (w/2)); //x座標　ドキュメントのセンターから
			var y = parseInt(posxy[1]); //y座標
			//この下に条件わけ
			//レイヤー名が「LC_[0-9]」であれば
			if(item.name == match(regC)) {
				regC = /(LC_)(\d+)/; //正規表現マッチ用 LC_が配列0　\d+が配列1　なはず
				//ローカル座標を取得して
				//ローカル座標x - base1x, ローカル座標y - base1y の座標を取得する
				//正規表現でマッチした名前で変数を生成する local + 数 + [x,y]
				//その変数に座標を代入
				eval("var local" + regC[1] + "x" + "= base" + regC[1] + "x - parseInt(posxy[0]) ;"
				, "var local" + regC[1] + "y" + "= base" + regC[1] + "y - parseInt(posxy[1]) ;");
				// var local1x = base1x - parseInt(posxy[0]);  子の座標X
				// var local1y = base1y - parseInt(posxy[1]);  子の座標Y
				pos = name + ":  [x]" + local + regC[1] + x + ", [y]" + local + regC[1] + y ;
				//名前を追加
				// arr.push(prefix + item + " : " + pos);
				arr.push(pos);
				//フォルダだったら中身の捜索(再帰呼び出し)
				if(item.typename == "LayerSet"){
					found_item = findLayer(item.layers);
						if(found_item){
							//子レイヤーがあれば、結合
							arr = arr.concat(found_item);
						}
					}
				} else {
					//それ以外
					pos = name + ":  [x]" + x + ", [y]" + y ;
					//名前を追加
					// arr.push(prefix + item + " : " + pos);
					arr.push(pos);
					//フォルダだったら中身の捜索(再帰呼び出し)
					if(item.typename == "LayerSet"){
						found_item = findLayer(item.layers);
							if(found_item){
								//子レイヤーがあれば、結合
								arr = arr.concat(found_item);
							}
					}
				}
		}
	}
}