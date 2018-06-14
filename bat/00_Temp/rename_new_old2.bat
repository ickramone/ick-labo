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
rem 守護者IDの入ったフォルダが用意されていない場合は下記
rem set CHNUM=
rem 入力要求
rem set /P CHNUM="守護者IDを入力してください"

rem 守護者IDの入ったフォルダが用意されている前提、IDを抜き出す
for %%J in (.) do call :sub "%%J"
goto :NEXT
:sub
  set FNAME=%~n1
  rem 先頭から3文字目、そこから5文字分
  set CHNUM=%FNAME:~3,5%
  exit /b

:NEXT
rem ETCのパス
set ETC=C:\Terra\Arts\Actor\99_ETC\
rem 各格納先のパス
set Arts=C:\Terra\Arts\Actor\02_guardian\
set CodeJP=C:\Terra\Code\Client\Product\JP\Download\Data\img\guardian\
rem set CodeEN=C:\Terra\Code\Client\Product\EN\Download\Data\img\guardian\
rem 1024の保存先パス
set ArtsL=C:\Terra\Arts\Actor\02_guardian\x1024\
rem フォトショのアセットフォルダとお決まりの名前を変数に
set TMP=Temp-assets\GU_
rem ETCにする必要があるファイルは変換ディレクトリにコピー ファイルが無い場合はなにもしない
if exist %TMP%XX_01.png  copy /Y %TMP%XX_01.png %ETC%128\GU_%CHNUM%.png
if exist %TMP%XX_02.png  copy /Y %TMP%XX_02.png %ETC%128k\GU_%CHNUM%.png
if exist %TMP%XX_ZK.png  copy /Y %TMP%XX_ZK.png %ETC%128k2\GU_%CHNUM%.png
if exist %TMP%XX_BS.png  copy /Y %TMP%XX_BS.png %ETC%256\GU_%CHNUM%.png
if exist %TMP%XX_03.png  copy /Y %TMP%XX_03.png %ETC%256s\GU_%CHNUM%.png
if exist %TMP%XX_04.png  copy /Y %TMP%XX_04.png %ETC%512\GU_%CHNUM%.png
if exist %TMP%XX_05.png  copy /Y %TMP%XX_05.png %ETC%512C\GU_%CHNUM%.png

rem カレントディレクトリの名前(フォルダの名前)を取得
for %%I in (.) do set DIRNAME=%%~nI
rem x1024にID＋守護者名フォルダがあったらなにもしない
rem ID番号のフォルダがなかったら、ID＋守護者名フォルダ作る
rem ID番号のフォルダがあったらID＋守護者名にリネーム
if exist %ArtsL%%DIRNAME% goto next
if not exist %ArtsL%GU_%CHNUM% mkdir %ArtsL%%DIRNAME%
if exist %ArtsL%GU_%CHNUM% ren %ArtsL%GU_%CHNUM% %ArtsL%%DIRNAME%
:next

rem テクスチャパッカーなどのファイルをコピーしてリネーム
copy /Y %TMP%1024\GU_XX.tps %ArtsL%%DIRNAME%\GU_%CHNUM%.tps
copy /Y %TMP%1024\illust.png %ArtsL%%DIRNAME%\illust.png



rem テクスチャパッカーを使えるように
SET "PATH=C:/Program Files/CodeAndWeb/TexturePacker/bin;%PATH%"
rem .tpsファイルを使用する場合
TexturePacker Temp-assets\GU_1024\GU_XX.tps --data %ETC%1024\GU_%CHNUM%.json --sheet %ETC%1024\GU_%CHNUM%.png

