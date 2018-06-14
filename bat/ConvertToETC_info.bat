@echo off
echo -------------------------------------------------------
echo ■以下のアプリ等をインストールしてある状態でしか動作しません
echo ■ETC変換アプリをインストール
echo Code\Tools\Mali_Texture_Compression_Tool_v4.3.0.b81c088_Windows_x64.exe
echo ■PhotoshopのJSXをドロップレットに登録すること
echo Resize1024_512.jsx　をフォトショでアクションに登録して
echo ResizePO2toETC.exeというドロップレットを作成しておく
echo ■日付のルール　例：2018年4月12日ならば　"180412"
echo ■守護者変換用のETCツールは
echo C:\Terra\Arts\Actor\99_ETC
echo -------------------------------------------------------

rem パスを変数に
set GA=
set /P GA="格納するガチャの日付フォルダを入力してください 例：2018年6月21日ならば　"180621""
set ETC=C:\Terra\Arts\Actor\99_ETC
rem 各格納先のパス
set DataGA=C:\Terra\Code\Client\Product\JP\Download\Data\img\gacha\illust\
set ArtsGA=C:\Terra\Arts\beta\gacha\◆更新\%GA%
set DROP=C:\Users\kiyohiro.ichikawa\Desktop\ResizePO2toETC.exe

rem ディレクトリが存在するかチェックする なければ作る
if not exist %ArtsGA% (mkdir %ArtsGA%) else @echo %ArtsGA%フォルダは存在します

rem -assetsフォルダの個数分処理をする
for /d %%J in (*-assets) do call :sub "%%J"
goto :ConvETC

rem 冪乗サイズにリサイズ、ETCフォルダへコピー
:sub
  call %DROP% %CD%\%~1
  rem .pngをETC変換用にコピー
  copy /Y %CD%\%~1\*.png %ETC%\Others
  exit /b

rem ETCに変換する
:ConvETC
  call %ETC%\ConvOthers.BAT
  cd %ETC%
  call %ETC%\conv.bat
  cd /d %~dp0

rem ArtsにETCをコピー
rem if not exist %ArtsGA%\ETC (mkdir %ArtsGA%\ETC) else @echo %ArtsGA%\ETCフォルダは存在します
rem copy /Y %ETC%\Others\*.etc %ArtsGA%\ETC\

  rem CodeへETCを移動
  move /Y %ETC%\Others\*.etc %DataGA%\

  rem 変換したETCファイルを削除する
  del /Q %ETC%\Others\*.*
  echo -------------------------------------------------------
  echo 変換が終了しました
  echo -------------------------------------------------------

pause
exit /b
