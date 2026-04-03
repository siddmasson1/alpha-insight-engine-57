import { ThesisImpact } from "@/data/mockPortfolio";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle, AlertTriangle, XCircle, TrendingUp } from "lucide-react";

interface ThesisImpactSectionProps {
  thesisImpact: ThesisImpact[];
}

const statusConfig = {
  intact: { icon: CheckCircle, label: "Intact", className: "bg-gain/20 text-gain border-gain/30" },
  strengthened: { icon: TrendingUp, label: "Strengthened", className: "bg-primary/20 text-primary border-primary/30" },
  weakened: { icon: AlertTriangle, label: "Weakened", className: "bg-warning/20 text-warning border-warning/30" },
  broken: { icon: XCircle, label: "Broken", className: "bg-loss/20 text-loss border-loss/30" },
};

const ThesisImpactSection = ({ thesisImpact }: ThesisImpactSectionProps) => {
  if (!thesisImpact?.length) return null;

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-primary" />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Investment Thesis Impact
        </h3>
      </div>
      <div className="space-y-4">
        {thesisImpact.map((t) => {
          const config = statusConfig[t.thesisStatus];
          const Icon = config.icon;
          return (
            <div key={t.ticker} className="p-4 rounded-lg bg-secondary/50 border border-border/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-primary">{t.ticker}</span>
                  <Badge variant="outline" className={cn("text-[10px]", config.className)}>
                    <Icon className="w-3 h-3 mr-1" />
                    {config.label}
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                <span className="font-semibold text-foreground/70">Original Thesis:</span> {t.originalThesis}
              </p>
              <p className="text-xs text-foreground/80 mb-1.5">{t.reasoning}</p>
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground/70">Revised Outlook:</span> {t.revisedOutlook}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThesisImpactSection;
