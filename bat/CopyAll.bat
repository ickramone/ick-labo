@echo off
echo ----------------------------------------------------
echo ���t�ȍ~�̍X�V�t�@�C�������r�W�������Ƃ̃t�H���_�փR�s�[���܂�
echo �T�u�J�e�S���ɉ������͂��Ȃ���img�t�H���_�ȉ���S���������܂�
echo �����e�����ς�����Ƃ��̓f�B���N�g�������������Ă�������
echo ----------------------------------------------------

set IMG=C:\Terra\Code\Client\Product\JP\Download\Data
set MONTH=
set /P MONTH="�`���ȍ~�̃t�@�C�����R�s�[?�@"
set DAY=
set /P DAY="�`���ȍ~�̃t�@�C�����R�s�[?�@"
set DML=C:\Terra\Documentation\01.development\01.Data\sql\DML\product_master\2018.06.21\jpn\Download\Data
set MENTE=%DML:~69,10%
echo ----------------------------------------------------
echo �����e���`�F�b�N
echo ����R�s�[����t�H���_�́@%MENTE%�@�ł�
echo ----------------------------------------------------
echo ----------------------------------------------------
echo �p�X�̑I��
echo Code\Client\Product\JP\Download\Data �ȍ~�̃p�X��I��ł�������
echo 1�@���@img�@�@�@�C���[�W
echo 2�@���@master�@�@���ҍ��W�Ƃ�
echo 3�@���@sprite�@�@�A�j���[�V�����n
echo 1��3��I�񂾏ꍇ(img�Asprite) �T�u�J�e�S������͂��Ă�������
echo ----------------------------------------------------
:CHOICE

set /P NUM=1 or 2��I�����Ă��������@
if %NUM%==1 (
  set IMG=C:\Terra\Code\Client\Product\JP\Download\Data\img
  set DML=C:\Terra\Documentation\01.development\01.Data\sql\DML\product_master\2018.06.21\jpn\Download\Data\img
) else if %NUM%==2 (
  set IMG=C:\Terra\Code\Client\Product\JP\Download\Data\master
  set DML=C:\Terra\Documentation\01.development\01.Data\sql\DML\product_master\2018.06.21\jpn\Download\Data\master
  goto NEXT
) else if %NUM%==3 (
  set IMG=C:\Terra\Code\Client\Product\JP\Download\Data\sprite
  set DML=C:\Terra\Documentation\01.development\01.Data\sql\DML\product_master\2018.06.21\jpn\Download\Data\sprite
) else (
  echo �P�`�R�ȊO�����͂���܂����B�P�`�R�̐�������͂��Ă�������
  goto CHOICE
)

:NEXT
forfiles /p %IMG% /s /d +2018/%MONTH%/%DAY% /m *.* /c "cmd /c echo @path    @fdate@ftime"
rem for /r %%I in (*) do xcopy /L /S /D:%MONTH%-%DAY%-2018 %%I ..\
rem /O:D�@�T�C�Y���@/T:W�@�ŏI�X�V��
echo ----------------------------------------------------
echo ���̃t�@�C�����R�s�[���܂�
echo ----------------------------------------------------
pause

rem for /r %%I in (*) do xcopy /S /D:%MONTH%-%DAY%-2018 %%I %DML%\%SUB%
xcopy /F /S /Y /I /D:%MONTH%-%DAY%-2018 /D %IMG% %DML%
rem /F �R�s�[�����t�@�C������\���@/S �T�u�f�B���N�g�����R�s�[�@/Y �㏑���m�F���Ȃ�
rem /D:xxx ���t���ŐV�̃t�@�C���̂݁@/D�������ƃR�s�[��̃t�@�C�����V�������̂���
echo ----------------------------------------------------
echo �R�s�[����
echo ----------------------------------------------------

pause
