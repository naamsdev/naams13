"use client";
import { useState, useEffect } from "react";
import Image from 'next/image';

interface Bot {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
}

export default function Catalogue() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bots')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setBots(data);
        } else {
          setBots([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setBots([]);
        setLoading(false);
      });
  }, []);

  const ajouterAuPanier = (bot: Bot) => {
    // Récupérer le panier actuel
    const panierActuel = localStorage.getItem('panierNaamsShop');
    let panier = panierActuel ? JSON.parse(panierActuel) : [];
    
    // Vérifier si le bot est déjà dans le panier
    const botExistant = panier.find((item: Bot) => item.id === bot.id);
    
    if (botExistant) {
      // Si le bot existe déjà, augmenter la quantité
      panier = panier.map((item: Bot) => 
        item.id === bot.id 
          ? { ...item, quantity: (item.quantity ?? 1) + 1 }
          : item
      );
    } else {
      // Sinon, ajouter le nouveau bot avec quantité 1
      panier.push({ ...bot, quantity: 1 });
    }
    
    // Sauvegarder le panier
    localStorage.setItem('panierNaamsShop', JSON.stringify(panier));
    
    // Déclencher un événement personnalisé pour notifier la NavBar
    window.dispatchEvent(new CustomEvent('panierModifie', { 
      detail: { panier } 
    }));
    
    // Afficher une confirmation
    alert(`${bot.name} a été ajouté au panier !`);
  };

  if (loading) {
    return (
      <main style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 20
      }}>
        Chargement du catalogue...
      </main>
    );
  }

  return (
    <main className="catalogue-main">
      <h1 className="catalogue-title">
        Catalogue des Services
      </h1>
      <div className="catalogue-grid">
        {bots.map((bot) => (
          <div key={bot.id} className="catalogue-card">
            <div>
              {bot.image && (
                <Image
                  src={bot.image}
                  alt={bot.name}
                  className="catalogue-img"
                  width={300}
                  height={120}
                />
              )}
              <h2 className="catalogue-card-title">{bot.name}</h2>
              <p className="catalogue-card-desc">{bot.description}</p>
            </div>
            <div className="catalogue-card-footer">
              <span className="catalogue-card-price">{bot.price}€</span>
              <button
                className="catalogue-card-btn"
                onClick={() => ajouterAuPanier(bot)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                🛒 Acheter
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 