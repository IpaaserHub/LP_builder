# LP Builder セットアップガイド

## 🚀 Phase 1-2: 外部サービス設定

このガイドでは、LP Builderアプリケーションに必要な外部サービスの設定方法を説明します。

## 📋 必要なサービス

### 1. Supabase 設定

1. [Supabase](https://supabase.com) にアクセスし、アカウントを作成
2. 新しいプロジェクトを作成
3. **Project Settings** → **API** から以下の情報を取得：
   - `Project URL`
   - `anon` key
   - `service_role` key（管理操作用）

### 2. Clerk 設定

1. [Clerk](https://clerk.com) にアクセスし、アカウントを作成
2. 新しいアプリケーションを作成
3. **API Keys** から以下の情報を取得：
   - `Publishable key`
   - `Secret key`
4. **OAuth providers** で Google, GitHub等を設定（オプション）

### 3. OpenAI 設定

1. [OpenAI Platform](https://platform.openai.com) にアクセス
2. **API keys** セクションで新しいAPIキーを作成
3. 適切な使用制限を設定

## 🔧 環境変数設定

`.env.local` ファイルを作成し、以下の内容を設定してください：

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🗄️ データベーススキーマ設定

Supabaseの **SQL Editor** で以下のSQLを実行してください：

```sql
-- Profiles テーブル (Clerkユーザー情報の拡張)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Projects テーブル
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB,
  template_id UUID,
  published_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Templates テーブル
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT,
  preview_image TEXT,
  content JSONB NOT NULL,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Analytics テーブル
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  data JSONB,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- インデックス作成
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_analytics_project_id ON analytics(project_id);
CREATE INDEX idx_analytics_timestamp ON analytics(timestamp DESC);

-- RLS (Row Level Security) 設定
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Profiles RLS ポリシー
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Projects RLS ポリシー
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

-- Analytics RLS ポリシー
CREATE POLICY "Users can view own analytics" ON analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = analytics.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own analytics" ON analytics
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = analytics.project_id 
      AND projects.user_id = auth.uid()
    )
  );
```

## 🔄 Webhooks設定 (Clerk)

Clerkでユーザー情報をSupabaseと同期するためのWebhookを設定：

1. Clerk Dashboardで **Webhooks** セクションに移動
2. **Add Endpoint** をクリック
3. **Endpoint URL**: `https://your-domain.com/api/webhooks/clerk`
4. **Events**: `user.created`, `user.updated`, `user.deleted` を選択

## ✅ 完了確認

以下の項目が完了していることを確認してください：

- [ ] Supabaseプロジェクトが作成され、APIキーが取得済み
- [ ] Clerkアプリケーションが作成され、APIキーが取得済み
- [ ] OpenAI APIキーが取得済み
- [ ] `.env.local` ファイルが正しく設定済み
- [ ] Supabaseでデータベーススキーマが作成済み
- [ ] RLS ポリシーが設定済み
- [ ] ClerkのWebhook設定が完了済み

## 🎯 次のステップ

外部サービス設定が完了したら、次は **Phase 1-3: 開発環境構築** に進みます：

1. アプリケーションの動作確認
2. shadcn/uiコンポーネントのテスト
3. 基本的なページ構造の作成

## 🚨 トラブルシューティング

### よくある問題

1. **Supabase接続エラー**
   - プロジェクトURLとAPIキーが正しいことを確認
   - ネットワーク設定を確認

2. **Clerk認証エラー**
   - Publishable KeyとSecret Keyが正しいことを確認
   - リダイレクトURLが正しく設定されているか確認

3. **OpenAI API エラー**
   - APIキーが有効で、使用制限に達していないことを確認
   - 請求情報が正しく設定されているか確認

## 📞 サポート

問題が発生した場合は、プロジェクトのIssueセクションで報告してください。 