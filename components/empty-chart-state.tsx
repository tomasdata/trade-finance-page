import { BarChart3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface EmptyChartStateProps {
  title?: string
  description?: string
}

export function EmptyChartState({
  title = "Visualización en desarrollo",
  description = "Los gráficos y análisis de datos estarán disponibles próximamente",
}: EmptyChartStateProps) {
  return (
    <Card className="border-2 border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
          <BarChart3 className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-md">{description}</p>
      </CardContent>
    </Card>
  )
}
