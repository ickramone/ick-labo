@echo off
echo -------------------------------------------------------
echo ■以下のアプリ等をインストールしてある状態でしか動作しません
echo ■ETC変換アプリをインストール
echo Code\Tools\Mali_Texture_Compression_Tool_v4.3.0.b81c088_Windows_x64.exe
echo ■TexturePackerのインストール
echo コマンドラインツールが使えるようにする必要がある？？？
echo C:\Program Files\CodeAndWeb\TexturePacker\bin
echo このディレクトリが存在していること
echo -------------------------------------------------------
rem 守護者IDの入ったフォルダが用意されていない場合は下記
rem set CHNUM=
rem 入力要求
rem set /P CHNUM="守護者IDを入力してください"

rem パスを変数に
set MyPath=%~dp0
set ETC=C:\Terra\Arts\Actor\99_ETC\
set Arts=C:\Terra\Arts\Actor\02_guardian\
set CodeJP=C:\Terra\Code\Client\Product\JP\Download\Data\img\guardian\
rem 1024の保存先パス
set ArtsL=C:\Terra\Arts\Actor\02_guardian\x1024\
set TMP=Temp-assets

rem 守護者IDの入ったフォルダが用意されている前提、IDを抜き出す
for %%J in (.) do call :sub "%%J"
goto :ConvETC

rem ID取得
:sub
  set FNAME=%~n1
  rem 先頭から3文字目、そこから5文字分
  set CHNUM=%FNAME:~3,5%
  call :X1024
  call :COPY
  call :PACK
  exit /b

:X1024
  rem x1024にID＋守護者名フォルダがあったらなにもしない
  rem ID番号のフォルダがなかったら、ID＋守護者名フォルダ作る
  rem ID番号のフォルダがあったらID＋守護者名にリネーム
  if exist %ArtsL%%FNAME% goto next
  if not exist %ArtsL%GU_%CHNUM% mkdir %ArtsL%%FNAME%
  if exist %ArtsL%GU_%CHNUM% ren %ArtsL%GU_%CHNUM% %ArtsL%%FNAME%
  :next
  exit /b

rem ETC変換ディレクトリなどにコピー
:COPY
  if exist %MyPath%%TMP%\GU_XX_01.png copy /Y %MyPath%%TMP%\GU_XX_01.png %ETC%128\GU_%CHNUM%.png
  if exist %MyPath%%TMP%\GU_XX_02.png copy /Y %MyPath%%TMP%\GU_XX_02.png %ETC%128k\GU_%CHNUM%.png
  if exist %MyPath%%TMP%\GU_XX_ZK.png copy /Y %MyPath%%TMP%\GU_XX_ZK.png %ETC%128k2\GU_%CHNUM%.png
  if exist %MyPath%%TMP%\GU_XX_BS.png copy /Y %MyPath%%TMP%\GU_XX_BS.png %ETC%128ks\GU_%CHNUM%.png
  if exist %MyPath%%TMP%\GU_XX_03.png copy /Y %MyPath%%TMP%\GU_XX_03.png %ETC%256s\GU_%CHNUM%.png
  if exist %MyPath%%TMP%\GU_XX_04.png copy /Y %MyPath%%TMP%\GU_XX_04.png %ETC%512\GU_%CHNUM%.png
  if exist %MyPath%%TMP%\GU_XX_05.png copy /Y %MyPath%%TMP%\GU_XX_05.png %ETC%512C\GU_%CHNUM%.png
  rem テクスチャパッカーなどのファイルをコピーしてリネーム
  copy /Y %MyPath%%TMP%\GU_1024\GU_XX.tps %ArtsL%%FNAME%\GU_%CHNUM%.tps
  copy /Y %MyPath%%TMP%\GU_1024\illust.png %ArtsL%%FNAME%\illust.png
  exit /b

rem テクスチャパッカー
:PACK
  SET "PATH=C:/Program Files/CodeAndWeb/TexturePacker/bin;%PATH%"
  rem .tpsファイルを使用する場合
  TexturePacker %MyPath%%TMP%\GU_1024\GU_XX.tps --data %ETC%1024\GU_%CHNUM%.json --sheet %ETC%1024\GU_%CHNUM%.png
  exit /b

rem ETCに変換する
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
rem Artsにファイルコピー
if exist %MyPath%%TMP%\GU_XX_01.png copy /Y %MyPath%%TMP%\GU_XX_01.png %Arts%x128_Icon\GU_%CHNUM%.png
if exist %MyPath%%TMP%\GU_XX_02.png copy /Y %MyPath%%TMP%\GU_XX_02.png %Arts%x128_koma\GU_%CHNUM%.png
if exist %MyPath%%TMP%\GU_XX_03.png copy /Y %MyPath%%TMP%\GU_XX_03.png %Arts%x256_S\GU_%CHNUM%.png
if exist %MyPath%%TMP%\GU_XX_04.png copy /Y %MyPath%%TMP%\GU_XX_04.png %Arts%x512\GU_%CHNUM%.png
if exist %MyPath%%TMP%\GU_XX_05.png copy /Y %MyPath%%TMP%\GU_XX_05.png %Arts%x512_cut-in\GU_%CHNUM%.png
if exist %MyPath%%TMP%\GU_XX_BS.png copy /Y %MyPath%%TMP%\GU_XX_BS.png %Arts%x128_koma_2\GU_%CHNUM%.png
if exist %MyPath%%TMP%\GU_XX_ZK.png copy /Y %MyPath%%TMP%\GU_XX_ZK.png %Arts%x128_koma_2\GU_%CHNUM%.png
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

rem 最後にファイルを削除する
del /Q %ETC%128\*.*
del /Q %ETC%128k\*.*
del /Q %ETC%128k2\*.*
del /Q %ETC%256\*.*
del /Q %ETC%256s\*.*
del /Q %ETC%512\*.*
del /Q %ETC%512c\*.*
del /Q %ETC%1024\*.*

echo -------------------------------------------------------
echo ETCフォルダからCodeへ コピー確認
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
echo 1024格納フォルダ
echo %ArtsL%%FNAME%
echo -------------------------------------------------------
echo 変換が終了しました
echo -------------------------------------------------------

pause
exit /b
