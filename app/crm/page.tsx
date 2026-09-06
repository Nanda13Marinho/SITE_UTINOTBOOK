import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
const statuses = ["Em análise","Aguardando peça","Em reparo","Pronto para retirada","Concluído","Cancelado"];
export default async function Crm() {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims) redirect("/login");
  const { data: appointments } = await supabase.from("appointments").select("*").order("created_at",{ascending:false});
  async function updateStatus(data: FormData) { "use server"; const client=await createClient(); await client.from("appointments").update({status:String(data.get("status"))}).eq("id",String(data.get("id"))); revalidatePath("/crm"); }
  async function signOut() { "use server"; const client=await createClient(); await client.auth.signOut(); redirect("/"); }
  return <main className="crm-page"><header className="crm-header"><Link href="/" className="auth-brand">✚ UTI DO NOTEBOOK</Link><form action={signOut}><button className="btn light">Sair</button></form></header><section className="crm-wrap"><p className="eyebrow teal">Painel interno</p><h1>Agendamentos e ordens</h1><p className="copy">Total registrado: <b>{appointments?.length??0}</b></p>{appointments?.length?<div className="table"><table><thead><tr><th>Cliente</th><th>Contacto</th><th>Equipamento</th><th>Data</th><th>Defeito</th><th>Status</th></tr></thead><tbody>{appointments.map(a=><tr key={a.id}><td><b>{a.customer_name}</b></td><td>{a.phone}</td><td>{a.device_model}</td><td>{new Date(a.preferred_date+"T12:00:00").toLocaleDateString("pt-BR")}</td><td>{a.issue_description||"—"}</td><td><form action={updateStatus} className="status-form"><input type="hidden" name="id" value={a.id}/><select name="status" defaultValue={a.status}>{statuses.map(s=><option key={s}>{s}</option>)}</select><button>Salvar</button></form></td></tr>)}</tbody></table></div>:<div className="empty"><b>Nenhum agendamento visível ainda.</b><p>Após criar a conta da equipa no Supabase, ela precisa ser autorizada como membro da equipa.</p></div>}</section></main>;
}
