export interface RiskFactors {
  rates_sensitivity: number; // 1-10
  commodity_exposure: number;
  usd_sensitivity: number;
  credit_sensitivity: number;
  equity_beta: number;
  growth_value_tilt: number; // 1=deep value, 10=high growth
  market_cap_size: number; // 1=small, 10=mega
  credit_rating: number; // 1=junk, 10=AAA
  consumer_spending_sensitivity: number;
  key_management_risk: number;
  brand_reputational_risk: number;
}

export interface Holding {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePct: number;
  positionSize: number;
  shares: number;
  weight: number;
  pnl: number;
  dateAdded: Date;
  thesis: string;
  catalysts: string;
  breakConditions: string;
  risk_factors: RiskFactors;
}

export interface NewsItem {
  id: string;
  headline: string;
  timestamp: Date;
  source: string;
  affectedTickers: string[];
  impactScore: number;
  summary?: string;
  url?: string;
}

export interface ThesisImpact {
  ticker: string;
  originalThesis: string;
  thesisStatus: "intact" | "weakened" | "strengthened" | "broken";
  reasoning: string;
  revisedOutlook: string;
}

export interface PrecedentEvent {
  date: string;
  event: string;
  affectedTickers: string[];
  marketReaction: string;
  nextDayMove: string;
  weekMove: string;
  keyLearning: string;
}

export interface ImpactAnalysis {
  impactScore: number;
  affectedTickers: string[];
  summary: string;
  portfolioImpact: {
    ticker: string;
    direction: "up" | "down" | "neutral";
    estimatedPctMove: number;
    reasoning: string;
  }[];
  riskAnalysis: string;
  hedgeRecommendations: {
    action: string;
    rationale: string;
    urgency: "immediate" | "near-term" | "monitor";
  }[];
  overallPortfolioImpactPct: number;
  thesisImpact?: ThesisImpact[];
  precedentEvents?: PrecedentEvent[];
}

