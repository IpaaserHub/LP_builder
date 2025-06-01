"use client"

import { useState } from "react"
import { Header } from "./header"
import { Sidebar, MobileSidebar } from "./sidebar"
import { Footer } from "./footer"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

interface MainLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  showFooter?: boolean
  className?: string
}

export function MainLayout({ 
  children, 
  showSidebar = true, 
  showFooter = true,
  className 
}: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        {showSidebar && (
          <aside className="hidden w-64 border-r bg-background lg:block">
            <Sidebar />
          </aside>
        )}

        {/* Mobile Sidebar */}
        {showSidebar && (
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="fixed top-4 left-4 z-40 lg:hidden"
                size="icon"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <MobileSidebar />
            </SheetContent>
          </Sheet>
        )}

        {/* Main Content */}
        <main className={cn("flex-1 overflow-auto", className)}>
          {children}
        </main>
      </div>

      {showFooter && <Footer />}
    </div>
  )
}

// Dashboard Layout - with sidebar
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout showSidebar={true} showFooter={false} className="bg-muted/10">
      <div className="container mx-auto px-4 py-6">
        {children}
      </div>
    </MainLayout>
  )
}

// Auth Layout - without sidebar and footer
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout showSidebar={false} showFooter={false}>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/10">
        {children}
      </div>
    </MainLayout>
  )
}

// Editor Layout - full screen without sidebar
export function EditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  )
}

// Marketing Layout - public pages with footer
export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout showSidebar={false} showFooter={true}>
      {children}
    </MainLayout>
  )
}

// Clean Layout - minimal layout for specific pages
export function CleanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
} 