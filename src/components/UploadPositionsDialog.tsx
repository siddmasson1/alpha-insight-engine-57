import { useState, useCallback, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileUp, X, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Holding } from "@/data/mockPortfolio";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface UploadPositionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (holdings: Holding[]) => void;
}

const WEBHOOK_URL = "https://hw933806.app.n8n.cloud/webhook-test/portfolio-tagger";

const SECTOR_MAP: Record<string, string> = {
  AAPL: "Technology", AMZN: "Consumer Disc.", BA: "Industrials", CAT: "Industrials",
  COIN: "Financials", GOOGL: "Technology", GS: "Financials", JPM: "Financials",
  LLY: "Healthcare", META: "Technology", MRNA: "Healthcare", MS: "Financials",
  MSFT: "Technology", NKE: "Consumer Disc.", NVDA: "Technology", PFE: "Healthcare",
  PLTR: "Technology", TSLA: "Consumer Disc.", UNH: "Healthcare", WMT: "Consumer Staples",
};

interface ParsedRow {
  ticker: string;
  name: string;
  date: string;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

function parseCsv(text: string): ParsedRow[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const header = lines[0].split(",");
  const idx = (col: string) => header.indexOf(col);

  return lines.slice(1).map((line) => {
    const cols = line.split(",");
    return {
      ticker: cols[idx("ticker")],
      name: cols[idx("canonical_name")],
      date: cols[idx("date")],
      close: parseFloat(cols[idx("close")]),
      open: parseFloat(cols[idx("open")]),
      high: parseFloat(cols[idx("high")]),
      low: parseFloat(cols[idx("low")]),
      volume: parseInt(cols[idx("volume")]),
    };
  });
}

function buildHoldings(rows: ParsedRow[]): Holding[] {
  const byTicker: Record<string, ParsedRow[]> = {};
  rows.forEach((r) => {
    if (!byTicker[r.ticker]) byTicker[r.ticker] = [];
    byTicker[r.ticker].push(r);
  });

  const holdings: Holding[] = [];
  const basePositions: Record<string, number> = {
    AAPL: 5100000, AMZN: 3200000, BA: 1500000, CAT: 2100000, COIN: 1200000,
    GOOGL: 3600000, GS: 2500000, JPM: 3100000, LLY: 4200000, META: 3800000,
    MRNA: 800000, MS: 1800000, MSFT: 4000000, NKE: 900000, NVDA: 5500000,
    PFE: 700000, PLTR: 2200000, TSLA: 4800000, UNH: 2800000, WMT: 1900000,
  };

  for (const [ticker, tickerRows] of Object.entries(byTicker)) {
    tickerRows.sort((a, b) => a.date.localeCompare(b.date));
    const latest = tickerRows[tickerRows.length - 1];
    const prev = tickerRows.length > 1 ? tickerRows[tickerRows.length - 2] : latest;
    const change = Math.round((latest.close - prev.close) * 100) / 100;
    const changePct = prev.close ? Math.round((change / prev.close) * 10000) / 100 : 0;
    const positionSize = basePositions[ticker] || Math.round(latest.close * 10000);
    const shares = Math.round(positionSize / latest.close);
    const pnl = Math.round(shares * change);

    holdings.push({
      ticker,
      name: latest.name,
      sector: SECTOR_MAP[ticker] || "Other",
      price: latest.close,
      change,
      changePct,
      positionSize,
      shares,
      weight: 0,
      pnl,
      dateAdded: new Date(latest.date),
    });
  }

  const totalPos = holdings.reduce((s, h) => s + h.positionSize, 0);
  holdings.forEach((h) => (h.weight = Math.round((h.positionSize / totalPos) * 1000) / 10));
  holdings.sort((a, b) => b.positionSize - a.positionSize);
  return holdings;
}

const UploadPositionsDialog = ({ open, onOpenChange, onUpload }: UploadPositionsDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [preview, setPreview] = useState<Holding[] | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const csvTextRef = useRef<string>("");

  const handleFile = useCallback((f: File) => {
    if (!f.name.endsWith(".csv")) {
      toast({ title: "Invalid File", description: "Please upload a CSV file.", variant: "destructive" });
      return;
    }
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      csvTextRef.current = text;
      const rows = parseCsv(text);
      const holdings = buildHoldings(rows);
      setPreview(holdings);
    };
    reader.readAsText(f);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const handleUpload = async () => {
    if (!preview) return;
    setIsSending(true);
    try {
      const payload = preview.map((h) => ({
        ticker: h.ticker, name: h.name, sector: h.sector, price: h.price,
        change: h.change, changePct: h.changePct, positionSize: h.positionSize,
        shares: h.shares, weight: h.weight, pnl: h.pnl,
      }));

      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(body || `HTTP ${res.status}`);
      }

      onUpload(preview);
      toast({ title: "Positions Uploaded", description: `${preview.length} holdings uploaded and sent to webhook.` });
      onOpenChange(false);
      setFile(null);
      setPreview(null);
    } catch (e: any) {
      console.error("Webhook error:", e);
      // Still update local holdings even if webhook fails
      onUpload(preview);
      toast({
        title: "Positions Updated Locally",
        description: `Holdings updated. Webhook delivery failed: ${e.message}`,
        variant: "destructive",
      });
      onOpenChange(false);
      setFile(null);
      setPreview(null);
    } finally {
      setIsSending(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-foreground">Upload Positions</DialogTitle>
        </DialogHeader>

        {!file ? (
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors",
              isDragging ? "border-primary bg-primary/10" : "border-border/50 hover:border-primary/50"
            )}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
          >
            <FileUp className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-1">
              Drag & drop your <span className="text-primary font-medium">stock_prices.csv</span> here
            </p>
            <p className="text-xs text-muted-foreground">or click to browse</p>
            <input
              ref={fileRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2 text-sm">
                <Upload className="w-4 h-4 text-primary" />
                <span className="text-foreground font-medium">{file.name}</span>
                <span className="text-muted-foreground">({(file.size / 1024).toFixed(0)} KB)</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={reset}>
                <X className="w-3 h-3" />
              </Button>
            </div>

            {preview && (
              <div className="text-sm space-y-1">
                <p className="text-muted-foreground">
                  Found <span className="text-primary font-semibold">{preview.length}</span> tickers with latest prices
                </p>
                <div className="max-h-[200px] overflow-auto rounded border border-border/30">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border/30 text-muted-foreground">
                        <th className="text-left p-1.5 font-semibold">Ticker</th>
                        <th className="text-left p-1.5 font-semibold">Name</th>
                        <th className="text-right p-1.5 font-semibold">Price</th>
                        <th className="text-right p-1.5 font-semibold">Chg%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preview.map((h) => (
                        <tr key={h.ticker} className="border-b border-border/20">
                          <td className="p-1.5 font-mono text-primary">{h.ticker}</td>
                          <td className="p-1.5 text-foreground">{h.name}</td>
                          <td className="p-1.5 text-right font-mono">${h.price.toFixed(2)}</td>
                          <td className={cn("p-1.5 text-right font-mono", h.changePct >= 0 ? "text-gain" : "text-loss")}>
                            {h.changePct >= 0 ? "+" : ""}{h.changePct.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-border/50">
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!preview || isSending} className="gap-1.5">
            {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {isSending ? "Sending..." : "Upload Data"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPositionsDialog;
