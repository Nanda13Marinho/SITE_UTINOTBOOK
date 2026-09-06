import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Home({ searchParams }: { searchParams: Promise<{ sent?: string; error?: string }> }) {
  const query = await searchParams;
  async function book(formData: FormData) {
    "use server";
    const data = {
      customer_name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      device_model: String(formData.get("device") || "").trim(),
      preferred_date: String(formData.get("date") || ""),
      issue_description: String(formData.get("issue") || "").trim() || null,
    };
    if (!data.customer_name || !data.phone || !data.device_model || !data.preferred_date) redirect("/?error=1");
    const supabase = await createClient();
    const { error } = await supabase.from("appointments").insert(data);
    redirect(error ? "/?error=1" : "/?sent=1#agendamento");
  }
  return <main>
    <div className="top"><div className="wrap">📍 Av. Djalma Batista, 23-A · Chapada, Manaus – AM <span>Seg–Sex · 09:00–18:00 · (92) 3088-9657</span></div></div>
    <header><div className="wrap nav"><Link href="/" className="logo"><i>✚</i><b>UTI DO NOTEBOOK<small>Assistência técnica especializada</small></b></Link><nav><a href="#servicos">Serviços</a><a href="#sobre">A assistência</a><a href="#agendamento">Agendar</a><Link href="/login">Área da equipa</Link></nav><a className="btn green" href="https://wa.me/5592991388536">WhatsApp ↗</a></div></header>
    <section className="hero"><div className="wrap hero-content"><div><p className="eyebrow">Especialistas em notebooks</p><h1>Seu equipamento merece voltar a funcionar <em>sem dor de cabeça.</em></h1><p>Diagnóstico técnico, reparo de placa, tela, dobradiça, limpeza, formatação e upgrade. Atendimento transparente em Manaus.</p><div className="actions"><a className="btn light" href="#agendamento">Agendar avaliação</a><a className="btn outline" href="https://wa.me/5592991388536">Pedir orçamento</a></div></div><div className="bench"><div className="monitor"><small>DIAGNÓSTICO</small><b>01</b><hr /></div><div className="board">○<span>○</span><i>○</i><strong>○</strong></div><small className="caption">Reparo técnico · Serviço com garantia</small></div></div></section>
    <section className="booking" id="agendamento"><div className="wrap"><form action={book}><div className="form-title"><b>Agende seu atendimento</b><small>Leva menos de um minuto</small></div><label>Nome<input name="name" placeholder="Seu nome" required /></label><label>WhatsApp<input name="phone" placeholder="(92) 9XXXX-XXXX" required /></label><label>Equipamento<input name="device" placeholder="Marca e modelo" required /></label><label>Data<input name="date" type="date" required /></label><label>Defeito<input name="issue" placeholder="O que aconteceu?" /></label><button className="btn dark">Enviar pedido</button></form>{query.sent && <p className="notice">✓ Pedido enviado. A equipa entrará em contacto para confirmar.</p>}{query.error && <p className="notice error">Preencha os campos obrigatórios e tente de novo.</p>}</div></section>
    <section className="trust wrap"><Card icon="◉" title="Diagnóstico honesto" text="Orçamento explicado antes do reparo."/><Card icon="✦" title="Técnicos especializados" text="Atendimento multimarcas e cuidadoso."/><Card icon="✓" title="Serviço com garantia" text="Mais segurança para você." /></section>
    <section className="about wrap" id="sobre"><div className="art"><div><b>25+</b><small>anos de experiência técnica</small></div></div><div><p className="eyebrow teal">Sobre a UTI do Notebook</p><h2>Reparo de qualidade, comunicação clara.</h2><p className="copy">Seu notebook é ferramenta de trabalho, estudo e rotina. Cada avaliação é feita com atenção ao defeito e ao melhor caminho para recuperar o equipamento.</p><p className="check">✓ <span><b>Orçamento antes de agir</b><br />Você decide com informação.</span></p><p className="check">✓ <span><b>Atendimento multimarcas</b><br />Dell, Acer, Lenovo, Apple, Asus, HP e mais.</span></p></div></section>
    <section className="services" id="servicos"><div className="wrap"><p className="eyebrow">Serviços</p><h2>O cuidado certo para cada problema.</h2><div className="cards"><Card icon="▣" title="Notebook e desktop" text="Manutenção, limpeza e reparo técnico."/><Card icon="◈" title="Tela e dobradiças" text="Troca de tela, carcaça e estrutura."/><Card icon="◌" title="Placa-mãe" text="Diagnóstico e reparo especializado."/><Card icon="↗" title="Upgrades" text="SSD, memória, sistema e desempenho." /></div></div></section>
    <footer><div className="wrap"><b>UTI DO NOTEBOOK</b><span>Av. Djalma Batista, 23-A · Chapada, Manaus – AM</span><span>(92) 3088-9657 · @utidonotebook.am</span></div></footer>
  </main>
}
function Card({icon,title,text}:{icon:string,title:string,text:string}) { return <article className="card"><i>{icon}</i><div><b>{title}</b><p>{text}</p></div></article> }
