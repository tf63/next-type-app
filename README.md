## タイピングアプリ (仮)
<!-- ロゴとラベルの色はここから https://simpleicons.org -->
![Node](https://img.shields.io/badge/Node-1.19-339933?logo=nodedotjs)
![Docker](https://img.shields.io/badge/Docker-v24.0.5-2496ED?logo=docker)
![Supabase](https://img.shields.io/badge/Supabase-1.100.1-3FCF8E?logo=supabase)
![Postgres](https://img.shields.io/badge/Postgres-16.1-4169E1?logo=postgresql)
<!-- ![Next CI](https://github.com/tf63/grapescript/actions/workflows/next.yml/badge.svg) -->

### 概要



https://next-type-app-delta.vercel.app/

 <img src="https://skillicons.dev/icons?i=ts,next,vercel,supabase,postgres,docker">
<img width="999" alt="main_scs" src="https://github.com/tf63/next-type-app/assets/74246282/272287a3-b398-481e-a492-c0057448379c">


### 技術選定
| 技術 | 役割 |
| -- | -- |
| Next.js | フレームワーク|
| API Routes | backend |
| CSS Modules | style |
| Supabase | DB |
| Postgres | (Supabase) |
| Vercel | ホスティング |
| Next Auth | 認証 |
| Github Auth | OAuth Provider |
| Supabase Adapter | DB Access |
 
### 基本コマンド
コンテナ周り
```
    # コンテナの立ち上げ
    docker compose up -d
    # コンテナの停止
    docker compose down
    # volumeの削除
    docker volume rm $(docker volume ls | grep -o 'next-type*')
    # nextコンテナをアタッチ
    docker compose exec next /bin/sh
```

開発サーバーの立ち上げ
```bash
    npm run dev
```

ビルド
```bash
    npm run build
```

DB接続
```bash
    # 同一ネットワークのコンテナからpostgresへ接続する場合
    psql 'postgresql://postgres:postgres@supabase_db_next-type-app:5432/postgres'
    # ローカルからpostgresへ接続する場合
    psql 'postgresql://postgres:postgres@localhost:54322/postgres'
```

Supabase周り
```
    # supabaseコンテナの起動
    supabase start
    # supabaseコンテナの停止
    supabase stop
    # remoteのリンク
    supabase link --project-ref <project_id>
    # remoteのスキーマ情報の取得
    supabase db pull
    # マイグレーションファイルの作成
    supabase migration new <migration_name>
    # マイグレーションの適用
    supabase db reset
    # 型情報の作成
    supabase gen types typescript --local > frontend/types/database.types.d.ts 
    # デプロイ
    supabase db remote commit
```

乱数の生成
```
    openssl rand -base64 32
```

### 重要なリンク

next authのsupabase adapter

https://authjs.dev/reference/adapter/supabase

ローカルのsupabaseの導入

https://supabase.com/docs/guides/cli/local-development

sql -> supabase

https://supabase.com/docs/guides/database/sql-to-api

supabaseのtsクライアント

https://supabase.com/docs/reference/javascript

nextからsupabase

https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
