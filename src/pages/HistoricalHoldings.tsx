import { History } from "lucide-react";

const HistoricalHoldings = () => (
  <div className="flex flex-col items-center justify-center h-full text-center px-6">
    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
      <History className="w-8 h-8 text-muted-foreground" />
    </div>
    <h2 className="text-lg font-semibold text-foreground mb-2">Historical Holdings</h2>
    <p className="text-sm text-muted-foreground max-w-xs">
      View past portfolio snapshots and track how your holdings have evolved over time. Coming soon.
    </p>
  </div>
);

export default HistoricalHoldings;
