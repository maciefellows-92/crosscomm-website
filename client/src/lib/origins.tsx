import { createContext, useContext, type ReactNode } from "react";
import type { SiteOrigins } from "../site-config";

const OriginsContext = createContext<SiteOrigins | null>(null);

export function OriginsProvider({ value, children }: { value: SiteOrigins; children: ReactNode }) {
  return <OriginsContext.Provider value={value}>{children}</OriginsContext.Provider>;
}

export function useOrigins(): SiteOrigins {
  const value = useContext(OriginsContext);
  if (!value) throw new Error("Site origins are missing.");
  return value;
}
