'use client';

import { GlobalGap } from '@/components/global/global-gap';
import { LatamEmphasis } from '@/components/global/latam-emphasis';

export default function BrechaGlobalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Brecha Global de Trade Finance
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Panorama mundial de la brecha de financiamiento comercial, con énfasis en América Latina.
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Fuente: Elaboración propia a partir de Trade Finance and International Business Survey 2023-2025
          </p>
        </div>

        <div className="space-y-6">
          <GlobalGap />
          <LatamEmphasis />
        </div>
      </div>
    </div>
  );
}
