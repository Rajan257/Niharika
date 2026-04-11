@echo off
echo =========================================
echo   Starting Niharika Platform Locally
echo =========================================

echo.
echo [1/2] Starting Node.js Backend API (Port 5000)...
start cmd /k "cd backend && npm run dev"

echo.
echo [2/2] Starting Frontend App (Port 3000)...
start cmd /k "cd frontend && npx serve -p 3000"

echo.
echo Waiting for servers to initialize...
timeout /t 3 /nobreak > nul

echo.
echo Launching your browser...
start http://localhost:3000/

echo.
echo Niharika is now running! Keep these terminal windows open to keep the server alive.
echo Press any key to close this launcher...
pause > nul
