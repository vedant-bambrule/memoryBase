@echo off
echo ========================================
echo   Dify Proxy Server Startup
echo ========================================
echo.

REM Set environment variables
set DIFY_API_KEY=app-c8H5DdHJu8pHjqu2kF2dlCcv
set DIFY_API_URL=https://api.dify.ai/v1
set PORT=3001

echo Starting proxy server on port %PORT%...
echo.
echo API Key: %DIFY_API_KEY%
echo API URL: %DIFY_API_URL%
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

node proxy-server.js
