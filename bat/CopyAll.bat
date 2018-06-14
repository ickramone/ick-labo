@echo off
echo ----------------------------------------------------
echo 日付以降の更新ファイルをリビジョンごとのフォルダへコピーします
echo サブカテゴリに何も入力しないとimgフォルダ以下を全部検索します
echo メンテ日が変わったときはディレクトリを書き換えてください
echo ----------------------------------------------------

set IMG=C:\Terra\Code\Client\Product\JP\Download\Data
set MONTH=
set /P MONTH="～月以降のファイルをコピー?　"
set DAY=
set /P DAY="～日以降のファイルをコピー?　"
set DML=C:\Terra\Documentation\01.development\01.Data\sql\DML\product_master\2018.06.21\jpn\Download\Data
set MENTE=%DML:~69,10%
echo ----------------------------------------------------
echo メンテ日チェック
echo 今回コピーするフォルダは　%MENTE%　です
echo ----------------------------------------------------
echo ----------------------------------------------------
echo パスの選択
echo Code\Client\Product\JP\Download\Data 以降のパスを選んでください
echo 1　→　img　　　イメージ
echo 2　→　master　　守護者座標とか
echo 3　→　sprite　　アニメーション系
echo 1か3を選んだ場合(img、sprite) サブカテゴリを入力してください
echo ----------------------------------------------------
:CHOICE

set /P NUM=1 or 2を選択してください　
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
  echo １～３以外が入力されました。１～３の数字を入力してください
  goto CHOICE
)

:NEXT
forfiles /p %IMG% /s /d +2018/%MONTH%/%DAY% /m *.* /c "cmd /c echo @path    @fdate@ftime"
rem for /r %%I in (*) do xcopy /L /S /D:%MONTH%-%DAY%-2018 %%I ..\
rem /O:D　サイズ順　/T:W　最終更新日
echo ----------------------------------------------------
echo ↑のファイルをコピーします
echo ----------------------------------------------------
pause

rem for /r %%I in (*) do xcopy /S /D:%MONTH%-%DAY%-2018 %%I %DML%\%SUB%
xcopy /F /S /Y /I /D:%MONTH%-%DAY%-2018 /D %IMG% %DML%
rem /F コピーしたファイル名を表示　/S サブディレクトリもコピー　/Y 上書き確認しない
rem /D:xxx 日付より最新のファイルのみ　/Dだけだとコピー先のファイルより新しいものだけ
echo ----------------------------------------------------
echo コピー完了
echo ----------------------------------------------------

pause
