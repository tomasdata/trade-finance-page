import type React from "react"
import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CountryDetailCardProps {
  icon: LucideIcon
  title: string
  description: string
  children: React.ReactNode
}

export function CountryDetailCard({ icon: Icon, title, description, children }: CountryDetailCardProps) {
  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-600 text-white">
            <Icon className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
