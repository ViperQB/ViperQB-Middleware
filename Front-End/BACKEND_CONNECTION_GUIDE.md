# 🔌 Backend Connection Guide - Step by Step

This guide will help you connect your ViperQB frontend to your backend API.

---

## 📋 Prerequisites

- Backend API is running and accessible
- Backend API URL (e.g., `https://api.viperqb.com` or `http://localhost:3001`)
- API authentication method (Bearer token, API key, etc.)

---

## Step 1: Set Environment Variables

### For Local Development

Create a `.env.local` file in your project root:

```env
# Backend API Base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Optional: If your backend uses a different base path
# NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/v1
```

### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add the following:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | `https://your-backend-api.com` | Production, Preview, Development |

**Important:** Variables starting with `NEXT_PUBLIC_` are exposed to the browser.

---

## Step 2: Update API Client Authentication

Open `lib/api-client.ts` and update the authentication:

### Option A: Bearer Token (JWT)

```typescript
// lib/api-client.ts

// Add this function to get auth token
function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    // Option 1: From localStorage
    return localStorage.getItem("auth_token")
    
    // Option 2: From sessionStorage
    // return sessionStorage.getItem("auth_token")
    
    // Option 3: From cookie (requires js-cookie package)
    // import Cookies from 'js-cookie'
    // return Cookies.get('auth_token')
  }
  return null
}

// Update the request method (around line 31)
const response = await fetch(url, {
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...(getAuthToken() && { "Authorization": `Bearer ${getAuthToken()}` }),
    ...options.headers,
  },
})
```

### Option B: API Key

```typescript
// Update the request method
const response = await fetch(url, {
  ...options,
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": process.env.NEXT_PUBLIC_API_KEY || "",
    ...options.headers,
  },
})
```

### Option C: Cookie-Based Auth

```typescript
// Update the request method
const response = await fetch(url, {
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers,
  },
  credentials: "include", // Important for cookies
})
```

---

## Step 3: Update Login Form

Open `components/auth/login-form.tsx` and connect to your backend:

```typescript
// components/auth/login-form.tsx

import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/lib/constants"

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")
  setLoading(true)

  try {
    // Call your backend login endpoint
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    })

    if (response.success && response.data) {
      // Store auth token
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))
      }
      
      // Redirect to dashboard
      router.push("/dashboard")
    } else {
      setError(response.error || "Login failed. Please check your credentials.")
    }
  } catch (err) {
    setError("Network error. Please try again.")
    console.error("Login error:", err)
  } finally {
    setLoading(false)
  }
}
```

---

## Step 4: Update Dashboard Layout (Auth Check)

Open `app/dashboard/layout.tsx` and add authentication check:

```typescript
// app/dashboard/layout.tsx

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/lib/constants"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      // Check if token exists
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("auth_token")
        if (!token) {
          router.push("/login")
          return
        }

        // Verify token with backend
        try {
          const response = await apiClient.get(API_ENDPOINTS.AUTH.ME)
          if (response.success) {
            setIsAuthenticated(true)
          } else {
            // Token invalid, redirect to login
            localStorage.removeItem("auth_token")
            router.push("/login")
          }
        } catch (error) {
          router.push("/login")
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <DashboardLayout>{children}</DashboardLayout>
}
```

---

## Step 5: Connect Dashboard Pages to API

### Files Page Example

```typescript
// app/dashboard/files/page.tsx

import { useEffect, useState } from "react"
import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/lib/constants"

export default function FilesPage() {
  const [transfers, setTransfers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransfers()
  }, [])

  const fetchTransfers = async () => {
    try {
      // Replace with your actual endpoint
      const response = await apiClient.get("/sft/files") // or your endpoint
      if (response.success) {
        setTransfers(response.data)
      }
    } catch (error) {
      console.error("Error fetching transfers:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await apiClient.post(API_ENDPOINTS.SFT.UPLOAD, formData, {
        headers: {
          // Don't set Content-Type, browser will set it with boundary
        },
      })

      if (response.success) {
        // Refresh the list
        fetchTransfers()
      }
    } catch (error) {
      console.error("Upload error:", error)
    }
  }

  // ... rest of component
}
```

### KYC Page Example

```typescript
// app/dashboard/kyc/page.tsx

const handleApprove = async (id: number) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.KYC.APPROVE.replace("{id}", id.toString()), {})
    
    if (response.success) {
      // Update local state
      setKycSessionsState(
        kycSessionsState.map((session) =>
          session.id === id
            ? { ...session, status: "approved", txHash: response.data.txHash }
            : session
        )
      )
      alert("KYC session approved successfully!")
    } else {
      alert("Failed to approve: " + response.error)
    }
  } catch (error) {
    console.error("Approve error:", error)
    alert("Network error. Please try again.")
  }
}
```

---

## Step 6: Handle API Errors

Update `lib/api-client.ts` to handle errors better:

