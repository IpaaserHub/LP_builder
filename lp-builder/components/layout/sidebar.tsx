"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  FolderOpen,
  LayoutTemplate,
  Settings,
  BarChart3,
  FileText,
  Plus,
  Palette,
  Globe,
  Users,
} from "lucide-react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Projects",
      href: "/projects",
      icon: FolderOpen,
      badge: "3", // This would come from actual data
    },
    {
      title: "Templates",
      href: "/templates",
      icon: LayoutTemplate,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
  ]

  const quickActions = [
    {
      title: "New Project",
      href: "/projects/new",
      icon: Plus,
    },
    {
      title: "Browse Templates",
      href: "/templates/browse",
      icon: Palette,
    },
    {
      title: "Published Sites",
      href: "/sites",
      icon: Globe,
    },
  ]

  const bottomNavItems = [
    {
      title: "Team",
      href: "/team",
      icon: Users,
    },
    {
      title: "Documentation",
      href: "/docs",
      icon: FileText,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div className={cn("flex h-full flex-col border-r bg-background", className)}>
      {/* Sidebar Header */}
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-primary" />
          <span className="text-lg font-bold">LP Builder</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-3">
        <div className="space-y-1">
          <div className="px-3 py-2">
            <h2 className="mb-2 text-sm font-semibold tracking-tight">
              Main
            </h2>
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <SidebarItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  title={item.title}
                  badge={item.badge}
                  isActive={pathname === item.href}
                />
              ))}
            </div>
          </div>

          <Separator className="mx-3" />

          <div className="px-3 py-2">
            <h2 className="mb-2 text-sm font-semibold tracking-tight">
              Quick Actions
            </h2>
            <div className="space-y-1">
              {quickActions.map((item) => (
                <SidebarItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  title={item.title}
                  isActive={pathname === item.href}
                  variant="ghost"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="px-3 pb-3">
        <Separator className="mb-3" />
        <div className="space-y-1">
          {bottomNavItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              title={item.title}
              isActive={pathname === item.href}
              variant="ghost"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface SidebarItemProps {
  href: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  badge?: string
  isActive?: boolean
  variant?: "default" | "ghost"
}

function SidebarItem({
  href,
  icon: Icon,
  title,
  badge,
  isActive,
  variant = "default",
}: SidebarItemProps) {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start",
        isActive && variant === "default" && "bg-secondary",
        !isActive && variant === "ghost" && "text-muted-foreground"
      )}
      asChild
    >
      <Link href={href}>
        <Icon className="mr-2 h-4 w-4" />
        {title}
        {badge && (
          <Badge variant="secondary" className="ml-auto">
            {badge}
          </Badge>
        )}
      </Link>
    </Button>
  )
}

// Mobile Sidebar (for use with Sheet)
export function MobileSidebar() {
  return (
    <div className="w-full">
      <Sidebar />
    </div>
  )
} 