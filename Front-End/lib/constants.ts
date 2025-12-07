/**
 * ViperQB Frontend Constants
 */

export const MODULES = [
  "Overview",
  "Files",
  "KYC",
  "Audit",
  "Workflows",
  "Policy",
  "Plugins",
  "IoT",
  "Metrics",
  "Chat",
  "Settings",
] as const

export const PLUGIN_NAMES = [
  "Secure File Transfer",
  "KYC Verification",
  "Audit & Forensics",
  "Workflow Automation",
  "IoT Access Control",
  "Policy Management",
  "Secure Vault",
  "Chatbot Assistant",
  "SSO Integration",
  "Metrics & Monitoring",
] as const

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    ME: "/auth/me",
    REFRESH: "/auth/refresh",
  },
  METRICS: {
    USAGE: "/metrics/usage",
    REQUESTS: "/metrics/requests",
    LATENCY: "/metrics/latency",
  },
  PLUGINS: {
    LIST: "/plugins",
    UPDATE: "/plugins/{id}",
  },
  SFT: {
    UPLOAD: "/sft/upload",
    DOWNLOAD: "/sft/download/{id}",
    METADATA: "/sft/metadata/{id}",
  },
  KYC: {
    START: "/kyc/start",
    SESSIONS: "/kyc/sessions",
    APPROVE: "/kyc/{id}/approve",
    REJECT: "/kyc/{id}/reject",
  },
  FORENSICS: {
    QUERY: "/forensics/query",
    EXPORT: "/forensics/export",
  },
  IOT: {
    DEVICES: "/iot/devices",
    ACTION: "/iot/device/{id}/action",
  },
  CHAT: {
    MESSAGE: "/chat/message",
    ACTION: "/chat/action/{id}/execute",
  },
} as const

export const COLORS = {
  PRIMARY_DARK: "#244217",
  PRIMARY_MID: "#46852e",
  PRIMARY_LIGHT: "#83ca4d",
  WHITE: "#e9dcc7",
  BACKGROUND: "#0f1a10",
  CARD: "#1a2415",
} as const
