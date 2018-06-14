@echo off

rem 引数がない場合は、プログラムを終了
if "%1"=="" goto :eof

rem 変数
set ETC=C:\Users\kiyohiro.ichikawa\00_Works\ETC
set IMG=C:\Users\kiyohiro.ichikawa\00_Works\ETC\Others
set DROP=C:\Users\kiyohiro.ichikawa\Desktop\ResizePO2toETC.exe

rem ETC変換フォルダにファイルがあった場合削除確認
if exist %IMG%\* goto delete
if not exist %IMG%\* goto next
:delete
del /P %IMG%\
:next

set count=1

rem 10ファイル以上あった時用の処理 変数を配列に格納
:loop
rem 引数があるかをチェック　無くなったらloopを抜ける
if "%1"=="" goto :confirm

rem array[1]に第1引数が代入される
set array[%count%]=%1
set /a count+=1

set NAME=%~xn1
rem call %DROP% %~1
copy %~1 %IMG%\%NAME%

rem 引数が左へスライド。%1には第2引数が入る
shift
goto loop

:confirm

rem PKMに変換
call %ETC%\ConvOthers.BAT
rem ETC変換用BAT呼び出し
call %ETC%\conv.bat

pause
