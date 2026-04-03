import { useState, useCallback } from "react";
import { holdings, initialNews, totalAUM, dailyPnL, portfolioBeta, NewsItem, ImpactAnalysis } from "@/data/mockPortfolio";
import { supabase } from "@/integrations/supabase/client";
import HeaderStats from "@/components/HeaderStats";
import PortfolioTable from "@/components/PortfolioTable";
import NewsFeed from "@/components/NewsFeed";
import AnalysisPanel from "@/components/AnalysisPanel";
import ScenarioDialog from "@/components/ScenarioDialog";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ImpactAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scenarioOpen, setScenarioOpen] = useState(false);

  const selectedNews = news.find((n) => n.id === selectedNewsId) || null;

  const portfolioSummary = holdings.map((h) => ({
    ticker: h.ticker,
    name: h.name,
    sector: h.sector,
    price: h.price,
    weight: h.weight,
    positionSize: h.positionSize,
  }));

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
      toast({
        title: "Analysis Failed",
        description: e.message || "Could not analyze impact. Please try again.",
        variant: "destructive",
      });
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
      toast({
        title: "Scenario Analysis Failed",
        description: e.message || "Could not analyze scenario.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [portfolioSummary]);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <HeaderStats totalAUM={totalAUM} dailyPnL={dailyPnL} portfolioBeta={portfolioBeta} />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-[55%] border-r border-border/50 flex flex-col overflow-hidden">
          {/* Portfolio Table */}
          <div className="p-4 border-b border-border/30">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Holdings</h2>
            <PortfolioTable holdings={holdings} />
          </div>

          {/* News Feed */}
          <div className="flex-1 p-4 overflow-hidden flex flex-col min-h-0">
            <NewsFeed
              news={news}
              selectedNewsId={selectedNewsId}
              onSelectNews={handleSelectNews}
              onAddScenario={() => setScenarioOpen(true)}
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

      <ScenarioDialog
        open={scenarioOpen}
        onOpenChange={setScenarioOpen}
        onSubmit={handleScenarioSubmit}
      />
    </div>
  );
};

export default Index;
