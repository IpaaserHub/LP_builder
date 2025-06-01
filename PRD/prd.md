# Project Overview(プロジェクト概要)

LP Builderは、AIエージェントを活用してランディングページを自動生成するWebサービスです。ユーザーは簡単な入力（業界、目的、ターゲット層など）を提供するだけで、美しく効果的なランディングページを短時間で作成できます。

## ターゲットユーザー
- スタートアップ企業の創業者・マーケター
- 中小企業のデジタルマーケティング担当者
- フリーランサー・個人事業主
- Web制作代行を行うエージェンシー

## 解決する課題
- ランディングページ制作にかかる時間とコストの削減
- デザインスキルがなくても高品質なLPを作成可能
- A/Bテスト用の複数バリエーション生成の効率化
- モバイル対応・SEO最適化の自動化

# Core Functionalities(主要機能)

## 1. AIによるLP自動生成
- **入力情報**: 業界、商品/サービス、ターゲット層、目的（リード獲得、販売など）
- **生成内容**: ヘッダー、ヒーローセクション、特徴・メリット、価格表、CTA、フッター
- **カスタマイズ**: 色彩、フォント、レイアウトの調整機能

## 2. テンプレート管理
- 業界別テンプレート（SaaS、ECコマース、教育、不動産など）
- 目的別テンプレート（リード獲得、商品販売、イベント集客など）
- カスタムテンプレートの保存・再利用

## 3. リアルタイムプレビュー・編集
- WYSIWYG エディター
- レスポンシブデザインプレビュー（デスクトップ、タブレット、モバイル）
- リアルタイム変更反映

## 4. 公開・ホスティング
- ワンクリック公開
- カスタムドメイン対応
- SSL証明書自動設定
- CDN配信

## 5. ユーザー管理・チーム機能
- プロジェクト管理
- チームメンバー招待・権限管理
- バージョン履歴・ロールバック
- コメント・レビュー機能

# Doc(PRD.mdを参照させる)

このPRDドキュメントは、LP Builderプロジェクトの要求仕様書として機能し、開発チーム全体で共有されます。

## 関連ドキュメント
- 技術仕様書（Technical Specification）
- UIデザインガイドライン
- API仕様書
- セキュリティ要件書
- テスト計画書

## 更新履歴
プロジェクトの進行に伴い、このPRDは継続的に更新されます。変更履歴はGit履歴で管理されます。

# File Structure(ファイル構造)

```
LP_builder/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── .env.local
├── .env.example
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   ├── projects/
│   │   │   ├── templates/
│   │   │   └── settings/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── projects/
│   │   │   ├── ai/
│   │   │   └── analytics/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── layout/             # Layout components
│   │   ├── forms/              # Form components
│   │   ├── editor/             # LP editor components
│   │   ├── preview/            # Preview components
│   │   └── analytics/          # Analytics components
│   │
│   ├── lib/
│   │   ├── auth.ts             # Clerk auth configuration
│   │   ├── supabase.ts         # Supabase client
│   │   ├── ai.ts               # Vercel AI SDK configuration
│   │   ├── utils.ts            # Utility functions
│   │   └── validations.ts      # Zod validation schemas
│   │
│   ├── hooks/                  # Custom React hooks
│   ├── store/                  # State management (Zustand)
│   ├── types/                  # TypeScript type definitions
│   └── utils/                  # Helper functions
│
├── public/
│   ├── images/
│   ├── icons/
│   └── templates/
│
├── docs/                       # Documentation
├── prisma/                     # Database schema (if needed)
└── tests/                      # Test files
```

# Additional Requirements(新規追記要求)

## Implementation Workflow(実装フロー)

### 1. Setup(API, library, etc...)
#### 1.1 プロジェクト初期化
- Next.js 15 プロジェクト作成 `pnpm create next-app@latest`
- TypeScript設定
- Tailwind CSS設定
- ESLint/Prettier設定

#### 1.2 外部サービス設定
- **Supabase**
  - プロジェクト作成
  - データベーススキーマ設計
  - RLS（Row Level Security）設定
  - API キー取得

- **Clerk**
  - アプリケーション作成
  - OAuth プロバイダー設定（Google, GitHub等）
  - Webhook設定
  - API キー取得

