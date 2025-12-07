<#
Starts the mock backend service in a new PowerShell window.
If a virtual environment doesn't exist, this script will create one and install requirements.
#>
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir

if (-not (Test-Path .venv)) {
    python -m venv .venv
}

. .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Open a new PowerShell window and run the mock service
Start-Process -FilePath "powershell.exe" -ArgumentList @(
    "-NoExit",
    "-Command",
    "cd `"$scriptDir`"; .\\.venv\\Scripts\\Activate.ps1; python mock_service.py"
)
