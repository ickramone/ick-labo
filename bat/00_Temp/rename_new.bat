@echo off
echo -------------------------------------------------------
echo ���ȉ��̃A�v�������C���X�g�[�����Ă����Ԃł������삵�܂���
echo ��ETC�ϊ��A�v�����C���X�g�[��
echo Code\Tools\Mali_Texture_Compression_Tool_v4.3.0.b81c088_Windows_x64.exe
echo ��TexturePacker�̃C���X�g�[��
echo �R�}���h���C���c�[�����g����悤�ɂ���K�v������H�H�H
echo C:\Program Files\CodeAndWeb\TexturePacker\bin
echo ���̃f�B���N�g�������݂��Ă��邱��
echo -------------------------------------------------------
rem ����ID�̓������t�H���_���p�ӂ���Ă��Ȃ��ꍇ�͉��L
rem set CHNUM=
rem ���͗v��
rem set /P CHNUM="����ID����͂��Ă�������"

rem �p�X��ϐ���
set MyPath=%~dp0
set ETC=C:\Terra\Arts\Actor\99_ETC\
set Arts=C:\Terra\Arts\Actor\02_guardian\
set CodeJP=C:\Terra\Code\Client\Product\JP\Download\Data\img\guardian\
rem 1024�̕ۑ���p�X
set ArtsL=C:\Terra\Arts\Actor\02_guardian\x1024\
set TMP=Temp-assets

rem ����ID�̓������t�H���_���p�ӂ���Ă���O��AID�𔲂��o��
for %%J in (.) do call :sub "%%J"
goto :ConvETC

rem ID�擾
:sub
  set FNAME=%~n1
  rem �擪����3�����ځA��������5������
  set CHNUM=%FNAME:~3,5%
  call :X1024
  call :COPY
  call :PACK
  exit /b

:X1024
  rem x1024��ID�{���Җ��t�H���_����������Ȃɂ����Ȃ�
  rem ID�ԍ��̃t�H���_���Ȃ�������AID�{���Җ��t�H���_���
  rem ID�ԍ��̃t�H���_����������ID�{���Җ��Ƀ��l�[��
  if exist %ArtsL%%FNAME% goto next
  if not exist %ArtsL%GU_%CHNUM% mkdir %ArtsL%%FNAME%
  if exist %ArtsL%GU_%CHNUM% ren %ArtsL%GU_%CHNUM% %ArtsL%%FNAME%
  :next
  exit /b

rem ETC�ϊ��f�B���N�g���ȂǂɃR�s�[
:COPY
  if exist %MyPath%%TMP%\GU_XX_01.png copy /Y %MyPath%%TMP%\GU_XX_01.png %ETC%128\GU_%CHNUM%.png
  if exist %MyPath%%TMP%\GU_XX_02.png copy /Y %MyPath%%TMP%\GU_XX_02.png %ETC%128k\GU_%CHNUM%.png
  if exist %MyPath%%TMP%\GU_XX_ZK.png copy /Y %MyPath%%TMP%\GU_XX_ZK.png %ETC%128k2\GU_%CHNUM%.png
  if exist %MyPath%%TMP%\GU_XX_BS.png copy /Y %MyPath%%TMP%\GU_XX_BS.png %ETC%128ks\GU_%CHNUM%.png
  if exist %MyPath%%TMP%\GU_XX_03.png copy /Y %MyPath%%TMP%\GU_XX_03.png %ETC%256s\GU_%CHNUM%.png
  if exist %MyPath%%TMP%\GU_XX_04.png copy /Y %MyPath%%TMP%\GU_XX_04.png %ETC%512\GU_%CHNUM%.png
  if exist %MyPath%%TMP%\GU_XX_05.png copy /Y %MyPath%%TMP%\GU_XX_05.png %ETC%512C\GU_%CHNUM%.png
  rem �e�N�X�`���p�b�J�[�Ȃǂ̃t�@�C�����R�s�[���ă��l�[��
  copy /Y %MyPath%%TMP%\GU_1024\GU_XX.tps %ArtsL%%FNAME%\GU_%CHNUM%.tps
  copy /Y %MyPath%%TMP%\GU_1024\illust.png %ArtsL%%FNAME%\illust.png
  exit /b

rem �e�N�X�`���p�b�J�[
:PACK
  SET "PATH=C:/Program Files/CodeAndWeb/TexturePacker/bin;%PATH%"
  rem .tps�t�@�C�����g�p����ꍇ
  TexturePacker %MyPath%%TMP%\GU_1024\GU_XX.tps --data %ETC%1024\GU_%CHNUM%.json --sheet %ETC%1024\GU_%CHNUM%.png
  exit /b

rem ETC�ɕϊ�����
:ConvETC
cd %ETC%
if exist %ETC%128\GU_%CHNUM%.png call %ETC%Conv128.BAT
if exist %ETC%128k\GU_%CHNUM%.png call %ETC%Conv128k.BAT
if exist %ETC%128k2\GU_%CHNUM%.png call %ETC%Conv128k2.BAT
if exist %ETC%256\GU_%CHNUM%.png call %ETC%Conv256.BAT
if exist %ETC%256s\GU_%CHNUM%.png call %ETC%Conv256s.BAT
if exist %ETC%512\GU_%CHNUM%.png call %ETC%Conv512.BAT
if exist %ETC%512C\GU_%CHNUM%.png call %ETC%Conv512c.BAT
if exist %ETC%1024\GU_%CHNUM%.png call %ETC%Conv1024.BAT
cd %ETC%
call %ETC%conv.bat
cd /d %~dp0


:COPYETC
rem Arts�Ƀt�@�C���R�s�[
if exist %MyPath%%TMP%\GU_XX_01.png copy /Y %MyPath%%TMP%\GU_XX_01.png %Arts%x128_Icon\GU_%CHNUM%.png
if exist %MyPath%%TMP%\GU_XX_02.png copy /Y %MyPath%%TMP%\GU_XX_02.png %Arts%x128_koma\GU_%CHNUM%.png
if exist %MyPath%%TMP%\GU_XX_03.png copy /Y %MyPath%%TMP%\GU_XX_03.png %Arts%x256_S\GU_%CHNUM%.png
if exist %MyPath%%TMP%\GU_XX_04.png copy /Y %MyPath%%TMP%\GU_XX_04.png %Arts%x512\GU_%CHNUM%.png
if exist %MyPath%%TMP%\GU_XX_05.png copy /Y %MyPath%%TMP%\GU_XX_05.png %Arts%x512_cut-in\GU_%CHNUM%.png
if exist %MyPath%%TMP%\GU_XX_BS.png copy /Y %MyPath%%TMP%\GU_XX_BS.png %Arts%x128_koma_2\GU_%CHNUM%.png
if exist %MyPath%%TMP%\GU_XX_ZK.png copy /Y %MyPath%%TMP%\GU_XX_ZK.png %Arts%x128_koma_2\GU_%CHNUM%.png
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

rem �Ō�Ƀt�@�C�����폜����
del /Q %ETC%128\*.*
del /Q %ETC%128k\*.*
del /Q %ETC%128k2\*.*
del /Q %ETC%256\*.*
del /Q %ETC%256s\*.*
del /Q %ETC%512\*.*
del /Q %ETC%512c\*.*
del /Q %ETC%1024\*.*

echo -------------------------------------------------------
echo ETC�t�H���_����Code�� �R�s�[�m�F
echo %CodeJP%x128_Icon\GU_%CHNUM%.etc
echo %CodeJP%x128_koma\GU_%CHNUM%.etc
echo %CodeJP%x128_koma_2\GU_%CHNUM%.etc
echo %CodeJP%x128_koma_2\GU_%CHNUM%.etc
echo %CodeJP%x256_S\GU_%CHNUM%.etc
echo %CodeJP%x512\GU_%CHNUM%.etc
echo %CodeJP%x512_cut-in\GU_%CHNUM%.etc
echo %CodeJP%x1024\GU_%CHNUM%.etc
echo json
echo %CodeJP%x1024\GU_%CHNUM%.json
echo 1024�i�[�t�H���_
echo %ArtsL%%FNAME%
echo -------------------------------------------------------
echo �ϊ����I�����܂���
echo -------------------------------------------------------

pause
exit /b
