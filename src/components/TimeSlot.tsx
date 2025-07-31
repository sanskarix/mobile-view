import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock } from "lucide-react"

interface TimeSlotProps {
  time: string
  duration: string
  available: boolean
  onSelect?: () => void
}

export function TimeSlot({ time, duration, available, onSelect }: TimeSlotProps) {
  return (
    <Card className={`p-4 transition-all duration-300 hover:shadow-md ${
      available 
        ? "border-border hover:border-primary/50 bg-card" 
        : "border-muted bg-muted/30"
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            available ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
          }`}>
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <p className={`font-medium ${available ? "text-foreground" : "text-muted-foreground"}`}>
              {time}
            </p>
            <p className="text-sm text-muted-foreground">{duration}</p>
          </div>
        </div>
        
        {available ? (
          <Button 
            variant="time" 
            size="sm"
            onClick={onSelect}
            className="shrink-0"
          >
            Book
          </Button>
        ) : (
          <span className="text-xs text-muted-foreground px-3 py-1 bg-muted rounded-md">
            Unavailable
          </span>
        )}
      </div>
    </Card>
  )
}