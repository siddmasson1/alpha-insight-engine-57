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
}

export const holdings: Holding[] = [
  { ticker: "AAPL", name: "Apple", sector: "Technology", price: 255.92, change: 0.29, changePct: 0.11, positionSize: 5100000, shares: 19928, weight: 7.5, pnl: 5779, dateAdded: new Date("2024-01-15") },
  { ticker: "AMZN", name: "Amazon", sector: "Consumer Disc.", price: 209.77, change: -0.80, changePct: -0.38, positionSize: 3200000, shares: 15255, weight: 4.7, pnl: -12204, dateAdded: new Date("2024-03-10") },
  { ticker: "BA", name: "Boeing", sector: "Industrials", price: 208.22, change: 0.90, changePct: 0.43, positionSize: 1500000, shares: 7205, weight: 2.2, pnl: 6485, dateAdded: new Date("2024-06-01") },
  { ticker: "CAT", name: "Caterpillar", sector: "Industrials", price: 717.22, change: -13.10, changePct: -1.79, positionSize: 2100000, shares: 2928, weight: 3.1, pnl: -38357, dateAdded: new Date("2024-02-20") },
  { ticker: "COIN", name: "Coinbase Global", sector: "Financials", price: 171.46, change: -1.53, changePct: -0.88, positionSize: 1200000, shares: 6997, weight: 1.8, pnl: -10706, dateAdded: new Date("2024-07-15") },
  { ticker: "GOOGL", name: "Alphabet", sector: "Technology", price: 295.77, change: -1.62, changePct: -0.54, positionSize: 3600000, shares: 12172, weight: 5.3, pnl: -19719, dateAdded: new Date("2023-12-05") },
  { ticker: "GS", name: "Goldman Sachs", sector: "Financials", price: 863.04, change: 2.83, changePct: 0.33, positionSize: 2500000, shares: 2897, weight: 3.7, pnl: 8198, dateAdded: new Date("2023-12-10") },
  { ticker: "JPM", name: "JPMorgan Chase", sector: "Financials", price: 294.60, change: -0.78, changePct: -0.26, positionSize: 3100000, shares: 10523, weight: 4.6, pnl: -8208, dateAdded: new Date("2024-01-22") },
  { ticker: "LLY", name: "Eli Lilly", sector: "Healthcare", price: 935.58, change: -18.94, changePct: -1.98, positionSize: 4200000, shares: 4489, weight: 6.2, pnl: -85043, dateAdded: new Date("2024-03-01") },
  { ticker: "META", name: "Meta Platforms", sector: "Technology", price: 574.46, change: -4.77, changePct: -0.82, positionSize: 3800000, shares: 6615, weight: 5.6, pnl: -31551, dateAdded: new Date("2024-04-10") },
  { ticker: "MRNA", name: "Moderna", sector: "Healthcare", price: 49.20, change: -0.83, changePct: -1.66, positionSize: 800000, shares: 16260, weight: 1.2, pnl: -13496, dateAdded: new Date("2024-08-01") },
  { ticker: "MS", name: "Morgan Stanley", sector: "Financials", price: 165.81, change: -0.36, changePct: -0.22, positionSize: 1800000, shares: 10855, weight: 2.6, pnl: -3908, dateAdded: new Date("2024-05-15") },
  { ticker: "MSFT", name: "Microsoft", sector: "Technology", price: 373.46, change: 4.09, changePct: 1.11, positionSize: 4000000, shares: 10711, weight: 5.9, pnl: 43810, dateAdded: new Date("2023-11-20") },
  { ticker: "NKE", name: "Nike", sector: "Consumer Disc.", price: 44.19, change: -0.44, changePct: -0.99, positionSize: 900000, shares: 20367, weight: 1.3, pnl: -8961, dateAdded: new Date("2024-09-01") },
  { ticker: "NVDA", name: "Nvidia", sector: "Technology", price: 177.39, change: 1.64, changePct: 0.93, positionSize: 5500000, shares: 31005, weight: 8.1, pnl: 50848, dateAdded: new Date("2024-02-03") },
  { ticker: "PFE", name: "Pfizer", sector: "Healthcare", price: 28.32, change: -0.23, changePct: -0.81, positionSize: 700000, shares: 24718, weight: 1.0, pnl: -5685, dateAdded: new Date("2024-07-20") },
  { ticker: "PLTR", name: "Palantir", sector: "Technology", price: 148.46, change: 1.97, changePct: 1.34, positionSize: 2200000, shares: 14819, weight: 3.2, pnl: 29193, dateAdded: new Date("2024-05-01") },
  { ticker: "TSLA", name: "Tesla", sector: "Consumer Disc.", price: 360.59, change: -20.67, changePct: -5.42, positionSize: 4800000, shares: 13311, weight: 7.1, pnl: -275103, dateAdded: new Date("2024-01-10") },
  { ticker: "UNH", name: "UnitedHealth", sector: "Healthcare", price: 277.26, change: 3.28, changePct: 1.20, positionSize: 2800000, shares: 10099, weight: 4.1, pnl: 33125, dateAdded: new Date("2024-02-14") },
  { ticker: "WMT", name: "Walmart", sector: "Consumer Staples", price: 125.79, change: 1.05, changePct: 0.84, positionSize: 1900000, shares: 15104, weight: 2.8, pnl: 15859, dateAdded: new Date("2024-04-01") },
];

