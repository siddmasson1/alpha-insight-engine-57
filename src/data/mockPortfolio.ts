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
  { ticker: "COIN", name: "Coinbase Global", sector: "Financials", price: 171.46, change: -1.53, changePct: -0.88, positionSize: 171.46 * 10, shares: 10, weight: 0, pnl: -1.53 * 10, dateAdded: new Date("2025-11-21"), thesis: "Crypto market recovery and institutional adoption will drive revenue growth", catalysts: "Bitcoin rally; ETF inflows; trading volume growth", breakConditions: "Crypto downturn; regulatory pressure; fee compression", risk_factors: { rates_sensitivity: 7, commodity_exposure: 2, usd_sensitivity: 4, credit_sensitivity: 5, equity_beta: 10, growth_value_tilt: 9, market_cap_size: 6, credit_rating: 3, consumer_spending_sensitivity: 6, key_management_risk: 7, brand_reputational_risk: 8 } },
  { ticker: "MRNA", name: "Moderna", sector: "Healthcare", price: 49.20, change: -0.83, changePct: -1.66, positionSize: 49.20 * 43, shares: 43, weight: 0, pnl: -0.83 * 43, dateAdded: new Date("2024-04-22"), thesis: "mRNA platform expansion beyond COVID will unlock long-term growth", catalysts: "New vaccine approvals; oncology pipeline; partnerships", breakConditions: "Pipeline delays; lack of diversification; declining COVID revenue", risk_factors: { rates_sensitivity: 3, commodity_exposure: 1, usd_sensitivity: 3, credit_sensitivity: 4, equity_beta: 9, growth_value_tilt: 10, market_cap_size: 7, credit_rating: 5, consumer_spending_sensitivity: 2, key_management_risk: 6, brand_reputational_risk: 6 } },
  { ticker: "NKE", name: "Nike", sector: "Consumer Disc.", price: 44.19, change: -0.44, changePct: -0.99, positionSize: 44.19 * 54, shares: 54, weight: 0, pnl: -0.44 * 54, dateAdded: new Date("2025-08-12"), thesis: "Brand strength and direct-to-consumer shift will drive margin expansion", catalysts: "DTC growth; inventory normalization; product innovation", breakConditions: "Weak demand; inventory overhang; competitive pressure", risk_factors: { rates_sensitivity: 3, commodity_exposure: 4, usd_sensitivity: 7, credit_sensitivity: 3, equity_beta: 6, growth_value_tilt: 5, market_cap_size: 9, credit_rating: 8, consumer_spending_sensitivity: 9, key_management_risk: 5, brand_reputational_risk: 9 } },
  { ticker: "PLTR", name: "Palantir", sector: "Technology", price: 148.46, change: 1.97, changePct: 1.34, positionSize: 148.46 * 16, shares: 16, weight: 0, pnl: 1.97 * 16, dateAdded: new Date("2026-01-06"), thesis: "Commercial adoption of AI platform will accelerate revenue growth and expand margins", catalysts: "New enterprise contracts; AI platform adoption; government deals", breakConditions: "Slowing growth; contract concentration; competitive pressure", risk_factors: { rates_sensitivity: 5, commodity_exposure: 1, usd_sensitivity: 3, credit_sensitivity: 3, equity_beta: 9, growth_value_tilt: 10, market_cap_size: 7, credit_rating: 5, consumer_spending_sensitivity: 2, key_management_risk: 9, brand_reputational_risk: 6 } },
  { ticker: "MS", name: "Morgan Stanley", sector: "Financials", price: 165.81, change: -0.36, changePct: -0.22, positionSize: 165.81 * 17, shares: 17, weight: 0, pnl: -0.36 * 17, dateAdded: new Date("2025-07-15"), thesis: "Wealth management growth will stabilize earnings and drive multiple expansion", catalysts: "Net new assets; fee-based revenue growth; cost efficiency", breakConditions: "Market downturn; asset outflows; margin compression", risk_factors: { rates_sensitivity: 8, commodity_exposure: 2, usd_sensitivity: 4, credit_sensitivity: 7, equity_beta: 6, growth_value_tilt: 4, market_cap_size: 9, credit_rating: 8, consumer_spending_sensitivity: 3, key_management_risk: 4, brand_reputational_risk: 6 } },
  { ticker: "GS", name: "Goldman Sachs", sector: "Financials", price: 863.04, change: 2.83, changePct: 0.33, positionSize: 863.04 * 3, shares: 3, weight: 0, pnl: 2.83 * 3, dateAdded: new Date("2025-05-27"), thesis: "Capital markets rebound and cost discipline will drive earnings recovery", catalysts: "M&A recovery; trading strength; cost cuts", breakConditions: "Weak deal activity; trading volatility; strategy misexecution", risk_factors: { rates_sensitivity: 8, commodity_exposure: 3, usd_sensitivity: 5, credit_sensitivity: 8, equity_beta: 7, growth_value_tilt: 4, market_cap_size: 9, credit_rating: 8, consumer_spending_sensitivity: 3, key_management_risk: 5, brand_reputational_risk: 7 } },
  { ticker: "PFE", name: "Pfizer", sector: "Healthcare", price: 28.32, change: -0.23, changePct: -0.81, positionSize: 28.32 * 113, shares: 113, weight: 0, pnl: -0.23 * 113, dateAdded: new Date("2025-09-09"), thesis: "Pipeline execution and cost restructuring will offset post-COVID revenue decline", catalysts: "New drug approvals; cost cuts; oncology pipeline", breakConditions: "Pipeline failures; faster-than-expected revenue decline", risk_factors: { rates_sensitivity: 3, commodity_exposure: 1, usd_sensitivity: 4, credit_sensitivity: 3, equity_beta: 4, growth_value_tilt: 3, market_cap_size: 9, credit_rating: 8, consumer_spending_sensitivity: 2, key_management_risk: 4, brand_reputational_risk: 7 } },
  { ticker: "BA", name: "Boeing", sector: "Industrials", price: 208.22, change: 0.90, changePct: 0.43, positionSize: 208.22 * 16, shares: 16, weight: 0, pnl: 0.90 * 16, dateAdded: new Date("2024-06-03"), thesis: "Production normalization and backlog execution will drive earnings recovery", catalysts: "Delivery ramp-up; regulatory clearance; order growth", breakConditions: "Production delays; safety issues; cash burn", risk_factors: { rates_sensitivity: 6, commodity_exposure: 5, usd_sensitivity: 4, credit_sensitivity: 7, equity_beta: 8, growth_value_tilt: 4, market_cap_size: 8, credit_rating: 4, consumer_spending_sensitivity: 3, key_management_risk: 8, brand_reputational_risk: 9 } },
  { ticker: "CAT", name: "Caterpillar", sector: "Industrials", price: 717.22, change: -13.10, changePct: -1.79, positionSize: 717.22 * 5, shares: 5, weight: 0, pnl: -13.10 * 5, dateAdded: new Date("2024-09-17"), thesis: "Infrastructure spending and commodity cycle will support sustained demand", catalysts: "US infrastructure spend; mining demand; pricing power", breakConditions: "Commodity downturn; order slowdown; margin pressure", risk_factors: { rates_sensitivity: 5, commodity_exposure: 9, usd_sensitivity: 6, credit_sensitivity: 3, equity_beta: 6, growth_value_tilt: 3, market_cap_size: 9, credit_rating: 9, consumer_spending_sensitivity: 4, key_management_risk: 3, brand_reputational_risk: 5 } },
  { ticker: "WMT", name: "Walmart", sector: "Consumer Staples", price: 125.79, change: 1.05, changePct: 0.84, positionSize: 125.79 * 31, shares: 31, weight: 0, pnl: 1.05 * 31, dateAdded: new Date("2024-01-09"), thesis: "Defensive positioning and e-commerce growth will drive steady performance", catalysts: "Market share gains; e-commerce profitability; cost control", breakConditions: "Consumer weakness; margin compression; inventory issues", risk_factors: { rates_sensitivity: 2, commodity_exposure: 3, usd_sensitivity: 3, credit_sensitivity: 2, equity_beta: 3, growth_value_tilt: 3, market_cap_size: 10, credit_rating: 10, consumer_spending_sensitivity: 7, key_management_risk: 3, brand_reputational_risk: 6 } },
  { ticker: "UNH", name: "UnitedHealth", sector: "Healthcare", price: 277.26, change: 3.28, changePct: 1.20, positionSize: 277.26 * 16, shares: 16, weight: 0, pnl: 3.28 * 16, dateAdded: new Date("2025-02-11"), thesis: "Integrated payer-provider model will sustain steady growth and margin resilience", catalysts: "Membership growth; pricing power; Optum expansion", breakConditions: "Medical cost inflation; regulatory pressure; reimbursement changes", risk_factors: { rates_sensitivity: 3, commodity_exposure: 1, usd_sensitivity: 2, credit_sensitivity: 3, equity_beta: 4, growth_value_tilt: 5, market_cap_size: 10, credit_rating: 9, consumer_spending_sensitivity: 5, key_management_risk: 4, brand_reputational_risk: 7 } },
  { ticker: "JPM", name: "JPMorgan Chase", sector: "Financials", price: 294.60, change: -0.78, changePct: -0.26, positionSize: 294.60 * 19, shares: 19, weight: 0, pnl: -0.78 * 19, dateAdded: new Date("2024-08-19"), thesis: "Market share gains and diversified revenue streams will outperform peers across cycles", catalysts: "Net interest income growth; capital markets recovery", breakConditions: "Credit losses; NIM compression; regulatory tightening", risk_factors: { rates_sensitivity: 9, commodity_exposure: 2, usd_sensitivity: 4, credit_sensitivity: 8, equity_beta: 5, growth_value_tilt: 3, market_cap_size: 10, credit_rating: 9, consumer_spending_sensitivity: 4, key_management_risk: 4, brand_reputational_risk: 6 } },
  { ticker: "TSLA", name: "Tesla", sector: "Consumer Disc.", price: 360.59, change: -20.67, changePct: -5.42, positionSize: 360.59 * 15, shares: 15, weight: 0, pnl: -20.67 * 15, dateAdded: new Date("2025-10-08"), thesis: "Autonomy and energy segments will unlock new growth beyond EVs", catalysts: "FSD progress; energy storage growth; margin recovery", breakConditions: "EV demand slowdown; pricing pressure; execution delays", risk_factors: { rates_sensitivity: 5, commodity_exposure: 7, usd_sensitivity: 5, credit_sensitivity: 4, equity_beta: 9, growth_value_tilt: 10, market_cap_size: 10, credit_rating: 6, consumer_spending_sensitivity: 8, key_management_risk: 10, brand_reputational_risk: 10 } },
  { ticker: "META", name: "Meta Platforms", sector: "Technology", price: 574.46, change: -4.77, changePct: -0.82, positionSize: 574.46 * 10, shares: 10, weight: 0, pnl: -4.77 * 10, dateAdded: new Date("2024-01-26"), thesis: "Ad efficiency and AI-driven engagement will drive revenue growth and margin expansion", catalysts: "Reels monetization; AI ad tools; cost discipline", breakConditions: "Ad demand weakness; Reality Labs losses; engagement decline", risk_factors: { rates_sensitivity: 4, commodity_exposure: 1, usd_sensitivity: 5, credit_sensitivity: 2, equity_beta: 7, growth_value_tilt: 8, market_cap_size: 10, credit_rating: 9, consumer_spending_sensitivity: 6, key_management_risk: 8, brand_reputational_risk: 9 } },
  { ticker: "GOOGL", name: "Alphabet", sector: "Technology", price: 295.77, change: -1.62, changePct: -0.54, positionSize: 295.77 * 22, shares: 22, weight: 0, pnl: -1.62 * 22, dateAdded: new Date("2025-03-14"), thesis: "Search dominance plus AI integration will sustain growth while margins expand", catalysts: "AI monetization in search; YouTube growth; cost control", breakConditions: "Search share loss; AI cannibalization; regulatory constraints", risk_factors: { rates_sensitivity: 4, commodity_exposure: 1, usd_sensitivity: 5, credit_sensitivity: 2, equity_beta: 6, growth_value_tilt: 7, market_cap_size: 10, credit_rating: 10, consumer_spending_sensitivity: 5, key_management_risk: 3, brand_reputational_risk: 7 } },
  { ticker: "AMZN", name: "Amazon", sector: "Consumer Disc.", price: 209.77, change: -0.80, changePct: -0.38, positionSize: 209.77 * 32, shares: 32, weight: 0, pnl: -0.80 * 32, dateAdded: new Date("2024-11-05"), thesis: "Retail margin expansion and AWS recovery will drive earnings inflection", catalysts: "AWS reacceleration; cost discipline; advertising growth", breakConditions: "AWS stagnation; retail margin compression; higher fulfillment costs", risk_factors: { rates_sensitivity: 5, commodity_exposure: 2, usd_sensitivity: 5, credit_sensitivity: 3, equity_beta: 7, growth_value_tilt: 8, market_cap_size: 10, credit_rating: 9, consumer_spending_sensitivity: 8, key_management_risk: 3, brand_reputational_risk: 7 } },
  { ticker: "MSFT", name: "Microsoft", sector: "Technology", price: 373.46, change: 4.09, changePct: 1.11, positionSize: 373.46 * 21, shares: 21, weight: 0, pnl: 4.09 * 21, dateAdded: new Date("2025-01-24"), thesis: "Sustained enterprise AI adoption will drive Azure reacceleration and operating leverage", catalysts: "Azure growth reacceleration; Copilot monetization; enterprise AI spend", breakConditions: "Azure deceleration; weak AI monetization; cloud pricing pressure", risk_factors: { rates_sensitivity: 4, commodity_exposure: 1, usd_sensitivity: 6, credit_sensitivity: 2, equity_beta: 5, growth_value_tilt: 7, market_cap_size: 10, credit_rating: 10, consumer_spending_sensitivity: 4, key_management_risk: 3, brand_reputational_risk: 6 } },
  { ticker: "AAPL", name: "Apple", sector: "Technology", price: 255.92, change: 0.29, changePct: 0.11, positionSize: 255.92 * 36, shares: 36, weight: 0, pnl: 0.29 * 36, dateAdded: new Date("2024-02-12"), thesis: "Services growth and ecosystem monetization will drive margin expansion despite slowing hardware growth", catalysts: "Services revenue acceleration; new product category (Vision Pro); buybacks", breakConditions: "iPhone demand decline; Services growth slowdown; regulatory pressure on App Store", risk_factors: { rates_sensitivity: 4, commodity_exposure: 3, usd_sensitivity: 7, credit_sensitivity: 2, equity_beta: 5, growth_value_tilt: 6, market_cap_size: 10, credit_rating: 10, consumer_spending_sensitivity: 7, key_management_risk: 4, brand_reputational_risk: 8 } },
  { ticker: "LLY", name: "Eli Lilly", sector: "Healthcare", price: 935.58, change: -18.94, changePct: -1.98, positionSize: 935.58 * 11, shares: 11, weight: 0, pnl: -18.94 * 11, dateAdded: new Date("2025-12-03"), thesis: "GLP-1 franchise will drive outsized revenue growth and market share gains", catalysts: "Obesity drug adoption; capacity expansion; new indications", breakConditions: "Manufacturing constraints; competitive pressure; pricing regulation", risk_factors: { rates_sensitivity: 3, commodity_exposure: 1, usd_sensitivity: 4, credit_sensitivity: 2, equity_beta: 5, growth_value_tilt: 9, market_cap_size: 10, credit_rating: 9, consumer_spending_sensitivity: 3, key_management_risk: 5, brand_reputational_risk: 7 } },
  { ticker: "NVDA", name: "Nvidia", sector: "Technology", price: 177.39, change: 1.64, changePct: 0.93, positionSize: 177.39 * 59, shares: 59, weight: 0, pnl: 1.64 * 59, dateAdded: new Date("2025-06-18"), thesis: "AI infrastructure demand will remain supply-constrained, sustaining pricing power and revenue growth", catalysts: "Hyperscaler capex expansion; new chip cycles; margin expansion", breakConditions: "Capex slowdown; inventory buildup; competitive pressure (AMD/custom silicon)", risk_factors: { rates_sensitivity: 3, commodity_exposure: 2, usd_sensitivity: 5, credit_sensitivity: 2, equity_beta: 8, growth_value_tilt: 10, market_cap_size: 10, credit_rating: 9, consumer_spending_sensitivity: 3, key_management_risk: 6, brand_reputational_risk: 5 } },
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
