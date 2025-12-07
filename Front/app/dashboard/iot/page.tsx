"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, QrCode, Lock, Unlock, Trash2, Eye, Search } from "lucide-react"

const initialDevices = [
  {
    id: "dev_001",
    name: "Front Door",
    type: "RFID Reader",
    status: "online",
    lastAccess: "2025-01-12 15:32:18",
    totalAccesses: 247,
  },
  {
    id: "dev_002",
    name: "Server Room",
    type: "Biometric",
    status: "online",
    lastAccess: "2025-01-12 14:15:03",
    totalAccesses: 89,
  },
  {
    id: "dev_003",
    name: "Parking Gate",
    type: "RFID Reader",
    status: "offline",
    lastAccess: "2025-01-12 12:45:22",
    totalAccesses: 156,
  },
]

const accessEvents = [
  {
    deviceId: "dev_001",
    user: "john@company.com",
    action: "access_granted",
    txHash: "0x8f2b3...a1e2",
    time: "2025-01-12 15:32:18",
  },
  {
    deviceId: "dev_002",
    user: "alice@company.com",
    action: "access_denied",
    txHash: "0x4c9d5...f3b8",
    time: "2025-01-12 14:15:03",
  },
  {
    deviceId: "dev_001",
    user: "bob@company.com",
    action: "access_granted",
    txHash: "0x2a1e7...c9f4",
    time: "2025-01-12 13:42:15",
  },
  { deviceId: "dev_003", user: "carol@company.com", action: "offline", txHash: null, time: "2025-01-12 13:10:00" },
]

export default function IoTPage() {
  const [devices, setDevices] = useState(initialDevices)
  const [selectedDevice, setSelectedDevice] = useState<(typeof initialDevices)[0] | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [newDeviceName, setNewDeviceName] = useState("")
  const [newDeviceType, setNewDeviceType] = useState("RFID Reader")

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddDevice = () => {
    if (newDeviceName.trim()) {
      const newDevice = {
        id: `dev_${String(devices.length + 1).padStart(3, "0")}`,
        name: newDeviceName,
        type: newDeviceType,
        status: "online" as const,
        lastAccess: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        totalAccesses: 0,
      }
      setDevices([...devices, newDevice])
      setNewDeviceName("")
      setNewDeviceType("RFID Reader")
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteDevice = (id: string) => {
    if (confirm("Are you sure you want to remove this device?")) {
      setDevices(devices.filter((d) => d.id !== id))
      if (selectedDevice?.id === id) {
        setSelectedDevice(null)
      }
    }
  }

  const handleLockUnlock = (id: string, action: "lock" | "unlock") => {
    alert(`${action === "lock" ? "Locking" : "Unlocking"} device ${id}...`)
  }

  const handleQRCode = (id: string) => {
    alert(`QR Code for device ${id}:\n\nDevice ID: ${id}\nScan this QR code to configure the device.`)
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">IoT Access Control</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Real-time access logs with blockchain verification
          </p>
        </div>
        <Button
          className="gap-2 bg-accent hover:bg-accent-dark text-primary-darker w-full md:w-auto"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Add Device
        </Button>
      </div>

      {/* Search */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search devices by name, ID, or type..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Devices List */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Registered Devices</CardTitle>
          <CardDescription>
            {filteredDevices.length} of {devices.length} IoT devices connected
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden overflow-x-auto">
            <Table>
              <TableHeader className="bg-background/50">
                <TableRow>
                  <TableHead className="min-w-[100px]">Device ID</TableHead>
                  <TableHead className="min-w-[120px]">Name</TableHead>
                  <TableHead className="min-w-[120px] hidden md:table-cell">Type</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[140px] hidden lg:table-cell">Last Access</TableHead>
                  <TableHead className="min-w-[100px] hidden md:table-cell">Total Accesses</TableHead>
                  <TableHead className="text-right min-w-[140px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No devices found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDevices.map((device) => (
                    <TableRow key={device.id} className="hover:bg-background/50 transition-colors">
                      <TableCell className="font-mono text-xs text-accent">{device.id}</TableCell>
                      <TableCell className="font-semibold">{device.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                        {device.type}
                      </TableCell>
                      <TableCell>
                        <Badge variant={device.status === "online" ? "default" : "secondary"}>
                          {device.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm hidden lg:table-cell">{device.lastAccess}</TableCell>
                      <TableCell className="font-semibold hidden md:table-cell">{device.totalAccesses}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedDevice(device)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="QR Code" onClick={() => handleQRCode(device.id)}>
                          <QrCode className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-error hover:text-error"
                          onClick={() => handleDeleteDevice(device.id)}
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

      {/* Live Access Feed */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Live Access Feed</CardTitle>
          <CardDescription>Real-time access events with blockchain verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {accessEvents.map((event, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-background rounded-lg hover:bg-background/80 transition-colors"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${event.action === "access_granted" ? "bg-success" : event.action === "access_denied" ? "bg-error" : "bg-warning"}`}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs text-accent">{event.deviceId}</span>
                      <span className="font-medium text-sm">{event.user}</span>
                      <Badge variant="secondary" className="text-xs">
                        {event.action.replace(/_/g, " ")}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
                  </div>
                </div>
                {event.txHash && (
                  <span className="font-mono text-xs text-accent ml-4 hover:underline cursor-pointer">
                    {event.txHash}
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Device Detail */}
      {selectedDevice && (
        <Card className="border-border border-accent/30 bg-accent/5">
          <CardHeader>
            <CardTitle>Device: {selectedDevice.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Device ID</p>
                <p className="font-mono text-sm mt-1 text-accent">{selectedDevice.id}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Type</p>
                <p className="font-semibold text-sm mt-1">{selectedDevice.type}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <Badge className="mt-1" variant={selectedDevice.status === "online" ? "default" : "secondary"}>
                  {selectedDevice.status}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Accesses</p>
                <p className="font-semibold text-lg mt-1">{selectedDevice.totalAccesses}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="bg-transparent gap-2"
                onClick={() => handleLockUnlock(selectedDevice.id, "lock")}
              >
                <Lock className="w-4 h-4" />
                Lock Device
              </Button>
              <Button
                variant="outline"
                className="bg-transparent gap-2"
                onClick={() => handleLockUnlock(selectedDevice.id, "unlock")}
              >
                <Unlock className="w-4 h-4" />
                Unlock Device
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Device Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New IoT Device</DialogTitle>
            <DialogDescription>Register a new IoT device for access control</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Device Name</label>
              <Input
                placeholder="e.g., Main Entrance"
                value={newDeviceName}
                onChange={(e) => setNewDeviceName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Device Type</label>
              <select
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm"
                value={newDeviceType}
                onChange={(e) => setNewDeviceType(e.target.value)}
              >
                <option value="RFID Reader">RFID Reader</option>
                <option value="Biometric">Biometric</option>
                <option value="Keypad">Keypad</option>
                <option value="Card Reader">Card Reader</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1 bg-accent hover:bg-accent-dark text-primary-darker"
                onClick={handleAddDevice}
                disabled={!newDeviceName.trim()}
              >
                Add Device
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