```typescript
// lib/api-client.ts

export const apiClient = {
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<APIResponse<T>> {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"}/api/v1${endpoint}`

      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(getAuthToken() && { "Authorization": `Bearer ${getAuthToken()}` }),
          ...options.headers,
        },
      })

      // Handle 401 Unauthorized
      if (response.status === 401) {
        // Clear auth token
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token")
          window.location.href = "/login"
        }
        return { success: false, error: "Unauthorized. Please login again." }
      }

      // Handle other errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `API Error: ${response.statusText}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      console.error("[API] Error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  },
  // ... rest of methods
}
```

---

## Step 7: Test the Connection

### Test Script

Create a test file `test-api.ts` (temporary):

```typescript
// test-api.ts (delete after testing)

import { apiClient } from "./lib/api-client"

async function testConnection() {
  console.log("Testing API connection...")
  
  // Test 1: Check if API is reachable
  const healthCheck = await apiClient.get("/health")
  console.log("Health check:", healthCheck)

  // Test 2: Try login
  const login = await apiClient.post("/auth/login", {
    email: "test@example.com",
    password: "test123",
  })
  console.log("Login test:", login)

  // Test 3: Get user info (if logged in)
  const user = await apiClient.get("/auth/me")
  console.log("User info:", user)
}

testConnection()
```

---

## Step 8: Common Backend Endpoints

Based on your `lib/constants.ts`, here are the endpoints you need to connect:

### Authentication
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/refresh` - Refresh token

### File Transfer
- `POST /api/v1/sft/upload` - Upload file
- `GET /api/v1/sft/download/{id}` - Download file
- `GET /api/v1/sft/metadata/{id}` - Get file info

### KYC
- `POST /api/v1/kyc/start` - Start KYC session
- `GET /api/v1/kyc/sessions` - List sessions
- `POST /api/v1/kyc/{id}/approve` - Approve KYC
- `POST /api/v1/kyc/{id}/reject` - Reject KYC

### Audit & Forensics
- `POST /api/v1/forensics/query` - Query logs
- `POST /api/v1/forensics/export` - Export logs

### IoT
- `GET /api/v1/iot/devices` - List devices
- `POST /api/v1/iot/device/{id}/action` - Control device

### Metrics
- `GET /api/v1/metrics/usage` - Usage stats
- `GET /api/v1/metrics/requests` - Request metrics
- `GET /api/v1/metrics/latency` - Latency metrics

### Plugins
- `GET /api/v1/plugins` - List plugins
- `PATCH /api/v1/plugins/{id}` - Update plugin

### Chat
- `POST /api/v1/chat/message` - Send message
- `POST /api/v1/chat/action/{id}/execute` - Execute action

---

## Step 9: CORS Configuration (Backend)

Make sure your backend allows requests from your frontend:

```javascript
// Backend CORS configuration example (Node.js/Express)

const cors = require('cors')

app.use(cors({
  origin: [
    'http://localhost:3000',           // Local dev
    'https://your-vercel-app.vercel.app', // Production
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
```

---

## Step 10: Environment-Specific Configuration

### Development
```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

### Production
```env
# Vercel Environment Variables
NEXT_PUBLIC_API_BASE_URL=https://api.viperqb.com
```

---

## ✅ Testing Checklist

After connecting the backend:

- [ ] Login works and stores token
- [ ] Dashboard loads user data
- [ ] File upload works
- [ ] File download works
- [ ] KYC approve/reject works
- [ ] Audit logs load from API
- [ ] IoT devices load from API
- [ ] Metrics load from API
- [ ] Plugins load from API
- [ ] Error handling works (401 redirects to login)
- [ ] Loading states show during API calls

---

## 🐛 Troubleshooting

### Error: "Network request failed"
- Check if backend is running
- Verify `NEXT_PUBLIC_API_BASE_URL` is correct
- Check CORS settings on backend

### Error: "401 Unauthorized"
- Token might be expired
- Check if token is being sent in headers
- Verify token format (Bearer token)

### Error: "CORS policy blocked"
- Backend needs to allow your frontend origin
- Add frontend URL to CORS whitelist

### API calls work in Postman but not in browser
- Check CORS configuration
- Verify environment variables are set
- Check browser console for errors

---

## 📝 Quick Reference

**Environment Variable:**
```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com
```

**API Client Usage:**
```typescript
import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/lib/constants"

// GET request
const response = await apiClient.get(API_ENDPOINTS.METRICS.USAGE)

// POST request
const response = await apiClient.post(API_ENDPOINTS.KYC.START, {
  userId: "user_123"
})
```

**Store Auth Token:**
```typescript
localStorage.setItem("auth_token", token)
```

**Get Auth Token:**
```typescript
const token = localStorage.getItem("auth_token")
```

---

## 🆘 Need Help?

- Check `API_INTEGRATION_GUIDE.md` for detailed endpoint documentation
- Check browser console (F12) for API errors
- Check Network tab to see actual API requests
- Verify backend API is running and accessible

---

**Last Updated:** 2025-01-XX

