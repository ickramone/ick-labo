@echo off
rem -------------------------------------------------------
rem ���ȉ��̃A�v�������C���X�g�[�����Ă����Ԃł������삵�܂���
rem ��ETC�ϊ��A�v�����C���X�g�[��
rem Code\Tools\Mali_Texture_Compression_Tool_v4.3.0.b81c088_Windows_x64.exe
rem ��Photoshop��JSX���h���b�v���b�g�ɓo�^���邱��
rem Resize1024_512.jsx�@���t�H�g�V���ŃA�N�V�����ɓo�^����
rem ResizePO2toETC.exe�Ƃ����h���b�v���b�g���쐬���Ă���
rem ��MAP�ԍ��@��F13�͂̃}�b�v�Ȃ�΁@"13"
rem -------------------------------------------------------

rem ������
set MP=
set /P MP="�}�b�v�̔ԍ�����́@13�͂̃}�b�v�Ȃ�΁@"13""
rem �����̃p�X
cd /d %~dp0
set ROOT=%CD%
rem ETC�̃p�X
set ETC=C:\Terra\Arts\Actor\99_ETC
rem �e�i�[��̃p�X
set DataMP=C:\Terra\Code\Client\Product\JP\Download\Data\img\map\00%MP%
set ArtsMP=%ROOT%
set ArtMPTEX=C:\Terra\Arts\FieldMap\Texture\etc\00%MP%

rem .png��ETC�ϊ��p�ɃR�s�[
copy /Y %ArtsMP%\Texture\*.png %ETC%\Others

rem ETC�ɕϊ�����
call %ETC%\ConvOthers.BAT
cd %ETC%
call %ETC%\conv.bat
cd /d %~dp0


rem Arts��ETC���R�s�[
rem ETC�t�H���_�����݂��邩�`�F�b�N���� �Ȃ���΍��
if not exist %ArtMPTEX% (mkdir %ArtMPTEX%) else @echo %ArtMPTEX%�t�H���_�͑��݂��܂�
copy /Y %ETC%\Others\*.etc %ArtMPTEX%
rem Code��ETC���ړ�
move /Y %ETC%\Others\*.etc %DataMP%\
rem �ϊ�����ETC�t�@�C�����폜����
del /Q %ETC%\Others\*.*

pause
