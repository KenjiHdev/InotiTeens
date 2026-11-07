Set-Location "C:\Users\kenji\.gemini\antigravity\scratch\inoti-teens-site"
Write-Host "Iniciando servidor local do site INOTI Teens em http://localhost:3000 ..."
powershell -ExecutionPolicy Bypass -File .\servidor-http.ps1 -Port 3000
