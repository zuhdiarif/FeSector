export interface MarketSummary {
  ihsg_index: number | string
  ihsg_change_percent: number | string
  ihsg_change_points?: number | string
  total_foreign_flow?: number
  total_foreign_flow_formatted: string
  top_sector?: string
  sector_leader?: string
  active_sector?: string
  market_status?: string
  market_time?: string
  updated_at?: string
}

export interface StockQuote {
  ticker: string
  name?: string
  price: number
  change: number
  change_percent: number
  volume?: number
  analyst_coverage?: number
  analystCoverage?: number
  high_52w?: number
  low_52w?: number
  market_cap?: number
}
