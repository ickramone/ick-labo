@echo off

rem �������Ȃ��ꍇ�́A�v���O�������I��
if "%1"=="" goto :eof

rem �ϐ�
set ETC=C:\Users\kiyohiro.ichikawa\00_Works\ETC
set IMG=C:\Users\kiyohiro.ichikawa\00_Works\ETC\Others
set DROP=C:\Users\kiyohiro.ichikawa\Desktop\ResizePO2toETC.exe

rem ETC�ϊ��t�H���_�Ƀt�@�C�����������ꍇ�폜�m�F
if exist %IMG%\* goto delete
if not exist %IMG%\* goto next
:delete
del /P %IMG%\
:next

set count=1

rem 10�t�@�C���ȏ゠�������p�̏��� �ϐ���z��Ɋi�[
:loop
rem ���������邩���`�F�b�N�@�����Ȃ�����loop�𔲂���
if "%1"=="" goto :confirm

rem array[1]�ɑ�1��������������
set array[%count%]=%1
set /a count+=1

set NAME=%~xn1
call %DROP% %~1
copy %~1 %IMG%\%NAME%

rem ���������փX���C�h�B%1�ɂ͑�2����������
shift
goto loop

:confirm

rem PKM�ɕϊ�
call %ETC%\ConvOthers.BAT
rem ETC�ϊ��pBAT�Ăяo��
call %ETC%\conv.bat

pause
