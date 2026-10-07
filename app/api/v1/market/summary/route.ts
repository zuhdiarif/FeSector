import { NextResponse } from "next/server"

export async function GET() {
  const backendUrl = process.env.BACKEND_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
  try {
    const res = await fetch(`${backendUrl}/api/v1/market/summary`, {
      cache: "no-store",
    })
    if (res.ok) {
      const data = await res.json()
      return NextResponse.json(data)
    }
  } catch {
  }

  const now = new Date()
  const wibTime = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now).replace(/\./g, ":") + " WIB"

  const wibHour = parseInt(
    new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Jakarta", hour: "numeric", hour12: false }).format(now),
    10
  )
  const day = now.getDay()

  let marketStatus = "Pasar Tutup"
  if (day !== 0 && day !== 6) {
    if (wibHour >= 9 && wibHour < 12) {
      marketStatus = "Sesi I Buka"
    } else if (wibHour >= 12 && wibHour < 13.5) {
      marketStatus = "Istirahat Pasar"
    } else if (wibHour >= 13.5 && wibHour < 16) {
      marketStatus = "Sesi II Buka"
    }
  }

  return NextResponse.json({
    ihsg_index: 7321.98,
    ihsg_change_percent: 0.42,
    ihsg_change_points: 30.75,
    total_foreign_flow: 210000000000,
    total_foreign_flow_formatted: "+Rp 210M",
    top_sector: "Perbankan Big 4",
    sector_leader: "Perbankan Big 4",
    active_sector: "Perbankan Big 4",
    market_status: marketStatus,
    market_time: wibTime,
    updated_at: new Date().toISOString(),
  })
}