export const holdings: Holding[] = [
  { ticker: "SPY", name: "SPDR S&P 500 ETF", sector: "Broad Equity", price: 527.35, change: 1.84, changePct: 0.35, positionSize: 527.35 * 120, shares: 120, weight: 0, pnl: 1.84 * 120, dateAdded: new Date("2024-02-20"), thesis: "Core exposure to US equities driven by resilient earnings and soft landing expectations", catalysts: "Fed easing; earnings growth; macro stability", breakConditions: "Recession risk; earnings contraction; policy tightening", risk_factors: { rates_sensitivity: 5, commodity_exposure: 3, usd_sensitivity: 5, credit_sensitivity: 4, equity_beta: 10, growth_value_tilt: 5, market_cap_size: 10, credit_rating: 9, consumer_spending_sensitivity: 6, key_management_risk: 1, brand_reputational_risk: 2 } },
  { ticker: "QQQ", name: "Invesco QQQ Trust", sector: "Technology", price: 449.12, change: 2.70, changePct: 0.60, positionSize: 449.12 * 90, shares: 90, weight: 0, pnl: 2.70 * 90, dateAdded: new Date("2025-01-15"), thesis: "Overweight tech and AI-driven growth through large-cap innovation leaders", catalysts: "AI capex cycle; earnings acceleration; multiple expansion", breakConditions: "AI demand slowdown; rate-driven multiple compression", risk_factors: { rates_sensitivity: 6, commodity_exposure: 1, usd_sensitivity: 5, credit_sensitivity: 3, equity_beta: 10, growth_value_tilt: 9, market_cap_size: 10, credit_rating: 9, consumer_spending_sensitivity: 5, key_management_risk: 1, brand_reputational_risk: 2 } },
  { ticker: "GLD", name: "SPDR Gold Shares", sector: "Commodities", price: 214.80, change: 1.29, changePct: 0.60, positionSize: 214.80 * 150, shares: 150, weight: 0, pnl: 1.29 * 150, dateAdded: new Date("2025-10-10"), thesis: "Gold as hedge against inflation persistence and geopolitical instability", catalysts: "Inflation surprise; geopolitical escalation; USD weakness", breakConditions: "Disinflation; rising real yields; strong USD", risk_factors: { rates_sensitivity: 8, commodity_exposure: 10, usd_sensitivity: 9, credit_sensitivity: 1, equity_beta: 1, growth_value_tilt: 1, market_cap_size: 10, credit_rating: 10, consumer_spending_sensitivity: 1, key_management_risk: 1, brand_reputational_risk: 1 } },
  { ticker: "TLT", name: "iShares 20+ Year Treasury", sector: "Fixed Income", price: 88.45, change: 0.35, changePct: 0.40, positionSize: 88.45 * 110, shares: 110, weight: 0, pnl: 0.35 * 110, dateAdded: new Date("2025-06-05"), thesis: "Long duration bonds to benefit from declining interest rates and economic slowdown", catalysts: "Fed rate cuts; growth slowdown; flight to safety", breakConditions: "Rates stay higher for longer; inflation reacceleration", risk_factors: { rates_sensitivity: 10, commodity_exposure: 1, usd_sensitivity: 6, credit_sensitivity: 1, equity_beta: 1, growth_value_tilt: 1, market_cap_size: 10, credit_rating: 10, consumer_spending_sensitivity: 1, key_management_risk: 1, brand_reputational_risk: 1 } },
  { ticker: "HYG", name: "iShares High Yield Corp Bond", sector: "Fixed Income", price: 77.62, change: -0.12, changePct: -0.15, positionSize: 77.62 * 130, shares: 130, weight: 0, pnl: -0.12 * 130, dateAdded: new Date("2024-11-12"), thesis: "High yield credit exposure capturing carry with stable default environment", catalysts: "Stable growth; low defaults; spread compression", breakConditions: "Rising defaults; recession; credit spread widening", risk_factors: { rates_sensitivity: 7, commodity_exposure: 2, usd_sensitivity: 4, credit_sensitivity: 10, equity_beta: 4, growth_value_tilt: 3, market_cap_size: 8, credit_rating: 3, consumer_spending_sensitivity: 5, key_management_risk: 1, brand_reputational_risk: 2 } },
  { ticker: "EEM", name: "iShares MSCI Emerging Markets", sector: "Intl Equity", price: 43.28, change: -0.30, changePct: -0.69, positionSize: 43.28 * 140, shares: 140, weight: 0, pnl: -0.30 * 140, dateAdded: new Date("2025-03-18"), thesis: "Emerging markets recovery driven by China stimulus and weaker dollar", catalysts: "China stimulus; USD weakness; global growth rebound", breakConditions: "Strong USD; China slowdown; capital outflows", risk_factors: { rates_sensitivity: 6, commodity_exposure: 6, usd_sensitivity: 9, credit_sensitivity: 5, equity_beta: 7, growth_value_tilt: 5, market_cap_size: 8, credit_rating: 5, consumer_spending_sensitivity: 6, key_management_risk: 1, brand_reputational_risk: 2 } },
  { ticker: "XLE", name: "Energy Select Sector SPDR", sector: "Energy", price: 86.54, change: -1.04, changePct: -1.19, positionSize: 86.54 * 100, shares: 100, weight: 0, pnl: -1.04 * 100, dateAdded: new Date("2024-09-25"), thesis: "Energy exposure supported by tight supply and geopolitical risks", catalysts: "Oil price increase; supply constraints; geopolitical tension", breakConditions: "Oil demand drop; supply expansion; price collapse", risk_factors: { rates_sensitivity: 4, commodity_exposure: 10, usd_sensitivity: 7, credit_sensitivity: 4, equity_beta: 7, growth_value_tilt: 2, market_cap_size: 9, credit_rating: 8, consumer_spending_sensitivity: 4, key_management_risk: 1, brand_reputational_risk: 3 } },
  { ticker: "XLF", name: "Financial Select Sector SPDR", sector: "Financials", price: 44.92, change: 0.22, changePct: 0.49, positionSize: 44.92 * 115, shares: 115, weight: 0, pnl: 0.22 * 115, dateAdded: new Date("2025-04-10"), thesis: "Financials benefit from stable economy and improving capital markets activity", catalysts: "Deal activity recovery; stable credit; NIM expansion", breakConditions: "Credit losses; yield curve inversion; regulatory tightening", risk_factors: { rates_sensitivity: 9, commodity_exposure: 2, usd_sensitivity: 4, credit_sensitivity: 8, equity_beta: 6, growth_value_tilt: 3, market_cap_size: 9, credit_rating: 8, consumer_spending_sensitivity: 4, key_management_risk: 1, brand_reputational_risk: 3 } },
  { ticker: "VNQ", name: "Vanguard Real Estate ETF", sector: "Real Estate", price: 82.15, change: 0.49, changePct: 0.60, positionSize: 82.15 * 160, shares: 160, weight: 0, pnl: 0.49 * 160, dateAdded: new Date("2024-06-14"), thesis: "REITs positioned to recover as interest rates peak and begin to decline", catalysts: "Rate cuts; property valuation stabilization; income demand", breakConditions: "Higher-for-longer rates; declining property values; refinancing stress", risk_factors: { rates_sensitivity: 10, commodity_exposure: 3, usd_sensitivity: 3, credit_sensitivity: 7, equity_beta: 5, growth_value_tilt: 3, market_cap_size: 8, credit_rating: 7, consumer_spending_sensitivity: 6, key_management_risk: 1, brand_reputational_risk: 2 } },
];

