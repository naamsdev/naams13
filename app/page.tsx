"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="home-main">
      <h1 className="home-title">
        Bienvenue sur <span className="home-title-gradient">NaamsShop</span>
      </h1>
      <h2 className="home-subtitle">
        Votre boutique multi-services numériques
      </h2>
      <p className="home-desc">
        NaamsShop vous propose plusieurs services numériques pour booster vos projets et votre présence en ligne. Découvrez nos offres adaptées à tous les besoins, que vous soyez particulier, créateur, ou entreprise.
      </p>

      {/* Section Bots Discord */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ fontSize: 24, color: '#00c6ff', margin: '24px 0 8px 0', fontWeight: 800 }}>🤖 Bots Discord pré-développés & personnalisables</h3>
        <p style={{ fontSize: 18, color: '#e0e6ed', textAlign: 'center', marginBottom: 16 }}>
          Des bots performants, stables et adaptés à votre serveur : modération, tickets, économie, jeux, et bien plus. Prise en charge de la personnalisation selon vos besoins !
        </p>
        <ul style={{ fontSize: 18, color: '#fff', margin: '0 0 24px 0', padding: 0, listStyle: 'none', textAlign: 'center' }}>
          <li style={{ marginBottom: 6 }}>🛡️ Modération & sécurité</li>
          <li style={{ marginBottom: 6 }}>🎟️ Systèmes de tickets</li>
          <li style={{ marginBottom: 6 }}>💰 Économie fictive, niveaux, jeux</li>
          <li style={{ marginBottom: 6 }}>🎲 Commandes fun & animation</li>
        </ul>
      </section>

      {/* Section Montage */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ fontSize: 24, color: '#00c6ff', margin: '24px 0 8px 0', fontWeight: 800 }}>🎬 Services de montage vidéo & audio</h3>
        <p style={{ fontSize: 18, color: '#e0e6ed', textAlign: 'center', marginBottom: 16 }}>
          Besoin d’un montage professionnel pour vos vidéos YouTube, TikTok, ou vos podcasts ? Je propose des montages dynamiques, adaptés à votre style et à votre audience.
        </p>
        <ul style={{ fontSize: 18, color: '#fff', margin: '0 0 24px 0', padding: 0, listStyle: 'none', textAlign: 'center' }}>
          <li style={{ marginBottom: 6 }}>✂️ Découpage, transitions, effets</li>
          <li style={{ marginBottom: 6 }}>🔊 Nettoyage audio, synchronisation</li>
          <li style={{ marginBottom: 6 }}>🎨 Habillage graphique, sous-titres</li>
        </ul>
      </section>

      {/* Section Dev Web/FiveM */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ fontSize: 24, color: '#00c6ff', margin: '24px 0 8px 0', fontWeight: 800 }}>💻 Développement Web & FiveM</h3>
        <p style={{ fontSize: 18, color: '#e0e6ed', textAlign: 'center', marginBottom: 16 }}>
          Création de sites web modernes, landing pages, outils personnalisés, ou scripts pour serveurs FiveM (GTA V). Solutions sur-mesure pour particuliers et professionnels.
        </p>
        <ul style={{ fontSize: 18, color: '#fff', margin: '0 0 24px 0', padding: 0, listStyle: 'none', textAlign: 'center' }}>
          <li style={{ marginBottom: 6 }}>🌐 Sites vitrines, portfolios, landing pages</li>
          <li style={{ marginBottom: 6 }}>🛠️ Développement d’outils personnalisés</li>
          <li style={{ marginBottom: 6 }}>🚓 Création de script pour serveurs FiveM</li>
          <li style={{ marginBottom: 6 }}>⚙️ Configuration de script pour serveurs FiveM</li>

        </ul>
      </section>

      <h3 style={{ fontSize: 24, color: '#00c6ff', margin: '24px 0 8px 0', fontWeight: 800 }}>🚀 Pourquoi choisir NaamsShop ?</h3>
      <ul style={{ fontSize: 18, color: '#fff', margin: '0 0 24px 0', padding: 0, listStyle: 'none', textAlign: 'center' }}>
        <li style={{ marginBottom: 6 }}>✅ Un service personnalisé et à l’écoute</li>
        <li style={{ marginBottom: 6 }}>🔒 Paiement sécurisé</li>
        <li style={{ marginBottom: 6 }}>⏱️ Livraison rapide & respect des délais</li>
        <li style={{ marginBottom: 6 }}>💬 Support réactif avant et après vente</li>
      </ul>
      <button
        className="home-btn"
        onClick={() => router.push('/catalogue')}
      >
        Découvrir le catalogue
      </button>
    </main>
  );
}
