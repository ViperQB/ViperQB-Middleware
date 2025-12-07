"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2 } from "lucide-react"

const alerts = [
  { id: 1, title: "High Rate Limiting", severity: "warning", time: "2 min ago" },
  { id: 2, title: "Failed KYC Verification", severity: "error", time: "15 min ago" },
  { id: 3, title: "API Latency Spike", severity: "warning", time: "42 min ago" },
]

export function WidgetAlerts() {
  return (
    <Card className="border-border col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Open Alerts</CardTitle>
        <CardDescription>{alerts.length} active incidents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between p-3 bg-background rounded-lg border-l-2 border-error"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-error flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-accent hover:text-accent hover:bg-accent/10"
                onClick={() => {
                  // TODO: Implement acknowledge action
                  console.log("[v0] Acknowledging alert:", alert.id)
                }}
              >
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Ack
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
