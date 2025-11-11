"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"

interface CountryCardProps {
  flag: string
  name: string
  onClick?: () => void
}

export function CountryCard({ flag, name, onClick }: CountryCardProps) {
  return (
    <Card
      className="cursor-pointer border-2 hover:border-teal-500 transition-all hover:shadow-lg hover:-translate-y-1 group"
      onClick={() => {
        if (onClick) onClick()
        // Smooth scroll to countries section
        document.getElementById("countries")?.scrollIntoView({ behavior: "smooth" })
      }}
    >
      <CardHeader className="text-center">
        <div className="text-6xl mb-3 transform group-hover:scale-110 transition-transform">{flag}</div>
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
      </CardHeader>
    </Card>
  )
}