rem ETCに変換する
if exist %ETC%128\GU_%CHNUM%.png call %ETC%Conv128.BAT
if exist %ETC%128k\GU_%CHNUM%.png call %ETC%Conv128k.BAT
if exist %ETC%128k2\GU_%CHNUM%.png call %ETC%Conv128k2.BAT
if exist %ETC%256\GU_%CHNUM%.png call %ETC%Conv256.BAT
if exist %ETC%256s\GU_%CHNUM%.png call %ETC%Conv256s.BAT
if exist %ETC%512\GU_%CHNUM%.png call %ETC%Conv512.BAT
if exist %ETC%512C\GU_%CHNUM%.png call %ETC%Conv512c.BAT
if exist %ETC%1024\GU_%CHNUM%.png call %ETC%Conv1024.BAT
rem ETC変換用BATディレクトリに移動
cd %ETC%
rem ETC変換用BAT呼び出し
call %ETC%conv.bat

rem このBATファイル"rename_new.bat"があるディレクトリに移動
cd /d %~dp0

rem Artsにファイルコピー
if exist %TMP%XX_01.png copy /Y %TMP%XX_01.png %Arts%x128_Icon\GU_%CHNUM%.png
if exist %TMP%XX_02.png copy /Y %TMP%XX_02.png %Arts%x128_koma\GU_%CHNUM%.png
if exist %TMP%XX_03.png copy /Y %TMP%XX_03.png %Arts%x256_S\GU_%CHNUM%.png
if exist %TMP%XX_04.png copy /Y %TMP%XX_04.png %Arts%x512\GU_%CHNUM%.png
if exist %TMP%XX_05.png copy /Y %TMP%XX_05.png %Arts%x512_cut-in\GU_%CHNUM%.png
if exist %TMP%XX_BS.png copy /Y %TMP%XX_BS.png %Arts%x128_koma_2\GU_%CHNUM%.png
if exist %TMP%XX_ZK.png copy /Y %TMP%XX_ZK.png %Arts%x128_koma_2\GU_%CHNUM%.png
rem Artsには1024pngとjsonをコピー
copy /Y %ETC%1024\GU_%CHNUM%.png %ArtsL%【Export】\GU_%CHNUM%.png
copy /Y %ETC%1024\GU_%CHNUM%.json %ArtsL%【Export】\GU_%CHNUM%.json

rem 変換したETCフォルダからCodeへコピー
if exist %ETC%128\GU_%CHNUM%.etc copy /Y %ETC%128\GU_%CHNUM%.etc %CodeJP%x128_Icon\GU_%CHNUM%.etc
if exist %ETC%128k\GU_%CHNUM%.etc copy /Y %ETC%128k\GU_%CHNUM%.etc %CodeJP%x128_koma\GU_%CHNUM%.etc
if exist %ETC%128k2\GU_%CHNUM%.etc copy /Y %ETC%128k2\GU_%CHNUM%.etc %CodeJP%x128_koma_2\GU_%CHNUM%.etc
if exist %ETC%256\GU_%CHNUM%.etc copy /Y %ETC%256\GU_%CHNUM%.etc %CodeJP%x128_koma_2\GU_%CHNUM%.etc
if exist %ETC%256s\GU_%CHNUM%.etc copy /Y %ETC%256s\GU_%CHNUM%.etc %CodeJP%x256_S\GU_%CHNUM%.etc
if exist %ETC%512\GU_%CHNUM%.etc copy /Y %ETC%512\GU_%CHNUM%.etc %CodeJP%x512\GU_%CHNUM%.etc
if exist %ETC%512c\GU_%CHNUM%.etc copy /Y %ETC%512c\GU_%CHNUM%.etc %CodeJP%x512_cut-in\GU_%CHNUM%.etc
if exist %ETC%1024\GU_%CHNUM%.etc copy /Y %ETC%1024\GU_%CHNUM%.etc %CodeJP%x1024\GU_%CHNUM%.etc
rem jsonもコピー
copy /Y %ETC%1024\GU_%CHNUM%.json %CodeJP%x1024\GU_%CHNUM%.json

rem ENはなくなったのでいらない

rem 最後にファイルを削除する
del /Q %ETC%128\*.*
del /Q %ETC%128k\*.*
del /Q %ETC%128k2\*.*
del /Q %ETC%256\*.*
del /Q %ETC%256s\*.*
del /Q %ETC%512\*.*
del /Q %ETC%512c\*.*
del /Q %ETC%1024\*.*


pause
