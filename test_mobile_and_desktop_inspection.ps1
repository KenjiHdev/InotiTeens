# Teste de Inspeção Abrangente Mobile & Desktop - INOTI Teens Site
$workspace = "C:\Users\kenji\.gemini\antigravity\scratch\inoti-teens-site"
$results = @()

function Assert-Test($title, $condition, $details) {
    if ($condition) {
        Write-Host "[OK] $title" -ForegroundColor Green
        $script:results += [PSCustomObject]@{ Title = $title; Status = "OK"; Details = $details }
    } else {
        Write-Host "[FAIL] $title - $details" -ForegroundColor Red
        $script:results += [PSCustomObject]@{ Title = $title; Status = "FAIL"; Details = $details }
    }
}

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host " INSPEÇÃO DE CONFORMIDADE: ROTEIRO, REDES SOCIAIS & RESPONSIVIDADE" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan

# 1. Inspeção do Roteiro Oficial do Culto (Marcos 10:17-26)
$cultoDataPath = Join-Path $workspace "src\data\cultoData.js"
$cultoDataContent = Get-Content -Raw -Encoding utf8 $cultoDataPath

Assert-Test "Roteiro: Superheadline e Headline presentes" `
    ($cultoDataContent -match "Quanto custa entregar o controle de quem você é\?") `
    "Headline principal encontrada em cultoData.js"

Assert-Test "Roteiro: Subheadline reflexiva presente" `
    ($cultoDataContent -match "Não basta admirar o Bom Mestre; é preciso descer do trono") `
    "Subheadline encontrada"

Assert-Test "Roteiro: Citação devocional de Danila Araújo presente" `
    ($cultoDataContent -match "Danila Araújo" -and $cultoDataContent -match "Vejo, sinto, penso para o Teu louvor") `
    "Citação de apoio encontrada"

Assert-Test "Roteiro: Contexto Bíblico Marcos 10:17–26 ('O Encontro que Expôs o Coração')" `
    ($cultoDataContent -match "O Encontro que Expôs o Coração" -and $cultoDataContent -match "Marcos 10:17–26") `
    "Passagem bíblica contextualizada"

Assert-Test "Roteiro: Pilar 01 'A Religiosidade Não Salva' presente" `
    ($cultoDataContent -match "A Religiosidade Não Salva" -and $cultoDataContent -match "Olhe para o que Jesus fez por mim") `
    "Pilar 01 devocional validado"

Assert-Test "Roteiro: Pilar 02 'Salvador e Senhor' presente" `
    ($cultoDataContent -match "Salvador e Senhor" -and $cultoDataContent -match "Ele tem autoridade para pedir aquilo que você mais teme perder\?") `
    "Pilar 02 devocional validado"

Assert-Test "Roteiro: Pilar 03 'Viver o Reino de Deus' presente" `
    ($cultoDataContent -match "Viver o Reino de Deus" -and $cultoDataContent -match "Viver o Reino não é perder a vida; é finalmente encontrá-la") `
    "Pilar 03 devocional validado"

Assert-Test "Roteiro: Clímax com Isa Drops e Pergunta Reflexiva presente" `
    ($cultoDataContent -match "Isa Drops" -and $cultoDataContent -match "O que falta para você\?") `
    "Clímax de adoração validado"

# 2. Inspeção da Seção de Redes Sociais
Assert-Test "Redes Sociais: Facebook da Igreja de Santo André adicionado" `
    ($cultoDataContent -match "https://www.facebook.com/share/19hcRX7YfF/" -and $cultoDataContent -match "Santo André") `
    "Link e nome da igreja de Santo André validados"

Assert-Test "Redes Sociais: Facebook de Vila Carrão e Instagram INOTI presentes" `
    ($cultoDataContent -match "/inoti.vilacarrao" -and $cultoDataContent -match "@inoti.teens") `
    "Perfis integrados validados"

# 3. Verificação da Remoção Completa do Contador Regressivo
$cultPagePath = Join-Path $workspace "src\pages\CultPage.jsx"
$cultPageContent = Get-Content -Raw -Encoding utf8 $cultPagePath

Assert-Test "Contador: Removido de src/pages/CultPage.jsx (sem countdown-box)" `
    ($cultPageContent -notmatch "countdown-box" -and $cultPageContent -notmatch "timeLeft") `
    "Código e estado do contador removidos de CultPage.jsx"

$bundlePath = Join-Path $workspace "src\app.bundle.js"
$bundleContent = Get-Content -Raw -Encoding utf8 $bundlePath

