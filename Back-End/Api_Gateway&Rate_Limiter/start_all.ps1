<#
Starts both the mock backend and the API gateway in separate PowerShell windows.
Creates a venv and installs dependencies if necessary.
#>
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir

if (-not (Test-Path .venv)) {
    python -m venv .venv
}

. .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Start mock service window
Start-Process -FilePath "powershell.exe" -ArgumentList @(
    "-NoExit",
    "-Command",
    "cd `"$scriptDir`"; .\\.venv\\Scripts\\Activate.ps1; python mock_service.py"
)

Start-Sleep -Seconds 1

# Start gateway window
Start-Process -FilePath "powershell.exe" -ArgumentList @(
    "-NoExit",
    "-Command",
    "cd `"$scriptDir`"; .\\.venv\\Scripts\\Activate.ps1; python main.py"
)
