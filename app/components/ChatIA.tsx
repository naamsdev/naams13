"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatIA() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Bonjour ! Je suis l’assistant NaamsShop. Pose-moi toutes tes questions sur nos services, bots, montages ou support Discord !" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ia-support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });
      const data = await res.json();
      setMessages(msgs => [...msgs, { from: "bot", text: data.reply || "Je n’ai pas compris, peux-tu reformuler ?" }]);
    } catch {
      setMessages(msgs => [...msgs, { from: "bot", text: "Erreur de connexion à l’IA. Réessaie plus tard." }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Bulle flottante */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="chatia-fab"
          aria-label="Ouvrir le chat IA"
        >
          💬
        </button>
      )}
      {/* Fenêtre de chat */}
      {open && (
        <div className="chatia-window">
          <div className="chatia-header">
            <span className="chatia-title">Assistant IA</span>
            <button onClick={() => setOpen(false)} className="chatia-close">&times;</button>
          </div>
          <div className="chatia-messages">
            {messages.map((msg, i) => (
              <div key={i} style={{
                marginBottom: 12,
                textAlign: msg.from === "user" ? "right" : "left"
              }}>
                <span style={{
                  display: "inline-block",
                  background: msg.from === "user" ? "#00c6ff" : "#fff",
                  color: msg.from === "user" ? "#fff" : "#222e3a",
                  borderRadius: 12,
                  padding: "8px 14px",
                  fontSize: 15,
                  maxWidth: 320,
                  wordBreak: "break-word"
                }}>{msg.text}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={sendMessage} className="chatia-form">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Pose ta question..."
              className="chatia-input"
              disabled={loading}
              autoFocus={open}
            />
            <button type="submit" disabled={loading || !input.trim()} className="chatia-send">➤</button>
          </form>
        </div>
      )}
    </>
  );
} 