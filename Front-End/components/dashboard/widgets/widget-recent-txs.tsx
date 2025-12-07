"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

const transactions = [
  {
    module: "File Transfer",
    event: "upload_complete",
    hash: "0x8f2b3...a1e2",
    fullHash: "0x8f2b3c9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a1e2",
    time: "2m ago",
    details: "contract-agreement.pdf uploaded with AES-256 encryption",
    status: "verified",
  },
  {
    module: "KYC",
    event: "verification_approved",
    hash: "0x4c9d5...f3b8",
    fullHash: "0x4c9d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1f3b8",
    time: "5m ago",
    details: "User alice@example.com KYC approved with 98% liveness score",
    status: "verified",
  },
  {
    module: "Audit",
    event: "log_verified",
    hash: "0x2a1e7...c9f4",
    fullHash: "0x2a1e7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3c9f4",
    time: "12m ago",
    details: "1000 audit logs exported and verified on-chain",
    status: "verified",
  },
  {
    module: "IoT",
    event: "access_granted",
    hash: "0x9b4f2...e8d1",
    fullHash: "0x9b4f2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8e8d1",
    time: "15m ago",
    details: "Door access granted to Device-042 at Building A",
    status: "verified",
  },
  {
    module: "File Transfer",
    event: "download_verified",
    hash: "0x1f3c8...b2a6",
    fullHash: "0x1f3c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b2a6",
    time: "28m ago",
    details: "financial-report-Q4.xlsx downloaded and integrity verified",
    status: "verified",
  },
]

export function WidgetRecentTxs() {
  const [selectedTx, setSelectedTx] = useState<(typeof transactions)[0] | null>(null)

  return (
    <Card className="border-[#244217] bg-[#1a2b1c]">
      <CardHeader>
        <CardTitle className="text-[#e9dcc7]">Recent Chain Events</CardTitle>
        <CardDescription className="text-[#b8c5b9]">Last 5 blockchain commits</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {transactions.map((tx, i) => (
            <div key={i} className="animate-slide-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="p-3 bg-[#0f1a10] rounded-lg hover:bg-[#244217]/30 transition-all border border-[#244217]/50">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#e9dcc7] truncate">{tx.module}</p>
                    <p className="text-xs text-[#b8c5b9] truncate">{tx.event}</p>
                  </div>
                  <Badge className="bg-[#83ca4d]/20 text-[#83ca4d] border-[#83ca4d]/30 text-xs whitespace-nowrap">
                    {tx.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-xs font-mono text-[#83ca4d] truncate">{tx.hash}</span>
                    <Link href={`https://etherscan.io/tx/${tx.fullHash}`} target="_blank" className="flex-shrink-0">
                      <ExternalLink className="w-3 h-3 text-[#b8c5b9] hover:text-[#83ca4d] transition-colors" />
                    </Link>
                  </div>
                  <span className="text-xs text-[#b8c5b9] whitespace-nowrap">{tx.time}</span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 h-7 text-xs text-[#83ca4d] hover:text-[#83ca4d] hover:bg-[#244217]/30"
                  onClick={() => setSelectedTx(selectedTx?.hash === tx.hash ? null : tx)}
                >
                  {selectedTx?.hash === tx.hash ? (
                    <>
                      <ChevronUp className="w-3 h-3 mr-1" /> Hide Details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3 mr-1" /> See More
                    </>
                  )}
                </Button>

                {selectedTx?.hash === tx.hash && (
                  <div className="mt-3 pt-3 border-t border-[#244217] animate-fade-in space-y-2">
                    <div>
                      <p className="text-xs text-[#b8c5b9] mb-1">Details</p>
                      <p className="text-xs text-[#e9dcc7]">{tx.details}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#b8c5b9] mb-1">Full Transaction Hash</p>
                      <p className="text-xs font-mono text-[#83ca4d] break-all">{tx.fullHash}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
