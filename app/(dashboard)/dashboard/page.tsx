import React from "react"
import { Metadata } from "next"
import Link from "next/link"
import { StockCard, AnomalyBadge } from "@/src/entities/stock"
import { CompositeAlertHero, getPrimaryAlert, getAlertFeed } from "@/src/features/composite-alert"
import { getWatchedStocks } from "@/src/features/watchlist"
import { getForeignFlowSummary } from "@/src/features/foreign-flow"
import { getArticlesFeed } from "@/src/features/sentiment"
import { getMarketSummary, getStockQuotes, StockQuote } from "@/src/features/market"

export const metadata: Metadata = {
  title: "Dashboard Utama",
  description: "Terminal intelijen sektor finansial Indonesia dan deteksi anomali 3 pilar pasar",
}

export default async function DashboardPage() {
  const [primaryAlert, stocks, feedItems, flowAnomalies, liveArticles, marketSummary, quotes] = await Promise.all([
    getPrimaryAlert(),
    getWatchedStocks(),
    getAlertFeed(),
    getForeignFlowSummary(),
    getArticlesFeed("BBRI"),
    getMarketSummary(),
    getStockQuotes(),
  ])

  const quoteMap = new Map<string, StockQuote>()
  for (const q of quotes) {
    if (q && q.ticker) {
      quoteMap.set(q.ticker.toUpperCase(), q)
    }
  }

  const anomalyCount = flowAnomalies.filter((a) => Math.abs(a.z_score) >= 2.0).length || 1
  const topAnomaly = flowAnomalies.find((a) => Math.abs(a.z_score) >= 2.0)
  const anomalyHeadline = topAnomaly
    ? `${anomalyCount} Anomali Masif (${topAnomaly.ticker}: ${topAnomaly.z_score.toFixed(1)}σ)`
    : "Kondisi Aliran Normal"

  const targetAnomalies = flowAnomalies.length > 0
    ? flowAnomalies
    : feedItems.slice(0, 4).map((f, idx) => ({
        id: idx + 1,
        ticker: f.ticker,
        tanggal: new Date().toISOString(),
        net_foreign_inflow: f.zScore > 0 ? 100000000000 : -100000000000,
        z_score: f.zScore,
        status_anomali: f.zScore <= -2.0 ? "ANOMALI_OUTFLOW" : f.zScore >= 2.0 ? "ANOMALI_INFLOW" : "NORMAL",
        broker_details: [],
      }))

  const activityRows = targetAnomalies.map((anom) => {
    const ticker = anom.ticker
    const alert = feedItems.find((f) => f.ticker === ticker)
    const topBroker = anom.broker_details && anom.broker_details.length > 0 ? anom.broker_details[0] : undefined
    const dominantBroker = topBroker
      ? `${topBroker.kode_broker} (${topBroker.nama_broker})`
      : "- (Tidak Tersedia)"

    const net1dValue = anom.net_foreign_inflow ?? 0
    const net5dValue = anom.broker_details && anom.broker_details.length > 0
      ? anom.broker_details.reduce((acc, b) => acc + (b.net_value ?? 0), 0)
      : net1dValue * 2.5
    const zScore = anom.z_score ?? alert?.zScore ?? 0
    const isOutflowAnomaly = anom.status_anomali === "ANOMALI_OUTFLOW" || zScore <= -2.0
    const isInflowAnomaly = anom.status_anomali === "ANOMALI_INFLOW" || zScore >= 2.0
    const statusText = isOutflowAnomaly
      ? "Anomali Outflow"
      : isInflowAnomaly
      ? "Anomali Inflow"
      : zScore > 0
      ? "Normal Buy"
      : "Netral"

    return {
      ticker,
      net1d: `${net1dValue >= 0 ? "+" : "-"}Rp ${(Math.abs(net1dValue) / 1e9).toFixed(0)} M`,
      net5d: `${net5dValue >= 0 ? "+" : "-"}Rp ${(Math.abs(net5dValue) / 1e9).toFixed(0)} M`,
      zScore: `${zScore >= 0 ? "+" : ""}${zScore.toFixed(1)}σ`,
      broker: dominantBroker,
      status: statusText,
      isAlert: isOutflowAnomaly,
      isPositive: net1dValue >= 0,
    }
  })

  const enrichedStocks = stocks.map((s) => {
    const alert = feedItems.find((f) => f.ticker === s.ticker)
    const quote = quoteMap.get(s.ticker.toUpperCase())
    const isAlertTrigger = s.ticker === primaryAlert.ticker || alert?.status === "Perhatian Khusus"
    const zScore = alert?.zScore ?? 0
    const flowStatus = zScore <= -2.0 ? ("outflow" as const) : zScore >= 2.0 ? ("inflow" as const) : ("normal" as const)
    const flowLabel = zScore <= -2.0 ? `Outflow (${zScore}σ)` : zScore >= 2.0 ? `Inflow (+${zScore}σ)` : "Normal"

    const livePrice = quote?.price ?? s.price
    const livePriceChange = quote?.change_percent ?? quote?.change ?? s.priceChange
    const liveCoverage = quote?.analystCoverage ?? quote?.analyst_coverage ?? s.analystCoverage ?? 24

    return {
      ...s,
      price: livePrice,
      priceChange: livePriceChange,
      analystCoverage: liveCoverage,
      isAlertTrigger,
      alertMessage: alert?.title,
      pillarMetrics: {
        nimScore: s.fundamentalScore,
        sentimentScore: alert?.policyExposure ?? 0,
        sentimentTrend: [0.1, 0.15, 0.2, 0.22, alert?.policyExposure ?? 0.25],
        foreignFlowLabel: flowLabel,
        foreignFlowStatus: flowStatus,
      },
    }
  })

  const benchmarkPercent =
    typeof marketSummary.ihsg_change_percent === "number"
      ? `${marketSummary.ihsg_change_percent >= 0 ? "+" : ""}${marketSummary.ihsg_change_percent.toFixed(2).replace(".", ",")}%`
      : String(marketSummary.ihsg_change_percent || "+0,42%")
  const isBenchmarkPositive = !benchmarkPercent.startsWith("-")
  const marketStatusLabel = marketSummary.market_status || "Sesi II Berakhir"
  const marketTimeLabel = marketSummary.market_time || "17:00:00 WIB"
  const sectorLabel = marketSummary.top_sector || marketSummary.sector_leader || "Perbankan Big-4 (KBMI 4)"

  return (
    <div className="flex flex-col w-full pb-space-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md py-space-sm mb-space-md">
        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="font-mono text-tabular-sm text-text-secondary tracking-widest uppercase">
              INTEL / IDX:FINANCE
            </span>
            <span className="text-border-subtle">/</span>
            <h1 className="font-headline-md text-headline-md text-text-primary tracking-tight font-semibold">
              Ringkasan Sektor Finansial
            </h1>
          </div>
          <div className="flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-card rounded border border-border-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            <span className="font-body-sm text-body-sm text-text-primary font-medium">
              {sectorLabel}
            </span>
            <span className="material-symbols-outlined text-[14px] text-text-secondary">
              expand_more
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-md">
          <div className="flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-card rounded border border-border-subtle">
            <span className="w-2 h-2 rounded-full bg-data-neutral" />
            <span className="font-caption text-caption text-text-secondary">{marketStatusLabel}</span>
            <span className="text-border-subtle">•</span>
            <span className="font-mono text-tabular-sm text-text-primary font-medium">
              {marketTimeLabel}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-surface-container-lowest px-space-sm py-space-xs rounded border border-border-subtle">
            <span className="font-caption text-caption text-text-secondary">Benchmark:</span>
            <span className={`font-mono text-tabular-sm ${isBenchmarkPositive ? "text-data-bullish" : "text-data-bearish"}`}>
              {benchmarkPercent}
            </span>
          </div>
        </div>
      </div>

      <CompositeAlertHero alert={primaryAlert} />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md mb-space-lg">
        {enrichedStocks.length === 0 ? (
          <div className="col-span-full p-space-xl bg-surface-card rounded border border-dashed border-border-subtle flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-[32px] text-text-secondary mb-2">
              account_balance
            </span>
            <h4 className="font-headline-sm text-headline-sm font-semibold text-text-primary mb-1">
              Belum Ada Emiten Terpilih
            </h4>
            <p className="font-body-sm text-body-sm text-text-secondary max-w-sm mb-3">
              Daftar saham yang dipantau belum tersedia. Buka halaman Watchlist untuk memilih emiten perbankan.
            </p>
            <Link
              href="/watchlist"
              className="px-3 py-1.5 bg-brand-red text-text-primary text-body-sm font-semibold rounded"
            >
              Kelola Watchlist
            </Link>
          </div>
        ) : (
          enrichedStocks.map((stock) => (
            <StockCard key={stock.ticker} stock={stock} />
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <div className="lg:col-span-7 flex flex-col bg-surface-card p-space-lg rounded border border-border-subtle shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md pb-space-sm border-b border-border-subtle/60">
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[20px] text-brand-red">
                  radar
                </span>
                <h3 className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                  Aktivitas Asing & Deteksi Anomali Broker
                </h3>
              </div>
              <span className="font-caption text-caption text-text-secondary mt-0.5">
                Analisis statistical deviation (z-score) terhadap volume rata-rata 20 hari
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-red/15 text-brand-red border border-brand-red/30">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="font-caption text-[11px] font-semibold">
                {anomalyHeadline}
              </span>
            </div>
          </div>

          <div className="p-space-md bg-surface-container-lowest rounded mb-space-md border border-border-subtle/40">
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-caption text-[11px] text-text-secondary uppercase">
                Distribusi Net Flow Asing (5 Sesi Terakhir - KBMI 4)
              </span>
              <div className="flex items-center gap-space-md font-mono text-[11px]">
                <span className="flex items-center gap-1 text-data-bullish">
                  <span className="w-2 h-2 bg-data-bullish rounded-xs" /> Net Buy
                </span>
                <span className="flex items-center gap-1 text-data-bearish">
                  <span className="w-2 h-2 bg-data-bearish rounded-xs" /> Net Sell
                </span>
              </div>
            </div>

            <div className="w-full h-20 flex items-end justify-between pt-2 px-space-xs">
              <div className="flex flex-col items-center gap-1 flex-1">
                <div className="w-full flex items-center justify-center gap-1 h-12">
                  <div className="w-3 bg-data-bullish/70 h-8 rounded-t-xs" />
                  <div className="w-3 bg-data-bearish/70 h-4 rounded-t-xs" />
                  <div className="w-3 bg-data-bullish/70 h-6 rounded-t-xs" />
                  <div className="w-3 bg-data-bullish/70 h-3 rounded-t-xs" />
                </div>
                <span className="font-mono text-[10px] text-text-secondary">Senin</span>
              </div>

              <div className="flex flex-col items-center gap-1 flex-1">
                <div className="w-full flex items-center justify-center gap-1 h-12">
                  <div className="w-3 bg-data-bullish/70 h-10 rounded-t-xs" />
                  <div className="w-3 bg-data-bearish/70 h-8 rounded-t-xs" />
                  <div className="w-3 bg-data-bullish/70 h-7 rounded-t-xs" />
                  <div className="w-3 bg-data-bearish/70 h-2 rounded-t-xs" />
                </div>
                <span className="font-mono text-[10px] text-text-secondary">Selasa</span>
              </div>

              <div className="flex flex-col items-center gap-1 flex-1">
                <div className="w-full flex items-center justify-center gap-1 h-12">
                  <div className="w-3 bg-data-bullish/70 h-11 rounded-t-xs" />
                  <div className="w-3 bg-data-bearish/70 h-9 rounded-t-xs" />
                  <div className="w-3 bg-data-bullish/70 h-5 rounded-t-xs" />
                  <div className="w-3 bg-data-bullish/70 h-4 rounded-t-xs" />
                </div>
                <span className="font-mono text-[10px] text-text-secondary">Rabu</span>
              </div>

              <div className="flex flex-col items-center gap-1 flex-1">
                <div className="w-full flex items-center justify-center gap-1 h-12">
                  <div className="w-3 bg-data-bullish/70 h-7 rounded-t-xs" />
                  <div className="w-3 bg-data-bearish/80 h-12 rounded-t-xs" />
                  <div className="w-3 bg-data-bullish/70 h-9 rounded-t-xs" />
                  <div className="w-3 bg-data-bullish/70 h-5 rounded-t-xs" />
                </div>
                <span className="font-mono text-[10px] text-text-secondary">Kamis</span>
              </div>

              <div className="flex flex-col items-center gap-1 flex-1 bg-brand-red-soft/20 rounded py-0.5 border border-brand-red/30">
                <div className="w-full flex items-center justify-center gap-1 h-12">
                  <div className="w-3 bg-data-bullish h-11 rounded-t-xs" />
                  <div className="w-3 bg-data-bearish h-full rounded-t-xs animate-pulse" />
                  <div className="w-3 bg-data-bullish h-6 rounded-t-xs" />
                  <div className="w-3 bg-data-bullish h-3 rounded-t-xs" />
                </div>
                <span className="font-mono text-[10px] text-brand-red font-bold">Hari Ini</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-body-sm text-[13px]">
              <thead>
                <tr className="bg-surface-container-lowest text-text-secondary font-caption text-caption h-8">
                  <th className="px-space-sm font-medium">EMITEN</th>
                  <th className="px-space-sm text-right font-medium">NET ASING (1D)</th>
                  <th className="px-space-sm text-right font-medium">NET ASING (5D)</th>
                  <th className="px-space-sm text-right font-medium">Z-SCORE</th>
                  <th className="px-space-sm font-medium">BROKER DOMINAN</th>
                  <th className="px-space-sm text-center font-medium">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/50">
                {activityRows.map((row) => (
                  <tr
                    key={row.ticker}
                    className={`h-10 hover:bg-surface-container-high transition-colors ${
                      row.isAlert ? "bg-brand-red-soft/30 hover:bg-brand-red-soft/50" : ""
                    }`}
                  >
                    <td className={`px-space-sm font-label-ticker font-semibold ${row.isAlert ? "text-brand-red font-bold flex items-center gap-1 pt-2.5" : "text-text-primary"}`}>
                      <span>{row.ticker}</span>
                      {row.isAlert && <span className="material-symbols-outlined text-[14px]">warning</span>}
                    </td>
                    <td className={`px-space-sm text-right font-mono text-tabular-md font-bold ${row.isPositive ? "text-data-bullish" : "text-data-bearish"}`}>
                      {row.net1d}
                    </td>
                    <td className={`px-space-sm text-right font-mono text-tabular-md ${row.isPositive ? "text-data-bullish" : "text-data-bearish"}`}>
                      {row.net5d}
                    </td>
                    <td className={`px-space-sm text-right font-mono text-tabular-md font-bold ${row.isAlert ? "text-data-bearish" : "text-text-primary"}`}>
                      {row.zScore}
                    </td>
                    <td className="px-space-sm text-text-secondary">
                      <span className={`font-mono text-tabular-sm font-medium ${row.isAlert ? "text-data-bearish font-bold" : "text-text-primary"}`}>
                        {row.broker.split(" ")[0]}
                      </span>{" "}
                      {row.broker.includes(" ") ? row.broker.substring(row.broker.indexOf(" ") + 1) : ""}
                    </td>
                    <td className="px-space-sm text-center">
                      {row.status === "Anomali Outflow" ? (
                        <AnomalyBadge type="outflow" label="Anomali Outflow" size="sm" />
                      ) : row.status === "Anomali Inflow" ? (
                        <AnomalyBadge type="inflow" label="Anomali Inflow" size="sm" />
                      ) : (
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded font-mono tracking-tight text-[11px] font-medium ${
                            row.isAlert
                              ? "bg-data-bearish/20 text-data-bearish font-bold border border-data-bearish/30"
                              : row.isPositive
                              ? "bg-data-bullish/10 text-data-bullish"
                              : "bg-surface-container-high text-text-secondary"
                          }`}
                        >
                          {row.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-space-md pt-space-xs flex items-center justify-between text-text-secondary font-caption text-caption border-t border-border-subtle/40">
            <span>Ambang batas anomali diset otomatis pada |Z| &gt; 2.0σ</span>
            <Link
              href="/foreign-activity/BBRI"
              className="text-text-primary hover:text-brand-red flex items-center gap-1 font-medium transition-colors"
            >
              <span>Buka Matrix Broker Komplit</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-space-md">
          <div className="flex flex-col bg-surface-card p-space-lg rounded border border-border-subtle shadow-sm">
            <div className="flex items-center justify-between mb-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[20px] text-data-neutral">
                  gavel
                </span>
                <h3 className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                  Paparan Regulasi & BI Rate
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-data-neutral/15 text-data-neutral font-caption text-[11px] font-semibold border border-data-neutral/30">
                {primaryAlert.policyExposure <= -0.1 ? "Netral-Negatif" : primaryAlert.policyExposure >= 0.1 ? "Positif" : "Netral"}
              </span>
            </div>

            <div className="flex items-center justify-between p-space-sm bg-surface-container-lowest rounded mb-space-sm border border-border-subtle/50">
              <div className="flex flex-col">
                <span className="font-caption text-[11px] text-text-secondary uppercase">
                  Indeks Tekanan Makro
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-mono text-tabular-lg font-bold text-data-neutral">
                    {primaryAlert.policyExposure >= 0 ? "+" : ""}{primaryAlert.policyExposure.toFixed(2)}
                  </span>
                  <span className="font-caption text-caption text-data-neutral font-medium">
                    {primaryAlert.policyExposure <= -0.2 ? "Waspada Tinggi" : primaryAlert.policyExposure <= -0.1 ? "Waspada" : "Stabil"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col text-right">
                <span className="font-caption text-[11px] text-text-secondary uppercase">
                  Subsektor Terdampak
                </span>
                <span className="font-body-sm text-body-sm text-brand-red font-semibold mt-0.5">
                  Kredit Mikro & UMKM
                </span>
              </div>
            </div>

            <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed">
              Sinyal &lsquo;Higher-for-Longer&rsquo; Bank Indonesia memperketat likuiditas simpanan dana murah (CASA). Segmen mikro memiliki sensitivitas CoF tertinggi di KBMI 4.
            </p>
          </div>

          <div className="flex flex-col flex-1 bg-surface-card p-space-lg rounded border border-border-subtle shadow-sm">
            <div className="flex items-center justify-between mb-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[20px] text-brand-red">
                  feed
                </span>
                <h3 className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                  Intelijen Berita Terkini
                </h3>
              </div>
              <span className="font-mono text-[11px] text-text-secondary">
                NLP Engine Real-Time
              </span>
            </div>

            <div className="flex flex-col gap-space-sm divide-y border-subtle/40">
              {liveArticles.slice(0, 3).map((art, idx) => {
                const isBullish = art.sentimentScore >= 0.2
                const isBearish = art.sentimentScore <= -0.2
                const tag = isBullish ? "BULLISH" : isBearish ? "BEARISH" : "NETRAL"
                const tagColor = isBullish
                  ? "bg-data-bullish/15 text-data-bullish"
                  : isBearish
                  ? "bg-data-bearish/15 text-data-bearish"
                  : "bg-surface-container-high text-text-secondary"
                const tickerCode = art.affectedEntities || "BBRI"
                return (
                  <div key={art.id || idx} className="flex flex-col gap-1 pt-space-xs first:pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-1.5 py-0.2 rounded font-caption text-[10px] font-bold ${tagColor}`}>
                          {tag}
                        </span>
                        <span className="font-label-ticker text-[11px] font-bold text-text-primary">
                          {tickerCode}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-text-secondary">
                        {art.timeDecayLabel || art.source}
                      </span>
                    </div>
                    <Link
                      href={`/articles/${tickerCode}`}
                      className="font-body-sm text-[13px] text-text-primary font-medium hover:text-brand-red transition-colors line-clamp-2"
                    >
                      {art.title}
                    </Link>
                  </div>
                )
              })}
            </div>

            <div className="mt-space-md pt-space-sm border-t border-border-subtle/50">
              <Link
                href="/signals"
                className="text-brand-red hover:underline text-body-sm font-semibold flex items-center justify-center gap-1"
              >
                <span>Buka Seluruh Feed Berita ({feedItems.length} Sinyal)</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
