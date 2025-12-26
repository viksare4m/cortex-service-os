"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Terminal,
    Users,
    Orbit,
    Vault,
    MessageSquare,
    Activity,
    Layers,
    Settings
} from "lucide-react"

const navItems = [
    {
        name: "Flux", href: "/flux", icon: Layers, color: "text-primary", sub: [
            { name: "Kanban", href: "/flux" },
            { name: "Gantt", href: "/flux/gantt" },
            { name: "Gallery", href: "/flux/gallery" },
            { name: "Graph", href: "/flux/graph" },
        ]
    },
    { name: "People", href: "/people", icon: Users },
    { name: "Orbit", href: "/orbit", icon: Orbit },
    { name: "Vault", href: "/vault", icon: Vault },
    { name: "Nexus", href: "/nexus", icon: MessageSquare },
    { name: "Prism", href: "/prism", icon: Activity },
]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col h-full w-[250px] bg-card border-r border-border p-4 space-y-4">
            <div className="flex items-center space-x-2 px-2 py-2">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                    <Terminal className="text-black w-5 h-5" />
                </div>
                <span className="font-bold text-lg tracking-tight text-foreground">CORTEX</span>
            </div>

            <div className="space-y-1 flex-1 overflow-y-auto">
                <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Modules
                </p>
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href)
                    const Icon = item.icon

                    return (
                        <div key={item.href} className="space-y-1">
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 group",
                                    isActive
                                        ? "bg-accent text-accent-foreground shadow-[0_0_15px_rgba(209,243,102,0.1)]"
                                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                                )}
                            >
                                <Icon className={cn("w-5 h-5 group-hover:scale-110 transition-transform", isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
                                <span className="font-medium">{item.name}</span>
                            </Link>

                            {/* Submenu */}
                            {isActive && item.sub && (
                                <div className="ml-9 border-l border-border pl-4 space-y-1">
                                    {item.sub.map(subItem => (
                                        <Link
                                            key={subItem.href}
                                            href={subItem.href}
                                            className={cn("block text-sm py-1 transition-colors",
                                                pathname === subItem.href ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            {subItem.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <div className="mt-auto">
                <Link
                    href="/settings"
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-all"
                >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                </Link>
            </div>
        </div>
    )
}
