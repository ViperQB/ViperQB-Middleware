**Secret Vault — official ViperQb edition**

Maintained by the ViperQb team (United Kingdom)

Secret Vault is a lightweight command-line utility for securely hiding and optionally AES-encrypting files in a hidden per-user vault directory. It provides a minimal, auditable implementation suitable for personal use and small-scale workflows.

**Key points**
- Vault storage: `~/.vault` (per-user hidden directory)
- Config: encrypted master password saved in `~/.vaultcfg`
- Encryption: AES via `pyAesCrypt`; key derived from your master password using PBKDF2-HMAC-SHA256
- CLI entrypoint: `secret_vault` (registered by `setup.py`)

## Quick start

Prerequisites:
- Python 3.8+ installed
- `pip` available

Install in a virtual environment (recommended):
```powershell
cd '....'
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -e .
```

Run the program:
```powershell
secret_vault
# or directly
python secret_vault.py
```

On first run you'll be prompted to create a Master Password. That password protects the vault and is used to derive encryption keys.

## Usage overview

- Enter `1` to hide (add) a file. You will be prompted whether to encrypt it. Encrypted files are saved with a `.aes` suffix.
- Enter `2` to unhide (restore) a file by index — encrypted files will be decrypted to the current working directory.
- Enter `3` to list files stored in the vault (`.aes` suffix indicates encrypted items).
- Enter `5` to delete and reset the vault (requires master password confirmation).

## Files & storage

- Vault directory: Expanded `~/.vault` (e.g. `C:\Users\<you>\.vault` on Windows).
- Config: `~/.vaultcfg` — contains an encrypted copy of the master password.
- Encrypted items: stored as `<original_filename>.aes` inside the vault.
- Non-encrypted items: stored with their original filename inside the vault.

When restoring (unhiding) files the program writes the restored file into the directory you ran the program from (the current working directory).

## Architecture & implementation notes

- `secret_vault.py` is a small single-file implementation providing:
	- Master-password handling and storage (`~/.vaultcfg`).
	- Key derivation: PBKDF2-HMAC-SHA256 with a salt and 100,000 iterations.
	- Encryption/decryption: `pyAesCrypt` for AES file encryption with a streaming buffer.
	- Simple file operations for copying, listing, and removing files.

- Design rationale:
	- Minimal dependency footprint for portability.
	- Explicit option to encrypt or store plaintext — gives control to the user.

## Security considerations

- The master password is used to derive the encryption key. Keep it secret and choose a strong passphrase.
- PBKDF2 iterations are set to 100,000 in this implementation — sufficient for many use cases but you may increase iterations for stronger protection (at the cost of CPU time).
- The salt is fixed in the original implementation; for stronger security consider using a random salt stored alongside the config.
- Encrypted files (`.aes`) are binary — do not treat them as text. Decryption requires the same master password used when encrypting.

## Troubleshooting & common checks

- Vault path: on Windows, check `C:\Users\<you>\.vault` or from PowerShell:
	```powershell
	Get-ChildItem -LiteralPath "$env:USERPROFILE\.vault" -Force
	```
- Check whether a file inside vault is encrypted: encrypted entries end with `.aes`.
- If a file fails to hide/unhide, ensure you ran the script with a working Python environment and that required packages (`cryptography`, `pyAesCrypt`) are installed.

## Contributing

This repository is maintained by the ViperQb team. Contributions are welcome via pull requests. Please:

- Fork the repository.
- Open a branch for your change and include tests or clear repro steps.
- Submit a PR describing the change and the rationale.

## License

This project is distributed under the MIT License. See the `LICENSE` file for details.

## Contact

ViperQb Team 
Support: podyokira@gmail.com

