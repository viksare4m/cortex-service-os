import { test, expect } from '@playwright/test'

test('Login page renders correctly', async ({ page }) => {
    await page.goto('/auth/login')

    // Check for page title/content
    await expect(page.locator('h1')).toContainText('CORTEX OS')

    // Check for email and password fields
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()

    // Check for login button
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
})

test('Sign up link works', async ({ page }) => {
    await page.goto('/auth/login')

    // Click on Sign Up
    await page.getByRole('button', { name: /sign up/i }).click()

    // Check if button text changed to Sign Up or similar
    await expect(page.getByRole('button', { name: /sign up/i })).toBeVisible()
})
