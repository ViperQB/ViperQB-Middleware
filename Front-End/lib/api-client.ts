/**
 * ============================================================================
 * API CLIENT FOR VIPERQB BACKEND
 * ============================================================================
 * 
 * ⚠️ BACKEND INTEGRATION POINT ⚠️
 * 
 * This file handles all API communication with the backend.
 * The backend team has already implemented the API endpoints.
 * 
 * TO CONNECT THE BACKEND:
 * 1. Set the NEXT_PUBLIC_API_BASE_URL environment variable in .env.local:
 *    NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com
 * 
 * 2. Update the auth token handling (line 31) - currently using placeholder
 *    Replace with your actual auth token from session/cookie
 * 
 * 3. All endpoints are already defined in lib/constants.ts (API_ENDPOINTS)
 * 
 * BACKEND ENDPOINTS TO CONNECT:
 * - POST /api/v1/auth/login          → Login authentication
 * - GET  /api/v1/auth/me             → Get current user
 * - GET  /api/v1/auth/refresh        → Refresh auth token
 * - GET  /api/v1/metrics/usage       → Usage statistics
 * - GET  /api/v1/metrics/requests    → Request metrics
 * - GET  /api/v1/metrics/latency      → Latency metrics
 * - GET  /api/v1/plugins             → List all plugins
 * - PATCH /api/v1/plugins/{id}      → Update plugin status
 * - POST /api/v1/sft/upload         → Upload secure file
 * - GET  /api/v1/sft/download/{id}   → Download file
 * - GET  /api/v1/sft/metadata/{id}   → Get file metadata
 * - POST /api/v1/kyc/start           → Start KYC session
 * - GET  /api/v1/kyc/sessions        → List KYC sessions
 * - POST /api/v1/kyc/{id}/approve    → Approve KYC
 * - POST /api/v1/kyc/{id}/reject     → Reject KYC
 * - POST /api/v1/forensics/query     → Query audit logs
 * - POST /api/v1/forensics/export    → Export audit logs
 * - GET  /api/v1/iot/devices         → List IoT devices
 * - POST /api/v1/iot/device/{id}/action → Control IoT device
 * - POST /api/v1/chat/message        → Send chat message
 * - POST /api/v1/chat/action/{id}/execute → Execute chat action
 * 
 * ============================================================================
 */

export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export const apiClient = {
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<APIResponse<T>> {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"}/api/v1${endpoint}`

      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          // ⚠️ BACKEND INTEGRATION: Add auth token from session/cookie
          // Example: "Authorization": `Bearer ${getAuthToken()}` or `Cookie: ${getCookie('token')}`
          // Replace this with your actual authentication mechanism
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      console.error("[v0] API Error:", error)
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
    }
  },

  async get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "GET" })
  },

  async post<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, { method: "POST", body: JSON.stringify(body) })
  },

  async patch<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, { method: "PATCH", body: JSON.stringify(body) })
  },

  async delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "DELETE" })
  },
}
