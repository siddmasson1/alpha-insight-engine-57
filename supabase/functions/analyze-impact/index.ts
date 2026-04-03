// Analyze portfolio impact from news events and scenarios
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { type, payload } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt = "";
    let userPrompt = "";

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
  "overallPortfolioImpactPct": <estimated portfolio-level P&L impact as percentage>
}
Be specific with numbers. Use realistic estimates. Only include tickers from the provided portfolio.`;
      userPrompt = `NEWS EVENT: "${headline}"

CURRENT PORTFOLIO:
${JSON.stringify(portfolio, null, 2)}

Analyze the impact of this news on the portfolio. Return valid JSON only.`;
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
  "overallPortfolioImpactPct": <estimated portfolio-level P&L impact as percentage>
}
Be specific. Use realistic estimates based on the severity level provided.`;
      userPrompt = `SCENARIO: "${description}"
AFFECTED SECTORS: ${affectedSectors?.join(", ") || "All"}
SEVERITY: ${severity}/10

CURRENT PORTFOLIO:
${JSON.stringify(portfolio, null, 2)}

Analyze the impact. Return valid JSON only.`;
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
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds in Settings → Workspace → Usage." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI analysis failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";

    // Parse JSON from the response (handle markdown code blocks)
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
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
