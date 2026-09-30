export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  SCREENER: "/screener",
  STOCK_DETAIL: (ticker: string = "BBCA"): string => `/stock/${ticker}`,
  FOREIGN_ACTIVITY: (ticker: string = "BBCA"): string => `/foreign-activity/${ticker}`,
  SIGNALS: "/signals",
  WATCHLIST: "/watchlist",
  METHODOLOGY: "/methodology",
  ARTICLES: (ticker: string = "BBCA"): string => `/articles/${ticker}`,
  COMPARE: "/compare",
} as const
