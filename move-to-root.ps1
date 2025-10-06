# Script PowerShell para mover o projeto Vite para a raiz
# Execute este script na pasta holidays-prototype

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MOVENDO PROJETO VITE PARA A RAIZ" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se está na pasta correta
$currentPath = Get-Location
if ($currentPath.Path -notlike "*holidays-prototype") {
    Write-Host "[ERRO] Voce nao esta na pasta holidays-prototype!" -ForegroundColor Red
    Write-Host "Execute: cd 'C:\Users\sanped01\OneDrive - CSG Systems Inc\Documents\dev\holidays-prototype'" -ForegroundColor Yellow
    exit 1
}

# 1. Criar pasta para backup do projeto antigo
Write-Host "[1/5] Criando backup do projeto antigo..." -ForegroundColor Yellow
try {
    New-Item -ItemType Directory -Path "old-version" -Force | Out-Null
    Move-Item -Path "index.html" -Destination "old-version/" -Force -ErrorAction Stop
    Move-Item -Path "script.js" -Destination "old-version/" -Force -ErrorAction Stop
    Move-Item -Path "styles.css" -Destination "old-version/" -Force -ErrorAction Stop
    Move-Item -Path ".DS_Store" -Destination "old-version/" -Force -ErrorAction SilentlyContinue
    Move-Item -Path "README.md" -Destination "old-version/README-OLD.md" -Force -ErrorAction Stop
    Write-Host "      OK - Projeto antigo movido para old-version/" -ForegroundColor Green
} catch {
    Write-Host "      ERRO ao criar backup: $_" -ForegroundColor Red
    exit 1
}

# 2. Mover conteudo de holidays-app para a raiz
Write-Host "[2/5] Movendo conteudo do holidays-app para a raiz..." -ForegroundColor Yellow
try {
    Get-ChildItem -Path "holidays-app" -Force | ForEach-Object {
        Move-Item -Path $_.FullName -Destination "." -Force -ErrorAction Stop
    }
    Write-Host "      OK - Arquivos movidos com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "      ERRO ao mover arquivos: $_" -ForegroundColor Red
    exit 1
}

# 3. Remover pasta holidays-app vazia
Write-Host "[3/5] Removendo pasta holidays-app vazia..." -ForegroundColor Yellow
try {
    Remove-Item -Path "holidays-app" -Force -ErrorAction SilentlyContinue
    Write-Host "      OK - Pasta removida!" -ForegroundColor Green
} catch {
    Write-Host "      AVISO: Nao foi possivel remover a pasta (talvez ja esteja removida)" -ForegroundColor Yellow
}

# 4. Mostrar nova estrutura
Write-Host "[4/5] Verificando nova estrutura..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Arquivos na raiz:" -ForegroundColor Cyan
Get-ChildItem -Name | Select-Object -First 15 | ForEach-Object {
    Write-Host "  - $_" -ForegroundColor White
}

# 5. Verificar se package.json está na raiz
Write-Host ""
Write-Host "[5/5] Verificando se package.json esta na raiz..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Write-Host "      OK - package.json encontrado na raiz!" -ForegroundColor Green
} else {
    Write-Host "      ERRO - package.json NAO encontrado na raiz!" -ForegroundColor Red
    exit 1
}

# Sucesso!
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  MIGRACAO CONCLUIDA COM SUCESSO!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "PROXIMOS PASSOS:" -ForegroundColor Yellow
Write-Host "  1. Revise as mudancas:" -ForegroundColor White
Write-Host "     git status" -ForegroundColor Cyan
Write-Host ""
Write-Host "  2. Teste o build:" -ForegroundColor White
Write-Host "     npm run build" -ForegroundColor Cyan
Write-Host ""
Write-Host "  3. Adicione ao Git:" -ForegroundColor White
Write-Host "     git add ." -ForegroundColor Cyan
Write-Host ""
Write-Host "  4. Faca o commit:" -ForegroundColor White
Write-Host "     git commit -m ""Move Vite project to root directory""" -ForegroundColor Cyan
Write-Host ""
Write-Host "  5. Envie para o GitHub:" -ForegroundColor White
Write-Host "     git push origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "Depois disso, faca o deploy na Vercel!" -ForegroundColor Green
Write-Host ""
