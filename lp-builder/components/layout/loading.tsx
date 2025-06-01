import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

// Spinner Component
interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <Loader2 className={cn("animate-spin", sizeClasses[size], className)} />
  )
}

// Loading Overlay
interface LoadingOverlayProps {
  children?: React.ReactNode
  isLoading?: boolean
  className?: string
}

export function LoadingOverlay({ children, isLoading, className }: LoadingOverlayProps) {
  if (!isLoading) return null

  return (
    <div className={cn(
      "absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
      className
    )}>
      <div className="flex flex-col items-center space-y-2">
        <Spinner size="lg" />
        {children && (
          <p className="text-sm text-muted-foreground">{children}</p>
        )}
      </div>
    </div>
  )
}

// Button Loading State
interface LoadingButtonProps {
  children: React.ReactNode
  isLoading?: boolean
  className?: string
}

export function LoadingButton({ children, isLoading, className }: LoadingButtonProps) {
  return (
    <div className={cn("inline-flex items-center", className)}>
      {isLoading && <Spinner size="sm" className="mr-2" />}
      {children}
    </div>
  )
}

// Skeleton Components
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-md bg-muted", className)} />
  )
}

// Page Loading
export function PageLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Spinner size="lg" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

// Project Card Skeleton
export function ProjectCardSkeleton() {
  return (
    <div className="space-y-3 rounded-lg border p-6">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-3/4" />
      <div className="flex space-x-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  )
}

// Project List Skeleton
export function ProjectListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Dashboard Stats Skeleton
export function DashboardStatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2 rounded-lg border p-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
    </div>
  )
}

// Template Grid Skeleton
export function TemplateGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3 rounded-lg border overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Editor Loading
export function EditorLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Spinner size="lg" />
        <div className="text-center">
          <p className="text-sm font-medium">Loading Editor</p>
          <p className="text-xs text-muted-foreground">
            Preparing your workspace...
          </p>
        </div>
      </div>
    </div>
  )
}

// AI Generation Loading
export function AIGenerationLoading() {
  return (
    <div className="flex flex-col items-center space-y-4 p-8">
      <div className="relative">
        <Spinner size="lg" />
        <div className="absolute -inset-2 rounded-full border-2 border-primary/20 animate-ping" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">AI is generating your content</p>
        <p className="text-xs text-muted-foreground">
          This may take a few moments...
        </p>
      </div>
    </div>
  )
} 