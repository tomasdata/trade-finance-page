"use client"

import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface GlobalPreviewCardProps {
  icon: LucideIcon
  title: string
  description: string
  stats: {
    label: string
    value: string
    color: string
  }[]
  onClick: () => void
}

export function GlobalPreviewCard({ icon: Icon, title, description, stats, onClick }: GlobalPreviewCardProps) {
  return (
    <Card
      className="group relative overflow-hidden border-2 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:shadow-xl cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl mb-1">{title}</CardTitle>
              <Badge
                variant="outline"
                className="bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800"
              >
                Comparativo Internacional
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>

        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, idx) => (
            <div key={idx} className={`p-3 rounded-lg border ${stat.color}`}>
              <div className="text-lg font-bold mb-0.5">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          className="w-full group-hover:bg-purple-50 dark:group-hover:bg-purple-950/20 transition-colors"
        >
          Ver análisis completo
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  )
}
