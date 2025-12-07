"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, XCircle, Clock, Eye, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const kycSessions = [
  {
    id: 1,
    user: "alice.johnson@email.com",
    status: "approved",
    livenessScore: 0.98,
    faceMatchScore: 0.95,
    docValid: true,
    timestamp: "2025-01-12 16:20",
    txHash: "0x8f2b3...a1e2",
  },
  {
    id: 2,
    user: "bob.smith@email.com",
    status: "pending",
    livenessScore: 0.92,
    faceMatchScore: 0.88,
    docValid: true,
    timestamp: "2025-01-12 15:45",
    txHash: null,
  },
  {
    id: 3,
    user: "carol.white@email.com",
    status: "rejected",
    livenessScore: 0.45,
    faceMatchScore: 0.12,
    docValid: false,
    timestamp: "2025-01-12 14:30",
    txHash: "0x4c9d5...f3b8",
  },
  {
    id: 4,
    user: "david.lee@email.com",
    status: "manual_review",
    livenessScore: 0.75,
    faceMatchScore: 0.82,
    docValid: true,
    timestamp: "2025-01-12 13:15",
    txHash: null,
  },
]

export default function KYCPage() {
  const [kycSessionsState, setKycSessionsState] = useState(kycSessions)
  const [selectedSession, setSelectedSession] = useState<(typeof kycSessions)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleApprove = (id: number) => {
    setKycSessionsState(
      kycSessionsState.map((session) =>
        session.id === id
          ? {
              ...session,
              status: "approved",
              txHash: "0x" + Math.random().toString(16).substring(2, 18) + "...",
            }
          : session
      )
    )
    setIsDialogOpen(false)
    alert("KYC session approved successfully!")
  }

  const handleReject = (id: number) => {
    setKycSessionsState(
      kycSessionsState.map((session) =>
        session.id === id
          ? {
              ...session,
              status: "rejected",
              txHash: "0x" + Math.random().toString(16).substring(2, 18) + "...",
            }
          : session
      )
    )
    setIsDialogOpen(false)
    alert("KYC session rejected.")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "manual_review":
        return <AlertCircle className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">KYC Verification Center</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Automated liveness detection, document authentication, and face matching
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Verifications</p>
            <p className="text-3xl font-bold mt-2">1,247</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Approved</p>
            <p className="text-3xl font-bold mt-2 text-green-500">1,198</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Pending Review</p>
            <p className="text-3xl font-bold mt-2 text-blue-500">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Rejected</p>
            <p className="text-3xl font-bold mt-2 text-red-500">37</p>
          </CardContent>
        </Card>
      </div>

      {/* KYC Queue */}
      <Card>
        <CardHeader>
          <CardTitle>KYC Sessions Queue</CardTitle>
          <CardDescription>Recent verification requests and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User Email</TableHead>
                  <TableHead>Liveness</TableHead>
                  <TableHead>Face Match</TableHead>
                  <TableHead>Doc Valid</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>TxHash</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kycSessionsState.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.user}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={session.livenessScore * 100} className="w-16" />
                        <span className="text-xs font-mono">{(session.livenessScore * 100).toFixed(0)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={session.faceMatchScore * 100} className="w-16" />
                        <span className="text-xs font-mono">{(session.faceMatchScore * 100).toFixed(0)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {session.docValid ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      {getStatusIcon(session.status)}
                      <Badge
                        variant={
                          session.status === "approved"
                            ? "default"
                            : session.status === "rejected"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {session.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{session.timestamp}</TableCell>
                    <TableCell className="font-mono text-sm text-accent cursor-pointer hover:underline">
                      {session.txHash || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedSession(session)
                          setIsDialogOpen(true)
                        }}
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Session Detail */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedSession && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">KYC Session Details</DialogTitle>
                <DialogDescription>{selectedSession.user}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Liveness Score</p>
                      <Progress value={selectedSession.livenessScore * 100} className="h-3 mb-2" />
                      <p className="text-2xl font-bold text-accent">
                        {(selectedSession.livenessScore * 100).toFixed(2)}%
                      </p>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Face Match Score</p>
                      <Progress value={selectedSession.faceMatchScore * 100} className="h-3 mb-2" />
                      <p className="text-2xl font-bold text-accent">
                        {(selectedSession.faceMatchScore * 100).toFixed(2)}%
                      </p>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Document Valid</p>
                      <p className="text-lg font-semibold flex items-center gap-2">
                        {selectedSession.docValid ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-green-500" /> Valid
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-red-500" /> Invalid
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-accent hover:bg-accent/90 text-primary-darker font-semibold"
                      onClick={() => handleApprove(selectedSession.id)}
                      disabled={selectedSession.status === "approved"}
                    >
                      Approve Verification
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full font-semibold"
                      onClick={() => handleReject(selectedSession.id)}
                      disabled={selectedSession.status === "rejected"}
                    >
                      Reject Verification
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Request Manual Review
                    </Button>

                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-2">Additional Info</p>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-muted-foreground">Status:</span>{" "}
                          <Badge variant={selectedSession.status === "approved" ? "default" : "secondary"}>
                            {selectedSession.status}
                          </Badge>
                        </p>
                        <p>
                          <span className="text-muted-foreground">Timestamp:</span> {selectedSession.timestamp}
                        </p>
                        {selectedSession.txHash && (
                          <p>
                            <span className="text-muted-foreground">TxHash:</span>{" "}
                            <span className="font-mono text-xs text-accent">{selectedSession.txHash}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
