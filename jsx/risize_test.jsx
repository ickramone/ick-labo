
//����������
//���܂��Ȃ�

#target photoshop

// Photoshop�̐ݒ�P�ʂ�ۑ�
var originalRulerUnits = app.preferences.rulerUnits;
// Photoshop�̐ݒ�P�ʂ��s�N�Z���ɕύX
app.preferences.rulerUnits = Units.PIXELS;
// Photoshop�̕s�v�ȃ_�C�A���O��\�������Ȃ�
app.displayDialogs = DialogModes.NO;

//�h�L�������g�T�C�Y���r����
//�c�̂ق����傫��������A1020�s�N�Z���Ń��T�C�Y

Doc = app.activeDocument;
H = Doc.height;
W = Doc.width;
if (H>W) {
Doc.resizeImage ((1020/H)*W,(1020/H)*H);
} else {
Doc.resizeImage ((1020/W)*W,(1020/W)*H);
}

// ���T�C�Y
//app.activeDocument.resizeImage(1020);
//W,H