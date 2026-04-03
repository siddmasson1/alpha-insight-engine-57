import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { sectors } from "@/data/mockPortfolio";
import { cn } from "@/lib/utils";

interface ScenarioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (scenario: { description: string; affectedSectors: string[]; severity: number }) => void;
}

const ScenarioDialog = ({ open, onOpenChange, onSubmit }: ScenarioDialogProps) => {
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState([5]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const toggleSector = (sector: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sector) ? prev.filter((s) => s !== sector) : [...prev, sector]
    );
  };

  const handleSubmit = () => {
    if (!description.trim()) return;
    onSubmit({ description, affectedSectors: selectedSectors, severity: severity[0] });
    setDescription("");
    setSeverity([5]);
    setSelectedSectors([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Create Scenario</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Model a hypothetical event and analyze its portfolio impact.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="scenario" className="text-xs uppercase tracking-wider text-muted-foreground">Event Description</Label>
            <Textarea
              id="scenario"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., China announces 25% tariff on all US semiconductor imports..."
              className="mt-1.5 bg-secondary border-border min-h-[80px] text-sm"
            />
          </div>

          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Affected Sectors</Label>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {sectors.map((s) => (
                <Badge
                  key={s}
                  variant="outline"
                  className={cn("cursor-pointer text-xs transition-colors",
                    selectedSectors.includes(s)
                      ? "bg-primary/20 text-primary border-primary/40"
                      : "text-muted-foreground border-border hover:border-primary/30"
                  )}
                  onClick={() => toggleSector(s)}
                >
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Severity</Label>
              <span className={cn("font-mono text-sm font-bold",
                severity[0] >= 8 ? "text-loss" : severity[0] >= 5 ? "text-warning" : "text-gain"
              )}>
                {severity[0]}/10
              </span>
            </div>
            <Slider value={severity} onValueChange={setSeverity} min={1} max={10} step={1} className="mt-2" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-border text-muted-foreground">Cancel</Button>
          <Button onClick={handleSubmit} disabled={!description.trim()} className="bg-primary text-primary-foreground">
            Analyze Impact
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScenarioDialog;
