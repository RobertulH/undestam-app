"use client";

import { useState } from "react";

export default function InscriePensiune() {
  const [name, setName] = useState("");
  const [loc, setLoc] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  function send() {
    if (!name.trim() || !loc.trim() || !tel.trim()) {
      alert("Te rog completează minim: Nume proprietate, Zonă și Telefon.");
      return;
    }

    // Schimbă cu emailul tău real:
    const to = "contact@undestam.ro";
    const subject = encodeURIComponent("Înscriere pensiune — " + name.trim());
    const body = encodeURIComponent(
      "Nume proprietate: " + name.trim() + "\n" +
      "Zonă: " + loc.trim() + "\n" +
      "Telefon: " + tel.trim() + "\n" +
      "Email: " + email.trim() + "\n\n" +
      "Detalii / link:\n" + msg.trim() + "\n"
    );

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }

  return (
    <div style={{ minHeight: "100vh", padding: 18, background: "#0b1220", color: "#e8eefc", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <a href="/" style={{ color: "#a9b7d6", textDecoration: "none" }}>← Înapoi</a>

        <h1 style={{ marginTop: 10, marginBottom: 8 }}>Înscrie-ți pensiunea pe UndeStăm</h1>
        <p style={{ color: "#a9b7d6", lineHeight: 1.6 }}>
          Primești cereri reale, targetate. Răspunzi fără spam. Verificăm proprietățile înainte să apară pe platformă.
        </p>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Field label="Nume proprietate" value={name} onChange={setName} placeholder="ex: Pensiunea X" />
          <Field label="Zonă / localitate" value={loc} onChange={setLoc} placeholder="ex: Sibiu, Brașov, Maramureș" />
          <Field label="Telefon" value={tel} onChange={setTel} placeholder="ex: 07xx xxx xxx" />
          <Field label="Email" value={email} onChange={setEmail} placeholder="ex: contact@pensiune.ro" />
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", fontWeight: 800, color: "#a9b7d6", fontSize: 12 }}>Link + detalii</label>
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="ex: avem ciubăr, pet-friendly, 10 camere, aproape de pârtie..."
              style={{ width: "100%", marginTop: 6, minHeight: 120, borderRadius: 12, padding: 10, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#e8eefc" }}
            />
          </div>
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <button
            onClick={send}
            style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(61,220,151,.35)", background: "rgba(61,220,151,.12)", color: "#e8eefc", cursor: "pointer", fontWeight: 800 }}
          >
            ✅ Trimite cererea
          </button>
          <span style={{ color: "#a9b7d6", fontSize: 12.5, lineHeight: 1.6 }}>
            În MVP: lead via email. În versiunea 2: profil + verificare + dashboard.
          </span>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label style={{ display: "block", fontWeight: 800, color: "#a9b7d6", fontSize: 12 }}>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: "100%", marginTop: 6, borderRadius: 12, padding: 10, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#e8eefc" }}
      />
    </div>
  );
}
