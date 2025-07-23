import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return NextResponse.json({ reply: "Clé API OpenAI manquante." }, { status: 500 });

    // Construit le prompt pour orienter l'IA comme support NaamsShop
    const systemPrompt = {
      role: "system",
      content: `
    Tu es l'assistant officiel du site NaamsShop. 
    Tes missions :
    - Conseiller sur l'achat de bots Discord (modération, musique, giveaway, etc.), de scripts FiveM, de services de montage vidéo, ou de développement web.
    - Expliquer les différences entre les offres, donner des exemples d'usages, rassurer sur la sécurité et le SAV.
    - Si on te pose une question technique sur un bot acheté, propose de contacter le support ou de remplir le formulaire d'achat personnalisé si besoin d'une évolution.
    - Reste toujours professionnel, sympathique, et utilise un ton accessible.
    - Si la question sort du cadre (politique, sujets non liés à NaamsShop), recentre poliment la discussion.
    - N'invente jamais de prix ou de délais précis, invite à consulter le catalogue ou à demander un devis.
  `
    };
    const userMessages = messages.map((m: unknown) => {
      if (typeof m === 'object' && m !== null && 'from' in m && 'text' in m) {
        return { role: (m as { from: string }).from === 'user' ? 'user' : 'assistant', content: (m as { text: string }).text };
      }
      return { role: 'user', content: '' };
    });
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [systemPrompt, ...userMessages],
      max_tokens: 300,
      temperature: 0.7
    };
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || "Je n'ai pas compris, peux-tu reformuler ?";
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Erreur lors de la communication avec l'IA." }, { status: 500 });
  }
} 