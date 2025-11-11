import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BarrierCardProps {
  icon: LucideIcon
  title: string
  description: string
  impact: "Alto" | "Medio"
}

export function BarrierCard({ icon: Icon, title, description, impact }: BarrierCardProps) {
  return (
    <Card className="border-2 hover:border-amber-500 transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
            <Icon className="h-5 w-5" />
          </div>
          <Badge variant={impact === "Alto" ? "destructive" : "secondary"} className="shrink-0">
            Impacto {impact}
          </Badge>
        </div>
        <CardTitle className="text-base mt-3">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
