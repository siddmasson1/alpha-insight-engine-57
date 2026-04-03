import { useState, useCallback, useMemo } from "react";
import { holdings as initialHoldings, initialNews, portfolioBeta, NewsItem, ImpactAnalysis, Holding } from "@/data/mockPortfolio";
import { supabase } from "@/integrations/supabase/client";
import HeaderStats from "@/components/HeaderStats";
import PortfolioTable from "@/components/PortfolioTable";
import NewsFeed from "@/components/NewsFeed";
import AnalysisPanel from "@/components/AnalysisPanel";
import ScenarioDialog from "@/components/ScenarioDialog";
import AddHoldingDialog from "@/components/AddHoldingDialog";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Index = () => {
  const [holdings, setHoldings] = useState<Holding[]>(initialHoldings);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ImpactAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scenarioOpen, setScenarioOpen] = useState(false);
  const [addHoldingOpen, setAddHoldingOpen] = useState(false);

  const selectedNews = news.find((n) => n.id === selectedNewsId) || null;

  const totalAUM = useMemo(() => holdings.reduce((sum, h) => sum + h.positionSize, 0), [holdings]);
  const dailyPnL = useMemo(() => holdings.reduce((sum, h) => sum + h.pnl, 0), [holdings]);

  const portfolioSummary = useMemo(() => holdings.map((h) => ({
    ticker: h.ticker,
    name: h.name,
    sector: h.sector,
    price: h.price,
    weight: h.weight,
    positionSize: h.positionSize,
  })), [holdings]);

  const handleAddHolding = useCallback((newHolding: Holding) => {
    setHoldings((prev) => {
      const updated = [...prev, newHolding];
      const totalPos = updated.reduce((s, h) => s + h.positionSize, 0);
      return updated.map((h) => ({ ...h, weight: (h.positionSize / totalPos) * 100 }));
    });
    toast({ title: "Position Added", description: `${newHolding.ticker} added to portfolio.` });
  }, []);

  const handleRemoveHolding = useCallback((ticker: string) => {
    setHoldings((prev) => {
      const updated = prev.filter((h) => h.ticker !== ticker);
      const totalPos = updated.reduce((s, h) => s + h.positionSize, 0);
      return updated.map((h) => ({ ...h, weight: totalPos > 0 ? (h.positionSize / totalPos) * 100 : 0 }));
    });
    toast({ title: "Position Removed", description: `${ticker} removed from portfolio.` });
  }, []);

  const handleDeleteNews = useCallback((id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
    if (selectedNewsId === id) {
      setSelectedNewsId(null);
      setAnalysis(null);
    }
    toast({ title: "News Dismissed", description: "Event removed from feed." });
  }, [selectedNewsId]);

  const analyzeNews = useCallback(async (headline: string) => {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-impact", {
        body: { type: "news_impact", payload: { headline, portfolio: portfolioSummary } },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setAnalysis(data as ImpactAnalysis);
    } catch (e: any) {
      console.error("Analysis error:", e);
      toast({ title: "Analysis Failed", description: e.message || "Could not analyze impact.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [portfolioSummary]);

  const handleSelectNews = useCallback((id: string) => {
    setSelectedNewsId(id);
    const item = news.find((n) => n.id === id);
    if (item) analyzeNews(item.headline);
  }, [news, analyzeNews]);

  const handleScenarioSubmit = useCallback(async (scenario: { description: string; affectedSectors: string[]; severity: number }) => {
    const newNewsItem: NewsItem = {
      id: `scenario-${Date.now()}`,
      headline: scenario.description,
      timestamp: new Date(),
      source: "Custom Scenario",
      affectedTickers: holdings
        .filter((h) => scenario.affectedSectors.length === 0 || scenario.affectedSectors.includes(h.sector))
        .map((h) => h.ticker),
      impactScore: scenario.severity,
    };

    setNews((prev) => [newNewsItem, ...prev]);
    setSelectedNewsId(newNewsItem.id);
    setIsLoading(true);
    setAnalysis(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-impact", {
        body: {
          type: "scenario",
          payload: {
            description: scenario.description,
            affectedSectors: scenario.affectedSectors,
            severity: scenario.severity,
            portfolio: portfolioSummary,
          },
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setAnalysis(data as ImpactAnalysis);
    } catch (e: any) {
      console.error("Scenario analysis error:", e);
      toast({ title: "Scenario Analysis Failed", description: e.message || "Could not analyze scenario.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [holdings, portfolioSummary]);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <HeaderStats totalAUM={totalAUM} dailyPnL={dailyPnL} portfolioBeta={portfolioBeta} />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-[55%] border-r border-border/50 flex flex-col overflow-hidden">
          {/* Portfolio Table */}
          <div className="p-4 border-b border-border/30">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Holdings ({holdings.length})</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAddHoldingOpen(true)}
                className="text-xs gap-1 border-primary/30 text-primary hover:bg-primary/10"
              >
                <Plus className="w-3 h-3" />
                Add Position
              </Button>
            </div>
            <PortfolioTable holdings={holdings} onRemoveHolding={handleRemoveHolding} />
          </div>

          {/* News Feed */}
          <div className="flex-1 p-4 overflow-hidden flex flex-col min-h-0">
            <NewsFeed
              news={news}
              selectedNewsId={selectedNewsId}
              onSelectNews={handleSelectNews}
              onAddScenario={() => setScenarioOpen(true)}
              onDeleteNews={handleDeleteNews}
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-[45%] p-4 overflow-hidden">
          <AnalysisPanel
            selectedNews={selectedNews}
            analysis={analysis}
            isLoading={isLoading}
          />
        </div>
      </div>

      <ScenarioDialog open={scenarioOpen} onOpenChange={setScenarioOpen} onSubmit={handleScenarioSubmit} />
      <AddHoldingDialog open={addHoldingOpen} onOpenChange={setAddHoldingOpen} onSubmit={handleAddHolding} />
    </div>
  );
};

export default Index;
