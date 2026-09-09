"use client";

import { FormEvent, useState } from "react";

type Message = { role: "user" | "assistant"; text: string };

const starters = ["Quero agendar", "Meu notebook está lento", "Qual produto devo escolher?"];

export function SiteChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: "Olá! Eu sou a assistente virtual da UTI do Notebook. Como posso ajudar você hoje?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send(text?: string) {
    const message = (text ?? input).trim();
    if (!message || loading) return;
    const next = [...messages, { role: "user" as const, text: message }];
    setMessages(next); setInput(""); setLoading(true);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next }) });
      const data = await response.json();
      setMessages([...next, { role: "assistant", text: data.reply || "Não consegui responder agora. Você pode falar com a nossa equipa pelo WhatsApp." }]);
    } catch {
      setMessages([...next, { role: "assistant", text: "Não consegui responder agora. Você pode falar com a nossa equipa pelo WhatsApp." }]);
    } finally { setLoading(false); }
  }

  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); send(); }

  return <aside className={`site-chat ${open ? "is-open" : ""}`} aria-label="Assistente virtual">
    {open && <div className="chat-panel"><header><div><span className="chat-presence"/><b>UTI Assistente</b><small>Online para orientar você</small></div><button onClick={() => setOpen(false)} aria-label="Fechar chat">×</button></header><div className="chat-messages" aria-live="polite">{messages.map((message, index) => <p className={message.role} key={`${message.role}-${index}`}>{message.text}</p>)}{loading && <p className="assistant chat-typing">Digitando…</p>}</div><div className="chat-starters">{starters.map((starter) => <button key={starter} onClick={() => send(starter)}>{starter}</button>)}</div><form onSubmit={submit}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Escreva sua mensagem" maxLength={600} aria-label="Escreva sua mensagem"/><button disabled={loading} aria-label="Enviar mensagem">↑</button></form><a href="https://wa.me/5592991388536" target="_blank" rel="noreferrer">Prefere falar no WhatsApp? ↗</a></div>}
    <button className="chat-launcher" onClick={() => setOpen(!open)} aria-expanded={open}><span>✦</span><b>{open ? "Fechar" : "Fale com a UTI"}</b></button>
  </aside>;
}
