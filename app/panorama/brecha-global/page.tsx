'use client';

import dynamic from 'next/dynamic';
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Dynamic imports with SSR disabled
const EximVsBisRatio = dynamic(() => import('@/components/global/exim-vs-bis-ratio').then(mod => ({ default: mod.EximVsBisRatio })), { ssr: false });
const BISLendersSankey = dynamic(() => import('@/components/global/bis-lenders-sankey').then(mod => ({ default: mod.BISLendersSankey })), { ssr: false });

export default function BrechaGlobalPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <a href="/" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio
              </a>
            </Button>
          </div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Brecha Global de Trade Finance
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Panorama mundial de la brecha de financiamiento comercial, con énfasis en América Latina.
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Fuente: Elaboración propia a partir de EXIM Bank y BIS (2007-2024)
          </p>
        </div>

          <div className="space-y-6">
            <EximVsBisRatio />
            <BISLendersSankey />
          </div>
        </div>
      </div>
    </div>
  );
}
