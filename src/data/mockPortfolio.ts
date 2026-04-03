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
  { ticker: "AAPL", name: "Apple", sector: "Technology", price: 255.92, change: 0.29, changePct: 0.11, positionSize: 9213.12, shares: 36, weight: 0, pnl: 10.44, dateAdded: new Date("2024-02-12"), thesis: "Services growth and ecosystem monetization will drive margin expansion despite slowing hardware growth", catalysts: "Services revenue acceleration; new product category (Vision Pro); buybacks", breakConditions: "iPhone demand decline; Services growth slowdown; regulatory pressure on App Store" },
  { ticker: "AMZN", name: "Amazon", sector: "Consumer Disc.", price: 209.77, change: -0.80, changePct: -0.38, positionSize: 6712.64, shares: 32, weight: 0, pnl: -25.60, dateAdded: new Date("2024-11-05"), thesis: "Retail margin expansion and AWS recovery will drive earnings inflection", catalysts: "AWS reacceleration; cost discipline; advertising growth", breakConditions: "AWS stagnation; retail margin compression; higher fulfillment costs" },
  { ticker: "BA", name: "Boeing", sector: "Industrials", price: 208.22, change: 0.90, changePct: 0.43, positionSize: 3331.52, shares: 16, weight: 0, pnl: 14.40, dateAdded: new Date("2024-06-03"), thesis: "Production normalization and backlog execution will drive earnings recovery", catalysts: "Delivery ramp-up; regulatory clearance; order growth", breakConditions: "Production delays; safety issues; cash burn" },
  { ticker: "CAT", name: "Caterpillar", sector: "Industrials", price: 717.22, change: -13.10, changePct: -1.79, positionSize: 3586.10, shares: 5, weight: 0, pnl: -65.50, dateAdded: new Date("2024-09-17"), thesis: "Infrastructure spending and commodity cycle will support sustained demand", catalysts: "US infrastructure spend; mining demand; pricing power", breakConditions: "Commodity downturn; order slowdown; margin pressure" },
  { ticker: "COIN", name: "Coinbase Global", sector: "Financials", price: 171.46, change: -1.53, changePct: -0.88, positionSize: 1714.60, shares: 10, weight: 0, pnl: -15.30, dateAdded: new Date("2025-11-21"), thesis: "Crypto market recovery and institutional adoption will drive revenue growth", catalysts: "Bitcoin rally; ETF inflows; trading volume growth", breakConditions: "Crypto downturn; regulatory pressure; fee compression" },
  { ticker: "GOOGL", name: "Alphabet", sector: "Technology", price: 295.77, change: -1.62, changePct: -0.54, positionSize: 6506.94, shares: 22, weight: 0, pnl: -35.64, dateAdded: new Date("2025-03-14"), thesis: "Search dominance plus AI integration will sustain growth while margins expand", catalysts: "AI monetization in search; YouTube growth; cost control", breakConditions: "Search share loss; AI cannibalization; regulatory constraints" },
  { ticker: "GS", name: "Goldman Sachs", sector: "Financials", price: 863.04, change: 2.83, changePct: 0.33, positionSize: 2589.12, shares: 3, weight: 0, pnl: 8.49, dateAdded: new Date("2025-05-27"), thesis: "Capital markets rebound and cost discipline will drive earnings recovery", catalysts: "M&A recovery; trading strength; cost cuts", breakConditions: "Weak deal activity; trading volatility; strategy misexecution" },
  { ticker: "JPM", name: "JPMorgan Chase", sector: "Financials", price: 294.60, change: -0.78, changePct: -0.26, positionSize: 5597.40, shares: 19, weight: 0, pnl: -14.82, dateAdded: new Date("2024-08-19"), thesis: "Market share gains and diversified revenue streams will outperform peers across cycles", catalysts: "Net interest income growth; capital markets recovery", breakConditions: "Credit losses; NIM compression; regulatory tightening" },
  { ticker: "LLY", name: "Eli Lilly", sector: "Healthcare", price: 935.58, change: -18.94, changePct: -1.98, positionSize: 10291.38, shares: 11, weight: 0, pnl: -208.34, dateAdded: new Date("2025-12-03"), thesis: "GLP-1 franchise will drive outsized revenue growth and market share gains", catalysts: "Obesity drug adoption; capacity expansion; new indications", breakConditions: "Manufacturing constraints; competitive pressure; pricing regulation" },
  { ticker: "META", name: "Meta Platforms", sector: "Technology", price: 574.46, change: -4.77, changePct: -0.82, positionSize: 5744.60, shares: 10, weight: 0, pnl: -47.70, dateAdded: new Date("2024-01-26"), thesis: "Ad efficiency and AI-driven engagement will drive revenue growth and margin expansion", catalysts: "Reels monetization; AI ad tools; cost discipline", breakConditions: "Ad demand weakness; Reality Labs losses; engagement decline" },
  { ticker: "MRNA", name: "Moderna", sector: "Healthcare", price: 49.20, change: -0.83, changePct: -1.66, positionSize: 2115.60, shares: 43, weight: 0, pnl: -35.69, dateAdded: new Date("2024-04-22"), thesis: "mRNA platform expansion beyond COVID will unlock long-term growth", catalysts: "New vaccine approvals; oncology pipeline; partnerships", breakConditions: "Pipeline delays; lack of diversification; declining COVID revenue" },
  { ticker: "MS", name: "Morgan Stanley", sector: "Financials", price: 165.81, change: -0.36, changePct: -0.22, positionSize: 2818.77, shares: 17, weight: 0, pnl: -6.12, dateAdded: new Date("2025-07-15"), thesis: "Wealth management growth will stabilize earnings and drive multiple expansion", catalysts: "Net new assets; fee-based revenue growth; cost efficiency", breakConditions: "Market downturn; asset outflows; margin compression" },
  { ticker: "MSFT", name: "Microsoft", sector: "Technology", price: 373.46, change: 4.09, changePct: 1.11, positionSize: 7842.66, shares: 21, weight: 0, pnl: 85.89, dateAdded: new Date("2025-01-24"), thesis: "Sustained enterprise AI adoption will drive Azure reacceleration and operating leverage", catalysts: "Azure growth reacceleration; Copilot monetization; enterprise AI spend", breakConditions: "Azure deceleration; weak AI monetization; cloud pricing pressure" },
  { ticker: "NKE", name: "Nike", sector: "Consumer Disc.", price: 44.19, change: -0.44, changePct: -0.99, positionSize: 2386.26, shares: 54, weight: 0, pnl: -23.76, dateAdded: new Date("2025-08-12"), thesis: "Brand strength and direct-to-consumer shift will drive margin expansion", catalysts: "DTC growth; inventory normalization; product innovation", breakConditions: "Weak demand; inventory overhang; competitive pressure" },
  { ticker: "NVDA", name: "Nvidia", sector: "Technology", price: 177.39, change: 1.64, changePct: 0.93, positionSize: 10466.01, shares: 59, weight: 0, pnl: 96.76, dateAdded: new Date("2025-06-18"), thesis: "AI infrastructure demand will remain supply-constrained, sustaining pricing power and revenue growth", catalysts: "Hyperscaler capex expansion; new chip cycles; margin expansion", breakConditions: "Capex slowdown; inventory buildup; competitive pressure (AMD/custom silicon)" },
  { ticker: "PFE", name: "Pfizer", sector: "Healthcare", price: 28.32, change: -0.23, changePct: -0.81, positionSize: 3200.16, shares: 113, weight: 0, pnl: -25.99, dateAdded: new Date("2025-09-09"), thesis: "Pipeline execution and cost restructuring will offset post-COVID revenue decline", catalysts: "New drug approvals; cost cuts; oncology pipeline", breakConditions: "Pipeline failures; faster-than-expected revenue decline" },
  { ticker: "PLTR", name: "Palantir", sector: "Technology", price: 148.46, change: 1.97, changePct: 1.34, positionSize: 2375.36, shares: 16, weight: 0, pnl: 31.52, dateAdded: new Date("2026-01-06"), thesis: "Commercial adoption of AI platform will accelerate revenue growth and expand margins", catalysts: "New enterprise contracts; AI platform adoption; government deals", breakConditions: "Slowing growth; contract concentration; competitive pressure" },
  { ticker: "TSLA", name: "Tesla", sector: "Consumer Disc.", price: 360.59, change: -20.67, changePct: -5.42, positionSize: 5408.85, shares: 15, weight: 0, pnl: -310.05, dateAdded: new Date("2025-10-08"), thesis: "Autonomy and energy segments will unlock new growth beyond EVs", catalysts: "FSD progress; energy storage growth; margin recovery", breakConditions: "EV demand slowdown; pricing pressure; execution delays" },
  { ticker: "UNH", name: "UnitedHealth", sector: "Healthcare", price: 277.26, change: 3.28, changePct: 1.20, positionSize: 4436.16, shares: 16, weight: 0, pnl: 52.48, dateAdded: new Date("2025-02-11"), thesis: "Integrated payer-provider model will sustain steady growth and margin resilience", catalysts: "Membership growth; pricing power; Optum expansion", breakConditions: "Medical cost inflation; regulatory pressure; reimbursement changes" },
  { ticker: "WMT", name: "Walmart", sector: "Consumer Staples", price: 125.79, change: 1.05, changePct: 0.84, positionSize: 3899.49, shares: 31, weight: 0, pnl: 32.55, dateAdded: new Date("2024-01-09"), thesis: "Defensive positioning and e-commerce growth will drive steady performance", catalysts: "Market share gains; e-commerce profitability; cost control", breakConditions: "Consumer weakness; margin compression; inventory issues" },
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
