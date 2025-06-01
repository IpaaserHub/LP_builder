"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/layout"
import { StatsGrid, ProjectGrid, RecentActivity, generateMockActivities } from "@/components/dashboard"
import { 
  FolderOpen, 
  Eye, 
  TrendingUp, 
  Users, 
  Plus, 
  Search,
  Filter
} from "lucide-react"

// Mock data - これは後でAPIから取得する
const mockStats = [
  {
    title: "総プロジェクト数",
    value: "12",
    description: "今月 +3件",
    icon: FolderOpen,
    trend: {
      value: 25,
      label: "前月比",
      positive: true,
    },
  },
  {
    title: "総ビュー数",
    value: "2,847",
    description: "今月の合計",
    icon: Eye,
    trend: {
      value: 12.5,
      label: "前月比",
      positive: true,
    },
  },
  {
    title: "コンバージョン率",
    value: "3.2%",
    description: "平均値",
    icon: TrendingUp,
    trend: {
      value: -2.1,
      label: "前月比",
      positive: false,
    },
  },
  {
    title: "アクティブユーザー",
    value: "156",
    description: "今月のアクセス",
    icon: Users,
    trend: {
      value: 8.3,
      label: "前月比",
      positive: true,
    },
  },
]

const mockProjects = [
  {
    id: "1",
    title: "SaaS Landing Page",
    description: "新しいSaaSプロダクトのランディングページ。リード獲得に特化したデザイン。",
    status: "published" as const,
    views: 1234,
    conversions: 42,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
    url: "https://example-saas.com",
  },
  {
    id: "2",
    title: "E-commerce Store",
    description: "ファッションブランドのオンラインストア。商品販売がメイン。",
    status: "draft" as const,
    views: 0,
    conversions: 0,
    createdAt: "2024-01-18T09:15:00Z",
    updatedAt: "2024-01-22T16:45:00Z",
  },
  {
    id: "3",
    title: "Portfolio Site",
    description: "デザイナーのポートフォリオサイト。作品展示と問い合わせ獲得。",
    status: "published" as const,
    views: 567,
    conversions: 12,
    createdAt: "2024-01-10T11:20:00Z",
    updatedAt: "2024-01-19T13:10:00Z",
    url: "https://portfolio.example.com",
  },
  {
    id: "4",
    title: "Product Launch",
    description: "新商品のローンチページ。予約注文の受付が目的。",
    status: "archived" as const,
    views: 890,
    conversions: 28,
    createdAt: "2024-01-05T08:30:00Z",
    updatedAt: "2024-01-15T17:20:00Z",
  },
]

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [projectFilter, setProjectFilter] = useState<"all" | "draft" | "published" | "archived">("all")

  const mockActivities = generateMockActivities(8)

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = projectFilter === "all" || project.status === projectFilter
    
    return matchesSearch && matchesFilter
  })

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ダッシュボード</h1>
            <p className="text-muted-foreground">
              プロジェクトの管理と分析を行いましょう
            </p>
          </div>
          <Button asChild>
            <Link href="/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              新しいプロジェクト
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <StatsGrid stats={mockStats} />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Projects Section - 2/3 width */}
          <div className="space-y-6 lg:col-span-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold">最近のプロジェクト</h2>
              
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="プロジェクトを検索..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
                
                <select
                  value={projectFilter}
                  onChange={(e) => setProjectFilter(e.target.value as any)}
                  className="px-3 py-2 text-sm border border-input bg-background rounded-md"
                >
                  <option value="all">すべて</option>
                  <option value="draft">下書き</option>
                  <option value="published">公開中</option>
                  <option value="archived">アーカイブ</option>
                </select>
              </div>
            </div>

            <ProjectGrid projects={filteredProjects} />

            {filteredProjects.length > 0 && (
              <div className="flex justify-center">
                <Button variant="outline" asChild>
                  <Link href="/projects">
                    すべてのプロジェクトを見る
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Recent Activity - 1/3 width */}
          <div className="lg:col-span-1">
            <RecentActivity activities={mockActivities} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">クイックアクション</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
              <Link href="/projects/new">
                <Plus className="h-6 w-6" />
                <span className="text-sm">新規プロジェクト</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
              <Link href="/templates">
                <FolderOpen className="h-6 w-6" />
                <span className="text-sm">テンプレート</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
              <Link href="/analytics">
                <TrendingUp className="h-6 w-6" />
                <span className="text-sm">分析</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
              <Link href="/settings">
                <Users className="h-6 w-6" />
                <span className="text-sm">設定</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 