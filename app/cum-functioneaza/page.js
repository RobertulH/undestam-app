export const metadata = {
  title: "Cum funcționează — UndeStăm.ro",
  description: "Creezi o cerere de cazare, primești recomandări reale și răspunsuri de la pensiuni verificate.",
};

export default function CumFunctioneaza() {
  return (
    <div style={{ minHeight: "100vh", padding: 18, background: "#0b1220", color: "#e8eefc", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <a href="/" style={{ color: "#a9b7d6", textDecoration: "none" }}>← Înapoi</a>
        <h1 style={{ marginTop: 10 }}>Cum funcționează UndeStăm</h1>
        <p style={{ color: "#a9b7d6", lineHeight: 1.7 }}>
          UndeStăm este o alternativă la grupurile de Facebook: cereri structurate, recomandări reale, fără spam.
        </p>

        <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
          <div style={card}>
            <div style={h}>1) Creezi cererea</div>
            <div style={p}>Locație, perioadă, persoane, buget și facilități (ex: ciubăr, pet-friendly).</div>
          </div>
          <div style={card}>
            <div style={h}>2) Primești recomandări</div>
            <div style={p}>De la oameni care chiar au fost acolo. Recomandările utile urcă, reclamele mascate coboară.</div>
          </div>
          <div style={card}>
            <div style={h}>3) Pensiunile verificate pot răspunde</div>
            <div style={p}>Răspuns controlat: fără copy-paste, fără spam, doar cereri compatibile.</div>
          </div>
        </div>

        <div style={{ marginTop: 14, color: "#a9b7d6", lineHeight: 1.7 }}>
          <strong>Anti-spam:</strong> verificare proprietari + limită de răspunsuri + raportare + moderare.
        </div>
      </div>
    </div>
  );
}

const card = {
  borderRadius: 14,
  padding: 14,
  border: "1px solid rgba(255,255,255,.1)",
  background: "rgba(255,255,255,.03)",
};
const h = { fontWeight: 900, marginBottom: 6 };
const p = { color: "#a9b7d6", lineHeight: 1.7 };
