@echo off

rem çŒìÒØ‚èo‚µ€”õ


set READY=C:\Terra\Arts\Actor\02_guardian\Icons\00_Ready
set DATA=C:\Terra\Arts\Actor\02_guardian\Icons\00_Temp

for /f %%f in (%READY%\GUList.txt) do (
  echo %%f
  mkdir %%f
  xcopy /e %DATA% %READY%\%%f
)

pause
