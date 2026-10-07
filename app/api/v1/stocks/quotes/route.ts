import { NextResponse } from "next/server"

export async function GET() {
  const backendUrl = process.env.BACKEND_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
  try {
    const res = await fetch(`${backendUrl}/api/v1/stocks/quotes`, {
      cache: "no-store",
    })
    if (res.ok) {
      const data = await res.json()
      return NextResponse.json(data)
    }
  } catch {
  }

  const quotes = [
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

  return NextResponse.json(quotes)
}
