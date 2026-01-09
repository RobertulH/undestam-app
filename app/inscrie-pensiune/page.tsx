"use client";

import { useState } from "react";

export default function InscriePensiune() {
  const [name, setName] = useState("");
  const [loc, setLoc] = useState("");
  const [phone, setPhone] = useState("");
  const [link, setLink] = useState("");

  function submit() {
    if (!name.trim() || !loc.trim()) {
      alert("Completează minim: Nume pensiune + Locație.");
      return;
    }
    alert("MVP: formular demo. În versiunea live: se salvează în baza de date + verificare.");
    setName("");
    setLoc("");
    setPhone("");
    setLink("");
  }

  return (
    <div style={{ minHeight: "100vh", padding: 18, background: "#0b1220", color: "#e8eefc", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <a href="/" style={{ color: "#a9b7d6", textDecoration: "none" }}>← Înapoi la homepage</a>

        <h1 style={{ marginTop: 10 }}>Înscrie pensiunea ta</h1>
        <p style={{ color: "#a9b7d6", lineHeight: 1.7 }}>
          În MVP, formularul este demonstrativ. În versiunea live: profil public + verificare + posibilitate de a răspunde la cereri.
        </p>

        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nume pensiune"
            style={{ borderRadius: 12, padding: 12, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#e8eefc" }}
          />
          <input
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            placeholder="Localitate / Județ"
            style={{ borderRadius: 12, padding: 12, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#e8eefc" }}
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefon (opțional)"
            style={{ borderRadius: 12, padding: 12, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#e8eefc" }}
          />
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link site / Facebook / Booking (opțional)"
            style={{ borderRadius: 12, padding: 12, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#e8eefc" }}
          />

          <button
            onClick={submit}
            style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(61,220,151,.35)", background: "rgba(61,220,151,.12)", color: "#e8eefc", fontWeight: 900, cursor: "pointer" }}
          >
            ✅ Trimite
          </button>
        </div>
      </div>
    </div>
  );
}
