import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, type LucideIcon } from "lucide-react"

interface GlobalInitiativeCardProps {
  icon: LucideIcon
  title: string
  region: string
  description: string
  impact: {
    label: string
    value: string
  }[]
  sources?: {
    title: string
    url: string
  }[]
}

export function GlobalInitiativeCard({
  icon: Icon,
  title,
  region,
  description,
  impact,
  sources,
}: GlobalInitiativeCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <Badge variant="secondary">{region}</Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {impact.map((metric, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded-md">
              <span className="text-xs text-muted-foreground">{metric.label}</span>
              <span className="text-sm font-semibold">{metric.value}</span>
            </div>
          ))}
        </div>

        {sources && sources.length > 0 && (
          <div className="pt-3 border-t space-y-2">
            {sources.map((source, idx) => (
              <a
                key={idx}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-xs text-blue-600 hover:text-blue-700 group"
              >
                <ExternalLink className="h-3 w-3 shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                <span className="line-clamp-2">{source.title}</span>
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