export const totalAUM = holdings.reduce((sum, h) => sum + h.positionSize, 0);
export const dailyPnL = holdings.reduce((sum, h) => sum + h.pnl, 0);
export const portfolioBeta = 1.12;

export const initialNews: NewsItem[] = [
  {
    id: "1",
    headline: "Microsoft launches 3 new in-house AI models in direct shot at OpenAI and Google",
    timestamp: new Date(Date.now() - 12 * 60000),
    source: "VentureBeat",
    affectedTickers: ["MSFT", "GOOGL", "CRM"],
    impactScore: 8,
    url: "https://venturebeat.com/technology/microsoft-launches-3-new-ai-models-in-direct-shot-at-openai-and-google",
  },
  {
    id: "2",
    headline: "Morgan Stanley says NVIDIA just regained its No. 1 spot — stock back on the throne",
    timestamp: new Date(Date.now() - 34 * 60000),
    source: "Yahoo Finance",
    affectedTickers: ["NVDA", "MSFT", "GOOGL"],
    impactScore: 7,
    url: "https://finance.yahoo.com/news/morgan-stanley-says-nvidia-just-123002182.html",
  },
  {
    id: "3",
    headline: "Eli Lilly secures landmark FDA approval for oral weight-loss pill, shares soar",
    timestamp: new Date(Date.now() - 58 * 60000),
    source: "Reuters",
    affectedTickers: ["LLY", "JNJ", "UNH", "ABBV"],
    impactScore: 9,
    url: "https://www.reuters.com/business/healthcare-pharmaceuticals/lilly-gains-after-fda-approves-weight-loss-pill-sizing-down-investor-doubts-2026-04-01/",
  },
  {
    id: "4",
    headline: "Apple's AI strategy is pivoting — analysts say it could be great news for the stock",
    timestamp: new Date(Date.now() - 87 * 60000),
    source: "Motley Fool",
    affectedTickers: ["AAPL", "MSFT", "NVDA"],
    impactScore: 6,
    url: "https://www.fool.com/investing/2026/04/02/apple-ai-strategy-pivot-great-news-stock/",
  },
  {
    id: "5",
    headline: "Microsoft vs Apple: $30B AI buildout vs $85B iPhone surge — which bet wins?",
    timestamp: new Date(Date.now() - 120 * 60000),
    source: "24/7 Wall St",
    affectedTickers: ["MSFT", "AAPL", "NVDA"],
    impactScore: 5,
    url: "https://247wallst.com/investing/2026/04/02/microsoft-vs-apple-30b-ai-buildout-vs-85b-iphone-surge/",
  },
  {
    id: "6",
    headline: "Magnificent Seven face 2026 underperformance due to high valuations and Middle East tensions",
    timestamp: new Date(Date.now() - 180 * 60000),
    source: "Zacks",
    affectedTickers: ["AAPL", "MSFT", "NVDA", "AMZN", "GOOGL"],
    impactScore: 7,
    url: "https://www.ainvest.com/news/apple-nvidia-microsoft-buy-dip-big-tech-2604/",
  },
  {
    id: "7",
    headline: "JPMorgan and Goldman Sachs lead financials rally as rate-cut expectations firm",
    timestamp: new Date(Date.now() - 240 * 60000),
    source: "Bloomberg",
    affectedTickers: ["JPM", "GS", "BAC", "V"],
    impactScore: 6,
    url: "https://www.bloomberg.com/markets",
  },
  {
    id: "8",
    headline: "Exxon Mobil and Chevron face headwinds as crude oil drops on Iran war resolution hopes",
    timestamp: new Date(Date.now() - 300 * 60000),
    source: "CNBC",
    affectedTickers: ["XOM", "CVX"],
    impactScore: 7,
    url: "https://www.cnbc.com/energy/",
  },
];

export const sectors = [...new Set(holdings.map((h) => h.sector))];
