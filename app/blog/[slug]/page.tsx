import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPost, posts } from "../posts";

export function generateStaticParams() { return posts.map(({ slug }) => ({ slug })); }

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fixedPost = getPost(slug);
  const supabase = await createClient();
  const { data: managedPost } = fixedPost ? { data: null } : await supabase.from("blog_posts").select("slug,title,content,image_url,published_at,created_at").eq("slug", slug).eq("published", true).maybeSingle();
  if (!fixedPost && !managedPost) notFound();
  const post = fixedPost ? { title: fixedPost.title, date: fixedPost.date, image: fixedPost.image, alt: fixedPost.alt, body: fixedPost.body } : { title: managedPost!.title, date: new Date(managedPost!.published_at ?? managedPost!.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }), image: managedPost!.image_url || "/images/blog/limpeza-notebook.png", alt: managedPost!.title, body: managedPost!.content.split(/\n\s*\n/).filter(Boolean) };
  return <main className="article-page"><header className="blog-nav shell"><Link href="/" className="brand brand-logo"><Image src="/images/logo-uti-notebook-premium.png" alt="UTI do Notebook.AM" width={68} height={68} priority/></Link><Link className="back-home" href="/blog">Todos os artigos</Link></header><article><div className="article-intro shell"><p className="kicker kicker-dark">Dicas da equipa</p><h1>{post.title}</h1><p>{post.date}</p></div><div className="article-image"><Image src={post.image} alt={post.alt} fill priority sizes="100vw"/></div><div className="article-body shell">{post.body.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}<aside><b>Quer uma avaliação para o seu notebook?</b><span>Fale com a UTI do Notebook pelo WhatsApp e encontre a solução certa para o seu equipamento.</span><a className="button button-orange" href="https://wa.me/5592991388536">Chamar no WhatsApp ↗</a></aside></div></article></main>;
}
