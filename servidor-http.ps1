param([int]$Port = 3000)

$root = $PSScriptRoot
if (-not $root) { $root = Get-Location }

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "Servidor HTTP local do INOTI Teens iniciado com sucesso!" -ForegroundColor Green
    Write-Host "Disponivel em: $prefix" -ForegroundColor Cyan
    Write-Host "Pressione Ctrl+C para encerrar o servidor." -ForegroundColor Yellow
} catch {
    Write-Host "Erro ao iniciar na porta $Port : $_" -ForegroundColor Red
    exit 1
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".png"  = "image/png"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($urlPath)) {
            $urlPath = "index.html"
        }

        # Seguranca basica contra path traversal
        $fullPath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($root, $urlPath))
        if (-not $fullPath.StartsWith([System.IO.Path]::GetFullPath($root))) {
            $response.StatusCode = 403
            $response.Close()
            continue
        }

        if (Test-Path $fullPath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $response.ContentType = $mime

            # Suporte a CORS local
            $response.AddHeader("Access-Control-Allow-Origin", "*")

            try {
                $bytes = [System.IO.File]::ReadAllBytes($fullPath)
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
                $response.StatusCode = 200
            } catch {
                $response.StatusCode = 500
            }
        } else {
            # Fallback SPA para index.html se for requisicao de navegacao
            $indexPath = Join-Path $root "index.html"
            if (Test-Path $indexPath) {
                $response.ContentType = "text/html; charset=utf-8"
                $bytes = [System.IO.File]::ReadAllBytes($indexPath)
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
                $response.StatusCode = 200
            } else {
                $response.StatusCode = 404
            }
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}

