import { useLocation, useNavigate } from "react-router-dom";
import { ImpactAnalysis, NewsItem, holdings as allHoldings, RiskFactors, RISK_FACTOR_LABELS } from "@/data/mockPortfolio";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, TrendingDown, TrendingUp, Minus, AlertTriangle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useMemo } from "react";
import ThesisImpactSection from "@/components/analysis/ThesisImpactSection";
import PrecedentEventsSection from "@/components/analysis/PrecedentEventsSection";
import QuantAnalystChat from "@/components/analysis/QuantAnalystChat";

const AnalysisDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysis, selectedNews } = (location.state || {}) as {
    analysis: ImpactAnalysis | null;
    selectedNews: NewsItem | null;
  };

  const radarData = useMemo(() => {
    if (!analysis) return [];
    const affectedTickers = analysis.portfolioImpact?.map((p) => p.ticker) || [];
    const affectedHoldings = allHoldings.filter((h) => affectedTickers.includes(h.ticker));
    const totalWeight = affectedHoldings.reduce((s, h) => s + h.positionSize, 0);
    if (affectedHoldings.length === 0 || totalWeight === 0) return [];
    const keys = Object.keys(RISK_FACTOR_LABELS) as (keyof RiskFactors)[];
    return keys.map((key) => {
      const weightedAvg = affectedHoldings.reduce(
        (sum, h) => sum + (h.risk_factors[key] * h.positionSize) / totalWeight, 0
      );
      return { factor: RISK_FACTOR_LABELS[key], value: Math.round(weightedAvg * 10) / 10, fullMark: 10 };
    });
  }, [analysis]);

  const perTickerRisk = useMemo(() => {
    if (!analysis) return [];
    const affectedTickers = analysis.portfolioImpact?.map((p) => p.ticker) || [];
    return allHoldings.filter((h) => affectedTickers.includes(h.ticker));
  }, [analysis]);

  if (!analysis || !selectedNews) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <p className="text-muted-foreground mb-4">No analysis data available.</p>
        <Button variant="outline" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Button>
      </div>
    );
  }

  const directionIcon = (dir: string) => {
    if (dir === "up") return <TrendingUp className="w-4 h-4 text-gain" />;
    if (dir === "down") return <TrendingDown className="w-4 h-4 text-loss" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const urgencyColor = (u: string) => {
    if (u === "immediate") return "bg-loss/20 text-loss border-loss/30";
    if (u === "near-term") return "bg-warning/20 text-warning border-warning/30";
    return "bg-primary/20 text-primary border-primary/30";
  };

  const riskScoreColor = (v: number) => {
    if (v >= 8) return "text-loss";
    if (v >= 6) return "text-warning";
    return "text-primary";
  };

  const riskFactorKeys = Object.keys(RISK_FACTOR_LABELS) as (keyof RiskFactors)[];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="border-b border-border/50 px-6 py-4 flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Button>
        <div className="h-5 w-px bg-border/50" />
        <h1 className="text-sm font-semibold text-foreground truncate">{selectedNews.headline}</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto p-6 space-y-6"
      >
        {/* Summary header */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <h2 className="text-lg font-bold uppercase tracking-wider">Impact Analysis</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{analysis.summary}</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Impact Score:</span>
              <span className={cn("font-mono font-bold text-lg",
                analysis.impactScore >= 8 ? "text-loss" : analysis.impactScore >= 6 ? "text-warning" : "text-primary"
              )}>{analysis.impactScore}/10</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Portfolio Impact:</span>
              <span className={cn("font-mono font-bold text-lg",
                analysis.overallPortfolioImpactPct >= 0 ? "text-gain" : "text-loss"
              )}>
                {analysis.overallPortfolioImpactPct >= 0 ? "+" : ""}{analysis.overallPortfolioImpactPct?.toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Source:</span>
              <span className="text-sm text-foreground">{selectedNews.source}</span>
            </div>
          </div>
        </div>

        {/* Investment Thesis Impact */}
        {analysis.thesisImpact && <ThesisImpactSection thesisImpact={analysis.thesisImpact} />}

        {/* Radar Chart + Position Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Risk Factor Exposure (Affected Positions, Weighted Avg)
            </h3>
            {radarData.length > 0 ? (
              <ResponsiveContainer width="100%" height={340}>
                <RadarChart cx="50%" cy="50%" outerRadius="72%" data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" strokeOpacity={0.4} />
                  <PolarAngleAxis dataKey="factor" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} tickCount={6} />
                  <Radar name="Exposure" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.25} strokeWidth={2} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} formatter={(value: number) => [value.toFixed(1), "Score"]} />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground">No matching holdings for risk factor analysis.</p>
            )}
          </div>

          <div className="glass-card rounded-xl p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Position Impact</h3>
            <div className="space-y-2">
              {analysis.portfolioImpact?.map((p) => (
                <div key={p.ticker} className="flex items-center justify-between py-2.5 border-b border-border/20 last:border-0">
                  <div className="flex items-center gap-3">
                    {directionIcon(p.direction)}
                    <span className="font-mono text-sm font-semibold text-primary">{p.ticker}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground max-w-[240px]">{p.reasoning}</span>
                    <span className={cn("font-mono text-sm font-bold min-w-[60px] text-right",
                      p.direction === "up" ? "text-gain" : p.direction === "down" ? "text-loss" : "text-muted-foreground"
                    )}>
                      {p.direction === "up" ? "+" : p.direction === "down" ? "-" : ""}{Math.abs(p.estimatedPctMove).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Historical Precedent Events */}
        {analysis.precedentEvents && <PrecedentEventsSection precedentEvents={analysis.precedentEvents} />}

        {/* Per-ticker risk factor heatmap table */}
        <div className="glass-card rounded-xl p-6 overflow-x-auto">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Risk Factor Breakdown by Position
          </h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left py-2 pr-3 font-semibold text-muted-foreground sticky left-0 bg-card">Ticker</th>
                {riskFactorKeys.map((key) => (
                  <th key={key} className="text-center py-2 px-1.5 font-semibold text-muted-foreground whitespace-nowrap">
                    {RISK_FACTOR_LABELS[key]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {perTickerRisk.map((h) => (
                <tr key={h.ticker} className="border-b border-border/10 last:border-0">
                  <td className="py-2 pr-3 font-mono font-semibold text-primary sticky left-0 bg-card">{h.ticker}</td>
                  {riskFactorKeys.map((key) => (
                    <td key={key} className="text-center py-2 px-1.5">
                      <span className={cn("font-mono font-bold", riskScoreColor(h.risk_factors[key]))}>
                        {h.risk_factors[key]}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Risk + Hedge */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Risk Concentration</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">{analysis.riskAnalysis}</p>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Hedge Recommendations</h3>
            </div>
            <div className="space-y-3">
              {analysis.hedgeRecommendations?.map((rec, i) => (
                <div key={i} className="p-3 rounded-lg bg-secondary/50 border border-border/30">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <p className="text-sm font-medium text-foreground">{rec.action}</p>
                    <Badge variant="outline" className={cn("text-[10px] shrink-0", urgencyColor(rec.urgency))}>
                      {rec.urgency}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{rec.rationale}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating AI Quant Analyst Chat */}
      <QuantAnalystChat analysis={analysis} selectedNews={selectedNews} />
    </div>
  );
};

export default AnalysisDetail;
