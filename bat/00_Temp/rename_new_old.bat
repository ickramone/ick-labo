@echo off
rem -------------------------------------------------------
rem ■以下のアプリ等をインストールしてある状態でしか動作しません
rem ■ETC変換アプリをインストール
rem Code\Tools\Mali_Texture_Compression_Tool_v4.3.0.b81c088_Windows_x64.exe
rem ■TexturePackerのインストール
rem コマンドラインツールが使えるようにする必要がある？？？
rem C:\Program Files\CodeAndWeb\TexturePacker\bin
rem このディレクトリが存在していればOKかな？
rem ■守護者変換ようのETCツールは
rem C:\Terra\Arts\Actor\99_ETC
rem ここを参照します
rem ※注意
rem C:\Terra\Arts\ETC　　ここではありません
rem -------------------------------------------------------

rem 初期化
set CHNUM=
rem 入力要求
set /P CHNUM="守護者IDを入力してください"

rem ETCのパス
rem ↓ここに共通のETC環境を設置
rem set ETC=C:\Users\kiyohiro.ichikawa\00_Works\ETC\
rem SVN環境下ではこっち
set ETC=C:\Terra\Arts\Actor\99_ETC\

rem 各格納先のパス
set Arts=C:\Terra\Arts\Actor\02_guardian\
set CodeJP=C:\Terra\Code\Client\Product\JP\Download\Data\img\guardian\
set CodeEN=C:\Terra\Code\Client\Product\EN\Download\Data\img\guardian\
rem 1024の保存先パス
set ArtsL=C:\Terra\Arts\Actor\02_guardian\x1024\

rem ETCにする必要があるファイルは変換ディレクトリにコピー
copy /Y Temp-assets\GU_XX_01.png %ETC%128\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_02.png %ETC%128k\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_ZK.png %ETC%128k2\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_BS.png %ETC%256\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_03.png %ETC%256s\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_04.png %ETC%512\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_05.png %ETC%512C\GU_%CHNUM%.png

rem x1024に指定したIDのディレクトリを作成
mkdir %ArtsL%GU_%CHNUM%

rem テクスチャパッカーなどのファイルをコピーしてリネーム
copy /Y Temp-assets\GU_1024\GU_XX.tps %ArtsL%\GU_%CHNUM%\GU_%CHNUM%.tps
copy /Y Temp-assets\GU_1024\illust.png %ArtsL%\GU_%CHNUM%\illust.png

rem Artsのｘ1024フォルダをリネーム（カレントディレクトリのフォルダ名）
for %%I in (.) do set DIRNAME=%%~nI%%~xI
rem x1024に指定したIDのディレクトリを作成
ren %ArtsL%\GU_%CHNUM% %DIRNAME%


rem テクスチャパッカーを使えるように
SET "PATH=C:/Program Files/CodeAndWeb/TexturePacker/bin;%PATH%"

rem TexturePackerで吐き出し　ETC\1024へjsonとpngを格納
rem .tpsを使わない場合の設定。この設定を.tpsに保存したいけどどうすれば？
rem TexturePacker --format bhive --data ETC\1024\GU_%CHNUM%.json --texture-format png --sheet ETC\1024\GU_%CHNUM%.png --opt RGBA8888  --width 1024 --height 1024 --size-constraints POT GU_1024\

rem .tpsファイルを使用する場合
TexturePacker Temp-assets\GU_1024\GU_XX.tps --data %ETC%1024\GU_%CHNUM%.json --sheet %ETC%1024\GU_%CHNUM%.png


rem ETCに変換する
rem ETC変換用BATのパスは%ETC%
rem PKM変換用BAT呼び出し
rem 512用
call %ETC%Conv128.BAT
rem 512用
call %ETC%Conv128k.BAT
rem 512用
call %ETC%Conv128k2.BAT
rem 512用
call %ETC%Conv256.BAT
rem 512用
call %ETC%Conv256s.BAT
rem 512用
call %ETC%Conv512.BAT
rem 512C用
call %ETC%Conv512c.BAT
rem 1024用
call %ETC%Conv1024.BAT

rem ETC変換用BATディレクトリに移動しないと動かないので
rem ※ETC変換用BATのほうにも%ETC%へ戻るように記載してある
cd %ETC%
rem ETC変換用BAT呼び出し
call %ETC%conv.bat

rem このBATファイル"rename_new.bat"があるディレクトリに移動
cd /d %~dp0

rem Artsにファイルコピー
copy /Y Temp-assets\GU_XX_01.png %Arts%x128_Icon\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_02.png %Arts%x128_koma\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_03.png %Arts%x256_S\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_04.png %Arts%x512\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_05.png %Arts%x512_cut-in\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_BS.png %Arts%x128_koma_2\GU_%CHNUM%.png
copy /Y Temp-assets\GU_XX_ZK.png %Arts%x128_koma_2\GU_%CHNUM%.png
rem Artsには1024pngとjsonをコピー
copy /Y %ETC%1024\GU_%CHNUM%.png %ArtsL%【Export】\GU_%CHNUM%.png
copy /Y %ETC%1024\GU_%CHNUM%.json %ArtsL%【Export】\GU_%CHNUM%.json

