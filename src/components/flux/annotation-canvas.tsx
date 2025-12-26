"use client"

import { useRef, useState, useEffect } from 'react'
import { Pencil, Eraser, Undo, Save } from 'lucide-react'

interface AnnotationCanvasProps {
    width?: number
    height?: number
    imageUrl?: string
    onSave?: (dataUrl: string) => void
}

export function AnnotationCanvas({
    width = 800,
    height = 450,
    imageUrl,
    onSave
}: AnnotationCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [color, setColor] = useState('#D1F366') // Primary Neon
    const [mode, setMode] = useState<'draw' | 'erase'>('draw')

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Draw Image if provided
        if (imageUrl) {
            const img = new Image()
            img.src = imageUrl
            img.onload = () => {
                ctx.drawImage(img, 0, 0, width, height)
            }
        } else {
            // Clear background
            ctx.fillStyle = '#000000'
            ctx.fillRect(0, 0, width, height)
        }

        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
    }, [imageUrl, width, height])

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current
        if (!canvas) return

        // Handle Touch vs Mouse
        const clientX = 'touches' in e ? e.touches[0].clientX : e.nativeEvent.offsetX
        const clientY = 'touches' in e ? e.touches[0].clientY : e.nativeEvent.offsetY

        // For touch we need rectify against bbox if not using offsetX
        let x = clientX
        let y = clientY

        if ('touches' in e) {
            const rect = canvas.getBoundingClientRect()
            x = e.touches[0].clientX - rect.left
            y = e.touches[0].clientY - rect.top
        }

        setIsDrawing(true)
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.beginPath()
        ctx.moveTo(x, y)
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return
        const canvas = canvasRef.current
        if (!canvas) return

        let x, y
        if ('touches' in e) {
            const rect = canvas.getBoundingClientRect()
            x = e.touches[0].clientX - rect.left
            y = e.touches[0].clientY - rect.top
        } else {
            x = e.nativeEvent.offsetX
            y = e.nativeEvent.offsetY
        }

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        if (mode === 'erase') {
            ctx.globalCompositeOperation = 'destination-out'
            ctx.lineWidth = 20
        } else {
            ctx.globalCompositeOperation = 'source-over'
            ctx.strokeStyle = color
            ctx.lineWidth = 4
        }

        ctx.lineTo(x, y)
        ctx.stroke()
    }

    const stopDrawing = () => {
        setIsDrawing(false)
    }

    const handleSave = () => {
        if (canvasRef.current && onSave) {
            onSave(canvasRef.current.toDataURL())
        }
    }

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2 bg-card p-2 rounded-lg border border-border w-fit">
                <button
                    onClick={() => setMode('draw')}
                    className={`p-2 rounded hover:bg-accent ${mode === 'draw' ? 'bg-primary text-black' : 'text-foreground'}`}
                    title="Draw"
                >
                    <Pencil className="w-4 h-4" />
                </button>
                <button
                    onClick={() => setMode('erase')}
                    className={`p-2 rounded hover:bg-accent ${mode === 'erase' ? 'bg-primary text-black' : 'text-foreground'}`}
                    title="Erase"
                >
                    <Eraser className="w-4 h-4" />
                </button>
                <div className="w-[1px] h-6 bg-border mx-2" />
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
                />
                <div className="w-[1px] h-6 bg-border mx-2" />
                <button onClick={handleSave} className="p-2 rounded hover:bg-accent text-foreground" title="Save Annotation">
                    <Save className="w-4 h-4" />
                </button>
            </div>

            <div className="relative rounded-lg overflow-hidden border border-border bg-black w-fit">
                <canvas
                    ref={canvasRef}
                    width={width}
                    height={height}
                    className="touch-none cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />
            </div>
        </div>
    )
}
