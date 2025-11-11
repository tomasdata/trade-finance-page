import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface InstrumentCardProps {
  icon: LucideIcon
  title: string
  description: string
  percentage?: string
}

export function InstrumentCard({ icon: Icon, title, description, percentage }: InstrumentCardProps) {
  return (
    <Card className="min-w-[280px] snap-start border-2 hover:border-blue-500 transition-all hover:shadow-md">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
            <Icon className="h-5 w-5" />
          </div>
          {percentage ? (
            <span className="text-2xl font-bold text-blue-600">{percentage}</span>
          ) : (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">N/D</span>
          )}
        </div>
        <CardTitle className="text-lg leading-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
