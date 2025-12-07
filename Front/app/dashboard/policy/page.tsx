"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Eye } from "lucide-react"

const policies = [
  {
    id: 1,
    name: "Admin Policy",
    description: "Full access to all modules",
    permissions: 12,
    assignedTo: 3,
    status: "active",
  },
  {
    id: 2,
    name: "KYC Reviewer",
    description: "Can view and approve/reject KYC verifications",
    permissions: 4,
    assignedTo: 5,
    status: "active",
  },
  {
    id: 3,
    name: "Auditor",
    description: "Read-only access to logs and reports",
    permissions: 2,
    assignedTo: 2,
    status: "active",
  },
  {
    id: 4,
    name: "File Manager",
    description: "Manage file transfers and downloads",
    permissions: 5,
    assignedTo: 8,
    status: "active",
  },
]

export default function PolicyPage() {
  const [selectedPolicy, setSelectedPolicy] = useState<(typeof policies)[0] | null>(null)

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Policy & Access Control</h1>
          <p className="text-muted-foreground mt-1">Role-based access control with granular permissions</p>
        </div>
        <Button className="gap-2 bg-accent hover:bg-accent-dark text-primary-darker">
          <Plus className="w-4 h-4" />
          New Policy
        </Button>
      </div>

      {/* Policies Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Access Policies</CardTitle>
          <CardDescription>Manage roles and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-background/50">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policies.map((policy) => (
                  <TableRow key={policy.id} className="hover:bg-background/50 transition-colors">
                    <TableCell className="font-semibold">{policy.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{policy.description}</TableCell>
                    <TableCell className="text-sm font-mono bg-background rounded px-2 py-1 w-fit">
                      {policy.permissions} rules
                    </TableCell>
                    <TableCell className="text-sm font-semibold">{policy.assignedTo} users</TableCell>
                    <TableCell>
                      <Badge variant="default">{policy.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedPolicy(policy)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-error hover:text-error">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Policy Detail */}
      {selectedPolicy && (
        <Card className="border-border border-accent/30 bg-accent/5">
          <CardHeader>
            <CardTitle>Policy Details: {selectedPolicy.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Description</p>
              <p className="text-sm">{selectedPolicy.description}</p>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3">Permissions</p>
              <div className="space-y-2">
                {["sft:upload", "sft:download", "kyc:review", "kyc:approve", "audit:view", "workflow:create"].map(
                  (perm, i) =>
                    i < selectedPolicy.permissions && (
                      <div key={i} className="flex items-center gap-2 p-2 bg-background rounded">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-sm font-mono">{perm}</span>
                      </div>
                    ),
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-accent/20">
              <div>
                <p className="text-xs text-muted-foreground">Total Permissions</p>
                <p className="font-semibold text-lg mt-1">{selectedPolicy.permissions}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Assigned Users</p>
                <p className="font-semibold text-lg mt-1">{selectedPolicy.assignedTo}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <Badge className="mt-1">{selectedPolicy.status}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
