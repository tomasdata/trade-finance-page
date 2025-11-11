'use client';

import { EximVsBisRatio } from '@/components/global/exim-vs-bis-ratio';
import { EximDeclineAnalysis } from '@/components/global/exim-decline-analysis';
import { EximPymeAccess } from '@/components/global/exim-pyme-access';

export default function EximBisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
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
          <EximDeclineAnalysis />
          <EximPymeAccess />
        </div>
      </div>
    </div>
  );
}
