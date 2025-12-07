"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import {
  LayoutDashboard,
  FileText,
  Users,
  DotSquare as LogSquare,
  Workflow,
  Shield,
  Puzzle,
  Radio,
  BarChart3,
  MessageSquare,
  Settings,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const modules = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Files",
    icon: FileText,
    href: "/dashboard/files",
  },
  {
    label: "KYC",
    icon: Users,
    href: "/dashboard/kyc",
  },
  {
    label: "Audit",
    icon: LogSquare,
    href: "/dashboard/audit",
  },
  {
    label: "Workflows",
    icon: Workflow,
    href: "/dashboard/workflows",
  },
  {
    label: "Policy",
    icon: Shield,
    href: "/dashboard/policy",
  },
  {
    label: "Plugins",
    icon: Puzzle,
    href: "/dashboard/plugins",
  },
  {
    label: "IoT",
    icon: Radio,
    href: "/dashboard/iot",
  },
  {
    label: "Metrics",
    icon: BarChart3,
    href: "/dashboard/metrics",
  },
  {
    label: "Chat",
    icon: MessageSquare,
    href: "/dashboard/chat",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "border-r border-border bg-card transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image src="/viperqb-logo.png" alt="ViperQB Logo" width={36} height={36} className="flex-shrink-0" />
          {!collapsed && <span className="font-bold text-lg">ViperQB</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-2">
        {modules.map((module) => {
          const Icon = module.icon
          const isActive = pathname === module.href || (module.href === "/dashboard" && pathname === "/dashboard")

          return (
            <Link
              key={module.href}
              href={module.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-accent text-primary-darker shadow-lg"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/10",
              )}
              title={collapsed ? module.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{module.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-all"
        >
          <ChevronDown className={cn("w-4 h-4 transition-transform", collapsed ? "rotate-90" : "-rotate-90")} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  )
}
