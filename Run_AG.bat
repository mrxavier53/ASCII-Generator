@echo off
title ASCII GENERATOR LAUNCHER
color 0A

setlocal enabledelayedexpansion

echo ========================================
echo    ASCII GENERATOR 
echo ========================================
echo.

if not exist "Bat_Log" mkdir Bat_Log

set first_run_file=Bat_Log\first_run.txt

if not exist "%first_run_file%" (
    echo [FIRST RUN DETECTED]
    echo.
    echo Requesting administrator privileges...
    
    fsutil dirty query %systemdrive% >nul 2>&1
    if %errorLevel% equ 0 (
        echo [OK] Already running as administrator.
    ) else (
        echo [INFO] This window will close and reopen as administrator.
        echo [INFO] Please accept the UAC prompt.
        timeout /t 2 >nul
        
        powershell -Command "Start-Process '%~f0' -Verb RunAs"
        exit /b
    )
    
    echo [OK] Administrator privileges confirmed.
    echo.
    echo Installing dependencies...
    echo.
    
    where python >nul 2>&1
    if %errorLevel% neq 0 (
        echo [ERROR] Python not found.
        echo.
        echo Please install Python 3.12.9 from:
        echo https://www.python.org/downloads/release/python-3129/
        echo.
        echo Make sure to check "Add Python to PATH" during installation.
        echo.
        pause
        exit /b 1
    )
    
    echo Installing Flask...
    pip install flask >nul 2>&1
    if %errorLevel% equ 0 (
        echo [OK] Flask installed successfully.
    ) else (
        echo [WARNING] Flask install failed, retrying with --user...
        pip install --user flask >nul 2>&1
        if !errorLevel! equ 0 (
            echo [OK] Flask installed successfully with --user.
        ) else (
            echo [ERROR] Flask installation failed.
        )
    )
    
    echo Installing pyfiglet...
    pip install pyfiglet >nul 2>&1
    if %errorLevel% equ 0 (
        echo [OK] pyfiglet installed successfully.
    ) else (
        echo [WARNING] pyfiglet install failed, retrying with --user...
        pip install --user pyfiglet >nul 2>&1
        if !errorLevel! equ 0 (
            echo [OK] pyfiglet installed successfully with --user.
        ) else (
            echo [ERROR] pyfiglet installation failed.
        )
    )
    
    echo.
    echo Creating first run marker...
    echo First run completed on %date% at %time% > "%first_run_file%"
    echo [OK] First run marker created.
    echo.
    echo ========================================
    echo    INSTALLATION COMPLETE
    echo ========================================
    echo.
    timeout /t 2 >nul
) else (
    echo [DETECTED] Previous installation found.
    echo Skipping dependency installation...
    echo.
    echo Last run: 
    type "%first_run_file%"
    echo.
    timeout /t 2 >nul
)

echo Starting ASCII Generator server...
echo.

for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do (
    echo Port 5000 is in use. Closing existing process...
    taskkill /f /pid %%a >nul 2>&1
)

start /b python app.py >nul 2>&1

echo Waiting for server to start...
timeout /t 3 >nul

echo Opening browser...
start http://localhost:5000

echo.
echo ========================================
echo    ASCII GENERATOR IS RUNNING
echo ========================================
echo.
echo Server: http://localhost:5000
echo.
echo [TIP] Press Ctrl+C in this window to stop the server
echo [TIP] Or close this window to terminate
echo.
echo ========================================

timeout /t 86400 >nul