rootFolderObj = Folder.selectDialog("�t�H���_��I�����Ă�������");
fList = getAllFile(rootFolderObj, [".png"]);	// �g���q�͏�������
alert(fList);
	for(var i=0; i<fList.length; i++){
		app.open(fList[i]);
		app.doAction('LetfTop_1024', 'ICK');
	}
// �T�u�t�H���_���܂߂��t�@�C���ꗗ���擾����֐�
function getAllFile(folderObj, ext){
	if (!folderObj) return;	// �L�����Z�����ꂽ�珈�����Ȃ�
		var list = [];
		getFolder(folderObj);
		return list;
		
		// �t�H���_���̈ꗗ���擾
		function getFolder(folderObj){
			var fileList = folderObj.getFiles();
			for (var i=0; i<fileList.length; i++){
				if (fileList[i].getFiles) {
					getFolder(fileList[i]);	// �T�u�t�H���_���������J��Ԃ�
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





