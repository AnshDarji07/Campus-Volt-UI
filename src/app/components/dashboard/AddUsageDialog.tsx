import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

interface AddUsageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (usage: number, appliances?: string) => void;
}

export function AddUsageDialog({ open, onOpenChange, onAdd }: AddUsageDialogProps) {
  const [usage, setUsage] = useState("");
  const [appliances, setAppliances] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const usageNum = parseFloat(usage);
    if (isNaN(usageNum) || usageNum <= 0) {
      toast.error("Please enter a valid usage amount");
      return;
    }

    onAdd(usageNum, appliances || undefined);
    toast.success("Usage reading added successfully!");
    
    // Reset form
    setUsage("");
    setAppliances("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Energy Reading</DialogTitle>
          <DialogDescription>
            Add a new electricity usage reading to track your consumption
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="usage">Usage (kWh) *</Label>
            <Input
              id="usage"
              type="number"
              step="0.01"
              placeholder="e.g., 25.5"
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">
              Enter the amount of electricity consumed in kilowatt-hours
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="appliances">Appliances/Notes (Optional)</Label>
            <Textarea
              id="appliances"
              placeholder="e.g., AC running all day, washing machine..."
              value={appliances}
              onChange={(e) => setAppliances(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600"
            >
              Add Reading
            </Button>
          </div>
        </form>

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
          <p className="text-xs text-blue-800 dark:text-blue-400">
            💡 Tip: Regular readings help you track patterns and identify opportunities to save energy!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
