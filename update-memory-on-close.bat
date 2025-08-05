@echo off
echo ========================================
echo Updating Claude Memory Before Close
echo ========================================
echo.

:: Get current date and time
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "timestamp=%YYYY%-%MM%-%DD% %HH%:%Min%:%Sec%"

:: Navigate to project directory
cd /d "C:\Users\b\Documents\GitHub\broker-lead-engine"

:: Update CLAUDE.md with timestamp
echo.
echo Updating CLAUDE.md with current timestamp...
powershell -Command "(Get-Content CLAUDE.md) -replace 'Last updated: .*', 'Last updated: %timestamp%' | Set-Content CLAUDE.md"

:: Git add and commit
echo.
echo Committing memory updates to git...
git add CLAUDE.md Memory.md *.log
git commit -m "Auto-update memory on close - %timestamp%"

:: Optional: Push to GitHub (uncomment if you want automatic push)
:: git push origin main

echo.
echo ========================================
echo Memory Update Complete!
echo ========================================
echo.
echo Press any key to exit...
pause >nul