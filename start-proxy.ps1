# Dify Proxy Server Startup Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Dify Proxy Server Startup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set environment variables
$env:DIFY_API_KEY = "app-c8H5DdHJu8pHjqu2kF2dlCcv"
$env:DIFY_API_URL = "https://api.dify.ai/v1"
$env:PORT = "3001"

Write-Host "Starting proxy server on port $($env:PORT)..." -ForegroundColor Green
Write-Host ""
Write-Host "API Key: $($env:DIFY_API_KEY)" -ForegroundColor Yellow
Write-Host "API URL: $($env:DIFY_API_URL)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start the proxy server
node proxy-server.js
