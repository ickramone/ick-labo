// �A�N�e�B�u�h�L�������g���擾
var myDoc = activeDocument;

// ���C���[���쐬
myDoc.artLayers.add();
// �\�����C���[������
myDoc.mergeVisibleLayers();
// ��\�����C���[�������
if ( myDoc.layers.length > 1 ) {
	for ( var i = 0; i < myDoc.layers.length; i++ ) {
		if ( myDoc.layers[i].visible == false ) {
			// ��\�����C���[���폜
			myDoc.layers[i].remove();
			i--;
		}
	}
}

// �t���p�X���擾�i�t�@�C�������܂ށj
var myFullPath = myDoc.fullName.fsName.toString();
// �p�X���擾�i�t�@�C�����������j
var myPath = myDoc.path.fsName.toString()  + "\\";
// �g���q���J�b�g
var targetName = myFullPath.substring(0, myFullPath.lastIndexOf("."));
// �p�X���J�b�g
targetName = targetName.replace(myPath, "");

// ���C���[����ύX
myDoc.layers[0].name = targetName;

// �ۑ����ĕ���
myDoc.close(SaveOptions.SAVECHANGES);
