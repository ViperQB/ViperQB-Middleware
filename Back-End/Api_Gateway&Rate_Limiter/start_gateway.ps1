<#
Starts the API gateway in a new PowerShell window.
This will create a venv and install requirements if needed.
#>
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir

if (-not (Test-Path .venv)) {
    python -m venv .venv
}

. .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Open a new PowerShell window and run the gateway
Start-Process -FilePath "powershell.exe" -ArgumentList @(
    "-NoExit",
    "-Command",
    "cd `"$scriptDir`"; .\\.venv\\Scripts\\Activate.ps1; python main.py"
)
