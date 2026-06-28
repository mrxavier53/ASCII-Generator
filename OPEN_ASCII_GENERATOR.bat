@echo off
title ASCII Generator Launcher
cd /d "%~dp0"
echo.
echo ========================================
echo        ASCII Generator Launcher
echo ========================================
echo.
echo Opening ASCII Generator in your browser...
echo.
start "" "%~dp0index.html"
echo Done! You can close this window.
timeout /t 3 >nul
exit
