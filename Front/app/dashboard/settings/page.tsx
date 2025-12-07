"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

const apiKeys = [
  {
    id: 1,
    name: "Production API Key",
    key: "vq_prod_xxxxxxxxxxxxxxxxxxxx",
    created: "2025-01-01",
    lastUsed: "2 min ago",
  },
  {
    id: 2,
    name: "Development API Key",
    key: "vq_dev_xxxxxxxxxxxxxxxxxxxx",
    created: "2024-12-15",
    lastUsed: "Yesterday",
  },
]

const webhooks = [
  {
    id: 1,
    url: "https://company.example.com/webhooks/viper",
    events: ["kyc_approved", "file_transferred", "alert_triggered"],
    status: "active",
  },
]

export default function SettingsPage() {
  const [showKey, setShowKey] = useState<number | null>(null)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tenant & Billing Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account, API keys, and webhooks</p>
      </div>

      {/* Billing */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Manage your subscription</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-background rounded-lg">
            <div>
              <p className="font-semibold">Silver Plan</p>
              <p className="text-sm text-muted-foreground mt-1">$999/month - Auto-renews on Feb 1, 2025</p>
            </div>
            <Badge className="bg-accent text-primary-darker">Active</Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-background rounded-lg">
              <p className="text-xs text-muted-foreground">Monthly Spend</p>
              <p className="font-bold text-lg mt-2">$999</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="text-xs text-muted-foreground">Days Remaining</p>
              <p className="font-bold text-lg mt-2">19</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="text-xs text-muted-foreground">Next Billing</p>
              <p className="font-bold text-lg mt-2">Feb 1</p>
            </div>
          </div>

          <Button variant="outline" className="w-full bg-transparent">
            Upgrade Plan
          </Button>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage authentication tokens for API access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-sm">{apiKey.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="font-mono text-xs text-muted-foreground">
                      {showKey === apiKey.id ? apiKey.key : "••••••••••••••••••••••••••"}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)}
                    >
                      {showKey === apiKey.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Created {apiKey.created} • Last used {apiKey.lastUsed}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full mt-4 gap-2 bg-accent hover:bg-accent-dark text-primary-darker">
            Generate New Key
          </Button>
        </CardContent>
      </Card>

      {/* Webhooks */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Webhooks</CardTitle>
          <CardDescription>Send real-time notifications to your systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {webhooks.map((webhook) => (
              <div key={webhook.id} className="p-4 bg-background rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <code className="font-mono text-xs text-accent">{webhook.url}</code>
                  <Badge variant="default">{webhook.status}</Badge>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {webhook.events.map((event, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {event}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full mt-4 gap-2 bg-accent hover:bg-accent-dark text-primary-darker">Add Webhook</Button>
        </CardContent>
      </Card>
    </div>
  )
}
