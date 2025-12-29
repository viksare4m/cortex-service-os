"use client"

import React, { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import {
    Search,
    Layers,
    Users,
    Orbit as OrbitIcon,
    Vault as VaultIcon,
    MessageSquare,
    Activity,
    Settings,
    Home,
    LogOut,
    User
} from 'lucide-react'

export function CommandPalette() {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    // Toggle the menu when ⌘K is pressed
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    const runCommand = (command: () => void) => {
        setOpen(false)
        command()
    }

    return (
        <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Global Command Palette"
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4"
        >
            {/* Overlay */}
            <div className="fixed inset-0 bg-background/60 backdrop-blur-sm animate-in fade-in duration-300 pointer-events-none" />

            <div className="w-full max-w-[600px] bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-300 z-10">
                <div className="flex items-center border-b border-border px-4 py-3">
                    <Search className="w-5 h-5 text-muted-foreground mr-3" />
                    <Command.Input
                        placeholder="Search modules, people, or commands..."
                        className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground h-10"
                    />
                </div>

                <Command.List className="max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
                    <Command.Empty className="p-8 text-center text-sm text-muted-foreground">
                        No results found.
                    </Command.Empty>

                    <Command.Group heading="Navigation" className="px-2 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                        <Command.Item
                            onSelect={() => runCommand(() => router.push('/'))}
                            className="flex items-center px-3 py-3 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground group mb-1"
                        >
                            <Home className="w-4 h-4 mr-3 text-muted-foreground group-hover:text-primary" />
                            <span className="text-sm font-medium">Command Center</span>
                            <kbd className="ml-auto text-[10px] bg-muted/50 px-1.5 py-0.5 rounded font-mono text-muted-foreground">G H</kbd>
                        </Command.Item>

                        <Command.Item
                            onSelect={() => runCommand(() => router.push('/flux'))}
                            className="flex items-center px-3 py-3 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground group mb-1"
                        >
                            <Layers className="w-4 h-4 mr-3 text-muted-foreground group-hover:text-primary" />
                            <span className="text-sm font-medium">Flux</span>
                            <kbd className="ml-auto text-[10px] bg-muted/50 px-1.5 py-0.5 rounded font-mono text-muted-foreground">G F</kbd>
                        </Command.Item>

                        <Command.Item
                            onSelect={() => runCommand(() => router.push('/people'))}
                            className="flex items-center px-3 py-3 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground group mb-1"
                        >
                            <Users className="w-4 h-4 mr-3 text-muted-foreground group-hover:text-primary" />
                            <span className="text-sm font-medium">People</span>
                            <kbd className="ml-auto text-[10px] bg-muted/50 px-1.5 py-0.5 rounded font-mono text-muted-foreground">G P</kbd>
                        </Command.Item>

                        <Command.Item
                            onSelect={() => runCommand(() => router.push('/orbit'))}
                            className="flex items-center px-3 py-3 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground group mb-1"
                        >
                            <OrbitIcon className="w-4 h-4 mr-3 text-muted-foreground group-hover:text-primary" />
                            <span className="text-sm font-medium">Orbit (CRM)</span>
                            <kbd className="ml-auto text-[10px] bg-muted/50 px-1.5 py-0.5 rounded font-mono text-muted-foreground">G O</kbd>
                        </Command.Item>
                    </Command.Group>

                    <Command.Group heading="Account" className="mt-4 px-2 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                        <Command.Item
                            onSelect={() => runCommand(() => router.push('/settings'))}
                            className="flex items-center px-3 py-3 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground group mb-1"
                        >
                            <Settings className="w-4 h-4 mr-3 text-muted-foreground group-hover:text-primary" />
                            <span className="text-sm font-medium">Settings</span>
                            <kbd className="ml-auto text-[10px] bg-muted/50 px-1.5 py-0.5 rounded font-mono text-muted-foreground">G S</kbd>
                        </Command.Item>

                        <Command.Item
                            onSelect={() => runCommand(() => {
                                // Handle logout if needed, otherwise just redirect
                                router.push('/auth/login')
                            })}
                            className="flex items-center px-3 py-3 rounded-md hover:bg-destructive/10 hover:text-destructive cursor-pointer transition-colors aria-selected:bg-destructive/10 aria-selected:text-destructive group"
                        >
                            <LogOut className="w-4 h-4 mr-3 text-muted-foreground group-hover:text-destructive" />
                            <span className="text-sm font-medium">Sign Out</span>
                        </Command.Item>
                    </Command.Group>
                </Command.List>

                <div className="flex items-center justify-between border-t border-border px-4 py-3 bg-muted/10 text-[10px] text-muted-foreground font-mono">
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                            <kbd className="bg-muted px-1.5 py-0.5 rounded mr-1">↑↓</kbd> ARROW KEYS
                        </span>
                        <span className="flex items-center">
                            <kbd className="bg-muted px-1.5 py-0.5 rounded mr-1">↵</kbd> ENTER
                        </span>
                    </div>
                    <span className="flex items-center">
                        <kbd className="bg-muted px-1.5 py-0.5 rounded mr-1">ESC</kbd> CLOSE
                    </span>
                </div>
            </div>
        </Command.Dialog>
    )
}
