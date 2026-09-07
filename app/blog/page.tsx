import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { posts } from "./posts";

type BlogCard = { slug: string; title: string; excerpt: string; date: string; image: string; alt: string };

export default async function Blog() {
  const supabase = await createClient();
  const { data: managedPosts } = await supabase.from("blog_posts").select("slug,title,excerpt,image_url,published_at,created_at").eq("published", true).order("published_at", { ascending: false });
  const dynamicPosts: BlogCard[] = (managedPosts ?? []).map((post) => ({ slug: post.slug, title: post.title, excerpt: post.excerpt, date: new Date(post.published_at ?? post.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }), image: post.image_url || "/images/blog/limpeza-notebook.png", alt: post.title }));
  const allPosts: BlogCard[] = [...dynamicPosts, ...posts];
  return <main className="blog-page"><header className="blog-nav shell"><Link href="/" className="brand brand-logo"><Image src="/images/logo-uti-notebook-premium.png" alt="UTI do Notebook.AM" width={68} height={68} priority/></Link><Link className="back-home" href="/">Voltar ao início</Link></header><section className="blog-hero"><div className="shell"><p className="kicker kicker-dark">Conteúdo útil</p><h1>Seu notebook merece<br/><em>informação de verdade.</em></h1><p>Orientações claras da nossa equipa técnica para ajudar você a cuidar melhor do seu equipamento.</p></div></section><section className="shell posts-grid">{allPosts.map((post) => <article className="post-card" key={post.slug}><Link href={`/blog/${post.slug}`} className="post-image"><Image src={post.image} alt={post.alt} fill sizes="(max-width: 720px) 100vw, 33vw"/></Link><div className="post-content"><span>{post.date}</span><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><Link href={`/blog/${post.slug}`} className="text-link">Ler artigo <b>→</b></Link></div></article>)}</section></main>;
}
