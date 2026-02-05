@echo off
echo Iniciando Backend (Laravel)...
start cmd /k "cd /d .\Zent && php artisan serve"

timeout /t 3

echo Iniciando Frontend (React)...
start cmd /k "cd /d .\React\tienda-react && npm run dev"

echo Todo iniciado.
pause
