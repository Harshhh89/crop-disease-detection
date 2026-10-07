import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Strip data URL prefix if present
    const base64Data = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "system",
              content: `You are an expert plant pathologist AI. Analyze the provided leaf image and identify the plant species and any diseases present.

You MUST respond by calling the analyze_leaf function with your findings. Be accurate and detailed.

If you cannot identify the plant or the image is not a leaf/plant, still call the function but set plantName to "Unknown" and diseaseName to "Unable to identify" with a low confidence score and explain in the description.`,
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Analyze this leaf image. Identify the plant species, detect any diseases, and provide treatment recommendations.",
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${base64Data}`,
                  },
                },
              ],
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "analyze_leaf",
                description:
                  "Return structured analysis of a plant leaf image",
                parameters: {
                  type: "object",
                  properties: {
                    plantName: {
                      type: "string",
                      description: "Common name of the plant species",
                    },
                    plantCategory: {
                      type: "string",
                      description:
                        "Botanical family, e.g. Solanaceae (Nightshade family)",
                    },
                    diseaseName: {
                      type: "string",
                      description:
                        'Name of the disease detected, or "Healthy" if none',
                    },
                    isHealthy: {
                      type: "boolean",
                      description: "Whether the plant appears healthy",
                    },
                    confidence: {
                      type: "number",
                      description: "Confidence score from 0 to 100",
                    },
                    description: {
                      type: "string",
                      description:
                        "Detailed description of the disease or health status",
                    },
                    cause: {
                      type: "string",
                      description:
                        "What causes this disease (pathogen, conditions)",
                    },
                    treatment: {
                      type: "string",
                      description: "Recommended treatment steps",
                    },
                    prevention: {
                      type: "string",
                      description: "Prevention tips for the future",
                    },
                    pesticide: {
                      type: "string",
                      description:
                        'Recommended pesticides or "None required" if healthy',
                    },
                  },
                  required: [
                    "plantName",
                    "plantCategory",
                    "diseaseName",
                    "isHealthy",
                    "confidence",
                    "description",
                    "cause",
                    "treatment",
                    "prevention",
                    "pesticide",
                  ],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "analyze_leaf" },
          },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      throw new Error("No structured response from AI model");
    }

    const analysis = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-leaf error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Analysis failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
