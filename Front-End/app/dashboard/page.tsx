"use client"

import { WidgetUsageStats } from "@/components/dashboard/widgets/widget-usage-stats"
import { WidgetActivePlugins } from "@/components/dashboard/widgets/widget-active-plugins"
import { WidgetRequestRate } from "@/components/dashboard/widgets/widget-request-rate"
import { WidgetRecentTxs } from "@/components/dashboard/widgets/widget-recent-txs"
import { WidgetAlerts } from "@/components/dashboard/widgets/widget-alerts"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome back, Admin. Here's your enterprise snapshot.</p>
      </div>

      {/* Usage Stats */}
      <WidgetUsageStats />

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          <WidgetRequestRate />
          <WidgetAlerts />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <WidgetActivePlugins />
          <WidgetRecentTxs />
        </div>
      </div>
    </div>
  )
}
