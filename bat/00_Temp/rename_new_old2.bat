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
rem ����ID�̓������t�H���_���p�ӂ���Ă��Ȃ��ꍇ�͉��L
rem set CHNUM=
rem ���͗v��
rem set /P CHNUM="����ID����͂��Ă�������"

rem ����ID�̓������t�H���_���p�ӂ���Ă���O��AID�𔲂��o��
for %%J in (.) do call :sub "%%J"
goto :NEXT
:sub
  set FNAME=%~n1
  rem �擪����3�����ځA��������5������
  set CHNUM=%FNAME:~3,5%
  exit /b

:NEXT
rem ETC�̃p�X
set ETC=C:\Terra\Arts\Actor\99_ETC\
rem �e�i�[��̃p�X
set Arts=C:\Terra\Arts\Actor\02_guardian\
set CodeJP=C:\Terra\Code\Client\Product\JP\Download\Data\img\guardian\
rem set CodeEN=C:\Terra\Code\Client\Product\EN\Download\Data\img\guardian\
rem 1024�̕ۑ���p�X
set ArtsL=C:\Terra\Arts\Actor\02_guardian\x1024\
rem �t�H�g�V���̃A�Z�b�g�t�H���_�Ƃ����܂�̖��O��ϐ���
set TMP=Temp-assets\GU_
rem ETC�ɂ���K�v������t�@�C���͕ϊ��f�B���N�g���ɃR�s�[ �t�@�C���������ꍇ�͂Ȃɂ����Ȃ�
if exist %TMP%XX_01.png  copy /Y %TMP%XX_01.png %ETC%128\GU_%CHNUM%.png
if exist %TMP%XX_02.png  copy /Y %TMP%XX_02.png %ETC%128k\GU_%CHNUM%.png
if exist %TMP%XX_ZK.png  copy /Y %TMP%XX_ZK.png %ETC%128k2\GU_%CHNUM%.png
if exist %TMP%XX_BS.png  copy /Y %TMP%XX_BS.png %ETC%256\GU_%CHNUM%.png
if exist %TMP%XX_03.png  copy /Y %TMP%XX_03.png %ETC%256s\GU_%CHNUM%.png
if exist %TMP%XX_04.png  copy /Y %TMP%XX_04.png %ETC%512\GU_%CHNUM%.png
if exist %TMP%XX_05.png  copy /Y %TMP%XX_05.png %ETC%512C\GU_%CHNUM%.png

rem �J�����g�f�B���N�g���̖��O(�t�H���_�̖��O)���擾
for %%I in (.) do set DIRNAME=%%~nI
rem x1024��ID�{���Җ��t�H���_����������Ȃɂ����Ȃ�
rem ID�ԍ��̃t�H���_���Ȃ�������AID�{���Җ��t�H���_���
rem ID�ԍ��̃t�H���_����������ID�{���Җ��Ƀ��l�[��
if exist %ArtsL%%DIRNAME% goto next
if not exist %ArtsL%GU_%CHNUM% mkdir %ArtsL%%DIRNAME%
if exist %ArtsL%GU_%CHNUM% ren %ArtsL%GU_%CHNUM% %ArtsL%%DIRNAME%
:next

rem �e�N�X�`���p�b�J�[�Ȃǂ̃t�@�C�����R�s�[���ă��l�[��
copy /Y %TMP%1024\GU_XX.tps %ArtsL%%DIRNAME%\GU_%CHNUM%.tps
copy /Y %TMP%1024\illust.png %ArtsL%%DIRNAME%\illust.png



rem �e�N�X�`���p�b�J�[���g����悤��
SET "PATH=C:/Program Files/CodeAndWeb/TexturePacker/bin;%PATH%"
rem .tps�t�@�C�����g�p����ꍇ
TexturePacker Temp-assets\GU_1024\GU_XX.tps --data %ETC%1024\GU_%CHNUM%.json --sheet %ETC%1024\GU_%CHNUM%.png

rem ETC�ɕϊ�����
if exist %ETC%128\GU_%CHNUM%.png call %ETC%Conv128.BAT
if exist %ETC%128k\GU_%CHNUM%.png call %ETC%Conv128k.BAT
if exist %ETC%128k2\GU_%CHNUM%.png call %ETC%Conv128k2.BAT
if exist %ETC%256\GU_%CHNUM%.png call %ETC%Conv256.BAT
if exist %ETC%256s\GU_%CHNUM%.png call %ETC%Conv256s.BAT
if exist %ETC%512\GU_%CHNUM%.png call %ETC%Conv512.BAT
if exist %ETC%512C\GU_%CHNUM%.png call %ETC%Conv512c.BAT
if exist %ETC%1024\GU_%CHNUM%.png call %ETC%Conv1024.BAT
rem ETC�ϊ��pBAT�f�B���N�g���Ɉړ�
cd %ETC%
rem ETC�ϊ��pBAT�Ăяo��
call %ETC%conv.bat

rem ����BAT�t�@�C��"rename_new.bat"������f�B���N�g���Ɉړ�
cd /d %~dp0

rem Arts�Ƀt�@�C���R�s�[
if exist %TMP%XX_01.png copy /Y %TMP%XX_01.png %Arts%x128_Icon\GU_%CHNUM%.png
if exist %TMP%XX_02.png copy /Y %TMP%XX_02.png %Arts%x128_koma\GU_%CHNUM%.png
if exist %TMP%XX_03.png copy /Y %TMP%XX_03.png %Arts%x256_S\GU_%CHNUM%.png
if exist %TMP%XX_04.png copy /Y %TMP%XX_04.png %Arts%x512\GU_%CHNUM%.png
if exist %TMP%XX_05.png copy /Y %TMP%XX_05.png %Arts%x512_cut-in\GU_%CHNUM%.png
if exist %TMP%XX_BS.png copy /Y %TMP%XX_BS.png %Arts%x128_koma_2\GU_%CHNUM%.png
if exist %TMP%XX_ZK.png copy /Y %TMP%XX_ZK.png %Arts%x128_koma_2\GU_%CHNUM%.png
rem Arts�ɂ�1024png��json���R�s�[
copy /Y %ETC%1024\GU_%CHNUM%.png %ArtsL%�yExport�z\GU_%CHNUM%.png
copy /Y %ETC%1024\GU_%CHNUM%.json %ArtsL%�yExport�z\GU_%CHNUM%.json

rem �ϊ�����ETC�t�H���_����Code�փR�s�[
if exist %ETC%128\GU_%CHNUM%.etc copy /Y %ETC%128\GU_%CHNUM%.etc %CodeJP%x128_Icon\GU_%CHNUM%.etc
if exist %ETC%128k\GU_%CHNUM%.etc copy /Y %ETC%128k\GU_%CHNUM%.etc %CodeJP%x128_koma\GU_%CHNUM%.etc
if exist %ETC%128k2\GU_%CHNUM%.etc copy /Y %ETC%128k2\GU_%CHNUM%.etc %CodeJP%x128_koma_2\GU_%CHNUM%.etc
if exist %ETC%256\GU_%CHNUM%.etc copy /Y %ETC%256\GU_%CHNUM%.etc %CodeJP%x128_koma_2\GU_%CHNUM%.etc
if exist %ETC%256s\GU_%CHNUM%.etc copy /Y %ETC%256s\GU_%CHNUM%.etc %CodeJP%x256_S\GU_%CHNUM%.etc
if exist %ETC%512\GU_%CHNUM%.etc copy /Y %ETC%512\GU_%CHNUM%.etc %CodeJP%x512\GU_%CHNUM%.etc
if exist %ETC%512c\GU_%CHNUM%.etc copy /Y %ETC%512c\GU_%CHNUM%.etc %CodeJP%x512_cut-in\GU_%CHNUM%.etc
if exist %ETC%1024\GU_%CHNUM%.etc copy /Y %ETC%1024\GU_%CHNUM%.etc %CodeJP%x1024\GU_%CHNUM%.etc
rem json���R�s�[
copy /Y %ETC%1024\GU_%CHNUM%.json %CodeJP%x1024\GU_%CHNUM%.json

rem EN�͂Ȃ��Ȃ����̂ł���Ȃ�

rem �Ō�Ƀt�@�C�����폜����
del /Q %ETC%128\*.*
del /Q %ETC%128k\*.*
del /Q %ETC%128k2\*.*
del /Q %ETC%256\*.*
del /Q %ETC%256s\*.*
del /Q %ETC%512\*.*
del /Q %ETC%512c\*.*
del /Q %ETC%1024\*.*


pause
