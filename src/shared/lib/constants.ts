export const APP_NAME = "Sectors.Intel"
export const APP_DESCRIPTION = "Financial Sector Intelligence Dashboard"

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

export const STATUS = {
  STABLE: "STABLE",
  WARNING: "WARNING",
  CRITICAL: "CRITICAL",
} as const

export const STATUS_LABELS = {
  STABLE: "Stabil",
  WARNING: "Waspada",
  CRITICAL: "Perhatian Khusus",
} as const
