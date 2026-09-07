import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { posts } from "./posts";

type BlogCard = { slug: string; title: string; excerpt: string; date: string; image: string; alt: string };

export default async function Blog() {
  const supabase = await createClient();
  const { data: managedPosts } = await supabase.from("blog_posts").select("slug,title,excerpt,image_url,published_at,created_at").eq("published", true).order("published_at", { ascending: false });
  const dynamicPosts: BlogCard[] = (managedPosts ?? []).map((post) => ({ slug: post.slug, title: post.title, excerpt: post.excerpt, date: new Date(post.published_at ?? post.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }), image: post.image_url || "/images/web-blog/limpeza-notebook.jpg", alt: post.title }));
  const allPosts: BlogCard[] = [...dynamicPosts, ...posts];
  return <main className="blog-page"><header className="blog-nav shell"><Link href="/" className="brand brand-logo"><Image src="/images/web-brand/logo-uti-notebook-premium.webp" alt="UTI do Notebook.AM" width={68} height={68} priority/></Link><Link className="back-home" href="/">Voltar ao início</Link></header><section className="blog-hero"><div className="blog-hero-photo"/><div className="shell blog-hero-content"><p className="kicker">Blog da UTI do Notebook</p><h1>Tecnologia explicada<br/><em>sem exagero.</em></h1><p>Dicas claras para escolher, cuidar e tirar melhor proveito do seu notebook.</p></div></section><section className="blog-section-heading shell"><div><p className="kicker kicker-dark">Em destaque</p><h2>Informação útil para decisões melhores.</h2></div><p>Sem palavras difíceis: explicamos o que muda na sua rotina.</p></section><section className="shell posts-grid">{allPosts.map((post) => <article className="post-card" key={post.slug}><Link href={`/blog/${post.slug}`} className="post-image"><Image src={post.image} alt={post.alt} fill sizes="(max-width: 720px) 100vw, 33vw"/></Link><div className="post-content"><span>{post.date}</span><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><Link href={`/blog/${post.slug}`} className="text-link">Ler artigo <b>→</b></Link></div></article>)}</section><SiteFooter/></main>;
}

function SiteFooter() { return <footer className="site-footer"><div className="shell footer-grid"><div><strong>UTI DO NOTEBOOK</strong><p>Assistência técnica especializada em Manaus.</p></div><div><b>Atendimento</b><a href="https://wa.me/5592991388536">WhatsApp</a><a href="tel:+559230889657">(92) 3088-9657</a></div><div><b>Informações</b><a href="/">Política de privacidade</a><a href="/">Suporte</a></div><form><b>Receba dicas úteis</b><label><input type="email" placeholder="Seu melhor e-mail" aria-label="Seu melhor e-mail"/><button type="button">Quero receber</button></label></form></div><div className="shell footer-bottom"><span>© 2026 UTI do Notebook</span><span>Av. Djalma Batista, 23-A · Manaus – AM</span></div></footer>; }
