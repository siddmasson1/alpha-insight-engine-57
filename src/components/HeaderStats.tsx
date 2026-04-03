import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
    <header className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <Activity className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h1 className="text-base font-bold text-foreground tracking-tight">MarketSim</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">What-if engine for public markets</p>
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

        <div className="w-px h-8 bg-border/50" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-loss">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default HeaderStats;
