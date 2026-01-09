export default function CumFunctioneaza() {
  return (
    <div style={{ minHeight: "100vh", padding: 18, background: "#0b1220", color: "#e8eefc", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <a href="/" style={{ color: "#a9b7d6", textDecoration: "none" }}>← Înapoi la homepage</a>

        <h1 style={{ marginTop: 10 }}>Cum funcționează UndeStăm</h1>
        <p style={{ color: "#a9b7d6", lineHeight: 1.7 }}>
          Ideea: în loc de grupuri de Facebook cu spam, ai cereri clare + recomandări reale + pensiuni verificate.
        </p>

        <ol style={{ lineHeight: 1.8 }}>
          <li><strong>Creezi o cerere</strong> (locație, perioadă, număr persoane, buget, facilități).</li>
          <li><strong>Primești recomandări</strong> de la oameni (și ulterior de la pensiuni verificate).</li>
          <li><strong>Alegi și rezervi</strong> — fără spam, fără copy-paste, fără haos.</li>
        </ol>

        <h2 style={{ marginTop: 20 }}>Ce urmează (v2)</h2>
        <ul style={{ lineHeight: 1.8 }}>
          <li>Conturi utilizatori + reputație recomandări</li>
          <li>Profil pensiune + verificare + calendar</li>
          <li>Chat / mesagerie + limită de răspunsuri anti-spam</li>
          <li>Hărți + filtre avansate</li>
        </ul>
      </div>
    </div>
  );
}
