import { generateText, generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'

// LP生成用のスキーマ
export const lpContentSchema = z.object({
  title: z.string().describe('LP のメインタイトル'),
  subtitle: z.string().describe('サブタイトル'),
  heroSection: z.object({
    headline: z.string().describe('ヒーローセクションの見出し'),
    description: z.string().describe('ヒーローセクションの説明文'),
    ctaText: z.string().describe('メインCTAボタンのテキスト'),
  }),
  features: z.array(
    z.object({
      title: z.string().describe('機能のタイトル'),
      description: z.string().describe('機能の説明'),
      icon: z.string().describe('機能のアイコン名（lucide-react）'),
    })
  ).describe('主要機能・特徴のリスト'),
  testimonials: z.array(
    z.object({
      name: z.string().describe('顧客名'),
      role: z.string().describe('顧客の役職・肩書き'),
      content: z.string().describe('顧客の声'),
      rating: z.number().min(1).max(5).describe('評価（1-5）'),
    })
  ).describe('顧客の声'),
  pricing: z.object({
    title: z.string().describe('料金セクションのタイトル'),
    description: z.string().describe('料金の説明'),
    plans: z.array(
      z.object({
        name: z.string().describe('プラン名'),
        price: z.string().describe('価格表示'),
        features: z.array(z.string()).describe('プランの機能リスト'),
        recommended: z.boolean().describe('おすすめプランかどうか'),
      })
    ),
  }),
})

export type LPContent = z.infer<typeof lpContentSchema>

// LP生成関数
export async function generateLPContent(
  businessDescription: string,
  targetAudience: string,
  keyFeatures: string[],
  tone: 'professional' | 'friendly' | 'urgent' | 'luxury' = 'professional'
) {
  const result = await generateObject({
    model: openai('gpt-4-turbo-preview'),
    schema: lpContentSchema,
    prompt: `
      以下の情報を基に、効果的なランディングページのコンテンツを日本語で生成してください：

      ビジネス概要: ${businessDescription}
      ターゲット: ${targetAudience}
      主要機能: ${keyFeatures.join(', ')}
      トーン: ${tone}

      以下の点を考慮してください：
      - ターゲットの痛みや課題を明確に把握し、それを解決する価値提案を含める
      - CTAは行動を促す明確で魅力的な文言にする
      - 機能は具体的なベネフィットと合わせて説明する
      - 顧客の声は信頼性の高い具体的な内容にする
      - 料金プランは価値を感じられる構成にする
    `,
  })

  return result.object
}

// テキスト生成（汎用）
export async function generateText_AI(prompt: string) {
  const result = await generateText({
    model: openai('gpt-4-turbo-preview'),
    prompt,
  })

  return result.text
} 