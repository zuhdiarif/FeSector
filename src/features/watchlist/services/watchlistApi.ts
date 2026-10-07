import { API_BASE_URL } from "@/src/shared/lib/constants"
import { WatchedStock, SearchStockResult, IngestionWorkerStatus } from "../types/watchlist"

export const MOCK_WATCHED_STOCKS: WatchedStock[] = [
  {
    ticker: "BBCA",
    name: "PT Bank Central Asia Tbk",
    subsector: "Bank KBMI 4",
    category: "KBMI 4",
    addedAt: "14 Jan 2026",
    ingestionStatus: "Lengkap",
    ingestionDetail: "Q2/Fin + 90d",
    fundamentalScore: 84,
    status: "Stabil",
    price: 10250,
    priceChange: 1.23,
  },
  {
    ticker: "BBRI",
    name: "PT Bank Rakyat Indonesia Tbk",
    subsector: "Bank KBMI 4 / Mikro",
    category: "KBMI 4",
    addedAt: "14 Jan 2026",
    ingestionStatus: "Lengkap",
    ingestionDetail: "Anomali 89M Out",
    fundamentalScore: 71,
    status: "Perhatian Khusus",
    price: 4720,
    priceChange: -2.48,
  },
  {
    ticker: "BMRI",
    name: "PT Bank Mandiri (Persero) Tbk",
    subsector: "Bank KBMI 4",
    category: "KBMI 4",
    addedAt: "14 Jan 2026",
    ingestionStatus: "Lengkap",
    ingestionDetail: "Inflow 41M",
    fundamentalScore: 79,
    status: "Stabil",
    price: 6950,
    priceChange: 0.72,
  },
  {
    ticker: "BBNI",
    name: "PT Bank Negara Indonesia Tbk",
    subsector: "Bank KBMI 4",
    category: "KBMI 4",
    addedAt: "14 Jan 2026",
    ingestionStatus: "Lengkap",
    ingestionDetail: "Inflow 18M",
    fundamentalScore: 75,
    status: "Stabil",
    price: 5425,
    priceChange: 0.46,
  },
  {
    ticker: "BRIS",
    name: "PT Bank Syariah Indonesia Tbk",
    subsector: "Bank Syariah KBMI 3",
    category: "KBMI 3",
    addedAt: "20 Jan 2026",
    ingestionStatus: "Lengkap",
    ingestionDetail: "Q2/Fin + 90d",
    fundamentalScore: 68,
    status: "Stabil",
    price: 2740,
    priceChange: -0.72,
  },
  {
    ticker: "BBTN",
    name: "PT Bank Tabungan Negara (Persero) Tbk",
    subsector: "Bank KBMI 3 / KPR",
    category: "KBMI 3",
    addedAt: "22 Jan 2026",
    ingestionStatus: "Lengkap",
    ingestionDetail: "Outflow 24M",
    fundamentalScore: 58,
    status: "Perhatian Khusus",
    price: 1340,
    priceChange: -2.19,
  },
]

export const MOCK_SEARCH_STOCKS: SearchStockResult[] = [
  {
    ticker: "BJBR",
    name: "Bank Pembangunan Daerah Jawa Barat dan Banten Tbk",
    subsector: "Bank KBMI 2",
    category: "KBMI 2",
    price: 1185,
    priceChange: 0.85,
    pbv: 0.82,
    per: 7.2,
    isWatched: false,
  },
  {
    ticker: "BJTM",
    name: "Bank Pembangunan Daerah Jawa Timur Tbk",
    subsector: "Bank KBMI 2",
    category: "KBMI 2",
    price: 640,
    priceChange: -0.78,
    pbv: 0.79,
    per: 6.9,
    isWatched: false,
  },
  {
    ticker: "BDMN",
    name: "PT Bank Danamon Indonesia Tbk",
    subsector: "Bank KBMI 3",
    category: "KBMI 3",
    price: 2920,
    priceChange: 0.34,
    pbv: 0.65,
    per: 8.4,
    isWatched: false,
  },
  {
    ticker: "BNGA",
    name: "PT Bank CIMB Niaga Tbk",
    subsector: "Bank KBMI 3",
    category: "KBMI 3",
    price: 1890,
    priceChange: 1.10,
    pbv: 0.88,
    per: 6.8,
    isWatched: false,
  },
  {
    ticker: "BRIS",
    name: "PT Bank Syariah Indonesia Tbk",
    subsector: "Bank Syariah KBMI 3",
    category: "KBMI 3",
    price: 2740,
    priceChange: -0.72,
    pbv: 2.65,
    per: 18.4,
    isWatched: true,
  },
  {
    ticker: "BBTN",
    name: "PT Bank Tabungan Negara (Persero) Tbk",
    subsector: "Bank KBMI 3 / KPR",
    category: "KBMI 3",
    price: 1340,
    priceChange: -2.19,
    pbv: 0.58,
    per: 6.2,
    isWatched: true,
  },
]