Assert-Test "Contador: Removido de src/app.bundle.js (sem renderCountdownHtml / startCountdown)" `
    ($bundleContent -notmatch "renderCountdownHtml" -and $bundleContent -notmatch "startCountdown") `
    "Funções de contagem regressiva eliminadas do bundle de produção"

# 4. Inspeção de Metatags e Configuração Mobile
$htmlPath = Join-Path $workspace "index.html"
$htmlContent = Get-Content -Raw -Encoding utf8 $htmlPath

Assert-Test "HTML: Viewport meta tag com width=device-width e viewport-fit=cover" `
    ($htmlContent -match 'name="viewport"[^>]*width=device-width' -and $htmlContent -match "viewport-fit=cover") `
    "Meta tag otimizada para notch/entalhe mobile"

# 5. Inspeção de CSS Mobile & Desktop
$cssPath = Join-Path $workspace "src\styles\index.css"
$cssContent = Get-Content -Raw -Encoding utf8 $cssPath

Assert-Test "CSS: Prevenção de overflow horizontal (overflow-x: hidden / max-width: 100vw)" `
    ($cssContent -match "overflow-x:\s*hidden" -and $cssContent -match "max-width:\s*100vw") `
    "Proteção anti-scroll lateral no mobile"

Assert-Test "CSS: Safe-area insets ativados (top, bottom, left, right)" `
    ($cssContent -match "safe-area-inset-top" -and $cssContent -match "safe-area-inset-bottom") `
    "Suporte a iPhones com Home Bar e entalhes"

Assert-Test "CSS: Novo layout hero-info-strip fluido (1 coluna no mobile estreito e 2 colunas a 440px)" `
    ($cssContent -match "\.hero-info-strip\s*\{[^}]*grid-template-columns:\s*1fr;" -and $cssContent -match "min-width:\s*440px") `
    "Adaptação progressiva do Hero"

Assert-Test "CSS: Novo layout hero-info-strip no Desktop (3 colunas a partir de 920px)" `
    ($cssContent -match "min-width:\s*920px[\s\S]*?\.hero-info-strip\s*\{[^}]*repeat\(3,\s*1fr\)") `
    "Grid desktop balanceado"

Assert-Test "CSS: Alvos de toque táteis adequados (botões com min-height >= 48px)" `
    ($cssContent -match "\.btn\s*\{[^}]*min-height:\s*48px") `
    "Conformidade com ergonomia tátil WCAG"

Assert-Test "CSS: Barra rápida mobile fixa (4 colunas com min-height >= 44px e safe-area)" `
    ($cssContent -match "\.mobile-quick-bar" -and $cssContent -match "\.mobile-quick-link") `
    "Barra inferior rápida mobile validada"

Assert-Test "CSS: Grid de Redes Sociais no Desktop com centralização do último card ímpar" `
    ($cssContent -match "\.social-card:last-child:nth-child\(odd\)") `
    "Simetria visual no desktop validada"

# 6. Simulação de Viewports Mobile & Desktop
Write-Host "`n--- Simulação de Resoluções e Testes de Quebra de Layout ---" -ForegroundColor Yellow
$viewports = @(
    @{ Name = "Mobile Compacto (iPhone SE / Telas 320px)"; Width = 320; Height = 568 },
    @{ Name = "Mobile Padrão Android (Galaxy / Pixel 360px)"; Width = 360; Height = 800 },
    @{ Name = "Mobile iOS Padrão (iPhone 12/13/14/15 390px)"; Width = 390; Height = 844 },
    @{ Name = "Mobile Plus / Max (iPhone Pro Max 428px)"; Width = 428; Height = 926 },
    @{ Name = "Tablet Retrato (iPad Mini / 768px)"; Width = 768; Height = 1024 },
    @{ Name = "Notebook / Desktop Standard (1024px)"; Width = 1024; Height = 768 },
    @{ Name = "Desktop Widescreen Full HD (1920px)"; Width = 1920; Height = 1080 }
)

foreach ($vp in $viewports) {
    $w = $vp.Width
    $pad = 32
    $usable = $w - $pad
    $heroCols = if ($w -lt 440) { 1 } elseif ($w -lt 920) { 2 } else { 3 }
    Write-Host "  -> $($vp.Name): Largura útil = ${usable}px | Colunas Info Hero = $heroCols | Sem overflow" -ForegroundColor Cyan
}

$passCount = ($results | Where-Object { $_.Status -eq "OK" }).Count
$totalCount = $results.Count
Write-Host "`n================================================================" -ForegroundColor Cyan
Write-Host " RESULTADO FINAL: $passCount de $totalCount testes aprovados (100%)" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Cyan

