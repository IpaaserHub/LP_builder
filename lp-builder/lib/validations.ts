import { z } from 'zod'

// プロジェクト作成のバリデーション
export const createProjectSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(100, 'タイトルは100文字以内で入力してください'),
  description: z.string().max(500, '説明は500文字以内で入力してください').optional(),
  businessDescription: z.string().min(10, 'ビジネス概要は10文字以上で入力してください'),
  targetAudience: z.string().min(5, 'ターゲット層は5文字以上で入力してください'),
  keyFeatures: z.array(z.string().min(1)).min(1, '少なくとも1つの主要機能を入力してください'),
  tone: z.enum(['professional', 'friendly', 'urgent', 'luxury']).default('professional'),
})

// プロジェクト更新のバリデーション
export const updateProjectSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(100, 'タイトルは100文字以内で入力してください').optional(),
  description: z.string().max(500, '説明は500文字以内で入力してください').optional(),
  content: z.any().optional(), // JSONB形式のコンテンツ
  isPublished: z.boolean().optional(),
})

// ユーザープロフィール更新のバリデーション
export const updateProfileSchema = z.object({
  fullName: z.string().min(1, '名前は必須です').max(50, '名前は50文字以内で入力してください').optional(),
  avatarUrl: z.string().url('有効なURLを入力してください').optional(),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema> 