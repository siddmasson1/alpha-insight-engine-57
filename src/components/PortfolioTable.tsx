import { Holding } from "@/data/mockPortfolio";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioTableProps {
  holdings: Holding[];
}

const PortfolioTable = ({ holdings }: PortfolioTableProps) => {
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val);

  const formatPrice = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(val);

  return (
    <div className="overflow-auto max-h-[340px]">
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 hover:bg-transparent">
            <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider w-[70px]">Ticker</TableHead>
            <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Company</TableHead>
            <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Sector</TableHead>
            <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Price</TableHead>
            <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Chg %</TableHead>
            <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Position</TableHead>
            <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Wt %</TableHead>
            <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">P&L</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {holdings.map((h) => (
            <TableRow key={h.ticker} className="border-border/30 hover:bg-secondary/50 transition-colors">
              <TableCell className="font-mono font-semibold text-primary text-sm py-2">{h.ticker}</TableCell>
              <TableCell className="text-foreground text-sm py-2 truncate max-w-[140px]">{h.name}</TableCell>
              <TableCell className="text-muted-foreground text-xs py-2">{h.sector}</TableCell>
              <TableCell className="text-right font-mono text-sm py-2">{formatPrice(h.price)}</TableCell>
              <TableCell className="text-right py-2">
                <span className={cn("inline-flex items-center gap-0.5 font-mono text-sm font-medium",
                  h.changePct > 0 ? "text-gain" : h.changePct < 0 ? "text-loss" : "text-muted-foreground"
                )}>
                  {h.changePct > 0 ? <ArrowUpRight className="w-3 h-3" /> : h.changePct < 0 ? <ArrowDownRight className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                  {Math.abs(h.changePct).toFixed(2)}%
                </span>
              </TableCell>
              <TableCell className="text-right font-mono text-sm py-2 text-muted-foreground">{formatCurrency(h.positionSize)}</TableCell>
              <TableCell className="text-right font-mono text-sm py-2">
                <div className="flex items-center justify-end gap-2">
                  <div className="w-12 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary/60 rounded-full" style={{ width: `${(h.weight / 10) * 100}%` }} />
                  </div>
                  <span className="text-muted-foreground w-10 text-right">{h.weight.toFixed(1)}%</span>
                </div>
              </TableCell>
              <TableCell className={cn("text-right font-mono text-sm font-medium py-2", h.pnl >= 0 ? "text-gain" : "text-loss")}>
                {h.pnl >= 0 ? "+" : ""}{formatCurrency(h.pnl)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PortfolioTable;
