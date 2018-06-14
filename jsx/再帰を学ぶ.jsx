/*
サブフォルダ内のファイルをあつかうときに再帰が便利らしい
自分自身を呼び出す、関数なら自分自身の関数を呼び出すこと
*/


// サンプルその0  基本形

#target Photoshop
Recursion(app.activeDocument)

function Recursion(doc) {
  var layLength = doc.layers.length;

  for (var i = 0; i < layLength; i++) {
    //処理内容
    var layName = doc.layers[i].name;
    alert(layName);
    //再帰処理部分　レイヤータイプがLayerSetならば
    var objType = doc.layers[i].typename;
    if (objType == 'LayerSet') {
      Recursion(doc.layers[i]) //自身の関数を呼び出す
    }
  }
}



// サンプルその１

//再帰処理を行う関数
function nest(level) {
	if (level == 0) {
		return; //レベル0なら後の処理はしない
	}
	$.writeIn("Level = " + level);
	level = level - 1;
	nest(level); //自分自身を呼び出す
}

nest(4);
$.writeIn("------------");


/* 無名関数で再帰処理を行う場合
(function(level) {
	if (level == 0) {
		return;
	}
	$.writeIn("Level = " + level);
	level = level - 1;
	arguments.callee(level); //自分自身を呼び出す 無名関数の場合
})(6);
*/


// サンプルその2

//レイヤーセットを除く全てのレイヤーオブジェクトを取得
//IN　レイヤーオブジェクト、配列オブジェクト
//OUT　レイヤーオブジェクトを格納した配列

//例：テキストレイヤーだけ削除する
var list = getAllLayer(app.activeDocument, []);
for (var i = 0; i > 0; i--) {
	try { //テキストレイヤーのみの場合、削除するとエラーになるのでtry...catchを使う
		if (list[i].kind == LayerKind.TEXT) {
			list[i].remove(); //削除する
		}
	} catch(e) {}
}

function getAllLayer(obj, ary) {
	for (var i = 0; i < obj.layers.length; i++) {
		if (obj.layers[i].kind) { //レイヤーセット以外の場合
			ary.push(obj.layers[i], ary);
		} else { //レイヤーセットなので再帰
			getAllLayer(obj.layers[i], ary);
		}
	}
	return ary; //結果は配列で返す
}



// サンプルその3

CR = String.fromCharCode(13);
savename = File.saveDialog("保存するファイル名を入れてください");
if (savename) {
  fileObj = new File(savename);
  flag = fileObj.open("w");
  if (flag == true) {
    writeLayerName(activeDocument);
    fileObj.close();
  } else {
    alert("ファイルが開けませんでした");
  }
}

// レイヤーセット内にレイヤーが含まれる限り書き出し（再帰）
function writeLayerName(layObj) {
  var i;
  var n = layObj.artLayers.length;
  for (i = 0; i < n; i++) {
    layName = layObj.artLayers[i].name;
    fileObj.write(layName + CR);
  }
  var ns = layObj.layerSets.length;
  for (i = 0; i < ns; i++) {
    writeLayerName(layObj.layerSets[i])
  }
}

/*
レイヤーセット内にレイヤーが含まれる限り書き出し（再帰）
インデント付きの場合
function writeLayerName(layObj, indent) {
  var i, k;
  var n = layObj.artLayers.length;
  for (i = 0; i < n; i++) {
    layName = layObj.artLayers[i].name;
    for (k = 0, idt = ""; k < indent; k++) idt += " ";
    fileObj.write(idt + layName + CR);
  }
  var ns = layObj.layerSets.length;
  for (i = 0; i < ns; i++) {
    for (k = 0, idt = "■"; k < indent; k++) idt += "■";
    fileObj.write(idt + layObj.layerSets[i].name + CR);
    writeLayerName(layObj.layerSets[i], indent + 1)
  }
}
*/



// サンプルその4

// Photoshopで入力した文字を検索したい
gFlag = false;
//　レイヤーセット内にレイヤーが含まれる限り検索（再帰）
function searchLayerText(layObj) {
  var i;
  var n = layObj.artLayers.length;
  for (i = 0; i < n; i++) {
    layType = layObj.artLayers[i].kind;
    if (layType == LayerKind.TEXT) {
      txt = layObj.artLayers[i].textItem.contents;
      layName = layObj.artLayers[i].name;
      flag = txt.match(srchText);
      if (flag != null) {
        alert("レイヤー名「" + layName + "」でテキストが見つかりました");
        gFlag = true;
        return;
      }
    }
  }
  var ns = layObj.layerSets.length;
  for (i = 0; i < ns; i++) {
    searchLayerText(layObj.layerSets[i])
  }
}

srchText = prompt("検索するテキストを入れてください", "");
searchLayerText(activeDocument);
if (!gFlag) {
  alert("文字は見つかりませんでした");
}



// サンプルその5

// パス内のフォルダの中にある全ファイルをフォルダ内も全部探ってぶっこ抜く
// 指定されたパス内にある全ファイルを配列で返します。フォルダは返しません。

//そのパス以下にある全ファイルを配列で取得。
//ファイルに書き出すが、日本語がASCIIコードになってしまう、、
var Path = Folder.selectDialog("フォルダを選択してください");//パスを指定
//new Folder("C:/New_Project") //予め記述して置く場合
//$.writeln(GetAllFile(Path))
savename = File.saveDialog("保存するファイル名を入れてください");
if (savename) {
  fileObj = new File(savename);
  flag = fileObj.open("w");
  if (flag == true) {
    fileObj.write(GetAllFile(Path));
    fileObj.close();
  } else {
    alert("ファイルが開けませんでした");
  }
}

function GetAllFile(Path){
    var List=[]
    Execute(Path)
    function Execute(Path){
    for (i in Path.getFiles()){
        if(Path.getFiles()[i]instanceof Folder){
            Execute(Path.getFiles()[i])
            }
        if(Path.getFiles()[i]instanceof File){
            List.push(Path.getFiles()[i])
            }
        }
    }
return (List)
}





// サンプルその6

rootFolderObj = Folder.selectDialog("フォルダを選択してください");
fList = getAllFile(rootFolderObj, [".png"]);	// 拡張子は小文字で
alert(fList);
	for(var i=0; i<fList.length; i++){
		app.open(fList[i]);
		app.doAction('LetfTop_1024', 'ICK');
	}
// サブフォルダも含めたファイル一覧を取得する関数
function getAllFile(folderObj, ext){
	if (!folderObj) return;	// キャンセルされたら処理しない
		var list = [];
		getFolder(folderObj);
		return list;

		// フォルダ内の一覧を取得
		function getFolder(folderObj){
			var fileList = folderObj.getFiles();
			for (var i=0; i<fileList.length; i++){
				if (fileList[i].getFiles) {
					getFolder(fileList[i]);	// サブフォルダがある限り繰り返す
				}
				else{
				var f = fileList[i].name.toLowerCase();
					for(var j=0; j<ext.length; j++){
						if (f.indexOf(ext[j]) > -1) {
							 list.push(fileList[i]);
						 }
					}
				}
			}
		}
	}