rem Codeへコピー
rem JP
rem copy /Y Temp-assets\GU_XX_01.png %CodeJP%x128_Icon\GU_%CHNUM%.png
rem copy /Y Temp-assets\GU_XX_02.png %CodeJP%x128_koma\GU_%CHNUM%.png
rem copy /Y Temp-assets\GU_XX_03.png %CodeJP%x256_S\GU_%CHNUM%.png
rem copy /Y Temp-assets\GU_XX_BS.png %CodeJP%x128_koma_2\GU_%CHNUM%.png
rem copy /Y Temp-assets\GU_XX_ZK.png %CodeJP%x128_koma_2\GU_%CHNUM%.png
rem ETCファイルをコピー
copy /Y %ETC%128\GU_%CHNUM%.etc %CodeJP%x128_Icon\GU_%CHNUM%.etc
copy /Y %ETC%128k\GU_%CHNUM%.etc %CodeJP%x128_koma\GU_%CHNUM%.etc
copy /Y %ETC%128k2\GU_%CHNUM%.etc %CodeJP%x128_koma_2\GU_%CHNUM%.etc
copy /Y %ETC%256\GU_%CHNUM%.etc %CodeJP%x128_koma_2\GU_%CHNUM%.etc
copy /Y %ETC%256s\GU_%CHNUM%.etc %CodeJP%x256_S\GU_%CHNUM%.etc
copy /Y %ETC%512\GU_%CHNUM%.etc %CodeJP%x512\GU_%CHNUM%.etc
copy /Y %ETC%512c\GU_%CHNUM%.etc %CodeJP%x512_cut-in\GU_%CHNUM%.etc
copy /Y %ETC%1024\GU_%CHNUM%.etc %CodeJP%x1024\GU_%CHNUM%.etc
rem jsonもコピー
copy /Y %ETC%1024\GU_%CHNUM%.json %CodeJP%x1024\GU_%CHNUM%.json


rem EN
rem copy /Y Temp-assets\GU_XX_01.png %CodeEN%x128_Icon\GU_%CHNUM%.png
rem copy /Y Temp-assets\GU_XX_02.png %CodeEN%x128_koma\GU_%CHNUM%.png
rem copy /Y Temp-assets\GU_XX_03.png %CodeEN%x256_S\GU_%CHNUM%.png
rem copy /Y Temp-assets\GU_XX_BS.png %CodeEN%x128_koma_2\GU_%CHNUM%.png
rem copy /Y Temp-assets\GU_XX_ZK.png %CodeEN%x128_koma_2\GU_%CHNUM%.png
rem ETCファイルをコピー
copy /Y %ETC%128\GU_%CHNUM%.etc %CodeEN%x128_Icon\GU_%CHNUM%.etc
copy /Y %ETC%128k\GU_%CHNUM%.etc %CodeEN%x128_koma\GU_%CHNUM%.etc
copy /Y %ETC%128k2\GU_%CHNUM%.etc %CodeEN%x128_koma_2\GU_%CHNUM%.etc
copy /Y %ETC%256\GU_%CHNUM%.etc %CodeEN%x128_koma_2\GU_%CHNUM%.etc
copy /Y %ETC%256s\GU_%CHNUM%.etc %CodeEN%x256_S\GU_%CHNUM%.etc
copy /Y %ETC%512\GU_%CHNUM%.etc %CodeEN%x512\GU_%CHNUM%.etc
copy /Y %ETC%512c\GU_%CHNUM%.etc %CodeEN%x512_cut-in\GU_%CHNUM%.etc
copy /Y %ETC%1024\GU_%CHNUM%.etc %CodeEN%x1024\GU_%CHNUM%.etc
rem jsonもコピー
copy /Y %ETC%1024\GU_%CHNUM%.json %CodeEN%x1024\GU_%CHNUM%.json


rem 最後にファイルを削除する
rem ETC変換を毎回やると、ガーディアンのIDごとに共有ETCのファイルがたまってしまう
rem するとたまった分のETC変換が毎回行われるので、
rem ETCファイルにかんしては、コピーではなくて、移動にするべきとおもったけど、めんどくさいので削除
del /Q %ETC%128\*.*
del /Q %ETC%128k\*.*
del /Q %ETC%128k2\*.*
del /Q %ETC%256\*.*
del /Q %ETC%256s\*.*
del /Q %ETC%512\*.*
del /Q %ETC%512c\*.*
del /Q %ETC%1024\*.*


pause
