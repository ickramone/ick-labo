@echo off
rem -------------------------------------------------------
rem ■以下のアプリ等をインストールしてある状態でしか動作しません
rem ■ETC変換アプリをインストール
rem Code\Tools\Mali_Texture_Compression_Tool_v4.3.0.b81c088_Windows_x64.exe
rem ■PhotoshopのJSXをドロップレットに登録すること
rem Resize1024_512.jsx　をフォトショでアクションに登録して
rem ResizePO2toETC.exeというドロップレットを作成しておく
rem ■MAP番号　例：13章のマップならば　"13"
rem -------------------------------------------------------

rem 初期化
set MP=
set /P MP="マップの番号を入力　13章のマップならば　"13""
rem 自分のパス
cd /d %~dp0
set ROOT=%CD%
rem ETCのパス
set ETC=C:\Terra\Arts\Actor\99_ETC
rem 各格納先のパス
set DataMP=C:\Terra\Code\Client\Product\JP\Download\Data\img\map\00%MP%
set ArtsMP=%ROOT%
set ArtMPTEX=C:\Terra\Arts\FieldMap\Texture\etc\00%MP%

rem .pngをETC変換用にコピー
copy /Y %ArtsMP%\Texture\*.png %ETC%\Others

rem ETCに変換する
call %ETC%\ConvOthers.BAT
cd %ETC%
call %ETC%\conv.bat
cd /d %~dp0


rem ArtsにETCをコピー
rem ETCフォルダが存在するかチェックする なければ作る
if not exist %ArtMPTEX% (mkdir %ArtMPTEX%) else @echo %ArtMPTEX%フォルダは存在します
copy /Y %ETC%\Others\*.etc %ArtMPTEX%
rem CodeへETCを移動
move /Y %ETC%\Others\*.etc %DataMP%\
rem 変換したETCファイルを削除する
del /Q %ETC%\Others\*.*

pause
