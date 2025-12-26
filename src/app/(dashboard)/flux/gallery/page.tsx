"use client"

import { useState } from 'react'
import { AnnotationCanvas } from '@/components/flux/annotation-canvas'
import { X, MessageSquare } from 'lucide-react'

// Mock Assets
const ASSETS = [
    { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', title: 'Cyberpunk City Concept_v1' },
    { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop', title: 'Character Sheet_A' },
    { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=3270&auto=format&fit=crop', title: 'Neon Textures' },
]

export default function GalleryPage() {
    const [selectedAsset, setSelectedAsset] = useState<typeof ASSETS[0] | null>(null)

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Asset Gallery</h1>
                <p className="text-muted-foreground">review.creative.flux</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {ASSETS.map(asset => (
                    <div
                        key={asset.id}
                        onClick={() => setSelectedAsset(asset)}
                        className="group relative aspect-square bg-card rounded-xl overflow-hidden cursor-pointer border border-border hover:border-primary transition-all"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={asset.url} alt={asset.title} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-sm font-medium text-white truncate">{asset.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Annotation Modal Overlay */}
            {selectedAsset && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-8">
                    <button
                        onClick={() => setSelectedAsset(null)}
                        className="absolute top-4 right-4 p-2 bg-accent rounded-full hover:bg-destructive transition-colors text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl w-full h-full overflow-y-auto lg:overflow-visible">
                        {/* Canvas Area */}
                        <div className="flex-1 flex items-center justify-center">
                            <AnnotationCanvas
                                imageUrl={selectedAsset.url}
                                width={800}
                                height={600}
                                onSave={(data) => console.log('Saved annotation:', data)}
                            />
                        </div>

                        {/* Comments Sidebar */}
                        <div className="w-full lg:w-80 bg-card border border-border rounded-xl p-6 flex flex-col">
                            <h3 className="flex items-center text-lg font-bold mb-4">
                                <MessageSquare className="w-5 h-5 mr-2" />
                                Feedback
                            </h3>
                            <div className="flex-1 space-y-4 overflow-y-auto">
                                <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-bold text-secondary">Art Director</span>
                                        <span className="text-[10px] text-muted-foreground">2h ago</span>
                                    </div>
                                    <p className="text-sm">Lighting is too flat here. Add more neon bloom.</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-border">
                                <textarea
                                    className="w-full bg-input text-sm p-2 rounded-md border border-border focus:ring-1 focus:ring-primary outline-none"
                                    placeholder="Add a comment..."
                                    rows={3}
                                />
                                <button className="w-full mt-2 bg-primary text-primary-foreground font-medium py-2 rounded-md hover:bg-primary/90">
                                    Post Feedback
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
