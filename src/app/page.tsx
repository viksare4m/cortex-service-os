export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Command Center
        </h1>
        <p className="text-muted-foreground">
          Welcome back to Cortex. System Status: <span className="text-primary font-mono">ONLINE</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mock Widget: Sprint Velocity */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-[0_0_20px_rgba(209,243,102,0.1)] transition-all">
          <h3 className="text-lg font-medium text-foreground mb-2">Sprint Velocity</h3>
          <div className="text-4xl font-bold text-primary">87<span className="text-lg text-muted-foreground ml-1">pts</span></div>
          <p className="text-xs text-muted-foreground mt-2">+12% from last sprint</p>
        </div>

        {/* Mock Widget: Team Pulse */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-[0_0_20px_rgba(110,68,255,0.1)] transition-all">
          <h3 className="text-lg font-medium text-foreground mb-2">Team Pulse</h3>
          <div className="flex items-center space-x-2">
            <span className="text-4xl font-bold text-secondary">92%</span>
            <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">Healthy</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">No burnout risks detected.</p>
        </div>

        {/* Mock Widget: Asset Pipeline */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-[0_0_20px_rgba(255,46,99,0.1)] transition-all">
          <h3 className="text-lg font-medium text-foreground mb-2">Asset Pipeline</h3>
          <div className="text-4xl font-bold text-destructive">12<span className="text-lg text-muted-foreground ml-1">blocked</span></div>
          <p className="text-xs text-muted-foreground mt-2">Requires immediate attention.</p>
        </div>
      </div>

      <div className="mt-8 bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium">Project Alpha: Pull Request #10{i} merged</span>
              </div>
              <span className="text-xs text-muted-foreground font-mono">1{i} min ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
