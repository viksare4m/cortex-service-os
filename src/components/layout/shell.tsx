import { AppSidebar } from "@/components/layout/app-sidebar"

interface ShellProps {
    children: React.ReactNode
}

export function Shell({ children }: ShellProps) {
    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground">
            <AppSidebar />
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative">
                <div className="mx-auto max-w-7xl animate-in fade-in duration-500">
                    {children}
                </div>
                {/* Background ambient glow */}
                <div className="fixed top-0 right-0 -z-10 h-[500px] w-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            </main>
        </div>
    )
}