// Compute weights
const totalPos = holdings.reduce((s, h) => s + h.positionSize, 0);
holdings.forEach((h) => (h.weight = Math.round((h.positionSize / totalPos) * 1000) / 10));

export const totalAUM = holdings.reduce((sum, h) => sum + h.positionSize, 0);
export const dailyPnL = holdings.reduce((sum, h) => sum + h.pnl, 0);
export const portfolioBeta = 1.12;

export const initialNews: NewsItem[] = [
  {
    id: "1",
    headline: "Fed signals potential rate cuts in Q3 as inflation cools — bond and equity markets rally",
    timestamp: new Date(Date.now() - 12 * 60000),
    source: "Bloomberg",
    affectedTickers: ["SPY", "TLT", "XLF", "VNQ"],
    impactScore: 9,
    url: "https://www.bloomberg.com/markets",
  },
  {
    id: "2",
    headline: "NVIDIA and Microsoft lead AI capex surge — tech ETFs hit all-time highs",
    timestamp: new Date(Date.now() - 34 * 60000),
    source: "Yahoo Finance",
    affectedTickers: ["QQQ", "SPY"],
    impactScore: 8,
    url: "https://finance.yahoo.com",
  },
  {
    id: "3",
    headline: "Gold surges past $2,500 as Middle East tensions escalate and dollar weakens",
    timestamp: new Date(Date.now() - 58 * 60000),
    source: "Reuters",
    affectedTickers: ["GLD", "XLE", "EEM"],
    impactScore: 8,
    url: "https://www.reuters.com/markets/commodities",
  },
  {
    id: "4",
    headline: "High yield spreads widen as regional bank stress resurfaces — credit markets on edge",
    timestamp: new Date(Date.now() - 87 * 60000),
    source: "CNBC",
    affectedTickers: ["HYG", "XLF", "SPY"],
    impactScore: 7,
    url: "https://www.cnbc.com/bonds/",
  },
  {
    id: "5",
    headline: "China announces $500B stimulus package — emerging market ETFs surge on optimism",
    timestamp: new Date(Date.now() - 120 * 60000),
    source: "Financial Times",
    affectedTickers: ["EEM", "GLD", "XLE"],
    impactScore: 8,
    url: "https://www.ft.com/markets",
  },
  {
    id: "6",
    headline: "Oil prices drop 5% on surprise OPEC+ production increase — energy sector under pressure",
    timestamp: new Date(Date.now() - 180 * 60000),
    source: "Zacks",
    affectedTickers: ["XLE", "SPY", "EEM"],
    impactScore: 7,
    url: "https://www.zacks.com/stock/news",
  },
  {
    id: "7",
    headline: "Commercial real estate distress deepens — REIT valuations face further downside risk",
    timestamp: new Date(Date.now() - 240 * 60000),
    source: "Wall Street Journal",
    affectedTickers: ["VNQ", "XLF", "HYG"],
    impactScore: 7,
    url: "https://www.wsj.com/real-estate",
  },
  {
    id: "8",
    headline: "Strong dollar crushes EM currencies — capital outflows accelerate from developing markets",
    timestamp: new Date(Date.now() - 300 * 60000),
    source: "MarketWatch",
    affectedTickers: ["EEM", "GLD", "XLE"],
    impactScore: 6,
    url: "https://www.marketwatch.com",
  },
];

export const sectors = [...new Set(holdings.map((h) => h.sector))];

export const RISK_FACTOR_LABELS: Record<keyof RiskFactors, string> = {
  rates_sensitivity: "Rates",
  commodity_exposure: "Commodities",
  usd_sensitivity: "USD",
  credit_sensitivity: "Credit",
  equity_beta: "Eq. Beta",
  growth_value_tilt: "Growth/Value",
  market_cap_size: "Mkt Cap",
  credit_rating: "Credit Rating",
  consumer_spending_sensitivity: "Consumer",
  key_management_risk: "Mgmt Risk",
  brand_reputational_risk: "Brand Risk",
};
