# ViperQB Smart Contract - Command Line Examples

## Basic Token Operations

### 1. IssueAsset
**Description:** Issue new ViperQB tokens (Super Admin only)
```bash
qubic-cli call ViperQB IssueAsset --numberOfShares 1000000000 --unitOfMeasurement 1 --numberOfDecimalPlaces 8 --amount 0
```

### 2. TransferToken
**Description:** Transfer ViperQB tokens to another address
```bash
qubic-cli call ViperQB TransferToken --assetName 11824728374629182 --issuer YOUR_ISSUER_ADDRESS --amount 1000000 --recipient RECIPIENT_ADDRESS --amount 0
```

### 3. BurnToken
**Description:** Burn ViperQB tokens to reduce supply
```bash
qubic-cli call ViperQB BurnToken --assetName 11824728374629182 --issuer YOUR_ISSUER_ADDRESS --amount 500000 --amount 0
```

## User Management (Whitelist & Roles)

### 4. AddToWhitelist
**Description:** Add a user to the whitelist (Admin/Super Admin only)
```bash
qubic-cli call ViperQB AddToWhitelist --userAddress USER_ADDRESS --role 1 --organizationId 0 --amount 0
```
**Roles:** 0=NONE, 1=USER, 2=ADMIN, 3=SUPER_ADMIN

### 5. RemoveFromWhitelist
**Description:** Remove a user from the whitelist (Admin/Super Admin only)
```bash
qubic-cli call ViperQB RemoveFromWhitelist --userAddress USER_ADDRESS --amount 0
```

### 6. SetUserRole
**Description:** Change a user's role (Super Admin only)
```bash
qubic-cli call ViperQB SetUserRole --userAddress USER_ADDRESS --newRole 2 --amount 0
```
**Roles:** 0=NONE, 1=USER, 2=ADMIN, 3=SUPER_ADMIN

## Secure File Transfer Validator

### 7. RegisterFile
**Description:** Register a file with hash and ID (Admin/Super Admin only)
```bash
qubic-cli call ViperQB RegisterFile --fileHash FILE_HASH_32_BYTES --fileId "file123" --fileIdLength 8 --organizationId 0 --amount 0
```

### 8. ValidateFileTransfer
**Description:** Validate file transfer and check access permissions
```bash
qubic-cli call ViperQB ValidateFileTransfer --fileHash FILE_HASH_32_BYTES --fileId "file123" --fileIdLength 8 --amount 100
```
**Note:** Amount should cover the file transfer fee (100 QU base, multiplied by organization tier)

## Authentication

### 9. Authenticate
**Description:** Authenticate using wallet address
```bash
qubic-cli call ViperQB Authenticate --amount 50
```
**Note:** Amount should cover authentication fee (50 QU base, multiplied by organization tier)

## Audit Logs

### 10. CreateAuditLog
**Description:** Create an audit log entry with cryptographic hash
```bash
qubic-cli call ViperQB CreateAuditLog --eventType 1 --target TARGET_ADDRESS --eventData "EVENT_DATA_BYTES" --amount 25
```
**Note:** Amount should cover audit log fee (25 QU base, multiplied by organization tier)

### 11. VerifyAuditLog
**Description:** Verify audit log authenticity (FUNCTION - read-only)
```bash
qubic-cli query ViperQB VerifyAuditLog --eventHash EVENT_HASH --logIndex 0
```

## Access Control and Policy Engine

### 12. CreatePolicy
**Description:** Create a new policy (Admin/Super Admin only)
```bash
qubic-cli call ViperQB CreatePolicy --organizationId 0 --policyData "POLICY_RULES_BYTES" --amount 500
```
**Note:** Amount should cover policy creation fee (500 QU base, multiplied by organization tier)

### 13. CheckPolicy
**Description:** Check if a user/action is allowed based on policy (FUNCTION - read-only)
```bash
qubic-cli query ViperQB CheckPolicy --policyId 0 --userAddress USER_ADDRESS --actionType 1
```

## Secure Secret Vault

### 14. StoreInVault
**Description:** Store file ownership record in vault
```bash
qubic-cli call ViperQB StoreInVault --fileHash FILE_HASH_32_BYTES --organizationId 0 --amount 200
```
**Note:** Amount should cover vault storage fee (200 QU base, multiplied by organization tier)

### 15. VerifyVaultOwnership
**Description:** Verify file ownership using wallet address and proof (FUNCTION - read-only)
```bash
qubic-cli query ViperQB VerifyVaultOwnership --fileHash FILE_HASH_32_BYTES --ownerAddress OWNER_ADDRESS --ownershipProof OWNERSHIP_PROOF_HASH --vaultIndex 0
```

## Organization Management

### 16. CreateOrganization
**Description:** Create a new organization (Super Admin only)
```bash
qubic-cli call ViperQB CreateOrganization --tier 2 --baseFee 1000 --amount 1000
```
**Tiers:** 1=BASIC, 2=STANDARD, 3=PREMIUM, 4=ENTERPRISE
**Note:** Amount should be at least 1000 QU (VIPERQB_ORG_CREATE_FEE)

### 17. GetOrganizationCharges
**Description:** Get total charges and transaction count for an organization (FUNCTION - read-only)
```bash
qubic-cli query ViperQB GetOrganizationCharges --organizationId 0
```

---

## Notes:

1. **Address Format:** All addresses should be in Qubic address format (55 characters, base26 encoded)

2. **Hash Format:** File hashes and ownership proofs are 32-byte values (256 bits), typically represented as hex strings or base26 encoded IDs

3. **Amount Parameter:** The `--amount` parameter is the QU (Qubic Units) sent with the transaction. For procedures that charge fees, ensure you send enough to cover the fee. Excess will be refunded.

4. **Fee Multipliers by Tier:**
   - BASIC (1): 1.0x
   - STANDARD (2): 1.5x
   - PREMIUM (3): 2.0x
   - ENTERPRISE (4): 3.0x

5. **Base Fees:**
   - File Transfer: 100 QU
   - Authentication: 50 QU
   - Audit Log: 25 QU
   - Policy Creation: 500 QU
   - Vault Storage: 200 QU
   - Organization Creation: 1000 QU

6. **Array Parameters:** For parameters like `fileId` and `eventData`, you may need to pass them as hex strings or base64 encoded bytes depending on your CLI tool.

7. **FUNCTION vs PROCEDURE:** 
   - FUNCTIONS (query) are read-only and don't modify state
   - PROCEDURES (call) modify contract state and may charge fees

