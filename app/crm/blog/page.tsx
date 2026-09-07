import Link from "next/link";
import { requireStaff } from "@/lib/require-staff";

export default async function ManageBlog() {
  const { supabase } = await requireStaff();
  const { data: posts } = await supabase.from("blog_posts").select("id,title,slug,published,published_at,created_at").order("created_at", { ascending: false });
  return <main className="crm-page"><header className="crm-header"><Link href="/crm" className="auth-brand">← CRM</Link><Link href="/crm/blog/new" className="btn light">Novo artigo</Link></header><section className="crm-wrap"><p className="eyebrow teal">Conteúdo do site</p><h1>Blog</h1><p className="copy">Crie, edite e publique os artigos que aparecem no site.</p>{posts?.length ? <div className="admin-post-list">{posts.map((post) => <article key={post.id}><div><span className={post.published ? "post-status published" : "post-status"}>{post.published ? "Publicado" : "Rascunho"}</span><h2>{post.title}</h2><p>/{post.slug}</p></div><Link href={`/crm/blog/${post.id}`} className="admin-link">Editar →</Link></article>)}</div> : <div className="empty"><b>Seu primeiro artigo começa aqui.</b><p>Use “Novo artigo” para escrever, escolher uma imagem e publicar quando estiver pronto.</p><Link href="/crm/blog/new" className="btn dark">Criar artigo</Link></div>}</section></main>;
}
