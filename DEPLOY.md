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
3.  Go to the **SQL Editor** in Supabase.
4.  Copy the contents of `schema.sql` (located in the root or artifacts) and run it.
5.  Get your **Project URL** and **Anon Key** from Project Settings > API.
6.  Add them to your Vercel Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).

## 3. Graph Layer (Neo4j)

1.  Use **Neo4j AuraDB** (Free Tier) for a cloud instance.
2.  Get the `NEO4J_URI`, `NEO4J_USER`, and `NEO4J_PASSWORD`.
3.  Add them to Vercel Environment Variables.

---
*System Ready for Launch.*
