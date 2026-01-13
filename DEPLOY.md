# 🚀 Deployment Guide: Cortex ServiceOS

Since the Vercel CLI requires interactive login, please follow these steps to deploy your application.

## 1. Frontend (Vercel)

The easiest way to deploy is via the Vercel CLI, which I've prepared a script for, or via the Git integration.

### Option A: Manual CLI (Recommended)
Run the following in your terminal:

```bash
npx vercel login
npx vercel link
npx vercel deploy --prod
```

### Option B: Git Push
Since I initialized the Git repo, you can simply push to GitHub/GitLab and connect it to Vercel.

1.  Create a new repo on GitHub.
2.  Run:
    ```bash
    git remote add origin <your-repo-url>
    git push -u origin main
    ```
3.  Go to [Vercel Dashboard](https://vercel.com/new), import the repo, and hit **Deploy**.

## 2. Backend (Supabase)

1.  Go to [Supabase Dashboard](https://supabase.com/dashboard).
2.  Create a new project.
3.  Go to **Settings** > **API Keys**.
4.  **IMPORTANT**: Look for the tab labeled **"Legacy anon, service_role API keys"** (next to "Publishable and secret API keys").
5.  Click that tab to reveal your standard keys (they start with `eyJ...`).
6.  Copy the `anon public` key.
7.  Add it to Vercel Environment Variables as `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
    *   *Do NOT use the `sb_publishable_...` key, it will not work.*

8.  **CRITICAL**: Go to **Authentication** > **URL Configuration** in Supabase.
    *   Set **Site URL** to your Vercel URL (e.g., `https://cortex-os.vercel.app`).
    *   Add `https://cortex-os.vercel.app/auth/callback` to **Redirect URLs**.
    *   *Without this, email links will redirect to localhost.*

## 3. Graph Layer (Neo4j AuraDB)

1.  Go to [Neo4j AuraDB](https://aura.neo4j.io/) and create a free instance.
2.  Copy the **Connection URI** (format: `neo4j+s://xxx.databases.neo4j.io`).
3.  Save your **Username** (usually `neo4j`) and **Password**.
4.  Add to Vercel Environment Variables:
    *   `NEO4J_URI=neo4j+s://xxx.databases.neo4j.io`
    *   `NEO4J_USER=neo4j`
    *   `NEO4J_PASSWORD=your-password`

## 4. AI Neural Engine (OpenAI)

1.  Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys).
2.  Add to Vercel Environment Variables:
    *   `OPENAI_API_KEY=sk-...`
3.  The Neural Engine will now generate real AI insights in the PRISM dashboard.

## 5. Environment Variables Summary

In Vercel **Settings** > **Environment Variables**, add:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Neo4j AuraDB
NEO4J_URI=neo4j+s://xxx.databases.neo4j.io
NEO4J_USER=neo4j
NEO4J_PASSWORD=...

# OpenAI
OPENAI_API_KEY=sk-...
```

---
**🚀 System Ready for Launch.**
