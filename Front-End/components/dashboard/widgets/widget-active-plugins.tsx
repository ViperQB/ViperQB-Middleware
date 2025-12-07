"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const plugins = [
  { name: "File Transfer", status: "active" as const },
  { name: "KYC Verification", status: "active" as const },
  { name: "Audit & Forensics", status: "active" as const },
  { name: "Workflow Automation", status: "inactive" as const },
  { name: "IoT Access Control", status: "active" as const },
  { name: "Policy Management", status: "active" as const },
]

export function WidgetActivePlugins() {
  return (
    <Card className="border-border col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Active Plugins</CardTitle>
        <CardDescription>6 of 10 modules enabled</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {plugins.map((plugin, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${plugin.status === "active" ? "bg-success" : "bg-muted"}`}></div>
                <span className="text-sm font-medium">{plugin.name}</span>
              </div>
              <Switch defaultChecked={plugin.status === "active"} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
