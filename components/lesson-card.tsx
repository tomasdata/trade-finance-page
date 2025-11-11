import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"

interface LessonCardProps {
  icon: LucideIcon
  title: string
  description: string
  applicability: "Alta" | "Media"
}

export function LessonCard({ icon: Icon, title, description, applicability }: LessonCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <Badge variant={applicability === "Alta" ? "default" : "secondary"}>Aplicabilidad {applicability}</Badge>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
