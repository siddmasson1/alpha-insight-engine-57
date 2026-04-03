import { NewsItem } from "@/data/mockPortfolio";
import { cn } from "@/lib/utils";
import { Clock, Zap, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface NewsFeedProps {
  news: NewsItem[];
  selectedNewsId: string | null;
  onSelectNews: (id: string) => void;
  onAddScenario: () => void;
}

const getImpactColor = (score: number) => {
  if (score >= 8) return "bg-loss/20 text-loss border-loss/30";
  if (score >= 6) return "bg-warning/20 text-warning border-warning/30";
  if (score >= 4) return "bg-primary/20 text-primary border-primary/30";
  return "bg-gain/20 text-gain border-gain/30";
};

const getImpactLabel = (score: number) => {
  if (score >= 8) return "Critical";
  if (score >= 6) return "High";
  if (score >= 4) return "Medium";
  return "Low";
};

const formatTime = (date: Date) => {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
};

const NewsFeed = ({ news, selectedNewsId, onSelectNews, onAddScenario }: NewsFeedProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Live News Feed</h3>
          <span className="w-2 h-2 rounded-full bg-gain animate-pulse-glow" />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddScenario}
          className="text-xs gap-1 border-primary/30 text-primary hover:bg-primary/10"
        >
          <Plus className="w-3 h-3" />
          Scenario
        </Button>
      </div>

      <ScrollArea className="flex-1 pr-2">
        <div className="space-y-2">
          {news.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectNews(item.id)}
              className={cn(
                "w-full text-left p-3 rounded-lg border transition-all duration-200",
                selectedNewsId === item.id
                  ? "border-primary/50 bg-primary/5 glow-primary"
                  : "border-border/40 hover:border-border hover:bg-secondary/30"
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <p className="text-sm font-medium text-foreground leading-snug flex-1">{item.headline}</p>
                <Badge variant="outline" className={cn("text-[10px] shrink-0 font-mono font-bold px-1.5 py-0.5", getImpactColor(item.impactScore))}>
                  {item.impactScore}/10
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground font-medium">{item.source}</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    {formatTime(item.timestamp)}
                  </span>
                </div>
                <div className="flex gap-1">
                  {item.affectedTickers.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] font-mono text-primary/80 bg-primary/10 px-1 py-0.5 rounded">{t}</span>
                  ))}
                  {item.affectedTickers.length > 3 && (
                    <span className="text-[10px] text-muted-foreground">+{item.affectedTickers.length - 3}</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NewsFeed;
