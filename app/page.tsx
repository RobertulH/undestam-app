"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "undestam_requests_v01";

type StatusKey = "new" | "talking" | "booked";

type RequestItem = {
  id: string;
  title: string;
  location: string;
  type: string;
  start: string; // ISO date (yyyy-mm-dd) sau ""
  end: string; // ISO date (yyyy-mm-dd) sau ""
  people: number;
  budget: string;
  fac: string[];
  details: string;
  status: StatusKey;
  createdAt: number;
};

type FacState = Record<string, boolean>;

function uid(): string {
  return Math.random().toString(16).slice(2) + "-" + Date.now().toString(16);
}

function escapeHtml(str: unknown): string {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(d: unknown): string {
  if (!d) return "";
  const dt = new Date(String(d));
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString("ro-RO", { day: "2-digit", month: "short" });
}

function statusLabel(s: unknown): { text: string; cls: string } {
  if (s === "new") return { text: "Nou", cls: "new" };
  if (s === "talking") return { text: "În discuții", cls: "" };
  if (s === "booked") return { text: "Rezervat", cls: "ok" };
  return { text: "", cls: "" };
}

function defaultRequests(): RequestItem[] {
  return [
    {
      id: uid(),
      title: "Caut cabană cu ciubăr în Marginimea Sibiului",
      location: "Marginimea Sibiului",
      type: "Cabană",
      start: "",
      end: "",
      people: 6,
      budget: "max 500 lei/noapte",
      fac: ["ciubăr", "liniște"],
      details:
        "Weekend, 6 persoane. Vrem liniște, fără vecini, ideal aproape de trasee.",
      status: "new",
      createdAt: Date.now() - 1000 * 60 * 80,
    },
    {
      id: uid(),
      title: "Pensiune aproape de pârtie (familie cu copil)",
      location: "Brașov / Poiana",
      type: "Pensiune",
      start: "",
      end: "",
      people: 3,
      budget: "300–450 lei/noapte",
      fac: ["aproape de pârtie", "mic dejun", "parcare"],
      details: "Căutăm cazare liniștită, aproape de pârtie, 2 nopți.",
      status: "talking",
      createdAt: Date.now() - 1000 * 60 * 180,
    },
    {
      id: uid(),
      title: "Weekend în Maramureș — pet-friendly",
      location: "Maramureș",
      type: "Vilă",
      start: "",
      end: "",
      people: 4,
      budget: "",
      fac: ["pet-friendly", "liniște", "parcare"],
      details: "Venim cu un cățel mic. Vrem curte și liniște.",
      status: "booked",
      createdAt: Date.now() - 1000 * 60 * 260,
    },
  ];
}

export default function Home() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [q, setQ] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | StatusKey>("all");
  const [open, setOpen] = useState<boolean>(false);

  // Form state
  const [loc, setLoc] = useState<string>("");
  const [type, setType] = useState<string>("Pensiune");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [people, setPeople] = useState<number>(2);
  const [budget, setBudget] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [st, setSt] = useState<StatusKey>("new");
  const [fac, setFac] = useState<FacState>({
    "liniște": false,
    "ciubăr": false,
    "aproape de pârtie": false,
    "pet-friendly": false,
    "parcare": false,
    "mic dejun": false,
  });

  // Load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const seeded = defaultRequests();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
        setRequests(seeded);
        return;
      }
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        const seeded = defaultRequests();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
        setRequests(seeded);
        return;
      }
      setRequests(parsed as RequestItem[]);
    } catch {
      const seeded = defaultRequests();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      setRequests(seeded);
    }
  }, []);

  function persist(next: RequestItem[]) {
    setRequests(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return requests
      .filter((r) => {
        if (!query) return true;
        const hay = [
          r.title,
          r.location,
          r.type,
          (r.fac || []).join(" "),
          r.details,
          r.budget,
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(query);
      })
      .filter((r) =>
        statusFilter === "all" ? true : r.status === statusFilter
      );
  }, [requests, q, statusFilter]);

  function resetDemo() {
    if (!confirm("Reset demo? (șterge cererile salvate local)")) return;
    const seeded = defaultRequests();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    setRequests(seeded);
  }

  function deleteRequest(id: string) {
    if (!confirm("Ștergi cererea?")) return;
    const next = requests.filter((r) => r.id !== id);
    persist(next);
  }

  function fillExample() {
    setLoc("Sibiu / Marginimea Sibiului");
    setType("Pensiune");
    setPeople(4);
    setBudget("350–550 lei/noapte");
    setSt("new");
    setStart("");
    setEnd("");
    setDetails(
      "Căutăm liniște, ideal ciubăr și curte. Preferăm aproape de trasee, nu la drum principal."
    );
    setFac((prev) => ({
      ...Object.fromEntries(Object.keys(prev).map((k) => [k, false])),
      "liniște": true,
      "ciubăr": true,
    }));
  }

  function submit() {
    const location = loc.trim();
    const det = details.trim();

    if (!location) {
      alert("Te rog completează locația/zona.");
      return;
    }
    if (!det) {
      alert("Te rog adaugă 1-2 propoziții la Detalii (ajută recomandările).");
      return;
    }

    const chosenFac = Object.entries(fac)
      .filter(([, v]) => v)
      .map(([k]) => k);

    const title = `Caut ${type.toLowerCase()} în ${location}${
      chosenFac.length ? " — " + chosenFac.slice(0, 2).join(", ") : ""
    }`;

    const item: RequestItem = {
      id: uid(),
      title,
      location,
      type,
      start,
      end,
      people: Number(people || 1),
      budget: budget.trim(),
      fac: chosenFac,
      details: det,
      status: st,
      createdAt: Date.now(),
    };

    const next = [item, ...requests];
    persist(next);

    // reset
    setLoc("");
    setStart("");
    setEnd("");
    setBudget("");
    setDetails("");
    setSt("new");
    setFac((prev) =>
      Object.fromEntries(Object.keys(prev).map((k) => [k, false]))
    );
    setOpen(false);
  }

  // Close modal on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div id="undestam-app">
        <style>{`
          :root{
            --bg:#0b1220; --card:#101a2e; --card2:#0f1730; --text:#e8eefc; --muted:#a9b7d6;
            --line:rgba(255,255,255,.10); --accent:#3ddc97; --accent2:#4aa3ff; --warn:#ffd166;
            --shadow:0 14px 40px rgba(0,0,0,.35); --radius:18px; --radius2:14px; --max:1100px;
            --font:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
          }
          #undestam-app{ font-family:var(--font); color:var(--text); }
          #undestam-app .wrap{
            background:
              radial-gradient(1200px 600px at 20% -10%, rgba(74,163,255,.18), transparent 55%),
              radial-gradient(900px 500px at 85% 0%, rgba(61,220,151,.16), transparent 50%),
              var(--bg);
            min-height: 100vh;
            padding: 18px 0 28px;
          }
          #undestam-app .container{ max-width:var(--max); margin:0 auto; padding:18px; }
          #undestam-app a{ color:inherit; text-decoration:none; }

          .nav{
            display:flex; align-items:center; justify-content:space-between; gap:12px;
            padding: 12px 14px; border:1px solid var(--line); border-radius: 16px;
            background: rgba(255,255,255,.03);
            position: sticky; top: 10px; z-index: 10;
            backdrop-filter: blur(10px);
          }
          .brand{ display:flex; align-items:center; gap:10px; font-weight:900; }
          .logo{
            width:36px; height:36px; border-radius:12px;
            background: linear-gradient(135deg, rgba(61,220,151,.95), rgba(74,163,255,.95));
            display:grid; place-items:center; color:#071020;
            box-shadow: 0 10px 22px rgba(0,0,0,.25);
          }
          .nav-actions{ display:flex; gap:10px; flex-wrap:wrap; }
          .btn{
            border:1px solid var(--line);
            background: rgba(255,255,255,.06);
            color:var(--text);
            padding:10px 12px;
            border-radius:14px;
            cursor:pointer;
            display:inline-flex; align-items:center; gap:8px;
            user-select:none;
          }
          .btn:hover{ background: rgba(255,255,255,.10); }
          .btn.primary{
            border-color: rgba(61,220,151,.35);
            background: linear-gradient(135deg, rgba(61,220,151,.18), rgba(74,163,255,.14));
          }
          .btn.danger{
            border-color: rgba(255,107,107,.35);
            background: rgba(255,107,107,.10);
          }

          .hero{
            margin-top: 14px;
            display:grid; grid-template-columns: 1.25fr .75fr; gap:14px;
          }
          @media(max-width:920px){ .hero{ grid-template-columns:1fr; } }

          .card{
            border:1px solid var(--line);
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            background: linear-gradient(180deg, rgba(16,26,46,.92), rgba(16,26,46,.72));
            overflow:hidden;
          }
          .hero-main{ padding: 18px; position:relative; }
          .hero-main:before{
            content:""; position:absolute; inset:-80px -120px auto auto;
            width:320px; height:320px;
            background: radial-gradient(circle at 30% 30%, rgba(61,220,151,.26), transparent 55%);
            transform: rotate(10deg); pointer-events:none;
          }
          .kicker{
            display:inline-flex; gap:10px; align-items:center;
            padding:7px 10px; border:1px solid var(--line);
            background: rgba(255,255,255,.05); border-radius:999px;
            color: var(--muted); font-weight:700; font-size:13px;
          }
          h1{ margin: 12px 0 8px; font-size: 36px; line-height:1.08; letter-spacing:-.5px; }
          @media(max-width:520px){ h1{ font-size: 30px; } }
          .sub{ margin:0 0 14px; color:var(--muted); line-height:1.6; }
          .pill-row{ display:flex; flex-wrap:wrap; gap:10px; margin-top: 14px; }
          .pill{
            border:1px solid var(--line); background: rgba(255,255,255,.04);
            padding:10px 12px; border-radius:999px;
            color: var(--muted); font-weight:700; font-size:13px;
            display:flex; align-items:center; gap:8px;
          }
          .dot{ width:8px; height:8px; border-radius:999px; background:var(--accent); }
          .dot.blue{ background:var(--accent2); }
          .dot.warn{ background:var(--warn); }

          .side{ padding: 14px; display:flex; flex-direction:column; gap:10px; }
          .stat{
            border:1px solid var(--line); border-radius: var(--radius2);
            padding: 12px; background: rgba(255,255,255,.04);
          }
          .stat .label{ color:var(--muted); font-weight:800; font-size:12px; }
          .stat .value{ font-weight:900; font-size:20px; margin-top:4px; }
          .stat .mini{ color:var(--muted); font-size:12px; margin-top:6px; line-height:1.4; }

          .section-head{
            display:flex; align-items:flex-end; justify-content:space-between; gap:12px;
            margin: 18px 0 10px;
          }
          .section-head h2{ margin:0; font-size:18px; }
          .filters{ display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end; align-items:center; }
          .field{
            display:flex; gap:6px; align-items:center;
            border:1px solid var(--line); background: rgba(255,255,255,.04);
            padding: 9px 10px; border-radius: 14px; color:var(--muted);
          }
          .field input, .field select{
            border:none; outline:none; background:transparent; color:var(--text);
            min-width: 160px;
          }

          .grid{ display:grid; grid-template-columns:1fr 1fr; gap:14px; }
          @media(max-width:920px){ .grid{ grid-template-columns:1fr; } }

          .req{
            padding: 14px; border-radius: var(--radius);
            border:1px solid var(--line);
            background: linear-gradient(180deg, rgba(15,23,48,.94), rgba(15,23,48,.74));
            box-shadow: 0 10px 26px rgba(0,0,0,.28);
            display:flex; flex-direction:column; gap:10px;
          }
          .req-top{ display:flex; justify-content:space-between; gap:10px; align-items:flex-start; }
          .title{ margin:0; font-weight:900; font-size:16px; line-height:1.25; }
          .meta{ display:flex; flex-wrap:wrap; gap:8px; margin-top:6px; color:var(--muted); font-size:12.5px; }
          .tag{
            display:inline-flex; gap:6px; align-items:center;
            padding:6px 9px; border-radius:999px;
            border:1px solid var(--line); background: rgba(255,255,255,.03);
            color:var(--muted); font-weight:800; font-size:12px; white-space:nowrap;
          }
          .desc{ margin:0; color:rgba(232,238,252,.92); line-height:1.55; font-size:13.5px; }
          .req-actions{ display:flex; justify-content:space-between; align-items:center; gap:10px; margin-top: 4px; }
          .status{ display:inline-flex; align-items:center; gap:8px; font-weight:900; font-size:12px; color:var(--muted); }
          .bubble{ width:10px; height:10px; border-radius:999px; background:var(--warn); box-shadow:0 0 0 4px rgba(255,209,102,.12); }
          .status.new .bubble{ background:var(--accent2); box-shadow:0 0 0 4px rgba(74,163,255,.12); }
          .status.ok .bubble{ background:var(--accent); box-shadow:0 0 0 4px rgba(61,220,151,.12); }

          /* Modal */
          .overlay{
            position: fixed; inset: 0; background: rgba(0,0,0,.55);
            display:none; align-items:center; justify-content:center; padding:16px; z-index:9999;
          }
          .overlay.show{ display:flex; }
          .modal{
            width:min(760px, 100%); border-radius: 22px; border:1px solid var(--line);
            background: linear-gradient(180deg, rgba(16,26,46,.98), rgba(16,26,46,.82));
            box-shadow: 0 20px 60px rgba(0,0,0,.55); overflow:hidden;
          }
          .m-head{ padding: 16px; display:flex; justify-content:space-between; gap: 12px; border-bottom:1px solid var(--line); }
          .m-head h3{ margin:0; font-size:16px; }
          .m-head p{ margin:6px 0 0; color:var(--muted); font-size:13px; line-height:1.5; }
          .close{
            border:1px solid var(--line); background: rgba(255,255,255,.06); color: var(--text);
            width: 38px; height: 38px; border-radius: 14px; cursor:pointer;
          }
          .m-body{ padding: 14px 16px 16px; }
          .form-grid{ display:grid; grid-template-columns: 1fr 1fr; gap: 10px; }
          @media(max-width:720px){ .form-grid{ grid-template-columns:1fr; } }
          .control{
            display:flex; flex-direction:column; gap:6px; padding: 10px;
            border:1px solid var(--line); border-radius: 16px; background: rgba(255,255,255,.03);
          }
          .control label{ font-size:12px; color:var(--muted); font-weight:900; }
          .control input, .control select, .control textarea{
            border:none; outline:none; background:transparent; color:var(--text); padding: 4px 0; font-size:14px;
          }
          .control textarea{ min-height: 90px; resize: vertical; }
          .checks{
            grid-column: 1 / -1;
            display:flex; flex-wrap:wrap; gap: 8px;
            padding: 10px; border:1px solid var(--line); border-radius: 16px; background: rgba(255,255,255,.03);
          }
          .check{
            display:flex; align-items:center; gap:8px;
            border:1px solid var(--line); background: rgba(255,255,255,.03);
            padding: 8px 10px; border-radius: 999px; cursor:pointer; user-select:none;
            font-weight:900; color: var(--muted); font-size: 12px;
          }
          .check input{ accent-color: var(--accent); }
          .m-foot{
            padding: 12px 16px 16px; display:flex; justify-content:space-between; gap:10px; flex-wrap:wrap;
            border-top: 1px solid var(--line);
          }
          .note{ color:var(--muted); font-size:12.5px; line-height:1.45; }
        `}</style>

        <div className="wrap">
          <div className="container">
            <div className="nav">
              <div className="brand">
                <div className="logo">U</div>
                <div>
                  <div style={{ fontSize: 14, lineHeight: 1 }}>UndeStăm.ro</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 800 }}>
                    cereri • recomandări • pensiuni verificate
                  </div>
                </div>
              </div>

              <div className="nav-actions">
                <button className="btn primary" onClick={() => setOpen(true)}>➕ Creează cerere</button>
                <a className="btn" href="/inscrie-pensiune">🏠 Vreau profil de pensiune</a>
                <a className="btn" href="/caut-cazare-sibiu">📍 Caut cazare în Sibiu</a>
                <a className="btn" href="/cum-functioneaza">ℹ️ Cum funcționează</a>
              </div>
            </div>

            <div className="hero">
              <div className="card hero-main">
                <span className="kicker">🟢 Fără spam • Recomandări reale • Răspuns controlat</span>
                <h1>Unde vrei să stai?<br />Primești recomandări reale.</h1>
                <p className="sub">
                  Creează o cerere de cazare în 20 de secunde. Comunitatea recomandă, iar pensiunile verificate pot răspunde fără spam.
                </p>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button className="btn primary" onClick={() => setOpen(true)}>🚀 Creează cerere de cazare</button>
                  <a className="btn" href="#feed">🔎 Vezi cereri recente</a>
                </div>

                <div className="pill-row">
                  <div className="pill"><span className="dot" /> Recomandări cu reputație</div>
                  <div className="pill"><span className="dot blue" /> Cereri filtrabile</div>
                  <div className="pill"><span className="dot warn" /> Last minute & weekend</div>
                </div>
              </div>

              <div className="card side">
                <div className="stat">
                  <div className="label">Cereri active (local)</div>
                  <div className="value">{requests.length || "—"}</div>
                  <div className="mini">În MVP, datele stau în browser (localStorage). La versiunea reală: DB + conturi.</div>
                </div>
                <div className="stat">
                  <div className="label">Cum funcționează</div>
                  <div className="value">3 pași</div>
                  <div className="mini">Spui ce cauți → primești recomandări → pensiunile verificate îți răspund.</div>
                </div>
                <div className="stat">
                  <div className="label">Anti-spam</div>
                  <div className="value">Verificare</div>
                  <div className="mini">Limită de răspunsuri + penalizare copy-paste (în versiunea 2).</div>
                </div>
              </div>
            </div>

            <div className="section-head" id="feed">
              <h2>🔍 Cereri recente</h2>
              <div className="filters">
                <div className="field">
                  🔎{" "}
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="caută: Sibiu, ciubăr, pârtie..."
                  />
                </div>
                <div className="field">
                  📌{" "}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as "all" | StatusKey)}
                  >
                    <option value="all">toate</option>
                    <option value="new">noi</option>
                    <option value="talking">în discuții</option>
                    <option value="booked">rezervat</option>
                  </select>
                </div>
                <button className="btn danger" onClick={resetDemo}>🧹 Reset demo</button>
              </div>
            </div>

            <div className="grid">
              {filtered.length === 0 ? (
                <div className="req" style={{ gridColumn: "1 / -1" }}>
                  <p className="title">Nu am găsit cereri pentru filtrul selectat.</p>
                  <p className="desc" style={{ color: "var(--muted)" }}>
                    Încearcă alt cuvânt sau apasă „Creează cerere”.
                  </p>
                  <div style={{ marginTop: 10 }}>
                    <button className="btn primary" onClick={() => setOpen(true)}>➕ Creează cerere</button>
                  </div>
                </div>
              ) : (
                filtered.map((item) => {
                  const s = statusLabel(item.status);
                  const dateRange =
                    formatDate(item.start) && formatDate(item.end)
                      ? `${formatDate(item.start)} – ${formatDate(item.end)}`
                      : "";

                  const tags = [
                    item.location ? `📍 ${item.location}` : "",
                    item.type ? `🏠 ${item.type}` : "",
                    item.people ? `👥 ${item.people} pers` : "",
                    dateRange ? `📅 ${dateRange}` : "",
                    item.budget ? `💰 ${item.budget}` : "",
                  ].filter(Boolean);

                  const facTags = (item.fac || []).slice(0, 4).map((f) => `⭐ ${f}`);

                  return (
                    <article className="req" key={item.id}>
                      <div className="req-top">
                        <div>
                          <h3
                            className="title"
                            dangerouslySetInnerHTML={{ __html: escapeHtml(item.title) }}
                          />
                          <div className="meta">
                            {tags.map((t, i) => (
                              <span
                                className="tag"
                                key={"t-" + i}
                                dangerouslySetInnerHTML={{ __html: escapeHtml(t) }}
                              />
                            ))}
                            {facTags.map((t, i) => (
                              <span
                                className="tag"
                                key={"f-" + i}
                                dangerouslySetInnerHTML={{ __html: escapeHtml(t) }}
                              />
                            ))}
                          </div>
                        </div>
                        <button className="btn" title="Șterge cererea" onClick={() => deleteRequest(item.id)}>
                          🗑️
                        </button>
                      </div>

                      <p className="desc" dangerouslySetInnerHTML={{ __html: escapeHtml(item.details) }} />

                      <div className="req-actions">
                        <span className={`status ${s.cls}`}>
                          <span className="bubble" /> {s.text}
                        </span>
                        <button
                          className="btn"
                          onClick={() => alert("În versiunea reală: recomandări + oferte pensiuni + chat.")}
                        >
                          💬 Vezi răspunsuri
                        </button>
                      </div>
                    </article>
                  );
                })
              )}
            </div>

            <div style={{ marginTop: 14, color: "var(--muted)", fontSize: 12.5, lineHeight: 1.6 }}>
              <strong>Notă:</strong> Acesta e MVP-ul. Următorul pas real: DB + conturi + profiluri pensiuni.
            </div>
          </div>
        </div>

        {/* MODAL */}
        <div
          className={`overlay ${open ? "show" : ""}`}
          aria-hidden={!open}
          onClick={(e) => {
            if ((e.target as HTMLElement).classList.contains("overlay")) setOpen(false);
          }}
        >
          <div className="modal" role="dialog" aria-modal="true">
            <div className="m-head">
              <div>
                <h3>➕ Creează cerere de cazare</h3>
                <p>Completează 5 lucruri esențiale. Primești recomandări mai bune, mai repede.</p>
              </div>
              <button className="close" aria-label="Închide" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>

            <div className="m-body">
              <div className="form-grid">
                <div className="control">
                  <label>📍 Locație / zonă</label>
                  <input
                    value={loc}
                    onChange={(e) => setLoc(e.target.value)}
                    placeholder="ex: Marginimea Sibiului, Brașov, Maramureș"
                  />
                </div>

                <div className="control">
                  <label>🏠 Tip cazare</label>
                  <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Pensiune">Pensiune</option>
                    <option value="Cabană">Cabană</option>
                    <option value="Vilă">Vilă</option>
                    <option value="Hotel">Hotel</option>
                  </select>
                </div>

                <div className="control">
                  <label>📅 Check-in</label>
                  <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
                </div>

                <div className="control">
                  <label>📅 Check-out</label>
                  <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
                </div>

                <div className="control">
                  <label>👥 Număr persoane</label>
                  <input
                    type="number"
                    min={1}
                    value={people}
                    onChange={(e) => setPeople(Number(e.target.value || 1))}
                  />
                </div>

                <div className="control">
                  <label>💰 Buget/noapte (opțional)</label>
                  <input
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="ex: 300–500 lei"
                  />
                </div>

                <div className="checks">
                  {Object.keys(fac).map((k) => (
                    <label className="check" key={k}>
                      <input
                        type="checkbox"
                        checked={!!fac[k]}
                        onChange={(e) => setFac((prev) => ({ ...prev, [k]: e.target.checked }))}
                      />
                      {k === "liniște" && "🤫 "}
                      {k === "ciubăr" && "🛁 "}
                      {k === "aproape de pârtie" && "⛷️ "}
                      {k === "pet-friendly" && "🐶 "}
                      {k === "parcare" && "🚗 "}
                      {k === "mic dejun" && "☕ "}
                      {k}
                    </label>
                  ))}
                </div>

                <div className="control" style={{ gridColumn: "1 / -1" }}>
                  <label>📝 Detalii</label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="ex: Vrem liniște, fără vecini, ideal ciubăr, aproape de trasee."
                  />
                </div>

                <div className="control" style={{ gridColumn: "1 / -1" }}>
                  <label>⚑ Status</label>
                  <select value={st} onChange={(e) => setSt(e.target.value as StatusKey)}>
                    <option value="new">Nou</option>
                    <option value="talking">În discuții</option>
                    <option value="booked">Rezervat</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="m-foot">
              <div className="note">
                <strong>Tip:</strong> Cererile bune au locație + perioadă + 2–3 facilități.
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="btn" onClick={fillExample}>✨ Umple exemplu</button>
                <button className="btn primary" onClick={submit}>✅ Publică cererea</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
