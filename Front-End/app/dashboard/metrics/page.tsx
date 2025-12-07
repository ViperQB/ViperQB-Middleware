"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const latencyData = [
  { time: "00:00", latency: 45, p99: 128 },
  { time: "04:00", latency: 52, p99: 145 },
  { time: "08:00", latency: 38, p99: 110 },
  { time: "12:00", latency: 61, p99: 178 },
  { time: "16:00", latency: 48, p99: 135 },
  { time: "20:00", latency: 42, p99: 118 },
  { time: "23:59", latency: 39, p99: 105 },
]

const errorRateData = [
  { module: "sft", errors: 2 },
  { module: "kyc", errors: 5 },
  { module: "audit", errors: 0 },
  { module: "policy", errors: 1 },
  { module: "iot", errors: 3 },
]

const requestRateData = [
  { time: "00:00", requests: 400 },
  { time: "04:00", requests: 580 },
  { time: "08:00", requests: 850 },
  { time: "12:00", requests: 1200 },
  { time: "16:00", requests: 1100 },
  { time: "20:00", requests: 920 },
  { time: "23:59", requests: 650 },
]

export default function MetricsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Metrics & Monitoring</h1>
        <p className="text-muted-foreground mt-1">Real-time performance tracking and alerting</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-[#244217] bg-[#1a2b1c]">
          <CardContent className="pt-6">
            <p className="text-sm text-[#b8c5b9]">Avg Latency (24h)</p>
            <p className="text-3xl font-bold mt-2 text-[#e9dcc7]">48ms</p>
            <p className="text-xs text-[#83ca4d] mt-1">-5% from yesterday</p>
          </CardContent>
        </Card>
        <Card className="border-[#244217] bg-[#1a2b1c]">
          <CardContent className="pt-6">
            <p className="text-sm text-[#b8c5b9]">Error Rate</p>
            <p className="text-3xl font-bold mt-2 text-[#e9dcc7]">0.12%</p>
            <p className="text-xs text-[#83ca4d] mt-1">Within SLA</p>
          </CardContent>
        </Card>
        <Card className="border-[#244217] bg-[#1a2b1c]">
          <CardContent className="pt-6">
            <p className="text-sm text-[#b8c5b9]">Uptime (7d)</p>
            <p className="text-3xl font-bold mt-2 text-[#e9dcc7]">99.98%</p>
            <p className="text-xs text-[#83ca4d] mt-1">Enterprise grade</p>
          </CardContent>
        </Card>
        <Card className="border-[#244217] bg-[#1a2b1c]">
          <CardContent className="pt-6">
            <p className="text-sm text-[#b8c5b9]">Requests/min</p>
            <p className="text-3xl font-bold mt-2 text-[#e9dcc7]">1,247</p>
            <p className="text-xs text-[#4da8da] mt-1">Peak: 2,180</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="latency" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#1a2b1c] border border-[#244217] rounded-lg p-1">
          <TabsTrigger value="latency">Latency</TabsTrigger>
          <TabsTrigger value="errors">Errors</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="latency" className="mt-6">
          <Card className="border-[#244217] bg-[#1a2b1c]">
            <CardHeader>
              <CardTitle className="text-[#e9dcc7]">API Latency (24h)</CardTitle>
              <CardDescription className="text-[#b8c5b9]">Response time in milliseconds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={latencyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#244217" />
                    <XAxis dataKey="time" stroke="#b8c5b9" />
                    <YAxis stroke="#b8c5b9" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a2b1c",
                        border: "1px solid #244217",
                        color: "#e9dcc7",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="latency" stroke="#83ca4d" strokeWidth={2} name="Avg Latency" />
                    <Line type="monotone" dataKey="p99" stroke="#e9b84f" strokeWidth={2} name="P99" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="mt-6">
          <Card className="border-[#244217] bg-[#1a2b1c]">
            <CardHeader>
              <CardTitle className="text-[#e9dcc7]">Error Rate by Module (24h)</CardTitle>
              <CardDescription className="text-[#b8c5b9]">Total errors per module</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={errorRateData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#244217" />
                    <XAxis dataKey="module" stroke="#b8c5b9" />
                    <YAxis stroke="#b8c5b9" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a2b1c",
                        border: "1px solid #244217",
                        color: "#e9dcc7",
                      }}
                    />
                    <Bar dataKey="errors" fill="#ff6b6b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="mt-6">
          <Card className="border-[#244217] bg-[#1a2b1c]">
            <CardHeader>
              <CardTitle className="text-[#e9dcc7]">Request Rate (24h)</CardTitle>
              <CardDescription className="text-[#b8c5b9]">Requests per minute</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={requestRateData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#244217" />
                    <XAxis dataKey="time" stroke="#b8c5b9" />
                    <YAxis stroke="#b8c5b9" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a2b1c",
                        border: "1px solid #244217",
                        color: "#e9dcc7",
                      }}
                    />
                    <Line type="monotone" dataKey="requests" stroke="#83ca4d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
