const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const baseFees = {
  FileTransfer: 100,
  Authentication: 50,
  AuditLog: 25,
  PolicyCreation: 500,
  VaultStorage: 200,
  OrganizationCreation: 1000
};

const feeMultiplierForTier = (tier) => {
  switch (Number(tier)) {
    case 1: return 1.0;
    case 2: return 1.5;
    case 3: return 2.0;
    case 4: return 3.0;
    default: return 1.0;
  }
};

const commands = {
  IssueAsset: { type: 'call', required: ['numberOfShares','unitOfMeasurement','numberOfDecimalPlaces'] },
  TransferToken: { type: 'call', required: ['assetName','recipient','amount'] },
  BurnToken: { type: 'call', required: ['assetName','amount'] },
  AddToWhitelist: { type: 'call', required: ['userAddress','role'] },
  RemoveFromWhitelist: { type: 'call', required: ['userAddress'] },
  SetUserRole: { type: 'call', required: ['userAddress','newRole'] },
  RegisterFile: { type: 'call', required: ['fileHash','fileId','fileIdLength'] },
  ValidateFileTransfer: { type: 'call', required: ['fileHash','fileId','fileIdLength'] , fee:'FileTransfer'},
  Authenticate: { type: 'call', required: [], fee:'Authentication' },
  CreateAuditLog: { type: 'call', required: ['eventType','target','eventData'], fee:'AuditLog' },
  VerifyAuditLog: { type: 'query', required: ['eventHash','logIndex'] },
  CreatePolicy: { type: 'call', required: ['organizationId','policyData'], fee:'PolicyCreation' },
  CheckPolicy: { type: 'query', required: ['policyId','userAddress','actionType'] },
  StoreInVault: { type: 'call', required: ['fileHash','organizationId'], fee:'VaultStorage' },
  VerifyVaultOwnership: { type: 'query', required: ['fileHash','ownerAddress','ownershipProof','vaultIndex'] },
  CreateOrganization: { type: 'call', required: ['tier','baseFee'], fee:'OrganizationCreation' },
  GetOrganizationCharges: { type: 'query', required: ['organizationId'] }
};

function envInfo() {
  return {
    nodeUrl: process.env.QUBIC_NODE_URL || 'https://qubic-node.example',
    walletAddress: process.env.QUBIC_WALLET_ADDRESS || 'YOUR_WALLET_ADDRESS_FROM_ENV',
    issuerAddress: process.env.QUBIC_ISSUER_ADDRESS || 'YOUR_ISSUER_ADDRESS_FROM_ENV',
    defaultOrganizationId: process.env.DEFAULT_ORGANIZATION_ID || '0',
    defaultTier: process.env.DEFAULT_ORG_TIER || '1'
  };
}

function buildQubicCliString(command, args, env) {
  const parts = ['qubic-cli', 'call', 'ViperQB', command];
  Object.keys(args).forEach(k => {
    const v = args[k];
    if (v === undefined || v === null) return;
    parts.push(`--${k}`);
    parts.push(String(v));
  });
  // attach issuer if available
  if (env.issuerAddress) {
    parts.push('--issuer');
    parts.push(env.issuerAddress);
  }
  return parts.join(' ');
}

app.get('/api/commands', (req, res) => {
  return res.json({ availableCommands: Object.keys(commands) });
});

app.post('/api/call/:command', (req, res) => {
  const cmd = req.params.command;
  const meta = commands[cmd];
  if (!meta) return res.status(404).json({ error: 'Unknown command' });
  if (meta.type !== 'call') return res.status(400).json({ error: 'Command is not a procedural call' });

  const env = envInfo();
  const payload = req.body || {};

  // validate required params
  const missing = [];
  (meta.required || []).forEach(p => { if (!(p in payload)) missing.push(p); });
  if (missing.length) return res.status(400).json({ error: 'Missing parameters', missing });

  // determine organization tier (for fees)
  const orgTier = payload.organizationTier || payload.tier || process.env.DEFAULT_ORG_TIER || env.defaultTier;
  let calculatedAmount = null;
  if (meta.fee) {
    const base = baseFees[meta.fee] || 0;
    calculatedAmount = base * feeMultiplierForTier(orgTier);
  }

  // build simulated qubic-cli representation
  const cli = buildQubicCliString(cmd, payload, env);

  const result = {
    simulated: true,
    command: cmd,
    type: 'call',
    env: env,
    params: payload,
    qubicCli: cli,
    calculatedAmount
  };

  return res.json(result);
});

app.get('/api/query/:command', (req, res) => {
  const cmd = req.params.command;
  const meta = commands[cmd];
  if (!meta) return res.status(404).json({ error: 'Unknown command' });
  if (meta.type !== 'query') return res.status(400).json({ error: 'Command is not a query' });

  const env = envInfo();
  const params = req.query || {};

  const missing = [];
  (meta.required || []).forEach(p => { if (!(p in params)) missing.push(p); });
  if (missing.length) return res.status(400).json({ error: 'Missing parameters', missing });

  // build simulated query CLI string (using -- instead of call)
  const parts = ['qubic-cli', 'query', 'ViperQB', cmd];
  Object.keys(params).forEach(k => { parts.push(`--${k}`); parts.push(String(params[k])); });
  const cli = parts.join(' ');

  return res.json({ simulated: true, command: cmd, type: 'query', env, params, qubicCli: cli });
});

app.listen(PORT, () => {
  console.log(`ViperQB API listening on port ${PORT}`);
});
