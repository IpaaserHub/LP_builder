# LP Builder 開発環境構築ガイド

## 🚀 Phase 1-3: 開発環境構築

このガイドでは、LP Builder プロジェクトの開発環境構築手順を説明します。

## 📋 必要条件

### システム要件
- Node.js 18.0 以上
- pnpm 8.0 以上
- Git 2.0 以上

### 技術スタック
- **フレームワーク**: Next.js 15
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **UIライブラリ**: shadcn/ui
- **パッケージマネージャー**: pnpm（必須）

## 🔧 環境変数設定

### 1. 環境変数ファイルの作成
プロジェクトルートに `.env.local` ファイルを作成してください：

```bash
cp .env.example .env.local
```

### 2. 必要な環境変数
以下の環境変数を設定してください：

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

## 🏗️ プロジェクト構造

```
lp-builder/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx          # ホームページ
│   ├── globals.css       # グローバルスタイル
│   └── api/              # API ルート
├── components/            # React コンポーネント
│   ├── ui/               # shadcn/ui コンポーネント
│   ├── layout/           # レイアウトコンポーネント
│   ├── forms/            # フォームコンポーネント
│   ├── editor/           # LPエディターコンポーネント
│   ├── preview/          # プレビューコンポーネント
│   └── analytics/        # アナリティクスコンポーネント
├── lib/                   # ライブラリ設定
│   ├── utils.ts          # ユーティリティ関数
│   ├── supabase.ts       # Supabase クライアント
│   ├── ai.ts             # AI SDK 設定
│   └── validations.ts    # Zod バリデーション
├── hooks/                # カスタムReactフック
├── store/                # Zustand状態管理
│   ├── editor-store.ts   # エディター状態
│   └── project-store.ts  # プロジェクト状態
├── types/                # TypeScript型定義
│   └── index.ts          # メイン型定義
└── utils/                # ヘルパー関数
```

## 🛠️ 開発コマンド

### パッケージ管理
```bash
# 依存関係のインストール
pnpm install

# 新しいパッケージの追加
pnpm add package-name

# 開発依存関係の追加
pnpm add -D package-name
```

### 開発サーバー
```bash
# 開発サーバーの起動（Turbopack使用）
pnpm dev

# 本番ビルド
pnpm build

# 本番サーバーの起動
pnpm start

# リンターの実行
pnpm lint
```

### shadcn/ui コンポーネント管理
```bash
# 新しいコンポーネントの追加
pnpm dlx shadcn@latest add component-name

# 利用可能なコンポーネント一覧
pnpm dlx shadcn@latest add
```

## 📦 インストール済みコンポーネント

### 基本UI コンポーネント
- ✅ Button
- ✅ Card
- ✅ Dialog
- ✅ Dropdown Menu
- ✅ Input
- ✅ Label
- ✅ Select
- ✅ Textarea
- ✅ Form
- ✅ Tabs
- ✅ Badge
- ✅ Sonner (Toast)

### 必要に応じて追加
```bash
# その他の推奨コンポーネント
pnpm dlx shadcn@latest add alert
pnpm dlx shadcn@latest add avatar
pnpm dlx shadcn@latest add breadcrumb
pnpm dlx shadcn@latest add progress
pnpm dlx shadcn@latest add skeleton
pnpm dlx shadcn@latest add switch
pnpm dlx shadcn@latest add table
```

## 🎨 スタイリング設定

### Tailwind CSS v4
- PostCSS プラグインとして設定済み
- カスタムテーマ変数が `globals.css` で定義済み
- ダークモード対応済み

### テーマカスタマイズ
`app/globals.css` の CSS 変数を編集してテーマをカスタマイズできます：

```css
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.13 0.028 261.692);
  /* ... その他のカラー変数 */
}
```

## 🔍 Git 設定

### ブランチ戦略
- **main**: 本番環境用ブランチ
- **feature/xxx**: 機能開発用ブランチ
- **hotfix/xxx**: 緊急修正用ブランチ

### Git フック（推奨）
```bash
# pre-commit フックの設定
echo '#!/bin/sh\nnpm run lint' > .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

## 🚀 動作確認

### 1. 開発サーバーの起動
```bash
pnpm dev
```

### 2. ブラウザでアクセス
http://localhost:3000

### 3. 基本機能の確認
- [ ] ページが正常に表示される
- [ ] Tailwind CSS が適用されている
- [ ] TypeScript エラーがない
- [ ] リンターエラーがない

## 🔧 トラブルシューティング

### よくある問題

#### 1. pnpm コマンドが見つからない
```bash
# pnpm のインストール
npm install -g pnpm
```

#### 2. TypeScript エラー
```bash
# 型定義の再インストール
pnpm install --force
```

#### 3. Next.js ビルドエラー
```bash
# Next.js キャッシュのクリア
pnpm dlx next clean
pnpm build
```

#### 4. Tailwind CSS が効かない
- `postcss.config.mjs` の設定を確認
- `globals.css` の `@import` 文を確認

## 📊 パフォーマンス最適化

### 推奨設定
- Turbopack 使用（開発時）
- 自動コード分割
- 画像最適化
- フォント最適化

### 監視ツール
```bash
# バンドルサイズ分析
pnpm dlx @next/bundle-analyzer
```

## 🔗 追加リソース

### ドキュメント
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### 開発ツール
- [VS Code Extensions](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Browser DevTools](https://developer.chrome.com/docs/devtools)

## ✅ 完了チェックリスト

Phase 1-3 の完了条件：

- [ ] 環境変数が適切に設定されている
- [ ] Git リポジトリが設定済み
- [ ] pnpm が使用可能
- [ ] shadcn/ui が初期化されている
- [ ] 開発サーバーが正常に起動する
- [ ] TypeScript エラーがない
- [ ] 基本的なコンポーネントが動作する

すべての項目が完了したら、Phase 1-4 に進んでください。 