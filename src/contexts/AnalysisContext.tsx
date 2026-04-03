import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { ImpactAnalysis, NewsItem } from "@/data/mockPortfolio";

interface AnalysisState {
  selectedNewsId: string | null;
  analysis: ImpactAnalysis | null;
  isLoading: boolean;
}

interface AnalysisContextType extends AnalysisState {
  setSelectedNewsId: (id: string | null) => void;
  setAnalysis: (a: ImpactAnalysis | null) => void;
  setIsLoading: (l: boolean) => void;
}

const AnalysisContext = createContext<AnalysisContextType | null>(null);

export const AnalysisProvider = ({ children }: { children: ReactNode }) => {
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ImpactAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AnalysisContext.Provider value={{ selectedNewsId, analysis, isLoading, setSelectedNewsId, setAnalysis, setIsLoading }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error("useAnalysis must be used within AnalysisProvider");
  return ctx;
};
