"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export function WidgetUsageStats() {
  // Placeholder data - will connect to /api/v1/metrics/usage
  const stats = [
    {
      label: "API Calls (24h)",
      value: "12,543",
      change: "+12.5%",
      trending: true,
    },
    {
      label: "Storage Used",
      value: "248 GB",
      change: "+2.3%",
      trending: true,
    },
    {
      label: "Active Users",
      value: "1,247",
      change: "+8.1%",
      trending: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <Card key={i} className="border-[#244217] bg-[#1a2b1c]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#b8c5b9]">{stat.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-[#e9dcc7]">{stat.value}</p>
                <p className="text-xs text-[#83ca4d] mt-1 flex items-center gap-1">
                  {stat.trending && <TrendingUp className="w-3 h-3" />}
                  {stat.change} from yesterday
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
