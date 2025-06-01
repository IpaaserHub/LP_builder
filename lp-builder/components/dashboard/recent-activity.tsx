import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  FileText, 
  Edit, 
  Globe, 
  Archive, 
  Copy, 
  Trash2,
  Clock,
  Eye,
  ExternalLink
} from "lucide-react"

export interface Activity {
  id: string
  type: "created" | "updated" | "published" | "archived" | "duplicated" | "deleted" | "viewed"
  projectId: string
  projectTitle: string
  description: string
  timestamp: string
  user?: {
    name: string
    avatar?: string
  }
  metadata?: Record<string, any>
}

interface RecentActivityProps {
  activities: Activity[]
  className?: string
}

export function RecentActivity({ activities, className }: RecentActivityProps) {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "created":
        return FileText
      case "updated":
        return Edit
      case "published":
        return Globe
      case "archived":
        return Archive
      case "duplicated":
        return Copy
      case "deleted":
        return Trash2
      case "viewed":
        return Eye
      default:
        return Clock
    }
  }

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "created":
        return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900"
      case "updated":
        return "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900"
      case "published":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900"
      case "archived":
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900"
      case "duplicated":
        return "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900"
      case "deleted":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900"
      case "viewed":
        return "text-cyan-600 bg-cyan-100 dark:text-cyan-400 dark:bg-cyan-900"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const getActivityLabel = (type: Activity["type"]) => {
    switch (type) {
      case "created":
        return "作成"
      case "updated":
        return "更新"
      case "published":
        return "公開"
      case "archived":
        return "アーカイブ"
      case "duplicated":
        return "複製"
      case "deleted":
        return "削除"
      case "viewed":
        return "閲覧"
      default:
        return "活動"
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const activityTime = new Date(timestamp)
    const diffInSeconds = Math.floor((now.getTime() - activityTime.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "たった今"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes}分前`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours}時間前`
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days}日前`
    } else {
      return activityTime.toLocaleDateString("ja-JP", {
        month: "short",
        day: "numeric",
      })
    }
  }

  if (activities.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg">最近の活動</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Clock className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">まだ活動がありません</p>
            <p className="text-sm text-muted-foreground">
              プロジェクトを作成すると活動履歴が表示されます
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">最近の活動</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/activity">
            すべて表示
            <ExternalLink className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.slice(0, 10).map((activity) => {
          const Icon = getActivityIcon(activity.type)
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full",
                  getActivityColor(activity.type)
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {getActivityLabel(activity.type)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm font-medium mt-1">
                  <Link 
                    href={`/projects/${activity.projectId}`}
                    className="hover:underline"
                  >
                    {activity.projectTitle}
                  </Link>
                </p>
                
                {activity.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {activity.description}
                  </p>
                )}
                
                {activity.user && (
                  <p className="text-xs text-muted-foreground mt-1">
                    by {activity.user.name}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

// Mock data generator for testing
export const generateMockActivities = (count: number = 10): Activity[] => {
  const types: Activity["type"][] = ["created", "updated", "published", "archived", "duplicated", "viewed"]
  const projectTitles = [
    "SaaS Landing Page",
    "E-commerce Store",
    "Portfolio Site",
    "Product Launch",
    "Event Registration",
    "Newsletter Signup"
  ]
  
  return Array.from({ length: count }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)]
    const projectTitle = projectTitles[Math.floor(Math.random() * projectTitles.length)]
    
    return {
      id: `activity-${i}`,
      type,
      projectId: `project-${i}`,
      projectTitle,
      description: `${projectTitle} を${getActivityLabel(type)}しました`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      user: {
        name: "田中龍都",
      },
    }
  })
  
  function getActivityLabel(type: Activity["type"]) {
    switch (type) {
      case "created": return "作成"
      case "updated": return "更新"
      case "published": return "公開"
      case "archived": return "アーカイブ"
      case "duplicated": return "複製"
      case "deleted": return "削除"
      case "viewed": return "閲覧"
      default: return "活動"
    }
  }
} 