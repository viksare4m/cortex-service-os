"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

import { createClient } from "@/lib/supabase/server"

export async function login(formData: FormData) {
    try {
        const supabase = await createClient()

        const email = formData.get("email") as string
        const password = formData.get("password") as string

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            redirect("/auth/login?error=" + encodeURIComponent(error.message))
        }

        revalidatePath("/", "layout")
    } catch (e) {
        if ((e as Error).message === "NEXT_REDIRECT") {
            throw e
        }
        console.error(e)
        redirect("/auth/login?error=" + encodeURIComponent("Authentication failed. Check server logs."))
    }
    redirect("/")
}

export async function signup(formData: FormData) {
    try {
        const supabase = await createClient()

        const email = formData.get("email") as string
        const password = formData.get("password") as string

        const origin = (await headers()).get("origin")

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
            },
        })

        if (error) {
            redirect("/auth/login?error=" + encodeURIComponent(error.message))
        }

        if (data?.user && !data.session) {
            redirect("/auth/login?message=Check your email to confirm your account.")
        }

        revalidatePath("/", "layout")
    } catch (e) {
        if ((e as Error).message === "NEXT_REDIRECT") {
            throw e
        }
        console.error(e)
        redirect("/auth/login?error=" + encodeURIComponent("Signup failed. Check server logs."))
    }
    redirect("/")
}
