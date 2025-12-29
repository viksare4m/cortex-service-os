import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { AppSidebar } from '@/components/layout/app-sidebar'

// Mock next/navigation
vi.mock('next/navigation', () => ({
    usePathname: vi.fn(() => '/flux'),
}))

test('AppSidebar renders correctly', () => {
    render(<AppSidebar />)

    // Check for the brand name
    expect(screen.getByText('CORTEX')).toBeInTheDocument()

    // Check for some main module links
    expect(screen.getByText('Flux')).toBeInTheDocument()
    expect(screen.getByText('People')).toBeInTheDocument()
})

test('AppSidebar highlights active item', () => {
    render(<AppSidebar />)

    const fluxLink = screen.getByRole('link', { name: /flux/i })
    // Check if it has the active class (bg-accent)
    expect(fluxLink).toHaveClass('bg-accent')
})
