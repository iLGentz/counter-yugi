@echo off
echo ====================================
echo   Automazione Git (Add, Commit, Push)
echo ====================================
echo.

:: Chiede all'utente di inserire il messaggio di commit
set /p commit_msg="Inserisci il messaggio di commit: "

:: Esegue i comandi Git
echo.
echo Aggiunta dei file in corso (git add .)...
git add .

echo.
echo Creazione del commit (git commit -m "%commit_msg%")...
git commit -m "%commit_msg%"

echo.
echo Push sul server remoto (git push)...
git push

echo.
echo ====================================
echo   Operazione completata!
echo ====================================
pause