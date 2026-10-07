import { API_BASE_URL } from "@/src/shared/lib/constants"
import { MarketSummary, StockQuote } from "../types/market"

export function getWibTimeAndStatus(date: Date = new Date()) {
  const timeFormatter = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
  const formattedTime = timeFormatter.format(date).replace(/\./g, ":") + " WIB"

  const partsFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  })
  const parts = partsFormatter.formatToParts(date)
  let hour = 0
  let minute = 0
  for (const p of parts) {
    if (p.type === "hour") {
      hour = parseInt(p.value, 10)
      if (hour === 24) hour = 0
    }
    if (p.type === "minute") {
      minute = parseInt(p.value, 10)
    }
  }

  const day = date.getDay()
  const totalMinutes = hour * 60 + minute

  let status = "Pasar Tutup"
  if (day >= 1 && day <= 4) {
    if (totalMinutes >= 540 && totalMinutes < 720) {
      status = "Sesi I Buka"
    } else if (totalMinutes >= 720 && totalMinutes < 810) {
      status = "Istirahat Pasar"
    } else if (totalMinutes >= 810 && totalMinutes < 950) {
      status = "Sesi II Buka"
    } else if (totalMinutes >= 950 && totalMinutes <= 975) {
      status = "Pra-Penutupan"
    } else {
      status = "Pasar Tutup"
    }
  } else if (day === 5) {
    if (totalMinutes >= 540 && totalMinutes < 690) {
      status = "Sesi I Buka"
    } else if (totalMinutes >= 690 && totalMinutes < 840) {
      status = "Istirahat Pasar"
    } else if (totalMinutes >= 840 && totalMinutes < 950) {
      status = "Sesi II Buka"
    } else if (totalMinutes >= 950 && totalMinutes <= 975) {
      status = "Pra-Penutupan"
    } else {
      status = "Pasar Tutup"
    }
  } else {
    status = "Pasar Tutup"
  }

  return {
    formattedTime,
    status,
    isOpen: status.includes("Buka"),
  }
}

export function computeLiveMarketSummary(base?: Partial<MarketSummary>): MarketSummary {
  const { formattedTime, status } = getWibTimeAndStatus()
  return {
    ihsg_index: base?.ihsg_index ?? 7287.69,
    ihsg_change: base?.ihsg_change ?? 0.03,
    ihsg_change_percent: base?.ihsg_change_percent ?? 0.03,
    ihsg_change_points: base?.ihsg_change_points ?? 0.03,
    ihsg_status: base?.ihsg_status ?? "BULLISH",
    total_foreign_flow: base?.total_foreign_flow ?? 31353332109,
    total_foreign_flow_idr: base?.total_foreign_flow_idr ?? 31353332109,
    total_foreign_flow_formatted: base?.total_foreign_flow_formatted || "+Rp 31 M",
    top_sector: base?.top_sector || base?.leading_sector || base?.sector_leader || "Energi (+12.4%)",
    sector_leader: base?.sector_leader || base?.leading_sector || "Energi (+12.4%)",
    leading_sector: base?.leading_sector || base?.top_sector || "Energi (+12.4%)",
    active_sector: base?.active_sector || "Perbankan Big 4",
    market_status: base?.market_status || status,
    market_status_text: base?.market_status_text || base?.market_status || status,
    market_session: base?.market_session || (status.includes("Buka") ? "Aktif" : "Nonaktif"),
    market_time: base?.market_time || formattedTime,
    wib_time: base?.wib_time || formattedTime,
    updated_at: base?.updated_at || new Date().toISOString(),
  }
}

export const DEFAULT_MARKET_SUMMARY: MarketSummary = {
  ihsg_index: 7287.69,
  ihsg_change_percent: 0.03,
  ihsg_change_points: 0.03,
  total_foreign_flow: 31353332109,
  total_foreign_flow_idr: 31353332109,
  total_foreign_flow_formatted: "+Rp 31 M",
  top_sector: "Energi (+12.4%)",
  sector_leader: "Energi (+12.4%)",
  leading_sector: "Energi (+12.4%)",
  active_sector: "Perbankan Big 4",
  market_status: "Sesi Berjalan",
  market_time: "15:03:00 WIB",
}

export const DEFAULT_STOCK_QUOTES: StockQuote[] = [
  {
    ticker: "BBCA",
    name: "PT Bank Central Asia Tbk",
    price: 10250,
    change: 125,
    change_percent: 1.23,
    coverage: 28,
    analyst_coverage: 28,
    analystCoverage: 28,
    volume: 84200000,
    market_cap: 1263000000000000,
    pbv: 3.10,
    pe: 22.8,
  },
  {
    ticker: "BBRI",
    name: "PT Bank Rakyat Indonesia Tbk",
    price: 4720,
    change: -120,
    change_percent: -2.48,
    coverage: 28,
    analyst_coverage: 28,
    analystCoverage: 28,
    volume: 124500000,
    market_cap: 715000000000000,
    pbv: 2.38,
    pe: 11.42,
  },
  {
    ticker: "BMRI",
    name: "PT Bank Mandiri (Persero) Tbk",
    price: 6950,
    change: 50,
    change_percent: 0.72,
    coverage: 28,
    analyst_coverage: 28,
    analystCoverage: 28,
    volume: 68100000,
    market_cap: 648000000000000,
    pbv: 1.80,
    pe: 11.85,
  },
  {
    ticker: "BBNI",
    name: "PT Bank Negara Indonesia Tbk",
    price: 5425,
    change: 25,
    change_percent: 0.46,
    coverage: 28,
    analyst_coverage: 28,
    analystCoverage: 28,
    volume: 35600000,
    market_cap: 202000000000000,
    pbv: 1.18,
    pe: 9.60,
  },
  {
    ticker: "BRIS",
    name: "PT Bank Syariah Indonesia Tbk",
    price: 2740,
    change: -20,
    change_percent: -0.72,
    coverage: 18,
    analyst_coverage: 18,
    analystCoverage: 18,
    volume: 28400000,
    market_cap: 126000000000000,
    pbv: 2.65,
    pe: 17.5,
  },
  {
    ticker: "BBTN",
    name: "PT Bank Tabungan Negara (Persero) Tbk",
    price: 1340,
    change: -30,
    change_percent: -2.19,
    coverage: 16,
    analyst_coverage: 16,
    analystCoverage: 16,
    volume: 19200000,
    market_cap: 18900000000000,
    pbv: 0.58,
    pe: 5.8,
  },
]