- **Vercel AI SDK**
  - OpenAI API キー設定
  - AI モデル選択・設定
  - プロンプト設計

#### 1.3 開発環境構築
- 環境変数設定（`.env.local`）
- Git設定・ブランチ戦略
- パッケージマネージャー（pnpm）設定
- shadcn/ui初期化

### 2. Frontend
#### 2.1 基盤UI構築
- **レイアウトコンポーネント**
  - Header/Navigation
  - Sidebar
  - Footer
  - Loading states

- **shadcn/ui統合**
  - 必要コンポーネントのインストール
  - カスタムテーマ設定
  - コンポーネントライブラリ構築

#### 2.2 主要画面実装

- **認証画面**
  - サインイン/サインアップ
  - パスワードリセット
  - プロフィール設定

- **ダッシュボード**
  - プロジェクト一覧
  - アナリティクス概要
  - 最近の活動

#### 2.3 LP エディター実装
- **エディター機能**
  - ドラッグ&ドロップインターフェース
  - リアルタイムプレビュー
  - レスポンシブ対応切り替え
  - 元に戻す/やり直し機能

- **コンポーネントライブラリ**
  - ヘッダー/フッター
  - ヒーローセクション
  - 特徴セクション
  - 価格表
  - CTA ボタン
  - フォーム

#### 2.4 状態管理
- Zustand ストア設計
- プロジェクト状態管理
- エディター状態管理
- ユーザー設定管理

### 3. Backend
#### 3.1 API Routes構築
- **プロジェクト管理API**
  - CRUD操作（Create, Read, Update, Delete）
  - プロジェクト共有機能
  - バージョン管理

- **AI生成API**
  - LP コンテンツ生成
  - テンプレート推奨
  - SEO最適化提案
  - 画像生成統合

#### 3.2 データ処理
- **ファイル管理**
  - 画像アップロード/最適化
  - テンプレートファイル管理
  - 静的アセット管理

- **分析API**
  - アクセス解析データ取得
  - A/Bテスト結果集計
  - ユーザー行動追跡

#### 3.3 外部サービス統合
- **AI サービス**
  - Vercel AI SDK実装
  - OpenAI GPT連携
  - プロンプトエンジニアリング

- **ホスティング・CDN**
  - Vercel デプロイ設定
  - カスタムドメイン対応
  - SSL証明書自動設定

### 4. Auth
#### 4.1 認証システム構築
- **Clerk統合**
  - ユーザー登録/ログイン
  - セッション管理
  - プロフィール管理

- **権限管理**
  - ロールベースアクセス制御
  - チーム権限設定
  - プロジェクト共有権限

#### 4.2 セキュリティ実装
- **アクセス制御**
  - API認証ミドルウェア
  - ページレベル認証
  - CSRF保護

- **データ保護**
  - 入力値検証
  - XSS対策
  - Rate limiting

### 5. Database
#### 5.1 Supabase スキーマ設計
```sql
-- Users (Clerkで管理、追加情報のみ)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  content JSONB,
  template_id UUID,
  published_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Templates
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT,
  preview_image TEXT,
  content JSONB,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Analytics
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  event_type TEXT,
  data JSONB,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

#### 5.2 RLS (Row Level Security) 設定
- ユーザー固有データの保護
- プロジェクト共有権限制御
- 公開テンプレートへの読み取り専用アクセス

#### 5.3 Real-time機能
- プロジェクト共同編集
- リアルタイム更新通知
- チームメンバー活動状況

### 6. Testing & Deployment
#### 6.1 テスト実装
- Unit tests (Jest/Vitest)
- Integration tests (Cypress/Playwright)
- API tests (Supertest)
- E2E tests

#### 6.2 CI/CD パイプライン
- GitHub Actions設定
- 自動テスト実行
- Vercel自動デプロイ
- 環境別デプロイ戦略

#### 6.3 監視・分析
- エラー監視（Sentry）
- パフォーマンス監視
- ユーザー行動分析
- アップタイム監視

# Stacks
- Database: Supabase
- Auth: Clerk
- AI Framework: Vercel AI Sdk
- UI: shadcn/ui
- frontend framework: next.js 15
- Deployment: Vercel