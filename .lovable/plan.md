
<title>Hedge Fund Portfolio Intelligence Dashboard</title>
<summary>A modern fintech-styled dashboard with portfolio tracking, AI-powered news impact analysis, and scenario modeling.</summary>

<steps>
  <step>
    <title>Set up Lovable Cloud backend</title>
    <description>Enable Lovable Cloud and create an edge function for AI-powered analysis (impact scoring, so-what analysis, hedge recommendations) using the Lovable AI gateway.</description>
  </step>
  <step>
    <title>Build the dashboard layout</title>
    <description>Create a full-width dark modern fintech dashboard with a left panel (~55%) and right panel (~45%), using gradient cards, subtle borders, and polished typography. Include a top header bar with portfolio name and summary stats (total AUM, daily P&L, portfolio beta).</description>
  </step>
  <step>
    <title>Build the Portfolio Tracker table (LHS top)</title>
    <description>A dense, sortable data table showing ~20 holdings with columns: Ticker, Company Name, Sector, Price, Change %, Position Size, Weight %, P&L. Color-coded gains/losses. Mock data for stocks across sectors (tech, healthcare, energy, financials, etc.).</description>
  </step>
  <step>
    <title>Build the News Feed with Impact Scores (LHS bottom)</title>
    <description>A scrollable real-time news feed showing headlines with timestamps, affected tickers, and AI-generated impact scores (1-10 severity with color coding). Each news item is clickable to trigger the so-what analysis on the right panel. Include an "Add Scenario" button to manually input custom news events or hypothetical scenarios for analysis.</description>
  </step>
  <step>
    <title>Build the So-What Analysis Panel (RHS)</title>
    <description>When a news item or custom scenario is selected, this panel shows: (1) Scenario summary, (2) Portfolio impact breakdown — which positions are affected and estimated P&L impact, (3) Risk heatmap showing concentration of exposure, (4) AI-generated hedge recommendations (specific trades, options strategies). All analysis powered by Lovable AI.</description>
  </step>
  <step>
    <title>Add scenario modeling dialog</title>
    <description>A modal/dialog for manually creating scenarios: event description text field, affected sectors/tickers selector, severity slider. On submit, the AI generates impact analysis and populates the RHS panel.</description>
  </step>
  <step>
    <title>Populate with realistic mock data</title>
    <description>Pre-load ~20 diversified holdings (AAPL, NVDA, JPM, XOM, JNJ, etc.) with realistic prices, position sizes, and weights. Seed 5-8 news events with pre-computed impact scores. Auto-simulate periodic news updates.</description>
  </step>
</steps>
