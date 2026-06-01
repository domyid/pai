@echo off
REM ============================================================
REM  Klik dua kali file ini untuk membuka aplikasi ujian.
REM  Aplikasi pakai ES6 module, jadi harus lewat server kecil
REM  (tidak bisa langsung double-click index.html).
REM ============================================================
title Simulasi Ujian PAI & BP
cd /d "%~dp0"

echo.
echo   ==========================================
echo    Membuka Simulasi Ujian PAI ^& BP ...
echo   ==========================================
echo.
echo   Browser akan terbuka otomatis.
echo   JANGAN tutup jendela hitam ini selama ujian.
echo   Tutup jendela ini kalau sudah selesai.
echo.

REM Buka browser ke alamat server
start "" "http://localhost:8123/index.html"

REM Jalankan server kecil bawaan Python
py -m http.server 8123 2>nul || python -m http.server 8123

pause
