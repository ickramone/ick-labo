/**
 * レイヤー名置換 JSX
 */
 
var _layers = [];
 
main();
 
function main(){
	var dialog = showDialog();
	
	var document = activeDocument;
	var layers = document.layers;
	getLayer(layers);
 
	var originalText = dialog.txtOriginal.text;
	var replaceText = dialog.txtReplace.text;
	
	var num = _layers.length;
	for(var i = 0; i < num; i++){
		var layerName = _layers[i].name;
		_layers[i].name = replaceAll(layerName, originalText, replaceText);
	}
}
 
function showDialog(){
	var dialog = new Window("dialog", "レイヤー名を検索して置換", [200, 100, 500, 230]);
	dialog.btnOk = dialog.add("button", [160, 90, 230, 90 + 25], "OK", {name:"ok"});
	dialog.btnCancel = dialog.add("button", [70, 90, 140, 90 + 25], "Cancel", {name:"cancel"});
	dialog.stxtOriginal = dialog.add("statictext", [20, 15, 100, 10 + 25], "検索文字列");
	dialog.txtOriginal = dialog.add("edittext", [120, 10, 280, 10 + 25], "");
	dialog.stxtReplace = dialog.add("statictext", [20, 55, 100, 50 + 25], "置換文字列");
	dialog.txtReplace = dialog.add("edittext", [120, 50, 280, 50 + 25], "");
	dialog.show();
 
	return dialog;
}
 
function getLayer(layers){
	var num = layers.length;
	for(var i = 0; i < num; i++){
		var layer = layers[i];
		if(layer.typename == "LayerSet"){
			getLayer(layer.layers);
		}
		_layers.push(layer);
	}
}
 
function replaceAll(target, orgTxt, repTxt){
	var reg = new RegExp(orgTxt, "g");
	return target.replace(reg, repTxt);
}