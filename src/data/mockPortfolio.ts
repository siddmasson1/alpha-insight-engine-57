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
    headline: "Fed signals potential rate pause amid cooling inflation data",
    timestamp: new Date(Date.now() - 12 * 60000),
    source: "Reuters",
    affectedTickers: ["JPM", "BAC", "GS", "V"],
    impactScore: 7,
  },
  {
    id: "2",
    headline: "NVIDIA unveils next-gen Blackwell Ultra chips, beats production targets",
    timestamp: new Date(Date.now() - 34 * 60000),
    source: "Bloomberg",
    affectedTickers: ["NVDA", "MSFT", "GOOGL"],
    impactScore: 8,
  },
  {
    id: "3",
    headline: "Oil prices drop 3% as OPEC+ considers increasing output quotas",
    timestamp: new Date(Date.now() - 58 * 60000),
    source: "CNBC",
    affectedTickers: ["XOM", "CVX"],
    impactScore: 6,
  },
  {
    id: "4",
    headline: "Eli Lilly obesity drug shows 25% weight loss in Phase 3 trial",
    timestamp: new Date(Date.now() - 87 * 60000),
    source: "WSJ",
    affectedTickers: ["LLY", "JNJ", "UNH", "ABBV"],
    impactScore: 9,
  },
  {
    id: "5",
    headline: "Amazon expands same-day delivery to 15 new metro areas",
    timestamp: new Date(Date.now() - 120 * 60000),
    source: "TechCrunch",
    affectedTickers: ["AMZN", "COST", "HD"],
    impactScore: 4,
  },
  {
    id: "6",
    headline: "SEC proposes new cybersecurity disclosure rules for public companies",
    timestamp: new Date(Date.now() - 180 * 60000),
    source: "Financial Times",
    affectedTickers: ["CRM", "MSFT", "GOOGL"],
    impactScore: 5,
  },
];

export const sectors = [...new Set(holdings.map((h) => h.sector))];
