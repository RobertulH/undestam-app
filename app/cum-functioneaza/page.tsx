export default function CumFunctioneaza() {
  return (
    <div style={{ minHeight: "100vh", padding: 18, background: "#0b1220", color: "#e8eefc", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <a href="/" style={{ color: "#a9b7d6", textDecoration: "none" }}>← Înapoi la homepage</a>

        <h1 style={{ marginTop: 10 }}>Cum funcționează UndeStăm</h1>
        <p style={{ color: "#a9b7d6", lineHeight: 1.8 }}>
          Ideea: în loc de grupuri Facebook (unde se pierde informația), centralizăm cereri + recomandări într-o platformă.
        </p>

        <ol style={{ lineHeight: 1.9 }}>
          <li><strong>Clientul creează o cerere</strong> (zonă, perioadă, buget, facilități).</li>
          <li><strong>Comunitatea recomandă</strong> (cu reputație / profil / istoricul recomandărilor).</li>
          <li><strong>Pensiunile verificate răspund</strong> fără spam (limită răspunsuri, filtrare copy-paste în v2).</li>
        </ol>

        <div style={{ marginTop: 16, padding: 14, borderRadius: 14, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.03)" }}>
          <strong>Următorul pas tehnic:</strong> DB + conturi + profil pensiune + mesagerie (chat) + moderare.
        </div>
      </div>
    </div>
  );
}
