import { API_BASE_URL } from "@/src/shared/lib/constants"
import { MarketSummary, StockQuote } from "../types/market"

export const DEFAULT_MARKET_SUMMARY: MarketSummary = {
  ihsg_index: 7321.98,
  ihsg_change_percent: 0.42,
  ihsg_change_points: 30.75,
  total_foreign_flow: 210000000000,
  total_foreign_flow_formatted: "+Rp 210M",
  top_sector: "Perbankan Big 4",
  sector_leader: "Perbankan Big 4",
  active_sector: "Perbankan Big 4",
  market_status: "Pasar Tutup",
  market_time: "17:00:00 WIB",
}

export const DEFAULT_STOCK_QUOTES: StockQuote[] = [
  {
    ticker: "BBCA",
    name: "PT Bank Central Asia Tbk",
    price: 10250,
    change: 125,
    change_percent: 1.23,
    analyst_coverage: 32,
    analystCoverage: 32,
    volume: 84200000,
    market_cap: 1263000000000000,
  },
  {
    ticker: "BBRI",
    name: "PT Bank Rakyat Indonesia Tbk",
    price: 4720,
    change: -120,
    change_percent: -2.48,
    analyst_coverage: 35,
    analystCoverage: 35,
    volume: 124500000,
    market_cap: 715000000000000,
  },
  {
    ticker: "BMRI",
    name: "PT Bank Mandiri (Persero) Tbk",
    price: 6950,
    change: 50,
    change_percent: 0.72,
    analyst_coverage: 30,
    analystCoverage: 30,
    volume: 68100000,
    market_cap: 648000000000000,
  },
  {
    ticker: "BBNI",
    name: "PT Bank Negara Indonesia Tbk",
    price: 5425,
    change: 25,
    change_percent: 0.46,
    analyst_coverage: 26,
    analystCoverage: 26,
    volume: 35600000,
    market_cap: 202000000000000,
  },
  {
    ticker: "BRIS",
    name: "PT Bank Syariah Indonesia Tbk",
    price: 2740,
    change: -20,
    change_percent: -0.72,
    analyst_coverage: 18,
    analystCoverage: 18,
    volume: 28400000,
    market_cap: 126000000000000,
  },
  {
    ticker: "BBTN",
    name: "PT Bank Tabungan Negara (Persero) Tbk",
    price: 1340,
    change: -30,
    change_percent: -2.19,
    analyst_coverage: 16,
    analystCoverage: 16,
    volume: 19200000,
    market_cap: 18900000000000,
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
        return {
          ihsg_index: data.ihsg_index ?? DEFAULT_MARKET_SUMMARY.ihsg_index,
          ihsg_change_percent: data.ihsg_change_percent ?? DEFAULT_MARKET_SUMMARY.ihsg_change_percent,
          ihsg_change_points: data.ihsg_change_points ?? DEFAULT_MARKET_SUMMARY.ihsg_change_points,
          total_foreign_flow: data.total_foreign_flow ?? DEFAULT_MARKET_SUMMARY.total_foreign_flow,
          total_foreign_flow_formatted: data.total_foreign_flow_formatted || DEFAULT_MARKET_SUMMARY.total_foreign_flow_formatted,
          top_sector: data.top_sector || data.sector_leader || data.active_sector || DEFAULT_MARKET_SUMMARY.top_sector,
          sector_leader: data.sector_leader || DEFAULT_MARKET_SUMMARY.sector_leader,
          active_sector: data.active_sector || DEFAULT_MARKET_SUMMARY.active_sector,
          market_status: data.market_status || DEFAULT_MARKET_SUMMARY.market_status,
          market_time: data.market_time || DEFAULT_MARKET_SUMMARY.market_time,
          updated_at: data.updated_at,
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

  return DEFAULT_MARKET_SUMMARY
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
        return list.map((item: StockQuote & Record<string, unknown>): StockQuote => ({
          ticker: String(item.ticker || ""),
          name: item.name ? String(item.name) : undefined,
          price: Number(item.price ?? item.close ?? 0),
          change: Number(item.change ?? 0),
          change_percent: Number(item.change_percent ?? item.changePercent ?? 0),
          volume: item.volume !== undefined ? Number(item.volume) : undefined,
          analyst_coverage: Number(item.analyst_coverage ?? item.analystCoverage ?? 24),
          analystCoverage: Number(item.analystCoverage ?? item.analyst_coverage ?? 24),
          high_52w: item.high_52w !== undefined ? Number(item.high_52w) : undefined,
          low_52w: item.low_52w !== undefined ? Number(item.low_52w) : undefined,
          market_cap: item.market_cap !== undefined ? Number(item.market_cap) : undefined,
        }))
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
