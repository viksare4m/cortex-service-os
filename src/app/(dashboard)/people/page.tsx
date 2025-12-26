"use client"

import { Users, Battery, Zap, Clock } from "lucide-react"

const TEAM = [
    { id: 1, name: "Alex Chen", role: "Snr. Developer", skills: ["React", "Rust", "Node"], burnout: 12, status: 'online' },
    { id: 2, name: "Sarah Miller", role: "3D Artist", skills: ["Blender", "Unreal", "Houdini"], burnout: 45, status: 'busy' },
    { id: 3, name: "Jordan Lee", role: "Producer", skills: ["Agile", "Jira"], burnout: 88, status: 'offline' }, // High Burnout
]

export default function PeoplePage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">People</h1>
                <div className="flex space-x-2">
                    <span className="text-sm text-muted-foreground flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-2" /> 5 Online</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEAM.map((member) => (
                    <div key={member.id} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold text-lg relative">
                                    {member.name.charAt(0)}
                                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${member.status === 'online' ? 'bg-green-500' : member.status === 'busy' ? 'bg-yellow-500' : 'bg-zinc-500'}`} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-foreground">{member.name}</h3>
                                    <p className="text-xs text-muted-foreground">{member.role}</p>
                                </div>
                            </div>
                            <Users className="w-4 h-4 text-muted-foreground" />
                        </div>

                        <div className="space-y-3">
                            {/* Skills */}
                            <div className="flex flex-wrap gap-1">
                                {member.skills.map(skill => (
                                    <span key={skill} className="text-[10px] px-2 py-0.5 bg-accent/50 rounded-full text-muted-foreground border border-black/20">{skill}</span>
                                ))}
                            </div>

                            {/* Burnout Meter */}
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground flex items-center"><Battery className="w-3 h-3 mr-1" /> Energy</span>
                                    <span className={member.burnout > 80 ? "text-destructive" : "text-green-500"}>{100 - member.burnout}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-accent rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${member.burnout > 80 ? 'bg-destructive' : 'bg-primary'}`}
                                        style={{ width: `${100 - member.burnout}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-border flex justify-between text-xs text-muted-foreground">
                            <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> UTC+1</span>
                            <span className="flex items-center"><Zap className="w-3 h-3 mr-1" /> 6.5h logged today</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
