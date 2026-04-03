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
  { ticker: "AAPL", name: "Apple", sector: "Technology", price: 255.92, change: 0.29, changePct: 0.11, positionSize: 9213.12, shares: 36, weight: 0, pnl: 10.44, dateAdded: new Date("2024-02-12"), thesis: "Services growth and ecosystem monetization will drive margin expansion despite slowing hardware growth", catalysts: "Services revenue acceleration; new product category (Vision Pro); buybacks", breakConditions: "iPhone demand decline; Services growth slowdown; regulatory pressure on App Store", risk_factors: { rates_sensitivity: 4, commodity_exposure: 3, usd_sensitivity: 7, credit_sensitivity: 2, equity_beta: 5, growth_value_tilt: 6, market_cap_size: 10, credit_rating: 10, consumer_spending_sensitivity: 7, key_management_risk: 4, brand_reputational_risk: 8 } },
  { ticker: "AMZN", name: "Amazon", sector: "Consumer Disc.", price: 209.77, change: -0.80, changePct: -0.38, positionSize: 6712.64, shares: 32, weight: 0, pnl: -25.60, dateAdded: new Date("2024-11-05"), thesis: "Retail margin expansion and AWS recovery will drive earnings inflection", catalysts: "AWS reacceleration; cost discipline; advertising growth", breakConditions: "AWS stagnation; retail margin compression; higher fulfillment costs", risk_factors: { rates_sensitivity: 5, commodity_exposure: 2, usd_sensitivity: 5, credit_sensitivity: 3, equity_beta: 7, growth_value_tilt: 8, market_cap_size: 10, credit_rating: 9, consumer_spending_sensitivity: 8, key_management_risk: 3, brand_reputational_risk: 7 } },
  { ticker: "BA", name: "Boeing", sector: "Industrials", price: 208.22, change: 0.90, changePct: 0.43, positionSize: 3331.52, shares: 16, weight: 0, pnl: 14.40, dateAdded: new Date("2024-06-03"), thesis: "Production normalization and backlog execution will drive earnings recovery", catalysts: "Delivery ramp-up; regulatory clearance; order growth", breakConditions: "Production delays; safety issues; cash burn", risk_factors: { rates_sensitivity: 6, commodity_exposure: 5, usd_sensitivity: 4, credit_sensitivity: 7, equity_beta: 8, growth_value_tilt: 4, market_cap_size: 8, credit_rating: 4, consumer_spending_sensitivity: 3, key_management_risk: 8, brand_reputational_risk: 9 } },
  { ticker: "CAT", name: "Caterpillar", sector: "Industrials", price: 717.22, change: -13.10, changePct: -1.79, positionSize: 3586.10, shares: 5, weight: 0, pnl: -65.50, dateAdded: new Date("2024-09-17"), thesis: "Infrastructure spending and commodity cycle will support sustained demand", catalysts: "US infrastructure spend; mining demand; pricing power", breakConditions: "Commodity downturn; order slowdown; margin pressure", risk_factors: { rates_sensitivity: 5, commodity_exposure: 9, usd_sensitivity: 6, credit_sensitivity: 3, equity_beta: 6, growth_value_tilt: 3, market_cap_size: 9, credit_rating: 9, consumer_spending_sensitivity: 4, key_management_risk: 3, brand_reputational_risk: 5 } },
  { ticker: "COIN", name: "Coinbase Global", sector: "Financials", price: 171.46, change: -1.53, changePct: -0.88, positionSize: 1714.60, shares: 10, weight: 0, pnl: -15.30, dateAdded: new Date("2025-11-21"), thesis: "Crypto market recovery and institutional adoption will drive revenue growth", catalysts: "Bitcoin rally; ETF inflows; trading volume growth", breakConditions: "Crypto downturn; regulatory pressure; fee compression", risk_factors: { rates_sensitivity: 7, commodity_exposure: 2, usd_sensitivity: 4, credit_sensitivity: 5, equity_beta: 10, growth_value_tilt: 9, market_cap_size: 6, credit_rating: 3, consumer_spending_sensitivity: 6, key_management_risk: 7, brand_reputational_risk: 8 } },
  { ticker: "GOOGL", name: "Alphabet", sector: "Technology", price: 295.77, change: -1.62, changePct: -0.54, positionSize: 6506.94, shares: 22, weight: 0, pnl: -35.64, dateAdded: new Date("2025-03-14"), thesis: "Search dominance plus AI integration will sustain growth while margins expand", catalysts: "AI monetization in search; YouTube growth; cost control", breakConditions: "Search share loss; AI cannibalization; regulatory constraints", risk_factors: { rates_sensitivity: 4, commodity_exposure: 1, usd_sensitivity: 5, credit_sensitivity: 2, equity_beta: 6, growth_value_tilt: 7, market_cap_size: 10, credit_rating: 10, consumer_spending_sensitivity: 5, key_management_risk: 3, brand_reputational_risk: 7 } },
  { ticker: "GS", name: "Goldman Sachs", sector: "Financials", price: 863.04, change: 2.83, changePct: 0.33, positionSize: 2589.12, shares: 3, weight: 0, pnl: 8.49, dateAdded: new Date("2025-05-27"), thesis: "Capital markets rebound and cost discipline will drive earnings recovery", catalysts: "M&A recovery; trading strength; cost cuts", breakConditions: "Weak deal activity; trading volatility; strategy misexecution", risk_factors: { rates_sensitivity: 8, commodity_exposure: 3, usd_sensitivity: 5, credit_sensitivity: 8, equity_beta: 7, growth_value_tilt: 4, market_cap_size: 9, credit_rating: 8, consumer_spending_sensitivity: 3, key_management_risk: 5, brand_reputational_risk: 7 } },
  { ticker: "JPM", name: "JPMorgan Chase", sector: "Financials", price: 294.60, change: -0.78, changePct: -0.26, positionSize: 5597.40, shares: 19, weight: 0, pnl: -14.82, dateAdded: new Date("2024-08-19"), thesis: "Market share gains and diversified revenue streams will outperform peers across cycles", catalysts: "Net interest income growth; capital markets recovery", breakConditions: "Credit losses; NIM compression; regulatory tightening", risk_factors: { rates_sensitivity: 9, commodity_exposure: 2, usd_sensitivity: 4, credit_sensitivity: 8, equity_beta: 5, growth_value_tilt: 3, market_cap_size: 10, credit_rating: 9, consumer_spending_sensitivity: 4, key_management_risk: 4, brand_reputational_risk: 6 } },
  { ticker: "LLY", name: "Eli Lilly", sector: "Healthcare", price: 935.58, change: -18.94, changePct: -1.98, positionSize: 10291.38, shares: 11, weight: 0, pnl: -208.34, dateAdded: new Date("2025-12-03"), thesis: "GLP-1 franchise will drive outsized revenue growth and market share gains", catalysts: "Obesity drug adoption; capacity expansion; new indications", breakConditions: "Manufacturing constraints; competitive pressure; pricing regulation", risk_factors: { rates_sensitivity: 3, commodity_exposure: 1, usd_sensitivity: 4, credit_sensitivity: 2, equity_beta: 5, growth_value_tilt: 9, market_cap_size: 10, credit_rating: 9, consumer_spending_sensitivity: 3, key_management_risk: 5, brand_reputational_risk: 7 } },
  { ticker: "META", name: "Meta Platforms", sector: "Technology", price: 574.46, change: -4.77, changePct: -0.82, positionSize: 5744.60, shares: 10, weight: 0, pnl: -47.70, dateAdded: new Date("2024-01-26"), thesis: "Ad efficiency and AI-driven engagement will drive revenue growth and margin expansion", catalysts: "Reels monetization; AI ad tools; cost discipline", breakConditions: "Ad demand weakness; Reality Labs losses; engagement decline", risk_factors: { rates_sensitivity: 4, commodity_exposure: 1, usd_sensitivity: 5, credit_sensitivity: 2, equity_beta: 7, growth_value_tilt: 8, market_cap_size: 10, credit_rating: 9, consumer_spending_sensitivity: 6, key_management_risk: 8, brand_reputational_risk: 9 } },
  { ticker: "MRNA", name: "Moderna", sector: "Healthcare", price: 49.20, change: -0.83, changePct: -1.66, positionSize: 2115.60, shares: 43, weight: 0, pnl: -35.69, dateAdded: new Date("2024-04-22"), thesis: "mRNA platform expansion beyond COVID will unlock long-term growth", catalysts: "New vaccine approvals; oncology pipeline; partnerships", breakConditions: "Pipeline delays; lack of diversification; declining COVID revenue", risk_factors: { rates_sensitivity: 3, commodity_exposure: 1, usd_sensitivity: 3, credit_sensitivity: 4, equity_beta: 9, growth_value_tilt: 10, market_cap_size: 7, credit_rating: 5, consumer_spending_sensitivity: 2, key_management_risk: 6, brand_reputational_risk: 6 } },
  { ticker: "MS", name: "Morgan Stanley", sector: "Financials", price: 165.81, change: -0.36, changePct: -0.22, positionSize: 2818.77, shares: 17, weight: 0, pnl: -6.12, dateAdded: new Date("2025-07-15"), thesis: "Wealth management growth will stabilize earnings and drive multiple expansion", catalysts: "Net new assets; fee-based revenue growth; cost efficiency", breakConditions: "Market downturn; asset outflows; margin compression", risk_factors: { rates_sensitivity: 8, commodity_exposure: 2, usd_sensitivity: 4, credit_sensitivity: 7, equity_beta: 6, growth_value_tilt: 4, market_cap_size: 9, credit_rating: 8, consumer_spending_sensitivity: 3, key_management_risk: 4, brand_reputational_risk: 6 } },
  { ticker: "MSFT", name: "Microsoft", sector: "Technology", price: 373.46, change: 4.09, changePct: 1.11, positionSize: 7842.66, shares: 21, weight: 0, pnl: 85.89, dateAdded: new Date("2025-01-24"), thesis: "Sustained enterprise AI adoption will drive Azure reacceleration and operating leverage", catalysts: "Azure growth reacceleration; Copilot monetization; enterprise AI spend", breakConditions: "Azure deceleration; weak AI monetization; cloud pricing pressure", risk_factors: { rates_sensitivity: 4, commodity_exposure: 1, usd_sensitivity: 6, credit_sensitivity: 2, equity_beta: 5, growth_value_tilt: 7, market_cap_size: 10, credit_rating: 10, consumer_spending_sensitivity: 4, key_management_risk: 3, brand_reputational_risk: 6 } },
  { ticker: "NKE", name: "Nike", sector: "Consumer Disc.", price: 44.19, change: -0.44, changePct: -0.99, positionSize: 2386.26, shares: 54, weight: 0, pnl: -23.76, dateAdded: new Date("2025-08-12"), thesis: "Brand strength and direct-to-consumer shift will drive margin expansion", catalysts: "DTC growth; inventory normalization; product innovation", breakConditions: "Weak demand; inventory overhang; competitive pressure", risk_factors: { rates_sensitivity: 3, commodity_exposure: 4, usd_sensitivity: 7, credit_sensitivity: 3, equity_beta: 6, growth_value_tilt: 5, market_cap_size: 9, credit_rating: 8, consumer_spending_sensitivity: 9, key_management_risk: 5, brand_reputational_risk: 9 } },
  { ticker: "NVDA", name: "Nvidia", sector: "Technology", price: 177.39, change: 1.64, changePct: 0.93, positionSize: 10466.01, shares: 59, weight: 0, pnl: 96.76, dateAdded: new Date("2025-06-18"), thesis: "AI infrastructure demand will remain supply-constrained, sustaining pricing power and revenue growth", catalysts: "Hyperscaler capex expansion; new chip cycles; margin expansion", breakConditions: "Capex slowdown; inventory buildup; competitive pressure (AMD/custom silicon)", risk_factors: { rates_sensitivity: 3, commodity_exposure: 2, usd_sensitivity: 5, credit_sensitivity: 2, equity_beta: 8, growth_value_tilt: 10, market_cap_size: 10, credit_rating: 9, consumer_spending_sensitivity: 3, key_management_risk: 6, brand_reputational_risk: 5 } },
  { ticker: "PFE", name: "Pfizer", sector: "Healthcare", price: 28.32, change: -0.23, changePct: -0.81, positionSize: 3200.16, shares: 113, weight: 0, pnl: -25.99, dateAdded: new Date("2025-09-09"), thesis: "Pipeline execution and cost restructuring will offset post-COVID revenue decline", catalysts: "New drug approvals; cost cuts; oncology pipeline", breakConditions: "Pipeline failures; faster-than-expected revenue decline", risk_factors: { rates_sensitivity: 3, commodity_exposure: 1, usd_sensitivity: 4, credit_sensitivity: 3, equity_beta: 4, growth_value_tilt: 3, market_cap_size: 9, credit_rating: 8, consumer_spending_sensitivity: 2, key_management_risk: 4, brand_reputational_risk: 7 } },
  { ticker: "PLTR", name: "Palantir", sector: "Technology", price: 148.46, change: 1.97, changePct: 1.34, positionSize: 2375.36, shares: 16, weight: 0, pnl: 31.52, dateAdded: new Date("2026-01-06"), thesis: "Commercial adoption of AI platform will accelerate revenue growth and expand margins", catalysts: "New enterprise contracts; AI platform adoption; government deals", breakConditions: "Slowing growth; contract concentration; competitive pressure", risk_factors: { rates_sensitivity: 5, commodity_exposure: 1, usd_sensitivity: 3, credit_sensitivity: 3, equity_beta: 9, growth_value_tilt: 10, market_cap_size: 7, credit_rating: 5, consumer_spending_sensitivity: 2, key_management_risk: 9, brand_reputational_risk: 6 } },
  { ticker: "TSLA", name: "Tesla", sector: "Consumer Disc.", price: 360.59, change: -20.67, changePct: -5.42, positionSize: 5408.85, shares: 15, weight: 0, pnl: -310.05, dateAdded: new Date("2025-10-08"), thesis: "Autonomy and energy segments will unlock new growth beyond EVs", catalysts: "FSD progress; energy storage growth; margin recovery", breakConditions: "EV demand slowdown; pricing pressure; execution delays", risk_factors: { rates_sensitivity: 5, commodity_exposure: 7, usd_sensitivity: 5, credit_sensitivity: 4, equity_beta: 9, growth_value_tilt: 10, market_cap_size: 10, credit_rating: 6, consumer_spending_sensitivity: 8, key_management_risk: 10, brand_reputational_risk: 10 } },
  { ticker: "UNH", name: "UnitedHealth", sector: "Healthcare", price: 277.26, change: 3.28, changePct: 1.20, positionSize: 4436.16, shares: 16, weight: 0, pnl: 52.48, dateAdded: new Date("2025-02-11"), thesis: "Integrated payer-provider model will sustain steady growth and margin resilience", catalysts: "Membership growth; pricing power; Optum expansion", breakConditions: "Medical cost inflation; regulatory pressure; reimbursement changes", risk_factors: { rates_sensitivity: 3, commodity_exposure: 1, usd_sensitivity: 2, credit_sensitivity: 3, equity_beta: 4, growth_value_tilt: 5, market_cap_size: 10, credit_rating: 9, consumer_spending_sensitivity: 5, key_management_risk: 4, brand_reputational_risk: 7 } },
  { ticker: "WMT", name: "Walmart", sector: "Consumer Staples", price: 125.79, change: 1.05, changePct: 0.84, positionSize: 3899.49, shares: 31, weight: 0, pnl: 32.55, dateAdded: new Date("2024-01-09"), thesis: "Defensive positioning and e-commerce growth will drive steady performance", catalysts: "Market share gains; e-commerce profitability; cost control", breakConditions: "Consumer weakness; margin compression; inventory issues", risk_factors: { rates_sensitivity: 2, commodity_exposure: 3, usd_sensitivity: 3, credit_sensitivity: 2, equity_beta: 3, growth_value_tilt: 3, market_cap_size: 10, credit_rating: 10, consumer_spending_sensitivity: 7, key_management_risk: 3, brand_reputational_risk: 6 } },
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
