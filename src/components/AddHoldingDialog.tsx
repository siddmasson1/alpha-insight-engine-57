import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { sectors } from "@/data/mockPortfolio";
import type { Holding } from "@/data/mockPortfolio";

interface AddHoldingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (holding: Holding) => void;
}

const AddHoldingDialog = ({ open, onOpenChange, onSubmit }: AddHoldingDialogProps) => {
  const [ticker, setTicker] = useState("");
  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [price, setPrice] = useState("");
  const [shares, setShares] = useState("");
  const [dateAdded, setDateAdded] = useState<Date>(new Date());

  const handleSubmit = () => {
    if (!ticker.trim() || !name.trim() || !sector || !price || !shares) return;
    const priceNum = parseFloat(price);
    const sharesNum = parseInt(shares);
    const positionSize = priceNum * sharesNum;

    onSubmit({
      ticker: ticker.toUpperCase(),
      name,
      sector,
      price: priceNum,
      change: 0,
      changePct: 0,
      positionSize,
      shares: sharesNum,
      weight: 0, // will be recalculated
      pnl: 0,
      dateAdded,
    });

    setTicker("");
    setName("");
    setSector("");
    setPrice("");
    setShares("");
    setDateAdded(new Date());
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add Position</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new holding to your portfolio.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Ticker</Label>
              <Input value={ticker} onChange={(e) => setTicker(e.target.value)} placeholder="AAPL" className="mt-1 bg-secondary border-border font-mono uppercase" />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Company Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Apple Inc." className="mt-1 bg-secondary border-border" />
            </div>
          </div>

          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Sector</Label>
            <Select value={sector} onValueChange={setSector}>
              <SelectTrigger className="mt-1 bg-secondary border-border">
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Price ($)</Label>
              <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="150.00" className="mt-1 bg-secondary border-border font-mono" />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Shares</Label>
              <Input type="number" value={shares} onChange={(e) => setShares(e.target.value)} placeholder="1000" className="mt-1 bg-secondary border-border font-mono" />
            </div>
          </div>

          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Date Added</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full mt-1 justify-start text-left font-normal bg-secondary border-border", !dateAdded && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateAdded ? format(dateAdded, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={dateAdded} onSelect={(d) => d && setDateAdded(d)} initialFocus className="p-3 pointer-events-auto" />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-border text-muted-foreground">Cancel</Button>
          <Button onClick={handleSubmit} disabled={!ticker.trim() || !name.trim() || !sector || !price || !shares} className="bg-primary text-primary-foreground">
            Add Position
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddHoldingDialog;
