import { PrecedentEvent } from "@/data/mockPortfolio";
import { cn } from "@/lib/utils";
import { History } from "lucide-react";

interface PrecedentEventsSectionProps {
  precedentEvents: PrecedentEvent[];
}

const PrecedentEventsSection = ({ precedentEvents }: PrecedentEventsSectionProps) => {
  if (!precedentEvents?.length) return null;

  return (
    <div className="glass-card rounded-xl p-6 overflow-x-auto">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-primary" />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Historical Precedent Events
        </h3>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border/30">
            <th className="text-left py-2 pr-3 font-semibold text-muted-foreground whitespace-nowrap">Date</th>
            <th className="text-left py-2 px-3 font-semibold text-muted-foreground">Event</th>
            <th className="text-left py-2 px-3 font-semibold text-muted-foreground whitespace-nowrap">Tickers</th>
            <th className="text-left py-2 px-3 font-semibold text-muted-foreground whitespace-nowrap">Reaction</th>
            <th className="text-center py-2 px-3 font-semibold text-muted-foreground whitespace-nowrap">Next Day</th>
            <th className="text-center py-2 px-3 font-semibold text-muted-foreground whitespace-nowrap">1-Week</th>
            <th className="text-left py-2 pl-3 font-semibold text-muted-foreground">Key Learning</th>
          </tr>
        </thead>
        <tbody>
          {precedentEvents.map((evt, i) => (
            <tr key={i} className="border-b border-border/10 last:border-0">
              <td className="py-2.5 pr-3 font-mono text-muted-foreground whitespace-nowrap">{evt.date}</td>
              <td className="py-2.5 px-3 text-foreground/90 max-w-[200px]">{evt.event}</td>
              <td className="py-2.5 px-3 font-mono text-primary whitespace-nowrap">
                {evt.affectedTickers?.join(", ")}
              </td>
              <td className="py-2.5 px-3 text-foreground/80">{evt.marketReaction}</td>
              <td className={cn("py-2.5 px-3 text-center font-mono font-bold",
                evt.nextDayMove?.startsWith("-") ? "text-loss" : "text-gain"
              )}>{evt.nextDayMove}</td>
              <td className={cn("py-2.5 px-3 text-center font-mono font-bold",
                evt.weekMove?.startsWith("-") ? "text-loss" : "text-gain"
              )}>{evt.weekMove}</td>
              <td className="py-2.5 pl-3 text-muted-foreground max-w-[200px]">{evt.keyLearning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrecedentEventsSection;