export const MOCK_INGESTION_WORKERS: IngestionWorkerStatus[] = [
  {
    id: "fundamental",
    name: "INGESTION FUNDAMENTAL",
    title: "Ingestion Fundamental",
    status: "connected",
    statusLabel: "Terhubung",
    meta: "Laporan Q2 2026",
    description: "7 rasio agregat (CAR, NPL, NIM, ROE, LDR, BOPO, CASA)",
    footerLeft: "Worker Pool: 4 Goroutines",
    footerRight: "200 OK",
    icon: "dataset",
  },
  {
    id: "sentiment",
    name: "NLP & SENTIMEN BERITA",
    title: "NLP & Sentimen Berita",
    status: "running",
    statusLabel: "Berjalan",
    meta: "30D Rolling",
    description: "Interval cron: tiap 3 jam via Sectors News API",
    footerLeft: "Artikel Tertaut: 842",
    footerRight: "IndoBERT Fin",
    icon: "feed",
  },
  {
    id: "foreign_flow",
    name: "FOREIGN FLOW & ANOMALI",
    title: "Foreign Flow & Anomali",
    status: "connected",
    statusLabel: "Sesi Tutup 17:00",
    meta: "90D Baseline",
    description: "Metode Z-Score rolling harian pada net flow",
    footerLeft: "Data IDX: Terverifikasi",
    footerRight: "Halaman 1/1",
    icon: "swap_horizontal_circle",
  },
  {
    id: "composite",
    name: "COMPOSITE SYNTHESIZER",
    title: "Composite Synthesizer",
    status: "running",
    statusLabel: "Aktif",
    meta: "Eksekusi 17:01",
    description: "Multi-signal aggregation 3 Perubahan/Sesi",
    footerLeft: "Emisi Alert: 3 Realtime",
    footerRight: "Status Selesai",
    icon: "psychology",
  },
]

const BANK_WATCHLIST_META: Record<string, { name: string; subsector: string; category: string; price: number; priceChange: number }> = {
  BBCA: { name: "PT Bank Central Asia Tbk", subsector: "Bank KBMI 4", category: "KBMI 4", price: 10250, priceChange: 1.23 },
  BBRI: { name: "PT Bank Rakyat Indonesia Tbk", subsector: "Bank KBMI 4 / Mikro", category: "KBMI 4", price: 4720, priceChange: -2.48 },
  BMRI: { name: "PT Bank Mandiri (Persero) Tbk", subsector: "Bank KBMI 4", category: "KBMI 4", price: 6950, priceChange: 0.72 },
  BBNI: { name: "PT Bank Negara Indonesia Tbk", subsector: "Bank KBMI 4", category: "KBMI 4", price: 5425, priceChange: 0.46 },
  BRIS: { name: "PT Bank Syariah Indonesia Tbk", subsector: "Bank Syariah KBMI 3", category: "KBMI 3", price: 2740, priceChange: -0.72 },
  BBTN: { name: "PT Bank Tabungan Negara (Persero) Tbk", subsector: "Bank KBMI 3 / KPR", category: "KBMI 3", price: 1340, priceChange: -2.19 },
  BDMN: { name: "PT Bank Danamon Indonesia Tbk", subsector: "Bank KBMI 3", category: "KBMI 3", price: 2920, priceChange: 0.34 },
}

export async function getWatchedStocks(): Promise<WatchedStock[]> {
  const baseUrl = API_BASE_URL || "http://localhost:8080"
  try {
    const res = await fetch(`${baseUrl}/api/v1/fundamental-score`, { cache: "no-store" })
    if (res.ok) {
      const json = await res.json()
      const list = Array.isArray(json) ? json : json.data || []
      if (Array.isArray(list) && list.length > 0) {
        return list.map((item: { ticker: string; skor_akhir?: number; health_status?: string; kuartal?: string }) => {
          const meta = BANK_WATCHLIST_META[item.ticker] || {
            name: `PT Bank ${item.ticker} Tbk`,
            subsector: "Bank KBMI 3",
            category: "KBMI 3",
            price: 2500,
            priceChange: 0.0,
          }
          const score = Math.round(item.skor_akhir ?? 70)
          let status: "Stabil" | "Waspada" | "Perhatian Khusus" = "Stabil"
          if (item.health_status === "Sangat Sehat" || item.health_status === "Sehat" || score >= 75) status = "Stabil"
          else if (item.health_status === "Waspada" || score >= 60) status = "Waspada"
          else status = "Perhatian Khusus"
          return {
            ticker: item.ticker,
            name: meta.name,
            subsector: meta.subsector,
            category: meta.category,
            addedAt: item.kuartal || "Q2 2026",
            ingestionStatus: "Lengkap" as const,
            ingestionDetail: `Skor ${score}/100`,
            fundamentalScore: score,
            status,
            price: meta.price,
            priceChange: meta.priceChange,
          }
        })
      }
    }
  } catch {
  }
  return MOCK_WATCHED_STOCKS
}

export async function searchStocks(query: string): Promise<SearchStockResult[]> {
  if (!API_BASE_URL) {
    if (!query) return MOCK_SEARCH_STOCKS
    const q = query.toLowerCase()
    return MOCK_SEARCH_STOCKS.filter(
      (s) =>
        s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
    )
  }
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/watchlist/search?q=${encodeURIComponent(query)}`)
    if (!res.ok) throw new Error("Pencarian ticker gagal")
    const json = await res.json()
    return json.data || json
  } catch {
    return MOCK_SEARCH_STOCKS
  }
}

export async function addStockToWatchlist(ticker: string): Promise<boolean> {
  if (!API_BASE_URL) return true
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/watchlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticker }),
    })
    return res.ok
  } catch {
    return false
  }
}

export async function removeStockFromWatchlist(ticker: string): Promise<boolean> {
  if (!API_BASE_URL) return true
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/watchlist/${ticker}`, {
      method: "DELETE",
    })
    return res.ok
  } catch {
    return false
  }
}
