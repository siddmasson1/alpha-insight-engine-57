import { ImpactAnalysis, NewsItem } from "@/data/mockPortfolio";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingDown, TrendingUp, Minus, AlertTriangle, Target, Loader2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface AnalysisPanelProps {
  selectedNews: NewsItem | null;
  analysis: ImpactAnalysis | null;
  isLoading: boolean;
}

const AnalysisPanel = ({ selectedNews, analysis, isLoading }: AnalysisPanelProps) => {
  const navigate = useNavigate();

  const handleDrillDown = () => {
    navigate("/analysis", { state: { analysis, selectedNews } });
  };
  if (!selectedNews && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
          <Target className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Select a News Event</h3>
        <p className="text-sm text-muted-foreground max-w-[280px]">
          Click on any news item or create a custom scenario to see AI-powered impact analysis and hedge recommendations.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Analyzing Impact...</h3>
        <p className="text-sm text-muted-foreground">AI is evaluating portfolio exposure and generating hedge recommendations.</p>
      </div>
    );
  }

  if (!analysis) return null;

  const directionIcon = (dir: string) => {
    if (dir === "up") return <TrendingUp className="w-3.5 h-3.5 text-gain" />;
    if (dir === "down") return <TrendingDown className="w-3.5 h-3.5 text-loss" />;
    return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
  };

  const urgencyColor = (u: string) => {
    if (u === "immediate") return "bg-loss/20 text-loss border-loss/30";
    if (u === "near-term") return "bg-warning/20 text-warning border-warning/30";
    return "bg-primary/20 text-primary border-primary/30";
  };

  // Show only top 3 impacted positions in summary
  const topPositions = analysis.portfolioImpact?.slice(0, 3) || [];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedNews?.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3 }}
        className="h-full flex flex-col"
      >
        <div className="space-y-4 pb-4 flex-1">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Impact Analysis</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{analysis.summary}</p>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground">Impact:</span>
                <span className={cn("font-mono font-bold text-sm",
                  analysis.impactScore >= 8 ? "text-loss" : analysis.impactScore >= 6 ? "text-warning" : "text-primary"
                )}>{analysis.impactScore}/10</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground">Portfolio:</span>
                <span className={cn("font-mono font-bold text-sm",
                  analysis.overallPortfolioImpactPct >= 0 ? "text-gain" : "text-loss"
                )}>
                  {analysis.overallPortfolioImpactPct >= 0 ? "+" : ""}{analysis.overallPortfolioImpactPct?.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          {/* Top Movers (condensed) */}
          <div className="glass-card rounded-lg p-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Top Movers</h4>
            <div className="space-y-1.5">
              {topPositions.map((p) => (
                <div key={p.ticker} className="flex items-center justify-between py-1 border-b border-border/20 last:border-0">
                  <div className="flex items-center gap-2">
                    {directionIcon(p.direction)}
                    <span className="font-mono text-sm font-semibold text-primary">{p.ticker}</span>
                  </div>
                  <span className={cn("font-mono text-sm font-bold",
                    p.direction === "up" ? "text-gain" : p.direction === "down" ? "text-loss" : "text-muted-foreground"
                  )}>
                    {p.direction === "up" ? "+" : p.direction === "down" ? "-" : ""}{Math.abs(p.estimatedPctMove).toFixed(1)}%
                  </span>
                </div>
              ))}
              {(analysis.portfolioImpact?.length || 0) > 3 && (
                <p className="text-xs text-muted-foreground pt-1">
                  +{(analysis.portfolioImpact?.length || 0) - 3} more positions
                </p>
              )}
            </div>
          </div>

          {/* Top hedge (just first one) */}
          {analysis.hedgeRecommendations?.[0] && (
            <div className="glass-card rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-primary" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Top Hedge</h4>
              </div>
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-foreground line-clamp-2">{analysis.hedgeRecommendations[0].action}</p>
                <Badge variant="outline" className={cn("text-[10px] shrink-0", urgencyColor(analysis.hedgeRecommendations[0].urgency))}>
                  {analysis.hedgeRecommendations[0].urgency}
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* Expand button pinned at bottom */}
        <Button onClick={handleDrillDown} className="w-full gap-2 mt-auto">
          <Maximize2 className="w-4 h-4" /> View Full Analysis
        </Button>
      </motion.div>
    </AnimatePresence>
  );

export default AnalysisPanel;
