import { API_BASE_URL } from "@/src/shared/lib/constants"
import { DEFAULT_STOCK_QUOTES } from "@/src/features/market"
import { WatchedStock, SearchStockResult, IngestionWorkerStatus } from "../types/watchlist"

export interface BackendFundamentalScore {
  id: number
  ticker: string
  kuartal: string
  nim_score: number
  ldr_score: number
  loan_growth_score: number
  deposit_growth_score: number
  roe_score: number
  konsistensi_score: number
  dividend_score: number
  skor_akhir: number
  health_status: string
  created_at: string
}

export interface BackendAnomalyBrokerDetail {
  id: number
  anomaly_id: number
  kode_broker: string
  nama_broker: string
  kategori: string
  net_value: number
  created_at: string
}

export interface BackendForeignFlowAnomaly {
  id: number
  ticker: string
  tanggal: string
  net_foreign_inflow: number
  z_score: number
  status_anomali: string
  broker_details?: BackendAnomalyBrokerDetail[]
  created_at: string
}

export const MOCK_WATCHED_STOCKS: WatchedStock[] = [
  {
    ticker: "BBCA",
    name: "PT Bank Central Asia Tbk",
    subsector: "Bank KBMI 4",
    category: "KBMI 4",
    addedAt: "14 Jan 2026",
    ingestionStatus: "Lengkap",
    ingestionDetail: "Q2/Fin + 90d",
    fundamentalScore: 89,
    nimScore: 89,
    status: "Stabil",
    price: 10250,
    priceChange: 1.23,
    analystCoverage: 28,
  },
  {
    ticker: "BBRI",
    name: "PT Bank Rakyat Indonesia Tbk",
    subsector: "Bank KBMI 4 / Mikro",
    category: "KBMI 4",
    addedAt: "14 Jan 2026",
    ingestionStatus: "Lengkap",
    ingestionDetail: "Anomali 89M Out",
    fundamentalScore: 87,
    nimScore: 92,
    status: "Perhatian Khusus",
    price: 4720,
    priceChange: -2.48,
    analystCoverage: 28,
  },
  {
    ticker: "BMRI",
    name: "PT Bank Mandiri (Persero) Tbk",
    subsector: "Bank KBMI 4",
    category: "KBMI 4",
    addedAt: "14 Jan 2026",
    ingestionStatus: "Lengkap",
    ingestionDetail: "Inflow 41M",
    fundamentalScore: 85,
    nimScore: 85,
    status: "Stabil",
    price: 6950,
    priceChange: 0.72,
    analystCoverage: 28,
  },
  {
    ticker: "BBNI",
    name: "PT Bank Negara Indonesia Tbk",
    subsector: "Bank KBMI 4",
    category: "KBMI 4",
    addedAt: "14 Jan 2026",
    ingestionStatus: "Lengkap",
    ingestionDetail: "Inflow 18M",
    fundamentalScore: 80,
    nimScore: 76,
    status: "Stabil",
    price: 5425,
    priceChange: 0.46,
    analystCoverage: 28,
  },
  {
    ticker: "BRIS",
    name: "PT Bank Syariah Indonesia Tbk",
    subsector: "Bank Syariah KBMI 3",
    category: "KBMI 3",
    addedAt: "20 Jan 2026",
    ingestionStatus: "Lengkap",
    ingestionDetail: "Q2/Fin + 90d",
    fundamentalScore: 75,
    nimScore: 50,
    status: "Stabil",
    price: 2740,
    priceChange: -0.72,
    analystCoverage: 18,
  },
  {
    ticker: "BNGA",
    name: "PT Bank CIMB Niaga Tbk",
    subsector: "Bank KBMI 3",
    category: "KBMI 3",
    addedAt: "24 Jan 2026",
    ingestionStatus: "Lengkap",
    ingestionDetail: "Q2/Fin + 90d",
    fundamentalScore: 75,
    nimScore: 74,
    status: "Stabil",
    price: 1890,
    priceChange: 1.10,
    analystCoverage: 12,
  },
  {
    ticker: "BDMN",
    name: "PT Bank Danamon Indonesia Tbk",
    subsector: "Bank KBMI 3",
    category: "KBMI 3",
    addedAt: "24 Jan 2026",
    ingestionStatus: "Lengkap",
    ingestionDetail: "Q2/Fin + 90d",
    fundamentalScore: 70,
    nimScore: 70,
    status: "Stabil",
    price: 2920,
    priceChange: 0.34,
    analystCoverage: 14,
  },
  {
    ticker: "BBTN",
    name: "PT Bank Tabungan Negara (Persero) Tbk",
    subsector: "Bank KBMI 3 / KPR",
    category: "KBMI 3",
    addedAt: "22 Jan 2026",
    ingestionStatus: "Lengkap",
    ingestionDetail: "Outflow 24M",
    fundamentalScore: 57,
    nimScore: 52,
    status: "Perhatian Khusus",
    price: 1340,
    priceChange: -2.19,
    analystCoverage: 16,
  },
  {
    ticker: "BJBR",
    name: "Bank Pembangunan Daerah Jawa Barat dan Banten Tbk",
    subsector: "Bank KBMI 2",
    category: "KBMI 2",
    addedAt: "25 Jan 2026",
    ingestionStatus: "Lengkap",
    ingestionDetail: "Q2/Fin + 90d",
    fundamentalScore: 75,
    nimScore: 72,
    status: "Stabil",
    price: 1185,
    priceChange: 0.85,
    analystCoverage: 10,
  },
  {
    ticker: "BJTM",
    name: "Bank Pembangunan Daerah Jawa Timur Tbk",
    subsector: "Bank KBMI 2",
    category: "KBMI 2",
    addedAt: "25 Jan 2026",
    ingestionStatus: "Lengkap",
    ingestionDetail: "Q2/Fin + 90d",
    fundamentalScore: 75,
    nimScore: 71,
    status: "Stabil",
    price: 640,
    priceChange: -0.78,
    analystCoverage: 8,
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

export async function getIngestionWorkers(): Promise<IngestionWorkerStatus[]> {
  const baseUrl = API_BASE_URL || "http://localhost:8080"
  try {
    const res = await fetch(`${baseUrl}/health`, { cache: "no-store" })
    if (res.ok) {
      return MOCK_INGESTION_WORKERS
    }
  } catch {
  }
  return MOCK_INGESTION_WORKERS
}

export const BANK_WATCHLIST_META: Record<
  string,
  { name: string; subsector: string; category: string; price: number; priceChange: number }
> = {
  BBCA: { name: "PT Bank Central Asia Tbk", subsector: "Bank KBMI 4", category: "KBMI 4", price: 10250, priceChange: 1.23 },
  BBRI: { name: "PT Bank Rakyat Indonesia Tbk", subsector: "Bank KBMI 4 / Mikro", category: "KBMI 4", price: 4720, priceChange: -2.48 },
  BMRI: { name: "PT Bank Mandiri (Persero) Tbk", subsector: "Bank KBMI 4", category: "KBMI 4", price: 6950, priceChange: 0.72 },
  BBNI: { name: "PT Bank Negara Indonesia Tbk", subsector: "Bank KBMI 4", category: "KBMI 4", price: 5425, priceChange: 0.46 },
  BRIS: { name: "PT Bank Syariah Indonesia Tbk", subsector: "Bank Syariah KBMI 3", category: "KBMI 3", price: 2740, priceChange: -0.72 },
  BBTN: { name: "PT Bank Tabungan Negara (Persero) Tbk", subsector: "Bank KBMI 3 / KPR", category: "KBMI 3", price: 1340, priceChange: -2.19 },
  BDMN: { name: "PT Bank Danamon Indonesia Tbk", subsector: "Bank KBMI 3", category: "KBMI 3", price: 2920, priceChange: 0.34 },
  BJBR: { name: "Bank Pembangunan Daerah Jawa Barat dan Banten Tbk", subsector: "Bank KBMI 2", category: "KBMI 2", price: 1185, priceChange: 0.85 },
  BJTM: { name: "Bank Pembangunan Daerah Jawa Timur Tbk", subsector: "Bank KBMI 2", category: "KBMI 2", price: 640, priceChange: -0.78 },
  BNGA: { name: "PT Bank CIMB Niaga Tbk", subsector: "Bank KBMI 3", category: "KBMI 3", price: 1890, priceChange: 1.10 },
}

export interface BackendStockQuote {
  ticker?: string
  name?: string
  price?: number
  close?: number
  change?: number
  change_percent?: number
  changePercent?: number
  coverage?: number
  analyst_coverage?: number
  analystCoverage?: number
}

export async function getWatchedStocks(): Promise<WatchedStock[]> {
  const baseUrl = process.env.BACKEND_INTERNAL_URL || API_BASE_URL || "http://localhost:8080"
  try {
    const [fundRes, flowRes, quoteRes] = await Promise.all([
      fetch(`${baseUrl}/api/v1/fundamental-score`, { cache: "no-store" }).catch(() => null),
      fetch(`${baseUrl}/api/v1/foreign-flow/summary`, { cache: "no-store" }).catch(() => null),
      fetch(`${baseUrl}/api/v1/stocks/quotes`, { cache: "no-store" }).catch(() => null),
    ])

    let quotesList: BackendStockQuote[] = []
    if (quoteRes && quoteRes.ok) {
      try {
        const quoteJson = await quoteRes.json()
        quotesList = Array.isArray(quoteJson) ? quoteJson : quoteJson.data || []
      } catch {
      }
    }

    if (quotesList.length === 0 && typeof window !== "undefined") {
      try {
        const localRes = await fetch("/api/v1/stocks/quotes", { cache: "no-store" })
        if (localRes.ok) {
          const localJson = await localRes.json()
          quotesList = Array.isArray(localJson) ? localJson : localJson.data || []
        }
      } catch {
      }
    }

    if (quotesList.length === 0) {
      quotesList = DEFAULT_STOCK_QUOTES
    }

    const ALL_10_TICKERS = ["BBCA", "BBRI", "BMRI", "BBNI", "BRIS", "BNGA", "BDMN", "BBTN", "BJBR", "BJTM"]
    const quoteMap = new Map<string, BackendStockQuote>()
    for (const q of quotesList) {
      if (q && q.ticker) {
        quoteMap.set(q.ticker.toUpperCase(), q)
      }
    }

    let fundList: BackendFundamentalScore[] = []
    if (fundRes && fundRes.ok) {
      try {
        const fundJson = await fundRes.json()
        fundList = Array.isArray(fundJson) ? fundJson : fundJson.data || []
      } catch {
      }
    }

    const latestFundMap = new Map<string, BackendFundamentalScore>()
    for (const item of fundList) {
      if (item && item.ticker) {
        const t = item.ticker.toUpperCase()
        if (!latestFundMap.has(t)) {
          latestFundMap.set(t, item)
        } else {
          const existing = latestFundMap.get(t)!
          if ((item.kuartal || "") > (existing.kuartal || "")) {
            latestFundMap.set(t, item)
          }
        }
      }
    }

    let flowAnomalies: BackendForeignFlowAnomaly[] = []
    if (flowRes && flowRes.ok) {
      try {
        const flowJson = await flowRes.json()
        flowAnomalies = Array.isArray(flowJson) ? flowJson : flowJson.data || []
      } catch {
      }
    }

    const anomalyMap = new Map<string, BackendForeignFlowAnomaly>()
    for (const item of flowAnomalies) {
      if (item && item.ticker && !anomalyMap.has(item.ticker.toUpperCase())) {
        anomalyMap.set(item.ticker.toUpperCase(), item)
      }
    }

    const targetTickers = Array.from(
      new Set([
        ...quotesList.map((q) => (q.ticker || "").toUpperCase()).filter(Boolean),
        ...ALL_10_TICKERS,
      ])
    )

    return targetTickers.map((ticker) => {
      const quote = quoteMap.get(ticker) || { ticker }
      const meta = BANK_WATCHLIST_META[ticker] || {
        name: quote.name || `PT Bank ${ticker} Tbk`,
        subsector: "Perbankan Nasional",
        category: "KBMI 3",
        price: 2500,
        priceChange: 0.0,
      }

      const fundItem = latestFundMap.get(ticker)
      const anomaly = anomalyMap.get(ticker)

      const price = quote.price ?? quote.close ?? meta.price
      const priceChange = quote.change_percent ?? quote.changePercent ?? quote.change ?? meta.priceChange
      const fundamentalScore = fundItem ? Math.round(fundItem.skor_akhir) : 75
      const nimScore = fundItem ? Math.round(fundItem.nim_score) : 75

      const rawStatus = fundItem ? fundItem.health_status || "Stabil" : "Stabil"
      const status: "Stabil" | "Waspada" | "Perhatian Khusus" = anomaly?.status_anomali === "ANOMALI_OUTFLOW"
        ? "Perhatian Khusus"
        : rawStatus === "Sangat Sehat" || rawStatus === "Sehat"
        ? "Stabil"
        : rawStatus === "Cukup"
        ? "Waspada"
        : "Stabil"

      const category = ["BBCA", "BBRI", "BMRI", "BBNI"].includes(ticker)
        ? "KBMI 4"
        : ["BRIS", "BNGA", "BDMN", "BBTN"].includes(ticker)
        ? "KBMI 3"
        : "KBMI 2"

      const subsector = meta.subsector || "Perbankan Nasional"
      const analystCoverage = quote.coverage || quote.analyst_coverage || quote.analystCoverage || 28

      let quarter = "Q2"
      let addedAt = fundItem?.kuartal || "Q2 2026"
      if (fundItem?.kuartal) {
        if (fundItem.kuartal.includes("-")) {
          const parts = fundItem.kuartal.split("-")
          quarter = parts[1] || "Q2"
          addedAt = `${parts[1]} ${parts[0]}`
        } else {
          quarter = fundItem.kuartal
        }
      }

      let ingestionDetail = `${quarter}/Fin + 90d`
      if (anomaly) {
        const topBroker =
          Array.isArray(anomaly.broker_details) && anomaly.broker_details.length > 0
            ? anomaly.broker_details[0]
            : undefined
        const targetVal =
          topBroker?.net_value !== undefined ? topBroker.net_value : anomaly.net_foreign_inflow
        const amountM = Math.abs(Math.round(targetVal / 1000000000))

        if (anomaly.status_anomali === "ANOMALI_OUTFLOW") {
          ingestionDetail = `Anomali ${amountM}M Out`
        } else if (anomaly.status_anomali === "ANOMALI_INFLOW") {
          ingestionDetail = `Inflow ${amountM}M`
        }
      }

      return {
        ticker,
        name: quote.name || meta.name,
        price,
        priceChange,
        fundamentalScore,
        nimScore,
        status,
        category,
        subsector,
        analystCoverage,
        addedAt,
        ingestionStatus: "Lengkap" as const,
        ingestionDetail,
      }
    })
  } catch {
  }
  return MOCK_WATCHED_STOCKS.map((stock) => ({
    ...stock,
    analystCoverage: stock.analystCoverage ?? 24,
  }))
}

export async function searchStocks(query: string): Promise<SearchStockResult[]> {
  const baseUrl = API_BASE_URL || "http://localhost:8080"
  try {
    const res = await fetch(`${baseUrl}/api/v1/watchlist/search?q=${encodeURIComponent(query)}`, {
      cache: "no-store",
    })
    if (res.ok) {
      const json = await res.json()
      const list = Array.isArray(json) ? json : json.data
      if (Array.isArray(list)) return list
    }
  } catch {
  }

  if (!query) return MOCK_SEARCH_STOCKS
  const q = query.toLowerCase()
  return MOCK_SEARCH_STOCKS.filter(
    (s) =>
      s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
  )
}

export async function addStockToWatchlist(ticker: string): Promise<boolean> {
  const baseUrl = API_BASE_URL || "http://localhost:8080"
  try {
    const res = await fetch(`${baseUrl}/api/v1/watchlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticker }),
    })
    if (res.ok) return true
  } catch {
  }
  return true
}

export async function removeStockFromWatchlist(ticker: string): Promise<boolean> {
  const baseUrl = API_BASE_URL || "http://localhost:8080"
  try {
    const res = await fetch(`${baseUrl}/api/v1/watchlist/${ticker}`, {
      method: "DELETE",
    })
    if (res.ok) return true
  } catch {
  }
  return true
}
