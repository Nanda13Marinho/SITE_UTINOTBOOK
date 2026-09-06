import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const query = await searchParams;
  async function signIn(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email: String(formData.get("email")), password: String(formData.get("password")) });
    redirect(error ? "/login?error=1" : "/crm");
  }
  return <main className="auth-page"><Link href="/" className="auth-brand">✚ UTI DO NOTEBOOK</Link><form action={signIn} className="auth-card"><p className="eyebrow teal">Área da equipa</p><h1>Entrar no CRM</h1><p>Use o e-mail e a senha cadastrados pela administração.</p><label>E-mail<input name="email" type="email" required /></label><label>Senha<input name="password" type="password" required /></label>{query.error && <small className="login-error">Não foi possível entrar. Confira os dados.</small>}<button className="btn dark">Entrar</button></form></main>;
}