export async function getMarketSummary(): Promise<MarketSummary> {
  const baseUrl = process.env.BACKEND_INTERNAL_URL || API_BASE_URL || "http://localhost:8080"
  try {
    const res = await fetch(`${baseUrl}/api/v1/market/summary`, {
      cache: "no-store",
    })
    if (res.ok) {
      const json = await res.json()
      const data = json.data || json
      if (data && (data.ihsg_index !== undefined || data.total_foreign_flow_formatted !== undefined)) {
        const liveInfo = getWibTimeAndStatus()
        return {
          ihsg_index: data.ihsg_index ?? 7321.98,
          ihsg_change: data.ihsg_change ?? 30.75,
          ihsg_change_percent: data.ihsg_change_percent ?? 0.42,
          ihsg_change_points: data.ihsg_change_points ?? 30.75,
          ihsg_status: data.ihsg_status ?? "BULLISH",
          total_foreign_flow: data.total_foreign_flow ?? data.total_foreign_flow_idr ?? 210000000000,
          total_foreign_flow_idr: data.total_foreign_flow_idr ?? data.total_foreign_flow ?? 210000000000,
          total_foreign_flow_formatted:
            data.total_foreign_flow_formatted ||
            (typeof data.total_foreign_flow === "number"
              ? `${data.total_foreign_flow >= 0 ? "+" : "-"}Rp ${(Math.abs(data.total_foreign_flow) / 1e9).toFixed(0)}M`
              : "+Rp 210M"),
          top_sector: data.top_sector || data.leading_sector || data.sector_leader || "Perbankan Big 4",
          sector_leader: data.sector_leader || data.leading_sector || "Perbankan Big 4",
          leading_sector: data.leading_sector || data.top_sector || "Perbankan Big 4",
          active_sector: data.active_sector || "Perbankan Big 4",
          market_status: data.market_status_text || data.market_status || liveInfo.status,
          market_status_text: data.market_status_text || data.market_status || liveInfo.status,
          market_session: data.market_session,
          market_time: data.wib_time || data.market_time || liveInfo.formattedTime,
          wib_time: data.wib_time || data.market_time || liveInfo.formattedTime,
          updated_at: data.updated_at || new Date().toISOString(),
        }
      }
    }
  } catch {
  }

  if (typeof window !== "undefined") {
    try {
      const localRes = await fetch("/api/v1/market/summary", { cache: "no-store" })
      if (localRes.ok) {
        const localJson = await localRes.json()
        const localData = localJson.data || localJson
        if (localData) return localData
      }
    } catch {
    }
  }

  return computeLiveMarketSummary()
}

export async function getStockQuotes(): Promise<StockQuote[]> {
  const baseUrl = process.env.BACKEND_INTERNAL_URL || API_BASE_URL || "http://localhost:8080"
  try {
    const res = await fetch(`${baseUrl}/api/v1/stocks/quotes`, {
      cache: "no-store",
    })
    if (res.ok) {
      const json = await res.json()
      const list = Array.isArray(json) ? json : json.data
      if (Array.isArray(list) && list.length > 0) {
        return list.map((item: StockQuote & Record<string, unknown>): StockQuote => {
          const cov = Number(item.coverage ?? item.analyst_coverage ?? item.analystCoverage ?? 28)
          return {
            id: item.id,
            ticker: String(item.ticker || ""),
            name: item.name ? String(item.name) : undefined,
            price: Number(item.price ?? item.close ?? 0),
            change: Number(item.change ?? 0),
            change_percent: Number(item.change_percent ?? item.changePercent ?? 0),
            coverage: cov,
            analyst_coverage: cov,
            analystCoverage: cov,
            volume: item.volume !== undefined ? Number(item.volume) : undefined,
            high_52w: item.high_52w !== undefined ? Number(item.high_52w) : undefined,
            low_52w: item.low_52w !== undefined ? Number(item.low_52w) : undefined,
            market_cap: item.market_cap !== undefined ? Number(item.market_cap) : undefined,
            pe: item.pe !== undefined ? Number(item.pe) : undefined,
            pbv: item.pbv !== undefined ? Number(item.pbv) : undefined,
          }
        })
      }
    }
  } catch {
  }

  if (typeof window !== "undefined") {
    try {
      const localRes = await fetch("/api/v1/stocks/quotes", { cache: "no-store" })
      if (localRes.ok) {
        const localJson = await localRes.json()
        const localList = Array.isArray(localJson) ? localJson : localJson.data
        if (Array.isArray(localList) && localList.length > 0) return localList
      }
    } catch {
    }
  }

  return DEFAULT_STOCK_QUOTES
}
