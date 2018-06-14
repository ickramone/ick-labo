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





