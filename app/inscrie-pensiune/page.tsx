"use client";

import { useState } from "react";

export default function InscriePensiune() {
  const [name, setName] = useState("");
  const [loc, setLoc] = useState("");
  const [phone, setPhone] = useState("");
  const [link, setLink] = useState("");

  function submit() {
    if (!name.trim() || !loc.trim()) {
      alert("Completează numele și locația.");
      return;
    }
    alert("MVP: formular demo. În versiunea reală: salvare în DB + verificare + profil public.");
    setName(""); setLoc(""); setPhone(""); setLink("");
  }

  return (
    <div style={{ minHeight: "100vh", padding: 18, background: "#0b1220", color: "#e8eefc", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <a href="/" style={{ color: "#a9b7d6", textDecoration: "none" }}>← Înapoi la homepage</a>

        <h1 style={{ marginTop: 10 }}>Înscrie pensiunea ta</h1>
        <p style={{ color: "#a9b7d6", lineHeight: 1.8 }}>
          Creează un profil verificat ca să poți răspunde la cereri fără spam.
        </p>

        <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nume pensiune" style={{ borderRadius: 12, padding: 12, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#e8eefc" }} />
          <input value={loc} onChange={(e) => setLoc(e.target.value)} placeholder="Zonă / localitate" style={{ borderRadius: 12, padding: 12, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#e8eefc" }} />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefon (opțional)" style={{ borderRadius: 12, padding: 12, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#e8eefc" }} />
          <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link booking/facebook/site (opțional)" style={{ borderRadius: 12, padding: 12, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#e8eefc" }} />

          <button onClick={submit} style={{ borderRadius: 12, padding: 12, border: "1px solid rgba(61,220,151,.35)", background: "rgba(61,220,151,.12)", color: "#e8eefc", fontWeight: 900, cursor: "pointer" }}>
            ✅ Trimite (demo)
          </button>
        </div>
      </div>
    </div>
  );
}
