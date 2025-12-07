# 🔌 API Integration Guide for Frontend Team

## Overview
This document outlines all the places where you need to connect the frontend to the backend API. The backend team has already completed their work, so you just need to link the frontend components to the API endpoints.

---

## 📋 Table of Contents
1. [Environment Setup](#environment-setup)
2. [Authentication Integration](#authentication-integration)
3. [Dashboard Pages - API Integration Points](#dashboard-pages---api-integration-points)
4. [API Client Configuration](#api-client-configuration)
5. [Testing Checklist](#testing-checklist)

---

## 🔧 Environment Setup

### Step 1: Create `.env.local` file
Create a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api-url.com
# Or for local development:
# NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

### Step 2: Update API Client
The API client is located at `lib/api-client.ts`. You need to:

1. **Add Authentication Token Handling** (Line ~31)
   - Currently: `// TODO: Add auth token from session`
   - Replace with your auth mechanism:
     ```typescript
     "Authorization": `Bearer ${getAuthToken()}`
     // OR if using cookies:
     // Cookie: token=${getCookie('token')}
     ```

---

## 🔐 Authentication Integration

### Files to Update:

#### 1. `components/auth/login-form.tsx`
**What to do:**
- Connect the login form to `POST /api/v1/auth/login`
- Store the auth token in session/cookie after successful login
- Redirect to dashboard on success

**API Endpoint:** `POST /api/v1/auth/login`
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt-token-here",
    "user": { ... }
  }
}
```

#### 2. `app/dashboard/layout.tsx`
**What to do:**
- Add auth check using `GET /api/v1/auth/me`
- Redirect to `/login` if not authenticated
- Pass user data to dashboard components

**API Endpoint:** `GET /api/v1/auth/me`
**Headers:** `Authorization: Bearer <token>`

---

## 📊 Dashboard Pages - API Integration Points

### 1. Dashboard Overview (`app/dashboard/page.tsx`)

**Widgets to connect:**

#### Widget: Usage Stats (`components/dashboard/widgets/widget-usage-stats.tsx`)
- **API:** `GET /api/v1/metrics/usage`
- **What to fill:** Replace mock data with API response
- **Data structure:**
  ```typescript
  {
    totalRequests: number,
    activeUsers: number,
    storageUsed: number,
    storageLimit: number
  }
  ```

#### Widget: Request Rate (`components/dashboard/widgets/widget-request-rate.tsx`)
- **API:** `GET /api/v1/metrics/requests`
- **What to fill:** Replace mock data with API response
- **Data structure:** Array of request data points for chart

#### Widget: Recent Transactions (`components/dashboard/widgets/widget-recent-txs.tsx`)
- **API:** `GET /api/v1/forensics/query?limit=10`
- **What to fill:** Replace mock data with API response

#### Widget: Active Plugins (`components/dashboard/widgets/widget-active-plugins.tsx`)
- **API:** `GET /api/v1/plugins`
- **What to fill:** Filter enabled plugins from API response

---

### 2. Files Page (`app/dashboard/files/page.tsx`)

**What to connect:**
- **List Files:** `GET /api/v1/sft/metadata` (or similar endpoint)
- **Upload File:** `POST /api/v1/sft/upload`
- **Download File:** `GET /api/v1/sft/download/{id}`
- **Delete/Revoke:** `DELETE /api/v1/sft/{id}` (or similar)

**API Endpoints:**
- `POST /api/v1/sft/upload` - Upload file
  - **Request:** FormData with file
  - **Response:** File metadata with ID
  
- `GET /api/v1/sft/download/{id}` - Download file
  - **Headers:** Authorization token required
  
- `GET /api/v1/sft/metadata/{id}` - Get file info

**What to fill:**
- Replace `mockTransfers` array with API data
- Connect upload button to API
- Connect download/revoke buttons to API

---

### 3. KYC Page (`app/dashboard/kyc/page.tsx`)

**What to connect:**
- **List Sessions:** `GET /api/v1/kyc/sessions`
- **Start Session:** `POST /api/v1/kyc/start`
- **Approve:** `POST /api/v1/kyc/{id}/approve`
- **Reject:** `POST /api/v1/kyc/{id}/reject`

**API Endpoints:**
- `GET /api/v1/kyc/sessions` - List all KYC sessions
- `POST /api/v1/kyc/start` - Start new KYC session
  - **Request Body:**
    ```json
    {
      "userId": "string",
      "type": "individual" | "business"
    }
    ```
- `POST /api/v1/kyc/{id}/approve` - Approve KYC
- `POST /api/v1/kyc/{id}/reject` - Reject KYC

**What to fill:**
- Replace `mockSessions` array with API data
- Connect approve/reject buttons to API
- Connect "Start New Session" button to API

---

### 4. Audit Page (`app/dashboard/audit/page.tsx`)

**What to connect:**
- **Query Logs:** `POST /api/v1/forensics/query`
- **Export Logs:** `POST /api/v1/forensics/export`

**API Endpoints:**
- `POST /api/v1/forensics/query` - Query audit logs
  - **Request Body:**
    ```json
    {
      "filters": {
        "userId": "string",
        "action": "string",
        "dateFrom": "ISO date",
        "dateTo": "ISO date"
      },
      "limit": 100,
      "offset": 0
    }
    ```
- `POST /api/v1/forensics/export` - Export logs
  - **Request Body:** Same as query
  - **Response:** File download or export ID

**What to fill:**
- Replace `mockLogs` array with API query results
- Connect search/filter functionality to API
- Connect export button to API

---

### 5. Workflows Page (`app/dashboard/workflows/page.tsx`)

**What to connect:**
- **List Workflows:** Check if backend has workflow endpoints
- **Create/Update/Delete Workflows:** Connect to appropriate endpoints

**Note:** Confirm with backend team if workflow endpoints exist. If not, these may be handled client-side.

---

### 6. Policy Page (`app/dashboard/policy/page.tsx`)

**What to connect:**
- **List Policies:** Check if backend has policy endpoints
- **Create/Update/Delete Policies:** Connect to appropriate endpoints

**Note:** Confirm with backend team if policy endpoints exist.

---

### 7. Plugins Page (`app/dashboard/plugins/page.tsx`)

**What to connect:**
- **List Plugins:** `GET /api/v1/plugins`
- **Update Plugin:** `PATCH /api/v1/plugins/{id}`

**API Endpoints:**
- `GET /api/v1/plugins` - List all plugins
  - **Response:**
    ```json
    [
      {
        "id": "string",
        "name": "string",
        "enabled": boolean,
        "plan": "bronze" | "silver" | "gold"
      }
    ]
    ```
- `PATCH /api/v1/plugins/{id}` - Enable/disable plugin
  - **Request Body:**
    ```json
    {
      "enabled": true
    }
    ```

**What to fill:**
- Replace `mockPlugins` array with API data
- Connect toggle switches to API

---

### 8. IoT Page (`app/dashboard/iot/page.tsx`)

**What to connect:**
- **List Devices:** `GET /api/v1/iot/devices`
- **Control Device:** `POST /api/v1/iot/device/{id}/action`

**API Endpoints:**
- `GET /api/v1/iot/devices` - List all IoT devices
- `POST /api/v1/iot/device/{id}/action` - Control device
  - **Request Body:**
    ```json
    {
      "action": "unlock" | "lock" | "enable" | "disable",
      "params": {}
    }
    ```

**What to fill:**
- Replace `mockDevices` array with API data
- Connect action buttons to API

---

### 9. Metrics Page (`app/dashboard/metrics/page.tsx`)

**What to connect:**
- **Usage Metrics:** `GET /api/v1/metrics/usage`
- **Request Metrics:** `GET /api/v1/metrics/requests`
- **Latency Metrics:** `GET /api/v1/metrics/latency`

**API Endpoints:**
- `GET /api/v1/metrics/usage` - Overall usage stats
- `GET /api/v1/metrics/requests` - Request rate data (for charts)
- `GET /api/v1/metrics/latency` - Latency data (for charts)

**What to fill:**
- Replace all chart data with API responses
- Connect date range filters to API queries

---

### 10. Chat Page (`app/dashboard/chat/page.tsx`)

**What to connect:**
- **Send Message:** `POST /api/v1/chat/message`
- **Execute Action:** `POST /api/v1/chat/action/{id}/execute`

**API Endpoints:**
- `POST /api/v1/chat/message` - Send chat message
  - **Request Body:**
    ```json
    {
      "message": "string",
      "context": {}
    }
    ```
  - **Response:**
    ```json
    {
      "response": "string",
      "actions": [{ "id": "string", "type": "string", ... }]
    }
    ```
- `POST /api/v1/chat/action/{id}/execute` - Execute suggested action

**What to fill:**
- Connect message input to API
- Connect action buttons to API
- Handle real-time updates (if backend supports WebSocket)

---

### 11. Settings Page (`app/dashboard/settings/page.tsx`)

**What to connect:**
- **User Settings:** `PATCH /api/v1/auth/me` (or similar)
- **Webhooks:** Check if backend has webhook endpoints
- **API Keys:** Check if backend has API key endpoints

**Note:** Confirm with backend team what settings endpoints are available.

---

## 🔧 API Client Configuration

### File: `lib/api-client.ts`

**Current Status:**
- ✅ Basic structure is ready
- ✅ All HTTP methods (GET, POST, PATCH, DELETE) implemented
- ⚠️ **NEEDS:** Auth token handling

**What to do:**
1. Add auth token retrieval function
2. Add token refresh logic
3. Add error handling for 401 (unauthorized) responses
4. Add retry logic if needed

**Example Implementation:**
```typescript
// Add this function to get auth token
function getAuthToken(): string | null {
  // Option 1: From localStorage
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  
  // Option 2: From cookie
  // return getCookie('auth_token')
  
  // Option 3: From session storage
  // return sessionStorage.getItem('auth_token')
  
  return null
}

// Update request method to include token
headers: {
  "Content-Type": "application/json",
  ...(getAuthToken() && { "Authorization": `Bearer ${getAuthToken()}` }),
  ...options.headers,
}
```

---

## ✅ Testing Checklist

After connecting each endpoint, test:

- [ ] **Authentication**
  - [ ] Login works and stores token
  - [ ] Protected routes redirect to login
  - [ ] Token refresh works
  - [ ] Logout clears token

- [ ] **Dashboard Overview**
  - [ ] All widgets load data from API
  - [ ] Data updates correctly
  - [ ] Error states handled gracefully

- [ ] **Files Page**
  - [ ] File list loads from API
  - [ ] Upload works
  - [ ] Download works
  - [ ] Delete/revoke works

- [ ] **KYC Page**
  - [ ] Session list loads
  - [ ] Start session works
  - [ ] Approve/reject works

- [ ] **Audit Page**
  - [ ] Query works with filters
  - [ ] Export works
  - [ ] Pagination works

- [ ] **Plugins Page**
  - [ ] Plugin list loads
  - [ ] Toggle enable/disable works

- [ ] **IoT Page**
  - [ ] Device list loads
  - [ ] Device actions work

- [ ] **Metrics Page**
  - [ ] All charts load data
  - [ ] Date filters work

- [ ] **Chat Page**
  - [ ] Messages send/receive
  - [ ] Actions execute

- [ ] **Error Handling**
  - [ ] Network errors handled
  - [ ] 401 errors redirect to login
  - [ ] 404/500 errors show user-friendly messages
  - [ ] Loading states shown

---

## 📝 Constants File

**File:** `lib/constants.ts`

All API endpoints are already defined in `API_ENDPOINTS` constant. Use these constants instead of hardcoding URLs:

```typescript
import { API_ENDPOINTS } from '@/lib/constants'
import { apiClient } from '@/lib/api-client'

// Example usage:
const response = await apiClient.get(API_ENDPOINTS.METRICS.USAGE)
```

---

## 🆘 Need Help?

If you encounter issues:

1. **Check API Documentation:** Ask backend team for API documentation/Swagger
2. **Check Network Tab:** Use browser DevTools to see actual API requests/responses
3. **Check Console:** Look for error messages in browser console
4. **Test with Postman/curl:** Verify endpoints work before integrating

---

## 📌 Quick Reference

**API Base URL:** Set in `.env.local` as `NEXT_PUBLIC_API_BASE_URL`

**All Endpoints:** Defined in `lib/constants.ts` → `API_ENDPOINTS`

**API Client:** `lib/api-client.ts` - Use `apiClient.get()`, `apiClient.post()`, etc.

**Auth Token:** Add to headers in `api-client.ts` request method

---

**Last Updated:** 2025-01-XX
**Frontend Team Contact:** [Your Contact Info]
**Backend Team Contact:** [Backend Team Contact Info]

