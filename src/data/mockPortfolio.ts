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
  { ticker: "AAPL", name: "Apple Inc.", sector: "Technology", price: 227.48, change: 3.12, changePct: 1.39, positionSize: 4500000, shares: 19782, weight: 8.2, pnl: 61714, dateAdded: new Date("2024-01-15") },
  { ticker: "NVDA", name: "NVIDIA Corp.", sector: "Technology", price: 131.29, change: -2.47, changePct: -1.85, positionSize: 5200000, shares: 39605, weight: 9.5, pnl: -97824, dateAdded: new Date("2024-02-03") },
  { ticker: "MSFT", name: "Microsoft Corp.", sector: "Technology", price: 454.27, change: 1.83, changePct: 0.40, positionSize: 3800000, shares: 8365, weight: 6.9, pnl: 15308, dateAdded: new Date("2023-11-20") },
  { ticker: "AMZN", name: "Amazon.com Inc.", sector: "Consumer Disc.", price: 225.94, change: -0.56, changePct: -0.25, positionSize: 3200000, shares: 14163, weight: 5.8, pnl: -7931, dateAdded: new Date("2024-03-10") },
  { ticker: "GOOGL", name: "Alphabet Inc.", sector: "Technology", price: 191.41, change: 0.92, changePct: 0.48, positionSize: 2900000, shares: 15152, weight: 5.3, pnl: 13940, dateAdded: new Date("2023-12-05") },
  { ticker: "JPM", name: "JPMorgan Chase", sector: "Financials", price: 268.45, change: 4.21, changePct: 1.59, positionSize: 3100000, shares: 11548, weight: 5.6, pnl: 48617, dateAdded: new Date("2024-01-22") },
  { ticker: "XOM", name: "Exxon Mobil", sector: "Energy", price: 108.73, change: -1.34, changePct: -1.22, positionSize: 2400000, shares: 22074, weight: 4.4, pnl: -29579, dateAdded: new Date("2023-10-15") },
  { ticker: "JNJ", name: "Johnson & Johnson", sector: "Healthcare", price: 159.82, change: 0.45, changePct: 0.28, positionSize: 2200000, shares: 13766, weight: 4.0, pnl: 6195, dateAdded: new Date("2023-09-01") },
  { ticker: "UNH", name: "UnitedHealth Group", sector: "Healthcare", price: 487.23, change: -3.67, changePct: -0.75, positionSize: 2800000, shares: 5746, weight: 5.1, pnl: -21088, dateAdded: new Date("2024-02-14") },
  { ticker: "V", name: "Visa Inc.", sector: "Financials", price: 342.15, change: 2.08, changePct: 0.61, positionSize: 2100000, shares: 6139, weight: 3.8, pnl: 12769, dateAdded: new Date("2023-11-10") },
  { ticker: "PG", name: "Procter & Gamble", sector: "Consumer Staples", price: 172.34, change: 0.67, changePct: 0.39, positionSize: 1800000, shares: 10445, weight: 3.3, pnl: 6998, dateAdded: new Date("2023-08-20") },
  { ticker: "HD", name: "Home Depot", sector: "Consumer Disc.", price: 391.56, change: -2.13, changePct: -0.54, positionSize: 1900000, shares: 4853, weight: 3.5, pnl: -10337, dateAdded: new Date("2024-01-05") },
  { ticker: "CVX", name: "Chevron Corp.", sector: "Energy", price: 152.89, change: -0.98, changePct: -0.64, positionSize: 1700000, shares: 11119, weight: 3.1, pnl: -10897, dateAdded: new Date("2023-10-28") },
  { ticker: "LLY", name: "Eli Lilly & Co.", sector: "Healthcare", price: 812.45, change: 5.23, changePct: 0.65, positionSize: 3500000, shares: 4308, weight: 6.4, pnl: 22531, dateAdded: new Date("2024-03-01") },
  { ticker: "BAC", name: "Bank of America", sector: "Financials", price: 43.67, change: 0.34, changePct: 0.78, positionSize: 1500000, shares: 34358, weight: 2.7, pnl: 11682, dateAdded: new Date("2023-12-18") },
  { ticker: "ABBV", name: "AbbVie Inc.", sector: "Healthcare", price: 191.23, change: 1.12, changePct: 0.59, positionSize: 1600000, shares: 8367, weight: 2.9, pnl: 9371, dateAdded: new Date("2024-02-20") },
  { ticker: "CRM", name: "Salesforce Inc.", sector: "Technology", price: 328.41, change: -1.89, changePct: -0.57, positionSize: 1400000, shares: 4263, weight: 2.5, pnl: -8057, dateAdded: new Date("2024-01-30") },
  { ticker: "COST", name: "Costco Wholesale", sector: "Consumer Staples", price: 923.17, change: 3.45, changePct: 0.37, positionSize: 2000000, shares: 2167, weight: 3.6, pnl: 7476, dateAdded: new Date("2023-11-25") },
  { ticker: "NEE", name: "NextEra Energy", sector: "Utilities", price: 73.45, change: -0.23, changePct: -0.31, positionSize: 1100000, shares: 14976, weight: 2.0, pnl: -3444, dateAdded: new Date("2024-03-15") },
  { ticker: "GS", name: "Goldman Sachs", sector: "Financials", price: 592.34, change: 7.82, changePct: 1.34, positionSize: 2300000, shares: 3883, weight: 4.2, pnl: 30365, dateAdded: new Date("2023-12-10") },
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
