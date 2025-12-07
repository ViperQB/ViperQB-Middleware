"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Lock, Zap, Users, Eye, Settings } from "lucide-react"

const plugins = [
  {
    id: 1,
    name: "Secure File Transfer",
    icon: Lock,
    enabled: true,
    usage: "248 GB / 500 GB",
    plan: "Silver",
    description: "AES-256-GCM encrypted file transfers with blockchain verification",
  },
  {
    id: 2,
    name: "KYC Verification",
    icon: Users,
    enabled: true,
    usage: "1,247 / 5,000 verifications",
    plan: "Silver",
    description: "Automated liveness detection and document authentication",
  },
  {
    id: 3,
    name: "Workflow Automation",
    icon: Zap,
    enabled: true,
    usage: "12 active workflows",
    plan: "Silver",
    description: "Trigger-based automation without coding",
  },
  {
    id: 4,
    name: "IoT Access Control",
    icon: Eye,
    enabled: false,
    usage: "0 / 100 devices",
    plan: "Gold",
    description: "Real-time access logs for physical and digital resources",
  },
]

export default function PluginsPage() {
  const [pluginsState, setPluginsState] = useState(plugins)
  const [selectedPlugin, setSelectedPlugin] = useState<(typeof plugins)[0] | null>(null)

  const handleTogglePlugin = (id: number) => {
    setPluginsState(
      pluginsState.map((plugin) => (plugin.id === id ? { ...plugin, enabled: !plugin.enabled } : plugin))
    )
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Plugin Management</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Enable/disable modules and manage billing per plugin
        </p>
      </div>

      {/* Plugins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pluginsState.map((plugin) => {
          const Icon = plugin.icon
          return (
            <Card key={plugin.id} className={`border-border ${!plugin.enabled ? "opacity-60" : ""}`}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{plugin.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{plugin.description}</p>
                    </div>
                  </div>
                  <Switch checked={plugin.enabled} onCheckedChange={() => handleTogglePlugin(plugin.id)} />
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Usage</span>
                    <span className="font-mono text-xs">{plugin.usage}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Plan</span>
                    <Badge variant="secondary">{plugin.plan}</Badge>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 bg-transparent"
                  onClick={() => setSelectedPlugin(plugin)}
                >
                  <Settings className="w-4 h-4" />
                  Configure
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Plugin Detail */}
      {selectedPlugin && (
        <Card className="border-border border-accent/30 bg-accent/5">
          <CardHeader>
            <CardTitle>Configure: {selectedPlugin.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <Badge className="mt-1" variant={selectedPlugin.enabled ? "default" : "secondary"}>
                  {selectedPlugin.enabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Plan</p>
                <p className="font-semibold text-lg mt-1">{selectedPlugin.plan}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Monthly Cost</p>
                <p className="font-semibold text-lg mt-1 text-accent">$199</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Included</p>
                <p className="font-semibold text-lg mt-1">Unlimited</p>
              </div>
            </div>

            <div className="bg-background rounded-lg p-4">
              <p className="text-sm font-semibold mb-3">Configuration Options</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enable encryption</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-backup</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Real-time alerts</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
