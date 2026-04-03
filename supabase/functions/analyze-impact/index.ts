// Edge function: analyze-impact
// Analyzes portfolio impact from news events and scenarios using Lovable AI
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { type, payload } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    const thesisAndPrecedentSchema = `
  "thesisImpact": [
    {"ticker": "<string>", "originalThesis": "<the holding's original investment thesis>", "thesisStatus": "intact" | "weakened" | "strengthened" | "broken", "reasoning": "<why the thesis is affected or not>", "revisedOutlook": "<what changes going forward>"}
  ],
  "precedentEvents": [
    {"date": "<YYYY-MM-DD>", "event": "<description of historical similar event>", "affectedTickers": ["<tickers>"], "marketReaction": "<how market reacted>", "nextDayMove": "<+X.X% or -X.X%>", "weekMove": "<+X.X% or -X.X%>", "keyLearning": "<what investors should learn>"}
  ]`;

    if (type === "news_impact") {
      const { headline, portfolio } = payload;
      systemPrompt = `You are a senior hedge fund risk analyst. Analyze news events and their impact on a portfolio. Return a JSON response with this exact structure:
{
  "impactScore": <number 1-10>,
  "affectedTickers": [<array of ticker strings from the portfolio that are affected>],
  "summary": "<2-3 sentence summary of the event and why it matters>",
  "portfolioImpact": [
    {"ticker": "<string>", "direction": "up" | "down" | "neutral", "estimatedPctMove": <number>, "reasoning": "<brief reason>"}
  ],
  "riskAnalysis": "<paragraph on where concentration risks are>",
  "hedgeRecommendations": [
    {"action": "<specific trade recommendation>", "rationale": "<why this hedge works>", "urgency": "immediate" | "near-term" | "monitor"}
  ],
  "overallPortfolioImpactPct": <estimated portfolio-level P&L impact as percentage>,
  ${thesisAndPrecedentSchema}
}
Be specific with numbers. Use realistic estimates. Only include tickers from the provided portfolio.
For thesisImpact, use the "thesis" field from each holding to assess if the thesis changes.
For precedentEvents, recall 3-5 similar historical events and their actual market impact.`;
      userPrompt = `NEWS EVENT: "${headline}"\n\nCURRENT PORTFOLIO:\n${JSON.stringify(portfolio, null, 2)}\n\nAnalyze the impact of this news on the portfolio. Return valid JSON only.`;
    } else if (type === "scenario") {
      const { description, affectedSectors, severity, portfolio } = payload;
      systemPrompt = `You are a senior hedge fund risk analyst specializing in scenario analysis. Given a hypothetical scenario, analyze its impact on the portfolio. Return a JSON response with this exact structure:
{
  "impactScore": <number 1-10>,
  "affectedTickers": [<array of ticker strings from the portfolio that are affected>],
  "summary": "<2-3 sentence summary of the scenario and its market implications>",
  "portfolioImpact": [
    {"ticker": "<string>", "direction": "up" | "down" | "neutral", "estimatedPctMove": <number>, "reasoning": "<brief reason>"}
  ],
  "riskAnalysis": "<paragraph on concentration risks and vulnerabilities>",
  "hedgeRecommendations": [
    {"action": "<specific trade recommendation>", "rationale": "<why this hedge works>", "urgency": "immediate" | "near-term" | "monitor"}
  ],
  "overallPortfolioImpactPct": <estimated portfolio-level P&L impact as percentage>,
  ${thesisAndPrecedentSchema}
}
Be specific. Use realistic estimates based on the severity level provided.
For thesisImpact, use the "thesis" field from each holding to assess if the thesis changes.
For precedentEvents, recall 3-5 similar historical events and their actual market impact.`;
      userPrompt = `SCENARIO: "${description}"\nAFFECTED SECTORS: ${affectedSectors?.join(", ") || "All"}\nSEVERITY: ${severity}/10\n\nCURRENT PORTFOLIO:\n${JSON.stringify(portfolio, null, 2)}\n\nAnalyze the impact. Return valid JSON only.`;
    } else {
      return new Response(JSON.stringify({ error: "Invalid type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const statusCode = response.status;
      if (statusCode === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (statusCode === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds in Settings > Workspace > Usage." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", statusCode, t);
      return new Response(JSON.stringify({ error: "AI analysis failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";

    let parsed;
    try {
      const jsonMatch = content.match(/```json\s*([\s\S]*?)```/) || content.match(/```\s*([\s\S]*?)```/);
      const jsonStr = jsonMatch ? jsonMatch[1].trim() : content.trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      parsed = { error: "Failed to parse AI response", raw: content };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-impact error:", e);
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
