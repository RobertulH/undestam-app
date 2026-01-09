"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "undestam_requests_v01";
type StatusKey = "new" | "talking" | "booked";
type FilterKey = "all" | StatusKey;

type RequestItem = {
  title: string;
  location: string;
  type: string;
  people: number;
  budget: string;
  fac?: string[];
  details: string;
  status: StatusKey;
};

function isBucovinaLike(text: string) {
  const t = (text || "").toLowerCase();
  return (
    t.includes("bucovina") ||
    t.includes("suceava") ||
    t.includes("vama") ||
    t.includes("gura humorului") ||
    t.includes("gura humor") ||
    t.includes("campulung moldovenesc") ||
    t.includes("câmpulung moldovenesc") ||
    t.includes("moldovița") ||
    t.includes("moldovita")
  );
}

export default function CautCazareBucovina() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [q, setQ] = useState("");
  const [sf, setSf] = useState<FilterKey>("all");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      setRequests(Array.isArray(parsed) ? (parsed as RequestItem[]) : []);
    } catch {
      setRequests([]);
    }
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return requests
      .filter((r) => isBucovinaLike(`${r.title} ${r.location}`))
      .filter((r) => {
        if (!query) return true;
        const hay = [r.title, r.location, r.type, (r.fac || []).join(" "), r.details, r.budget].join(" ").toLowerCase();
        return hay.includes(query);
      })
      .filter((r) => (sf === "all" ? true : r.status === sf));
  }, [requests, q, sf]);

  return (
    <div style={{ minHeight: "100vh", padding: 18, background: "#0b1220", color: "#e8eefc", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <a href="/" style={{ color: "#a9b7d6", textDecoration: "none" }}>← Înapoi la homepage</a>

        <h1 style={{ marginTop: 10, marginBottom: 8 }}>Caut cazare în Bucovina</h1>
        <p style={{ color: "#a9b7d6", lineHeight: 1.7 }}>
          Cereri pentru Bucovina (Suceava, Vama, Gura Humorului, Câmpulung Moldovenesc etc.). Creează o cerere și primești recomandări reale.
        </p>

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="caută: cabană, liniște..." style={{ borderRadius: 12, padding: 10, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#e8eefc", minWidth: 240 }} />
          <select value={sf} onChange={(e) => setSf(e.target.value as FilterKey)} style={{ borderRadius: 12, padding: 10, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#e8eefc" }}>
            <option value="all">toate</option>
            <option value="new">noi</option>
            <option value="talking">în discuții</option>
            <option value="booked">rezervat</option>
          </select>
          <a href="/#feed" style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(61,220,151,.35)", background: "rgba(61,220,151,.12)", color: "#e8eefc", textDecoration: "none", fontWeight: 800 }}>
            ➕ Creează cerere
          </a>
        </div>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14 }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", padding: 14, borderRadius: 14, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.03)" }}>
              Nu am găsit cereri pentru Bucovina (încă). Creează una din homepage.
            </div>
          ) : (
            filtered.map((r, idx) => (
              <div key={idx} style={{ padding: 14, borderRadius: 14, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.03)" }}>
                <div style={{ fontWeight: 900 }}>{r.title}</div>
                <div style={{ marginTop: 8, color: "#a9b7d6", fontSize: 12.5, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <span>📍 {r.location}</span><span>🏠 {r.type}</span><span>👥 {r.people} pers</span>
                  {r.budget ? <span>💰 {r.budget}</span> : null}
                </div>
                <div style={{ marginTop: 8, lineHeight: 1.55 }}>{r.details}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
