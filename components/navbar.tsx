"use client"

import { useState } from "react"
import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 md:h-18 items-center justify-between">
        <div className="flex items-center gap-10">
          <a href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-teal-600 to-indigo-600 text-white font-bold text-sm group-hover:shadow-lg transition-shadow">
              TF
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-base leading-none mb-0.5">Trade Finance</div>
              <div className="text-xs text-muted-foreground font-medium">LAC Research</div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            <a
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              Inicio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all" />
            </a>
            <a
              href="/#instruments"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              Instrumentos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all" />
            </a>
            
            {/* Panorama Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group flex items-center gap-1">
                Panorama
                <ChevronDown className="h-3 w-3" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <a href="/panorama/brecha-global" className="cursor-pointer">
                    Brecha Global
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/panorama/retrasos-pagos" className="cursor-pointer">
                    Retrasos de Pagos
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/panorama/exim-bis" className="cursor-pointer">
                    EXIM & BIS
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Países Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group flex items-center gap-1">
                Países
                <ChevronDown className="h-3 w-3" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <a href="/paises/brasil" className="cursor-pointer">
                    🇧🇷 Brasil
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/paises/chile" className="cursor-pointer">
                    🇨🇱 Chile
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/paises/mexico" className="cursor-pointer">
                    🇲🇽 México
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/paises/peru" className="cursor-pointer">
                    🇵🇪 Perú
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <a
              href="/datos"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              Datos & Análisis
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all" />
            </a>
            <a
              href="/#global"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              Global
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all" />
            </a>
          </div>
        </div>

        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-4 mt-8">
                <a
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium py-2 px-3 rounded-lg hover:bg-muted transition-colors"
                >
                  Inicio
                </a>
                <a
                  href="/#instruments"
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium py-2 px-3 rounded-lg hover:bg-muted transition-colors"
                >
                  Instrumentos
                </a>
                
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-muted-foreground px-3">Panorama</div>
                  <a
                    href="/panorama/brecha-global"
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium py-2 px-6 rounded-lg hover:bg-muted transition-colors block"
                  >
                    Brecha Global
                  </a>
                  <a
                    href="/panorama/retrasos-pagos"
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium py-2 px-6 rounded-lg hover:bg-muted transition-colors block"
                  >
                    Retrasos de Pagos
                  </a>
                  <a
                    href="/panorama/exim-bis"
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium py-2 px-6 rounded-lg hover:bg-muted transition-colors block"
                  >
                    EXIM & BIS
                  </a>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-semibold text-muted-foreground px-3">Países</div>
                  <a
                    href="/paises/brasil"
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium py-2 px-6 rounded-lg hover:bg-muted transition-colors block"
                  >
                    🇧🇷 Brasil
                  </a>
                  <a
                    href="/paises/chile"
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium py-2 px-6 rounded-lg hover:bg-muted transition-colors block"
                  >
                    🇨🇱 Chile
                  </a>
                  <a
                    href="/paises/mexico"
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium py-2 px-6 rounded-lg hover:bg-muted transition-colors block"
                  >
                    🇲🇽 México
                  </a>
                  <a
                    href="/paises/peru"
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium py-2 px-6 rounded-lg hover:bg-muted transition-colors block"
                  >
                    🇵🇪 Perú
                  </a>
                </div>
                
                <a
                  href="/datos"
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium py-2 px-3 rounded-lg hover:bg-muted transition-colors"
                >
                  Datos & Análisis
                </a>
                <a
                  href="/#global"
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium py-2 px-3 rounded-lg hover:bg-muted transition-colors"
                >
                  Perspectiva Global
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
