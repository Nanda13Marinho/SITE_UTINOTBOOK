import Image from "next/image";
import Link from "next/link";
import { SiteChat } from "@/components/site-chat";

const products = [
  { category: "Notebook para rotina", title: "Lenovo IdeaPad Slim 3", detail: "Referência de configuração: Core i5, 8 GB RAM e SSD de 512 GB.", image: "/images/shopping/notebook-slim-prata.webp", search: "https://www.amazon.com.br/s?k=Lenovo+IdeaPad+Slim+3" },
  { category: "Notebook para desempenho", title: "Acer Aspire", detail: "Para estudo, trabalho e tarefas mais exigentes — confira a configuração antes da compra.", image: "/images/shopping/notebook-performance-grafite.webp", search: "https://www.amazon.com.br/s?k=Acer+Aspire+notebook" },
  { category: "Leve e premium", title: "MacBook Air", detail: "Referência para mobilidade, longa bateria e tarefas criativas no dia a dia.", image: "/images/shopping/notebook-premium-leve.webp", search: "https://www.amazon.com.br/s?k=MacBook+Air" },
  { category: "Mobilidade", title: "Samsung Galaxy Book", detail: "Uma linha leve para rotina de estudos, trabalho e integração com celular.", image: "/images/shopping/notebook-blue-mobile.webp", search: "https://www.amazon.com.br/s?k=Samsung+Galaxy+Book" },
  { category: "Potência para jogos", title: "ASUS TUF Gaming", detail: "Avalie processador, placa de vídeo, memória e ventilação antes de decidir.", image: "/images/shopping/notebook-gamer.webp", search: "https://www.amazon.com.br/s?k=ASUS+TUF+Gaming" },
  { category: "Mais velocidade", title: "SSD NVMe 1 TB", detail: "Uma opção de armazenamento rápido para notebooks compatíveis.", image: "/images/shopping/ssd-nvme.webp", search: "https://www.amazon.com.br/s?k=SSD+NVMe+1TB" },
  { category: "Tela maior", title: "Monitor IPS 24\"", detail: "Mais espaço de tela para estudar, trabalhar e organizar a rotina.", image: "/images/shopping/monitor-ips.webp", search: "https://www.amazon.com.br/s?k=monitor+IPS+24+polegadas" },
  { category: "Acessórios", title: "Mouse sem fio", detail: "Conforto e praticidade para estudar, trabalhar e navegar no dia a dia.", image: "/images/shopping/mouse-sem-fio.webp", search: "https://www.amazon.com.br/s?k=mouse+sem+fio" },
  { category: "Acessórios", title: "Teclado mecânico", detail: "Opção para quem digita muito e prefere resposta mais firme ao toque.", image: "/images/shopping/teclado-mecanico.webp", search: "https://www.amazon.com.br/s?k=teclado+mecanico+sem+fio" },
  { category: "Conectividade", title: "Hub USB-C", detail: "Amplia as portas do notebook para HDMI, pen drive, cartão e periféricos.", image: "/images/shopping/hub-usbc.webp", search: "https://www.amazon.com.br/s?k=hub+USB-C+HDMI" },
  { category: "Proteção", title: "Mochila para notebook", detail: "Prefira modelos com compartimento acolchoado no tamanho do seu equipamento.", image: "/images/shopping/mochila-notebook.webp", search: "https://www.amazon.com.br/s?k=mochila+para+notebook" },
  { category: "Energia", title: "Carregador USB-C", detail: "Confira voltagem, potência e compatibilidade antes de escolher.", image: "/images/shopping/carregador-usbc.webp", search: "https://www.amazon.com.br/s?k=carregador+usb-c+notebook" },
];

export default function Shopping() {
  return <main className="shopping-page">
    <header className="shopping-nav shell">
      <Link href="/" className="brand brand-logo" aria-label="UTI do Notebook - início"><Image src="/images/web-brand/logo-uti-notebook-premium.webp" alt="UTI do Notebook.AM" width={68} height={68} priority /></Link>
      <nav aria-label="Navegação Shopping"><Link href="/">Início</Link><Link href="/blog">Blog</Link><a href="https://wa.me/5592991388536" target="_blank" rel="noreferrer">Precisa de ajuda?</a></nav>
    </header>
    <section className="shopping-hero"><div className="shell"><p className="kicker">Seleção da UTI do Notebook</p><h1>Escolhas melhores<br /><em>começam aqui.</em></h1><p>Produtos e configurações para comparar com calma antes de comprar. Em breve, todas as ofertas terão links oficiais de afiliado.</p><div className="shopping-chips"><span>Notebooks</span><span>Armazenamento</span><span>Acessórios</span><span>Proteção</span></div></div></section>
    <section className="shopping-info"><div className="shell"><span>Curadoria técnica</span><p>Não indicamos produto “no escuro”: orientamos o que faz sentido para o seu uso e para o seu orçamento.</p><a href="https://wa.me/5592991388536">Falar com um técnico ↗</a></div></section>
    <section className="shell shopping-section"><div className="shopping-heading"><div><p className="kicker kicker-dark">Vitrine inicial</p><h2>Produtos para<br />comparar sem pressa.</h2></div><p>Os valores e a disponibilidade variam diariamente. Antes de comprar, confira o anúncio e as especificações do modelo.</p></div><div className="shopping-grid">{products.map((product) => <article className="product-card" key={product.title}><div className="product-image"><Image src={product.image} alt={product.title} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" /></div><div className="product-copy"><span>{product.category}</span><h2>{product.title}</h2><p>{product.detail}</p><a href={product.search} target="_blank" rel="noreferrer">Consultar disponibilidade <b>↗</b></a></div></article>)}</div></section>
    <section className="shopping-disclosure"><div className="shell"><div><p className="kicker">Compra bem orientada</p><h2>O modelo certo depende<br />do que você precisa fazer.</h2></div><p>Quando os parceiros estiverem definidos, esta vitrine receberá links rastreáveis das ofertas. Você continua comprando diretamente na loja parceira, com segurança.</p></div></section>
    <footer className="site-footer"><div className="shell footer-grid"><div><strong>UTI DO NOTEBOOK</strong><p>Assistência técnica especializada em Manaus.</p></div><div><b>Atendimento</b><a href="https://wa.me/5592991388536">WhatsApp: (92) 99138-8536</a><a href="tel:+559230889657">Telefone da loja: (92) 3088-9657</a></div><div><b>Informações</b><Link href="/politica-de-privacidade">Política de privacidade</Link><a href="mailto:suporte@utidonotebook.am">Suporte</a></div><div><b>Shopping</b><p>Ofertas e recomendações para escolher melhor.</p></div></div><div className="shell footer-bottom"><span>© 2026 UTI do Notebook</span><span>Manaus – AM</span></div></footer>
  <SiteChat /></main>;
}
