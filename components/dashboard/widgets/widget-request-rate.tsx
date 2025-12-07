"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { time: "00:00", requests: 400, limited: 12 },
  { time: "04:00", requests: 580, limited: 18 },
  { time: "08:00", requests: 850, limited: 25 },
  { time: "12:00", requests: 1200, limited: 32 },
  { time: "16:00", requests: 1100, limited: 28 },
  { time: "20:00", requests: 920, limited: 22 },
  { time: "23:59", requests: 650, limited: 16 },
]

export function WidgetRequestRate() {
  return (
    <Card className="border-[#244217] bg-[#1a2b1c] col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-[#e9dcc7]">Request Rate (24h)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#244217" />
              <XAxis dataKey="time" stroke="#b8c5b9" />
              <YAxis stroke="#b8c5b9" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a2b1c",
                  border: "1px solid #244217",
                  borderRadius: "8px",
                  color: "#e9dcc7",
                }}
              />
              <Line type="monotone" dataKey="requests" stroke="#83ca4d" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="limited" stroke="#ff6b6b" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
