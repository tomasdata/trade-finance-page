'use client';

import dynamic from 'next/dynamic';
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Dynamic imports with SSR disabled
const EximVsBisRatio = dynamic(() => import('@/components/global/exim-vs-bis-ratio').then(mod => ({ default: mod.EximVsBisRatio })), { ssr: false });
const EXIMDeclineAnalysis = dynamic(() => import('@/components/global/exim-decline-analysis').then(mod => ({ default: mod.EXIMDeclineAnalysis })), { ssr: false });
const EXIMPymeAccess = dynamic(() => import('@/components/global/exim-pyme-access').then(mod => ({ default: mod.EXIMPymeAccess })), { ssr: false });

export default function EximBisPage() {
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
            Financiamiento Comercial Global
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Análisis integrado de las fuentes de financiamiento comercial: Export-Import Bank (EXIM) 
            y exposiciones bancarias internacionales (BIS).
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Fuentes: EXIM Bank (2007-2025), BIS Consolidated Banking Statistics (1983-2024)
          </p>
        </div>

          <div className="space-y-6">
            <EximVsBisRatio />
            <EXIMDeclineAnalysis />
            <EXIMPymeAccess />
          </div>
        </div>
      </div>
    </div>
  );
}
