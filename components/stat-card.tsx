import type { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string
  comingSoon?: boolean
  trend?: "up" | "down"
}

export function StatCard({ icon: Icon, label, value, comingSoon, trend }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 text-white">
            <Icon className="h-6 w-6" />
          </div>
          {comingSoon && (
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
              Próximamente
            </span>
          )}
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>

      {trend && (
        <div className={`absolute bottom-0 left-0 right-0 h-1 ${trend === "up" ? "bg-green-500" : "bg-red-500"}`} />
      )}
    </Card>
  )
}
