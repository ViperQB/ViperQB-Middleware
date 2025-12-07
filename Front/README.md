# ViperQB Middleware - Enterprise Blockchain Security

A unified blockchain middleware suite for secure file transfer, KYC verification, access control, and audit logging. Built with Next.js, Tailwind CSS, and shadcn/ui.

**[Live Demo](https://viperqb-middleware.vercel.app)** • **[v0.app Project](https://v0.app/chat/projects/7OBKdWwIbzR)**

## Overview

ViperQB provides 10 modular security plugins for enterprises requiring blockchain-verified audit trails. The platform is 5x cheaper than competitors while maintaining enterprise-grade security with AES-256 encryption, automated KYC, and real-time access control.

## Key Features

### 🔐 Core Modules

1. **Secure File Transfer** - AES-256-GCM encrypted transfers with blockchain proof
2. **KYC Verification** - Automated liveness detection and document authentication
3. **Audit & Forensics** - Complete searchable logs with blockchain hashing
4. **Workflow Automation** - Zapier-like triggers and actions
5. **Policy Management** - Role-based access control (RBAC)
6. **Plugin Ecosystem** - Enable/disable modules per tenant
7. **IoT Access Control** - Real-time device access with RFID support
8. **Metrics & Monitoring** - Real-time dashboards with alerting
9. **Secure Vault** - Encrypted secrets management
10. **Chatbot Assistant** - AI-powered automation interface

### 🎨 Frontend Architecture

\`\`\`
app/
├── page.tsx                 # Marketing homepage
├── login/page.tsx           # Authentication
├── demo/page.tsx            # Demo request form
└── dashboard/
    ├── page.tsx             # Overview dashboard
    ├── files/page.tsx       # File transfer module
    ├── kyc/page.tsx         # KYC verification
    ├── audit/page.tsx       # Forensics & logs
    ├── workflows/page.tsx   # Automation
    ├── policy/page.tsx      # Access control
    ├── plugins/page.tsx     # Module management
    ├── iot/page.tsx         # IoT devices
    ├── metrics/page.tsx     # Performance dashboard
    ├── chat/page.tsx        # AI assistant
    └── settings/page.tsx    # Billing & API keys

components/
├── viper-header.tsx         # Navigation header
├── viper-hero.tsx           # Hero section
├── features-section.tsx     # Feature showcase
├── pricing-section.tsx      # Pricing tiers
├── security-section.tsx     # Security highlights
├── footer.tsx               # Footer
├── dashboard/
│   ├── dashboard-layout.tsx
│   ├── dashboard-sidebar.tsx
│   ├── dashboard-topbar.tsx
│   └── widgets/             # Reusable dashboard widgets
└── auth/
    └── login-form.tsx

lib/
├── api-client.ts            # Backend API integration
├── constants.ts             # Endpoints & module names
└── utils.ts                 # Utility functions
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running on `http://localhost:3001`

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/viperqb/middleware.git
cd middleware

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Update backend API URL in .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Start development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Design System

### Color Palette

- **Primary Dark**: `#244217` - Deep forest green
- **Primary Mid**: `#46852e` - Medium green  
- **Primary Light/Accent**: `#83ca4d` - Bright lime green
- **Foreground**: `#e9dcc7` - Cream white
- **Background**: `#0f1a10` - Near black with green tint

### Typography

- **Headings**: Inter font family
- **Monospace**: Geist Mono (for code, hashes, IDs)
- **Body**: System font stack with Inter fallback

### Components

Built with shadcn/ui + Tailwind CSS v4:
- Responsive navigation sidebar
- Data tables with sorting/filtering
- Charts with Recharts
- Modal dialogs and drawers
- Form inputs and validation

## Backend Integration

The frontend is designed to work with the ViperQB backend API. Key integration points:

### Authentication Endpoints

\`\`\`typescript
POST   /api/v1/auth/login          # User login
GET    /api/v1/auth/me             # Get current user
POST   /api/v1/auth/refresh        # Refresh token
\`\`\`

### Module Endpoints

All modules follow RESTful patterns:

\`\`\`typescript
// File Transfer
POST   /api/v1/sft/upload          # Upload encrypted file
GET    /api/v1/sft/download/{id}   # Download file
GET    /api/v1/sft/metadata/{id}   # Get file metadata

// KYC
POST   /api/v1/kyc/start           # Start verification
GET    /api/v1/kyc/sessions        # List pending verifications
POST   /api/v1/kyc/{id}/approve    # Approve user
POST   /api/v1/kyc/{id}/reject     # Reject user

// Audit & Forensics
GET    /api/v1/forensics/query     # Search logs
POST   /api/v1/forensics/export    # Export to CSV

// And more...
\`\`\`

See `lib/constants.ts` for the complete endpoint mapping.

## API Client Usage

\`\`\`typescript
import { apiClient } from "@/lib/api-client"

// GET request
const { success, data } = await apiClient.get("/metrics/usage")

// POST request
const { success, data } = await apiClient.post("/kyc/sessions", {
  userId: "user_123"
})

// Error handling
if (!success) {
  console.error("API Error:", error)
}
\`\`\`

## Development

### Key Features Implemented

✅ Marketing website with hero, features, pricing, and security sections  
✅ Responsive dashboard with 11 modules  
✅ Real-time data widgets and charts  
✅ Authentication flow (login/demo pages)  
✅ API client with error handling  
✅ Dark mode optimized design  
✅ Mobile-first responsive design  
✅ Accessibility (ARIA labels, keyboard navigation)  

### TODO: Backend Team

- [ ] Connect authentication endpoints
- [ ] Implement WebSocket for real-time updates
- [ ] Add file upload streaming
- [ ] Integrate WebRTC for KYC liveness detection
- [ ] Setup blockchain event emitters
- [ ] Implement rate limiting and caching
- [ ] Add metrics aggregation pipeline
- [ ] Setup email notification service

## Project Structure

\`\`\`
├── app/                    # Next.js app router pages
├── components/             # React components
├── lib/                    # Utilities, constants, API client
├── public/                 # Static assets
├── app/globals.css         # Global styles with design tokens
├── tailwind.config.js      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
\`\`\`

## Production Deployment

### Vercel Deployment

\`\`\`bash
# Push to GitHub
git push origin main

# Deploy automatically via Vercel
\`\`\`

### Environment Variables

Set these in your Vercel project settings:

\`\`\`
NEXT_PUBLIC_API_BASE_URL=https://api.viperqb.com
\`\`\`

## Performance Optimization

- Server-side rendering for fast initial load
- Image optimization with Next.js Image
- Code splitting per route
- Optimized bundle with tree-shaking
- CSS-in-JS with Tailwind for minimal overhead

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Considerations

- All API calls should use HTTPS in production
- Store authentication tokens in httpOnly cookies (backend)
- Implement CSRF protection
- Validate all user inputs
- Use Content Security Policy (CSP) headers

## License

Proprietary - ViperQB Middleware

## Support

- Documentation: [docs.viperqb.com](https://docs.viperqb.com)
- Issues: GitHub Issues
- Email: support@viperqb.com
