@echo off
echo Cleaning up unnecessary project files...
echo.

:: Remove generator scripts
del /S /Q generate-*.js 2>nul
del /S /Q generator-*.js 2>nul
del /S /Q convert-*.js 2>nul

:: Remove temporary files
del /S /Q *.tmp 2>nul
del /S /Q *.temp 2>nul
del /S /Q *.bak 2>nul
del /S /Q *.backup 2>nul
del /S /Q *~ 2>nul
del /S /Q .DS_Store 2>nul

:: Remove test files
del /S /Q test-*.js 2>nul
del /S /Q test-*.html 2>nul
del /S /Q *.test.js 2>nul

:: Remove old versions
del /S /Q *-old.* 2>nul
del /S /Q *-backup.* 2>nul
del /S /Q *-copy.* 2>nul
del /S /Q *-draft.* 2>nul

:: Remove build artifacts
del /S /Q *.log 2>nul
rmdir /S /Q dist 2>nul
rmdir /S /Q build 2>nul

:: Remove IDE files
del /S /Q *.swp 2>nul
del /S /Q *.swo 2>nul
rmdir /S /Q .idea 2>nul

echo.
echo Cleanup complete!
echo.
echo Protected files: PDFs, HTML templates, MD docs, images, configs
echo.

:: Show what's left
echo Current structure:
dir /B business-core\
echo.
pause