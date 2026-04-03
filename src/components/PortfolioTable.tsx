import { useState } from "react";
import { Holding } from "@/data/mockPortfolio";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, ArrowDownRight, Minus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface PortfolioTableProps {
  holdings: Holding[];
  onRemoveHolding?: (ticker: string) => void;
}

const PortfolioTable = ({ holdings, onRemoveHolding }: PortfolioTableProps) => {
  const [expandedTicker, setExpandedTicker] = useState<string | null>(null);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val);

  const formatPrice = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(val);

  return (
    <div className="overflow-auto max-h-[340px]">
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 hover:bg-transparent">
            <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider w-[30px]"></TableHead>
            <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider w-[70px]">Ticker</TableHead>
            <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Company</TableHead>
            <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Sector</TableHead>
            <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Price</TableHead>
            <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Chg %</TableHead>
            <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Shares</TableHead>
            <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Position</TableHead>
            <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">P&L</TableHead>
            <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-center">Purchased</TableHead>
            <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider w-[40px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {holdings.map((h) => {
            const isExpanded = expandedTicker === h.ticker;
            const hasDetails = h.thesis || h.catalysts || h.breakConditions;
            return (
              <>
                <TableRow
                  key={h.ticker}
                  className={cn(
                    "border-border/30 hover:bg-secondary/50 transition-colors group cursor-pointer",
                    isExpanded && "bg-secondary/30"
                  )}
                  onClick={() => hasDetails && setExpandedTicker(isExpanded ? null : h.ticker)}
                >
                  <TableCell className="py-2 px-1">
                    {hasDetails && (
                      isExpanded
                        ? <ChevronDown className="w-3 h-3 text-muted-foreground" />
                        : <ChevronRight className="w-3 h-3 text-muted-foreground" />
                    )}
                  </TableCell>
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
                  <TableCell className="text-right font-mono text-sm py-2 text-muted-foreground">{h.shares.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono text-sm py-2 text-muted-foreground">{formatCurrency(h.positionSize)}</TableCell>
                  <TableCell className={cn("text-right font-mono text-sm font-medium py-2", h.pnl >= 0 ? "text-gain" : "text-loss")}>
                    {h.pnl >= 0 ? "+" : ""}{formatCurrency(h.pnl)}
                  </TableCell>
                  <TableCell className="text-center text-xs text-muted-foreground font-mono py-2">
                    {h.dateAdded instanceof Date && !isNaN(h.dateAdded.getTime())
                      ? format(h.dateAdded, "MM/dd/yy")
                      : "—"}
                  </TableCell>
                  <TableCell className="py-2">
                    {onRemoveHolding && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-loss"
                        onClick={(e) => { e.stopPropagation(); onRemoveHolding(h.ticker); }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
                {isExpanded && hasDetails && (
                  <TableRow key={`${h.ticker}-details`} className="border-border/20 bg-secondary/20">
                    <TableCell colSpan={11} className="py-2 px-4">
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        {h.thesis && (
                          <div>
                            <span className="text-primary font-semibold uppercase tracking-wider block mb-0.5">Thesis</span>
                            <span className="text-muted-foreground leading-relaxed">{h.thesis}</span>
                          </div>
                        )}
                        {h.catalysts && (
                          <div>
                            <span className="text-gain font-semibold uppercase tracking-wider block mb-0.5">Catalysts</span>
                            <span className="text-muted-foreground leading-relaxed">{h.catalysts}</span>
                          </div>
                        )}
                        {h.breakConditions && (
                          <div>
                            <span className="text-loss font-semibold uppercase tracking-wider block mb-0.5">Break Conditions</span>
                            <span className="text-muted-foreground leading-relaxed">{h.breakConditions}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PortfolioTable;
