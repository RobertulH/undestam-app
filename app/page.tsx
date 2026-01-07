"use client";

import { useMemo, useState } from "react";

type StatusKey = "new" | "talking" | "booked";
type FilterKey = "all" | StatusKey;

type SeedItem = {
  title: string;
  location: string;
  type: string;
  people: number;
  budget: string;
  fac: string[];
  details: string;
  status: StatusKey;
};

const seed: SeedItem[] = [
  {
    title: "Caut pensiune cu ciubăr în Marginimea Sibiului",
    location: "Sibiu / Marginimea Sibiului",
    type: "Pensiune",
    people: 4,
    budget: "350–550 lei/noapte",
    fac: ["ciubăr", "liniște"],
    details: "Vrem curte și liniște, ideal aproape de trasee, 2 nopți.",
    status: "new",
  },
  {
    title: "Caut cabană pentru 6 persoane (liniște)",
    location: "Sibiu",
    type: "Cabană",
    people: 6,
    budget: "",
    fac: ["liniște", "parcare"],
    details: "Fără vecini apropiați, ideal cu grătar/foișor.",
    status: "talking",
  },
  {
    title: "Weekend în Sibiu — pet-friendly",
    location: "Sibiu",
    type: "Vilă",
    people: 3,
    budget: "",
    fac: ["pet-friendly"],
    details: "Venim cu un câine mic. Preferăm cazare cu curte.",
    status: "booked",
  },
];

export default function ZonaSibiu() {
  const [q, setQ] = useState<string>("");
  const [sf, setSf] = useState<FilterKey>("all");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return seed
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
      .filter((r) => (sf === "all" ? true : r.status === sf));
  }, [q, sf]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 18,
        background: "#0b1220",
        color: "#e8eefc",
        fontFamily: "system-ui",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <a href="/" style={{ color: "#a9b7d6", textDecoration: "none" }}>
          ← Înapoi la homepage
        </a>

        <h1 style={{ marginTop: 10, marginBottom: 8 }}>Caut cazare în Sibiu</h1>
        <p style={{ color: "#a9b7d6", lineHeight: 1.7 }}>
          Cereri active pentru Sibiu și împrejurimi (inclusiv Marginimea
          Sibiului). Creează o cerere și primești recomandări reale.
        </p>

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="caută: ciubăr, cabană..."
            style={{
              borderRadius: 12,
              padding: 10,
              border: "1px solid rgba(255,255,255,.1)",
              background: "rgba(255,255,255,.04)",
              color: "#e8eefc",
              minWidth: 240,
            }}
          />

          <select
            value={sf}
            onChange={(e) => setSf(e.target.value as FilterKey)}
            style={{
              borderRadius: 12,
              padding: 10,
              border: "1px solid rgba(255,255,255,.1)",
              background: "rgba(255,255,255,.04)",
              color: "#e8eefc",
            }}
          >
            <option value="all">toate</option>
            <option value="new">noi</option>
            <option value="talking">în discuții</option>
            <option value="booked">rezervat</option>
          </select>

          <a
            href="/#feed"
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(61,220,151,.35)",
              background: "rgba(61,220,151,.12)",
              color: "#e8eefc",
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            ➕ Creează cerere
          </a>
        </div>

        <div
          style={{
            marginTop: 14,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
        >
          {filtered.length === 0 ? (
            <div
              style={{
                gridColumn: "1 / -1",
                padding: 14,
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,.1)",
                background: "rgba(255,255,255,.03)",
              }}
            >
              Nu am găsit cereri.
            </div>
          ) : (
            filtered.map((r, idx) => (
              <div
                key={`${r.title}-${idx}`}
                style={{
                  padding: 14,
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,.1)",
                  background: "rgba(255,255,255,.03)",
                }}
              >
                <div style={{ fontWeight: 900 }}>{r.title}</div>

                <div
                  style={{
                    marginTop: 8,
                    color: "#a9b7d6",
                    fontSize: 12.5,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <span>📍 {r.location}</span>
                  <span>🏠 {r.type}</span>
                  <span>👥 {r.people} pers</span>
                  {r.budget ? <span>💰 {r.budget}</span> : null}
                </div>

                <div style={{ marginTop: 8, color: "#e8eefc", lineHeight: 1.55 }}>
                  {r.details}
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ marginTop: 12, color: "#a9b7d6", fontSize: 12.5, lineHeight: 1.6 }}>
          <strong>SEO tip:</strong> creezi pagini similare pe zone (Brașov,
          Maramureș, Bucovina etc.) cu text util + cereri.
        </div>
      </div>
    </div>
  );
}
