"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface CountryCardProps {
  flag: string
  name: string
  onClick?: () => void
  hasDetailPage?: boolean
}

export function CountryCard({ flag, name, onClick, hasDetailPage }: CountryCardProps) {
  // If country has a detail page, use Link instead of onClick
  if (hasDetailPage) {
    const countrySlug = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    
    return (
      <Link href={`/paises/${countrySlug}`}>
        <Card className="cursor-pointer border-2 hover:border-teal-500 transition-all hover:shadow-lg hover:-translate-y-1 group relative">
          <CardHeader className="text-center">
            <Badge className="absolute top-2 right-2 text-xs bg-teal-600 hover:bg-teal-700">
              Ver datos
            </Badge>
            <div className="text-6xl mb-3 transform group-hover:scale-110 transition-transform">{flag}</div>
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          </CardHeader>
        </Card>
      </Link>
    )
  }

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
