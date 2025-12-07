"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Upload, Download, Trash2, Eye, Lock, Search, X } from "lucide-react"

const initialTransfers = [
  {
    id: 1,
    filename: "contract-agreement.pdf",
    sender: "john@company.com",
    receiver: "client@external.com",
    size: "2.4 MB",
    hash: "0x8f2b3...a1e2",
    status: "completed",
    timestamp: "2025-01-12 14:32",
  },
  {
    id: 2,
    filename: "financial-report-q4.xlsx",
    sender: "finance@company.com",
    receiver: "audit@external.com",
    size: "5.1 MB",
    hash: "0x4c9d5...f3b8",
    status: "completed",
    timestamp: "2025-01-12 13:15",
  },
  {
    id: 3,
    filename: "technical-specs.docx",
    sender: "eng@company.com",
    receiver: "partner@external.com",
    size: "1.2 MB",
    hash: "0x2a1e7...c9f4",
    status: "pending",
    timestamp: "2025-01-12 12:45",
  },
  {
    id: 4,
    filename: "presentation-deck.pptx",
    sender: "sales@company.com",
    receiver: "prospect@external.com",
    size: "8.7 MB",
    hash: "0x9b4f2...e8d1",
    status: "completed",
    timestamp: "2025-01-12 11:20",
  },
  {
    id: 5,
    filename: "invoice-2025-01.pdf",
    sender: "billing@company.com",
    receiver: "accounting@external.com",
    size: "0.5 MB",
    hash: "0x3c7a1...f9b2",
    status: "completed",
    timestamp: "2025-01-12 10:15",
  },
]

export default function FilesPage() {
  const [transfers, setTransfers] = useState(initialTransfers)
  const [selectedFile, setSelectedFile] = useState<(typeof initialTransfers)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "pending">("all")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredTransfers = transfers.filter((transfer) => {
    const matchesSearch =
      transfer.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.receiver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.hash.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || transfer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileSize = (file.size / (1024 * 1024)).toFixed(2) + " MB"
      const newTransfer = {
        id: transfers.length + 1,
        filename: file.name,
        sender: typeof window !== "undefined" ? localStorage.getItem("user_email") || "you@company.com" : "you@company.com",
        receiver: "pending@external.com",
        size: fileSize,
        hash: "0x" + Math.random().toString(16).substring(2, 10) + "...",
        status: "pending" as const,
        timestamp: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
      }
      setTransfers([newTransfer, ...transfers])
      // Simulate upload completion after 2 seconds
      setTimeout(() => {
        setTransfers((prev) =>
          prev.map((t) =>
            t.id === newTransfer.id
              ? { ...t, status: "completed" as const, hash: "0x" + Math.random().toString(16).substring(2, 18) + "..." }
              : t
          )
        )
      }, 2000)
    }
  }

  const handleDownload = (id: number) => {
    const file = transfers.find((t) => t.id === id)
    if (file) {
      alert(`Downloading ${file.filename}...`)
    }
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to revoke this file transfer?")) {
      setTransfers(transfers.filter((t) => t.id !== id))
      if (selectedFile?.id === id) {
        setSelectedFile(null)
      }
    }
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">File Transfer</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Secure, encrypted file sharing with blockchain verification
        </p>
      </div>

      {/* Upload Section */}
      <Card className="border-border border-dashed">
        <CardContent className="p-6 md:p-12">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-accent/10 flex items-center justify-center mx-auto">
              <Upload className="w-6 h-6 md:w-8 md:h-8 text-accent" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold">Upload a file to transfer</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Drag and drop or click to browse. Files are encrypted with AES-256-GCM.
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="*/*"
            />
            <Button
              onClick={handleFileSelect}
              className="bg-accent hover:bg-accent-dark text-primary-darker"
            >
              Select File
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search & Filter */}
      <Card className="border-border">
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by filename, sender, receiver, hash..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("completed")}
              >
                Completed
              </Button>
              <Button
                variant={statusFilter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("pending")}
              >
                Pending
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transfer History */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Transfer History</CardTitle>
          <CardDescription>
            {filteredTransfers.length} of {transfers.length} encrypted file transfers with blockchain proof
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden overflow-x-auto">
            <Table>
              <TableHeader className="bg-background/50">
                <TableRow>
                  <TableHead className="min-w-[150px]">Filename</TableHead>
                  <TableHead className="min-w-[150px] hidden md:table-cell">Sender</TableHead>
                  <TableHead className="min-w-[150px] hidden lg:table-cell">Receiver</TableHead>
                  <TableHead className="min-w-[80px]">Size</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[120px] hidden lg:table-cell">TxHash</TableHead>
                  <TableHead className="min-w-[120px] hidden md:table-cell">Time</TableHead>
                  <TableHead className="text-right min-w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransfers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No files found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransfers.map((transfer) => (
                    <TableRow key={transfer.id} className="hover:bg-background/50 transition-colors">
                      <TableCell className="font-medium">{transfer.filename}</TableCell>
                      <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                        {transfer.sender}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground hidden lg:table-cell">
                        {transfer.receiver}
                      </TableCell>
                      <TableCell className="text-sm">{transfer.size}</TableCell>
                      <TableCell>
                        <Badge variant={transfer.status === "completed" ? "default" : "secondary"}>
                          {transfer.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-accent cursor-pointer hover:underline hidden lg:table-cell">
                        {transfer.hash}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                        {transfer.timestamp}
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedFile(transfer)}
                          title="View details"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(transfer.id)}
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-error hover:text-error"
                          onClick={() => handleDelete(transfer.id)}
                          title="Revoke"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Detail View */}
      {selectedFile && (
        <Card className="border-border border-accent/30 bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-accent" />
              File Details: {selectedFile.filename}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">File Hash</p>
                <p className="font-mono text-sm mt-1">{selectedFile.hash}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">File Size</p>
                <p className="text-sm mt-1 font-semibold">{selectedFile.size}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="text-sm mt-1 font-semibold text-accent">{selectedFile.status.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Timestamp</p>
                <p className="text-sm mt-1">{selectedFile.timestamp}</p>
              </div>
            </div>
            <div className="bg-background rounded-lg p-4 font-mono text-xs text-muted-foreground">
              <p>Audit trail entries for this file: 3 blockchain confirmations</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
