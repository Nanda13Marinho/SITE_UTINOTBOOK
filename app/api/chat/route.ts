import { NextResponse } from "next/server";

export const runtime = "nodejs";

const systemInstruction = `Você é a assistente virtual da UTI do Notebook, assistência técnica de notebooks em Manaus, Brasil. Responda sempre em português brasileiro, de maneira humana, breve e clara. Você orienta sobre agendamento, defeitos comuns, manutenção, serviços, acessórios e a página Shopping. Não invente preços, estoque, prazos, diagnósticos definitivos ou garantias. Quando a pessoa precisa de avaliação, peça modelo do notebook e o problema, e ofereça WhatsApp +55 92 99138-8536. Endereço: Av. Djalma Batista, 23-A, Chapada, Manaus - AM. Horário: segunda a sexta, 09:00–17:00; sábado, 09:00–12:00. Para casos urgentes, pagamento, orçamento final ou reparo, direcione para o WhatsApp.`;

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ reply: "Nosso chat inteligente está sendo ativado. Enquanto isso, fale com a nossa equipa pelo WhatsApp: (92) 99138-8536." }, { status: 503 });
  try {
    const body = await request.json();
    const messages = Array.isArray(body.messages) ? body.messages.slice(-10) : [];
    const contents = messages.map((message: { role?: string; text?: string }) => ({ role: message.role === "assistant" ? "model" : "user", parts: [{ text: String(message.text || "").slice(0, 600) }] })).filter((message: { parts: Array<{ text: string }> }) => message.parts[0].text);
    if (!contents.length) return NextResponse.json({ reply: "Como posso ajudar você?" }, { status: 400 });
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ systemInstruction: { parts: [{ text: systemInstruction }] }, contents, generationConfig: { temperature: 0.4, maxOutputTokens: 350 } }) });
    if (!response.ok) throw new Error("Gemini unavailable");
    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || "").join("").trim();
    return NextResponse.json({ reply: reply || "Posso ajudar com agendamento, dúvidas sobre reparo ou produtos." });
  } catch {
    return NextResponse.json({ reply: "Não consegui responder agora. Fale com a nossa equipa pelo WhatsApp: (92) 99138-8536." }, { status: 502 });
  }
}
