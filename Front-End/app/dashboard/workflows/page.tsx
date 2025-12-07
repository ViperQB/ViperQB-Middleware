"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus, Play, Pause, Trash2, Eye, ChevronRight } from "lucide-react"

const initialWorkflows = [
  {
    id: 1,
    name: "Auto-Approve KYC Score > 0.95",
    trigger: "kyc_verification_complete",
    actions: ["approve_kyc", "send_email"],
    status: "active",
    runs: 342,
    lastRun: "2 min ago",
  },
  {
    id: 2,
    name: "Alert on Rate Limit Spike",
    trigger: "rate_limit_exceeded",
    actions: ["create_alert", "webhook_notify"],
    status: "active",
    runs: 28,
    lastRun: "15 min ago",
  },
  {
    id: 3,
    name: "Archive Old Files",
    trigger: "schedule_daily_midnight",
    actions: ["archive_files", "log_audit"],
    status: "active",
    runs: 45,
    lastRun: "Yesterday 00:01",
  },
  {
    id: 4,
    name: "Manual Review - Low Confidence KYC",
    trigger: "kyc_confidence_low",
    actions: ["create_review_task", "notify_admin"],
    status: "paused",
    runs: 12,
    lastRun: "3 days ago",
  },
]

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState(initialWorkflows)
  const [selectedWorkflow, setSelectedWorkflow] = useState<(typeof initialWorkflows)[0] | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newWorkflowName, setNewWorkflowName] = useState("")
  const [newWorkflowTrigger, setNewWorkflowTrigger] = useState("")

  const handleToggleStatus = (id: number) => {
    setWorkflows(
      workflows.map((w) => (w.id === id ? { ...w, status: w.status === "active" ? "paused" : "active" } : w))
    )
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this workflow?")) {
      setWorkflows(workflows.filter((w) => w.id !== id))
      if (selectedWorkflow?.id === id) {
        setSelectedWorkflow(null)
      }
    }
  }

  const handleAddWorkflow = () => {
    if (newWorkflowName.trim() && newWorkflowTrigger.trim()) {
      const newWorkflow = {
        id: workflows.length + 1,
        name: newWorkflowName,
        trigger: newWorkflowTrigger,
        actions: ["log_audit"],
        status: "active" as const,
        runs: 0,
        lastRun: "Never",
      }
      setWorkflows([...workflows, newWorkflow])
      setNewWorkflowName("")
      setNewWorkflowTrigger("")
      setIsAddDialogOpen(false)
    }
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Workflow Automation</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">Create triggers and actions without code</p>
        </div>
        <Button
          className="gap-2 bg-accent hover:bg-accent-dark text-primary-darker w-full md:w-auto"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="w-4 h-4" />
          New Workflow
        </Button>
      </div>

      {/* Workflows Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Active Workflows</CardTitle>
          <CardDescription>Automation rules with blockchain-verified execution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-background/50">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Trigger</TableHead>
                  <TableHead>Actions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Runs</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workflows.map((workflow) => (
                  <TableRow key={workflow.id} className="hover:bg-background/50 transition-colors">
                    <TableCell className="font-medium">{workflow.name}</TableCell>
                    <TableCell className="font-mono text-xs bg-background rounded px-2 py-1 w-fit">
                      {workflow.trigger}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div className="flex gap-1 flex-wrap">
                        {workflow.actions.map((action, i) => (
                          <Badge key={i} variant="secondary" className="text-xs font-mono">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={workflow.status === "active" ? "default" : "secondary"}>{workflow.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm font-semibold">{workflow.runs}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{workflow.lastRun}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedWorkflow(workflow)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        title={workflow.status === "active" ? "Pause" : "Resume"}
                        onClick={() => handleToggleStatus(workflow.id)}
                      >
                        {workflow.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-error hover:text-error"
                        onClick={() => handleDelete(workflow.id)}
                      >
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

      {/* Workflow Detail */}
      {selectedWorkflow && (
        <Card className="border-border border-accent/30 bg-accent/5">
          <CardHeader>
            <CardTitle>Workflow: {selectedWorkflow.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold mb-2">Trigger</p>
                <div className="bg-background rounded-lg p-4 font-mono text-sm text-accent">
                  {selectedWorkflow.trigger}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Actions</p>
                <div className="space-y-2">
                  {selectedWorkflow.actions.map((action, i) => (
                    <div key={i} className="bg-background rounded-lg p-3 font-mono text-sm flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-accent" />
                      {action}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge className="mt-1" variant={selectedWorkflow.status === "active" ? "default" : "secondary"}>
                    {selectedWorkflow.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Runs</p>
                  <p className="font-semibold text-lg mt-1">{selectedWorkflow.runs}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Run</p>
                  <p className="text-sm mt-1">{selectedWorkflow.lastRun}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Workflow Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Workflow</DialogTitle>
            <DialogDescription>Define a trigger and actions for automation</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Workflow Name</label>
              <Input
                placeholder="e.g., Auto-approve high score KYC"
                value={newWorkflowName}
                onChange={(e) => setNewWorkflowName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Trigger Event</label>
              <Input
                placeholder="e.g., kyc_verification_complete"
                value={newWorkflowTrigger}
                onChange={(e) => setNewWorkflowTrigger(e.target.value)}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1 bg-accent hover:bg-accent-dark text-primary-darker"
                onClick={handleAddWorkflow}
                disabled={!newWorkflowName.trim() || !newWorkflowTrigger.trim()}
              >
                Create Workflow
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
