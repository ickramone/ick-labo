@echo off
rem -------------------------------------------------------
rem ���ȉ��̃A�v�������C���X�g�[�����Ă����Ԃł������삵�܂���
rem ��ETC�ϊ��A�v�����C���X�g�[��
rem Code\Tools\Mali_Texture_Compression_Tool_v4.3.0.b81c088_Windows_x64.exe
rem ��TexturePacker�̃C���X�g�[��
rem �R�}���h���C���c�[�����g����悤�ɂ���K�v������H�H�H
rem C:\Program Files\CodeAndWeb\TexturePacker\bin
rem ���̃f�B���N�g�������݂��Ă����OK���ȁH
rem �����ҕϊ��悤��ETC�c�[����
rem C:\Terra\Arts\Actor\99_ETC
rem �������Q�Ƃ��܂�
rem ������
rem C:\Terra\Arts\ETC�@�@�����ł͂���܂���
rem -------------------------------------------------------

rem ������
set CHNUM=
rem ���͗v��
set /P CHNUM="����ID����͂��Ă�������"

rem ETC�̃p�X
rem �������ɋ��ʂ�ETC����ݒu
rem set ETC=C:\Users\kiyohiro.ichikawa\00_Works\ETC\
rem SVN�����ł͂�����
set ETC=C:\Terra\Arts\Actor\99_ETC\

rem �e�i�[��̃p�X
set Arts=C:\Terra\Arts\Actor\02_guardian\
set CodeJP=C:\Terra\Code\Client\Product\JP\Download\Data\img\guardian\
set CodeEN=C:\Terra\Code\Client\Product\EN\Download\Data\img\guardian\
rem 1024�̕ۑ���p�X
set ArtsL=C:\Terra\Arts\Actor\02_guardian\x1024\

rem ETC�ɂ���K�v������t�@�C���͕ϊ��f�B���N�g���ɃR�s�[
copy /Y Temp-assets\GU_XX_01.png %ETC%128\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_02.png %ETC%128k\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_ZK.png %ETC%128k2\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_BS.png %ETC%256\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_03.png %ETC%256s\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_04.png %ETC%512\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_05.png %ETC%512C\GU_%CHNUM%.png

rem x1024�Ɏw�肵��ID�̃f�B���N�g�����쐬
mkdir %ArtsL%GU_%CHNUM%

rem �e�N�X�`���p�b�J�[�Ȃǂ̃t�@�C�����R�s�[���ă��l�[��
copy /Y Temp-assets\GU_1024\GU_XX.tps %ArtsL%\GU_%CHNUM%\GU_%CHNUM%.tps
copy /Y Temp-assets\GU_1024\illust.png %ArtsL%\GU_%CHNUM%\illust.png

rem Arts�̂�1024�t�H���_�����l�[���i�J�����g�f�B���N�g���̃t�H���_���j
for %%I in (.) do set DIRNAME=%%~nI%%~xI
rem x1024�Ɏw�肵��ID�̃f�B���N�g�����쐬
ren %ArtsL%\GU_%CHNUM% %DIRNAME%


rem �e�N�X�`���p�b�J�[���g����悤��
SET "PATH=C:/Program Files/CodeAndWeb/TexturePacker/bin;%PATH%"

rem TexturePacker�œf���o���@ETC\1024��json��png���i�[
rem .tps���g��Ȃ��ꍇ�̐ݒ�B���̐ݒ��.tps�ɕۑ����������ǂǂ�����΁H
rem TexturePacker --format bhive --data ETC\1024\GU_%CHNUM%.json --texture-format png --sheet ETC\1024\GU_%CHNUM%.png --opt RGBA8888  --width 1024 --height 1024 --size-constraints POT GU_1024\

rem .tps�t�@�C�����g�p����ꍇ
TexturePacker Temp-assets\GU_1024\GU_XX.tps --data %ETC%1024\GU_%CHNUM%.json --sheet %ETC%1024\GU_%CHNUM%.png


rem ETC�ɕϊ�����
rem ETC�ϊ��pBAT�̃p�X��%ETC%
rem PKM�ϊ��pBAT�Ăяo��
rem 512�p
call %ETC%Conv128.BAT
rem 512�p
call %ETC%Conv128k.BAT
rem 512�p
call %ETC%Conv128k2.BAT
rem 512�p
call %ETC%Conv256.BAT
rem 512�p
call %ETC%Conv256s.BAT
rem 512�p
call %ETC%Conv512.BAT
rem 512C�p
call %ETC%Conv512c.BAT
rem 1024�p
call %ETC%Conv1024.BAT

rem ETC�ϊ��pBAT�f�B���N�g���Ɉړ����Ȃ��Ɠ����Ȃ��̂�
rem ��ETC�ϊ��pBAT�̂ق��ɂ�%ETC%�֖߂�悤�ɋL�ڂ��Ă���
cd %ETC%
rem ETC�ϊ��pBAT�Ăяo��
call %ETC%conv.bat

rem ����BAT�t�@�C��"rename_new.bat"������f�B���N�g���Ɉړ�
cd /d %~dp0

rem Arts�Ƀt�@�C���R�s�[
copy /Y Temp-assets\GU_XX_01.png %Arts%x128_Icon\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_02.png %Arts%x128_koma\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_03.png %Arts%x256_S\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_04.png %Arts%x512\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_05.png %Arts%x512_cut-in\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_BS.png %Arts%x128_koma_2\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_ZK.png %Arts%x128_koma_2\GU_%CHNUM%.png
rem Arts�ɂ�1024png��json���R�s�[
copy /Y %ETC%1024\GU_%CHNUM%.png %ArtsL%�yExport�z\GU_%CHNUM%.png
copy /Y %ETC%1024\GU_%CHNUM%.json %ArtsL%�yExport�z\GU_%CHNUM%.json

rem Code�փR�s�[
rem JP
rem copy /Y Temp-assets\GU_XX_01.png %CodeJP%x128_Icon\GU_%CHNUM%.png
rem copy /Y Temp-assets\GU_XX_02.png %CodeJP%x128_koma\GU_%CHNUM%.png
rem copy /Y Temp-assets\GU_XX_03.png %CodeJP%x256_S\GU_%CHNUM%.png
rem copy /Y Temp-assets\GU_XX_BS.png %CodeJP%x128_koma_2\GU_%CHNUM%.png
rem copy /Y Temp-assets\GU_XX_ZK.png %CodeJP%x128_koma_2\GU_%CHNUM%.png
rem ETC�t�@�C�����R�s�[
copy /Y %ETC%128\GU_%CHNUM%.etc %CodeJP%x128_Icon\GU_%CHNUM%.etc
copy /Y %ETC%128k\GU_%CHNUM%.etc %CodeJP%x128_koma\GU_%CHNUM%.etc
copy /Y %ETC%128k2\GU_%CHNUM%.etc %CodeJP%x128_koma_2\GU_%CHNUM%.etc
copy /Y %ETC%256\GU_%CHNUM%.etc %CodeJP%x128_koma_2\GU_%CHNUM%.etc
copy /Y %ETC%256s\GU_%CHNUM%.etc %CodeJP%x256_S\GU_%CHNUM%.etc
copy /Y %ETC%512\GU_%CHNUM%.etc %CodeJP%x512\GU_%CHNUM%.etc
copy /Y %ETC%512c\GU_%CHNUM%.etc %CodeJP%x512_cut-in\GU_%CHNUM%.etc
copy /Y %ETC%1024\GU_%CHNUM%.etc %CodeJP%x1024\GU_%CHNUM%.etc
rem json���R�s�[
copy /Y %ETC%1024\GU_%CHNUM%.json %CodeJP%x1024\GU_%CHNUM%.json


rem EN
rem copy /Y Temp-assets\GU_XX_01.png %CodeEN%x128_Icon\GU_%CHNUM%.png
rem copy /Y Temp-assets\GU_XX_02.png %CodeEN%x128_koma\GU_%CHNUM%.png
rem copy /Y Temp-assets\GU_XX_03.png %CodeEN%x256_S\GU_%CHNUM%.png
rem copy /Y Temp-assets\GU_XX_BS.png %CodeEN%x128_koma_2\GU_%CHNUM%.png
rem copy /Y Temp-assets\GU_XX_ZK.png %CodeEN%x128_koma_2\GU_%CHNUM%.png
rem ETC�t�@�C�����R�s�[
copy /Y %ETC%128\GU_%CHNUM%.etc %CodeEN%x128_Icon\GU_%CHNUM%.etc
copy /Y %ETC%128k\GU_%CHNUM%.etc %CodeEN%x128_koma\GU_%CHNUM%.etc
copy /Y %ETC%128k2\GU_%CHNUM%.etc %CodeEN%x128_koma_2\GU_%CHNUM%.etc
copy /Y %ETC%256\GU_%CHNUM%.etc %CodeEN%x128_koma_2\GU_%CHNUM%.etc
copy /Y %ETC%256s\GU_%CHNUM%.etc %CodeEN%x256_S\GU_%CHNUM%.etc
copy /Y %ETC%512\GU_%CHNUM%.etc %CodeEN%x512\GU_%CHNUM%.etc
copy /Y %ETC%512c\GU_%CHNUM%.etc %CodeEN%x512_cut-in\GU_%CHNUM%.etc
copy /Y %ETC%1024\GU_%CHNUM%.etc %CodeEN%x1024\GU_%CHNUM%.etc
rem json���R�s�[
copy /Y %ETC%1024\GU_%CHNUM%.json %CodeEN%x1024\GU_%CHNUM%.json


rem �Ō�Ƀt�@�C�����폜����
rem ETC�ϊ��𖈉���ƁA�K�[�f�B�A����ID���Ƃɋ��LETC�̃t�@�C�������܂��Ă��܂�
rem ����Ƃ��܂�������ETC�ϊ�������s����̂ŁA
rem ETC�t�@�C���ɂ��񂵂ẮA�R�s�[�ł͂Ȃ��āA�ړ��ɂ���ׂ��Ƃ����������ǁA�߂�ǂ������̂ō폜
del /Q %ETC%128\*.*
del /Q %ETC%128k\*.*
del /Q %ETC%128k2\*.*
del /Q %ETC%256\*.*
del /Q %ETC%256s\*.*
del /Q %ETC%512\*.*
del /Q %ETC%512c\*.*
del /Q %ETC%1024\*.*


pause
