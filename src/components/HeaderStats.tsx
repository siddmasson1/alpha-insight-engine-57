import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderStatsProps {
  totalAUM: number;
  dailyPnL: number;
  portfolioBeta: number;
}

const HeaderStats = ({ totalAUM, dailyPnL, portfolioBeta }: HeaderStatsProps) => {
  const formatLargeNum = (n: number) => {
    if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
    if (Math.abs(n) >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
    return `$${n.toFixed(0)}`;
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <Activity className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h1 className="text-base font-bold text-foreground tracking-tight">Meridian Capital</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Portfolio Intelligence</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total AUM</p>
          <p className="text-sm font-mono font-bold text-foreground flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-muted-foreground" />
            {formatLargeNum(totalAUM)}
          </p>
        </div>

        <div className="w-px h-8 bg-border/50" />

        <div className="text-right">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Daily P&L</p>
          <p className={cn("text-sm font-mono font-bold flex items-center gap-1",
            dailyPnL >= 0 ? "text-gain" : "text-loss"
          )}>
            {dailyPnL >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {dailyPnL >= 0 ? "+" : ""}{formatLargeNum(dailyPnL)}
          </p>
        </div>

        <div className="w-px h-8 bg-border/50" />

        <div className="text-right">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Portfolio β</p>
          <p className="text-sm font-mono font-bold text-foreground">{portfolioBeta.toFixed(2)}</p>
        </div>
      </div>
    </header>
  );
};

export default HeaderStats;
