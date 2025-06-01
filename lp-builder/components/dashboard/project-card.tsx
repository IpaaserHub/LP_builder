import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { 
  MoreHorizontal, 
  Edit3, 
  Copy, 
  ExternalLink, 
  Archive, 
  Trash2,
  Eye,
  TrendingUp
} from "lucide-react"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description?: string
    status: "draft" | "published" | "archived"
    views?: number
    conversions?: number
    createdAt: string
    updatedAt: string
    thumbnail?: string
    url?: string
  }
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const statusColors = {
    draft: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    published: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    archived: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatNumber = (num?: number) => {
    if (!num) return "0"
    return num.toLocaleString()
  }

  return (
    <Card className={cn("group transition-all hover:shadow-md", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <Link 
              href={`/projects/${project.id}`}
              className="font-semibold text-sm leading-none tracking-tight hover:underline"
            >
              {project.title}
            </Link>
            {project.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">プロジェクトメニューを開く</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href={`/projects/${project.id}/edit`}>
                  <Edit3 className="mr-2 h-4 w-4" />
                  編集
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                複製
              </DropdownMenuItem>
              {project.status === "published" && project.url && (
                <DropdownMenuItem asChild>
                  <Link href={project.url} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    サイトを表示
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" />
                アーカイブ
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                削除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <Badge 
            variant="secondary" 
            className={cn("capitalize", statusColors[project.status])}
          >
            {project.status === "draft" && "下書き"}
            {project.status === "published" && "公開中"}
            {project.status === "archived" && "アーカイブ"}
          </Badge>
          
          {project.status === "published" && (
            <>
              <div className="flex items-center">
                <Eye className="mr-1 h-3 w-3" />
                {formatNumber(project.views)}
              </div>
              {project.conversions !== undefined && (
                <div className="flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  {formatNumber(project.conversions)}
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-0">
        <span className="text-xs text-muted-foreground">
          更新: {formatDate(project.updatedAt)}
        </span>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/projects/${project.id}`}>
              詳細
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={`/projects/${project.id}/edit`}>
              編集
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

interface ProjectGridProps {
  projects: ProjectCardProps["project"][]
  className?: string
}

export function ProjectGrid({ projects, className }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <TrendingUp className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">プロジェクトがありません</h3>
        <p className="text-muted-foreground mb-4">
          最初のランディングページを作成してみましょう
        </p>
        <Button asChild>
          <Link href="/projects/new">
            新しいプロジェクト
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
} 