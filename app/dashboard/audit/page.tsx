"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Filter, Eye } from "lucide-react"

const logs = [
  {
    id: 1,
    module: "sft",
    action: "file_upload",
    userId: "user_123",
    details: "contract-agreement.pdf uploaded",
    txHash: "0x8f2b3...a1e2",
    timestamp: "2025-01-12 14:32:15",
    status: "success",
  },
  {
    id: 2,
    module: "kyc",
    action: "verification_approved",
    userId: "user_456",
    details: "KYC verification completed for alice@example.com",
    txHash: "0x4c9d5...f3b8",
    timestamp: "2025-01-12 13:45:22",
    status: "success",
  },
  {
    id: 3,
    module: "audit",
    action: "log_export",
    userId: "admin_001",
    details: "Exported 1000 logs to CSV",
    txHash: "0x2a1e7...c9f4",
    timestamp: "2025-01-12 12:15:08",
    status: "success",
  },
  {
    id: 4,
    module: "policy",
    action: "policy_applied",
    userId: "admin_001",
    details: "Applied policy: role_manager to 5 users",
    txHash: "0x9b4f2...e8d1",
    timestamp: "2025-01-12 11:30:45",
    status: "success",
  },
]

export default function AuditPage() {
  const [selectedLog, setSelectedLog] = useState<(typeof logs)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [moduleFilter, setModuleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.txHash.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesModule = moduleFilter === "all" || log.module === moduleFilter
    const matchesStatus = statusFilter === "all" || log.status === statusFilter
    return matchesSearch && matchesModule && matchesStatus
  })

  const handleExport = () => {
    const csv = [
      ["Module", "Action", "User", "Details", "Status", "TxHash", "Timestamp"],
      ...filteredLogs.map((log) => [
        log.module,
        log.action,
        log.userId,
        log.details,
        log.status,
        log.txHash,
        log.timestamp,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `audit-logs-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const modules = Array.from(new Set(logs.map((log) => log.module)))

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Audit & Forensics</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Complete audit trail with blockchain verification and compliance reporting
        </p>
      </div>

      {/* Search & Filter */}
      <Card className="border-border">
        <CardContent className="pt-6 space-y-4">
          <div className="flex gap-3 flex-col md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by module, user, txHash..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-3 py-2 bg-background border border-border rounded-md text-sm"
                value={moduleFilter}
                onChange={(e) => setModuleFilter(e.target.value)}
              >
                <option value="all">All Modules</option>
                {modules.map((mod) => (
                  <option key={mod} value={mod}>
                    {mod.toUpperCase()}
                  </option>
                ))}
              </select>
              <select
                className="px-3 py-2 bg-background border border-border rounded-md text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="error">Error</option>
              </select>
            </div>
            <Button
              className="gap-2 bg-accent hover:bg-accent-dark text-primary-darker"
              onClick={handleExport}
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Audit Logs</CardTitle>
          <CardDescription>
            {filteredLogs.length} of {logs.length} system actions with on-chain verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden overflow-x-auto">
            <Table>
              <TableHeader className="bg-background/50">
                <TableRow>
                  <TableHead className="min-w-[100px]">Module</TableHead>
                  <TableHead className="min-w-[120px]">Action</TableHead>
                  <TableHead className="min-w-[100px] hidden md:table-cell">User</TableHead>
                  <TableHead className="min-w-[200px]">Details</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[120px] hidden lg:table-cell">TxHash</TableHead>
                  <TableHead className="min-w-[140px] hidden md:table-cell">Timestamp</TableHead>
                  <TableHead className="text-right min-w-[80px]">View</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No logs found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id} className="hover:bg-background/50 transition-colors">
                      <TableCell>
                        <Badge variant="secondary" className="font-mono text-xs">
                          {log.module}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-sm">{log.action}</TableCell>
                      <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                        {log.userId}
                      </TableCell>
                      <TableCell className="text-sm max-w-xs truncate">{log.details}</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-success">
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-accent cursor-pointer hover:underline hidden lg:table-cell">
                        {log.txHash}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                        {log.timestamp}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedLog(log)} title="View details">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Log Detail */}
      {selectedLog && (
        <Card className="border-border border-accent/30 bg-accent/5">
          <CardHeader>
            <CardTitle>Audit Entry Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Module</p>
                  <p className="font-mono text-sm mt-1 font-bold text-accent">{selectedLog.module}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Action</p>
                  <p className="text-sm mt-1 font-semibold">{selectedLog.action}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">User</p>
                  <p className="text-sm mt-1 font-semibold">{selectedLog.userId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge className="mt-1 bg-success">{selectedLog.status}</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Timestamp</p>
                  <p className="text-sm mt-1">{selectedLog.timestamp}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">TxHash</p>
                  <p className="font-mono text-sm mt-1 text-accent">{selectedLog.txHash}</p>
                </div>
              </div>
              <div className="bg-background rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-2">Raw Event JSON</p>
                <pre className="font-mono text-xs text-muted-foreground overflow-x-auto">
                  {JSON.stringify(
                    {
                      module: selectedLog.module,
                      action: selectedLog.action,
                      userId: selectedLog.userId,
                      details: selectedLog.details,
                      txHash: selectedLog.txHash,
                      timestamp: selectedLog.timestamp,
                      status: selectedLog.status,
                    },
                    null,
                    2,
                  )}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
