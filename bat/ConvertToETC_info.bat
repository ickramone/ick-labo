@echo off
echo -------------------------------------------------------
echo ���ȉ��̃A�v�������C���X�g�[�����Ă����Ԃł������삵�܂���
echo ��ETC�ϊ��A�v�����C���X�g�[��
echo Code\Tools\Mali_Texture_Compression_Tool_v4.3.0.b81c088_Windows_x64.exe
echo ��Photoshop��JSX���h���b�v���b�g�ɓo�^���邱��
echo Resize1024_512.jsx�@���t�H�g�V���ŃA�N�V�����ɓo�^����
echo ResizePO2toETC.exe�Ƃ����h���b�v���b�g���쐬���Ă���
echo �����t�̃��[���@��F2018�N4��12���Ȃ�΁@"180412"
echo �����ҕϊ��p��ETC�c�[����
echo C:\Terra\Arts\Actor\99_ETC
echo -------------------------------------------------------

rem �p�X��ϐ���
set GA=
set /P GA="�i�[����K�`���̓��t�t�H���_����͂��Ă������� ��F2018�N6��21���Ȃ�΁@"180621""
set ETC=C:\Terra\Arts\Actor\99_ETC
rem �e�i�[��̃p�X
set DataGA=C:\Terra\Code\Client\Product\JP\Download\Data\img\gacha\illust\
set ArtsGA=C:\Terra\Arts\beta\gacha\���X�V\%GA%
set DROP=C:\Users\kiyohiro.ichikawa\Desktop\ResizePO2toETC.exe

rem �f�B���N�g�������݂��邩�`�F�b�N���� �Ȃ���΍��
if not exist %ArtsGA% (mkdir %ArtsGA%) else @echo %ArtsGA%�t�H���_�͑��݂��܂�

rem -assets�t�H���_�̌�������������
for /d %%J in (*-assets) do call :sub "%%J"
goto :ConvETC

rem �p��T�C�Y�Ƀ��T�C�Y�AETC�t�H���_�փR�s�[
:sub
  call %DROP% %CD%\%~1
  rem .png��ETC�ϊ��p�ɃR�s�[
  copy /Y %CD%\%~1\*.png %ETC%\Others
  exit /b

rem ETC�ɕϊ�����
:ConvETC
  call %ETC%\ConvOthers.BAT
  cd %ETC%
  call %ETC%\conv.bat
  cd /d %~dp0

rem Arts��ETC���R�s�[
rem if not exist %ArtsGA%\ETC (mkdir %ArtsGA%\ETC) else @echo %ArtsGA%\ETC�t�H���_�͑��݂��܂�
rem copy /Y %ETC%\Others\*.etc %ArtsGA%\ETC\

  rem Code��ETC���ړ�
  move /Y %ETC%\Others\*.etc %DataGA%\

  rem �ϊ�����ETC�t�@�C�����폜����
  del /Q %ETC%\Others\*.*
  echo -------------------------------------------------------
  echo �ϊ����I�����܂���
  echo -------------------------------------------------------

pause
exit /b
