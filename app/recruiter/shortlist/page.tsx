'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  UserCheck,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { AppLayoutShell } from '@/components/navigation/AppLayoutShell';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PS10Notice } from '@/components/common/PS10Notice';

const INITIAL_STAGES = [
  {
    stage: 'Screening Passed',
    count: 88,
    candidates: [
      { id: 'c1', name: 'Rohan Tripathy', reg: '2201106312', branch: 'ECE', cgpa: 7.94, score: 76 },
      { id: 'c2', name: 'Sneha Nayak', reg: '2201106405', branch: 'CSE', cgpa: 8.45, score: 81 },
    ],
  },
  {
    stage: 'Technical Round 1',
    count: 42,
    candidates: [
      { id: 'c3', name: 'Aarav Mohapatra', reg: '2201106284', branch: 'CSE', cgpa: 8.82, score: 84 },
    ],
  },
  {
    stage: 'HR & Final Verification',
    count: 18,
    candidates: [
      { id: 'c4', name: 'Priyanka Das', reg: '2201106190', branch: 'IT', cgpa: 9.15, score: 92 },
    ],
  },
];

export default function RecruiterShortlistPage() {
  const [stages, setStages] = useState(INITIAL_STAGES);

  return (
    <AppLayoutShell role="recruiter">
      <PageHeader
        title="Candidate Shortlisting & Stage Pipeline"
        description="Structured progression of evaluated candidates across technical interviews, lab tests, and final rounds"
        badge="Evaluation Board"
      >
        <Link
          href="/recruiter/schedule"
          className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-500 transition-colors shadow-xs"
        >
          Schedule Next Panel
          <Calendar className="h-3.5 w-3.5" />
        </Link>
      </PageHeader>

      <div className="space-y-6">
        <PS10Notice
          moduleName="Recruiter Evaluation & Shortlisting Pipeline"
          nextStepDetail="Foundation shell organizing candidate progressions through multi-panel interview evaluations."
        />

        {/* Columns / Stages Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stages.map((stg, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col h-full"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-sm font-bold text-slate-900">{stg.stage}</h3>
                <span className="rounded-full bg-teal-50 border border-teal-200 px-2.5 py-0.5 text-xs font-bold text-teal-800">
                  {stg.count}
                </span>
              </div>

              <div className="space-y-3 flex-1">
                {stg.candidates.map((cand) => (
                  <div
                    key={cand.id}
                    className="rounded-lg border border-slate-100 bg-slate-50/70 p-3.5 hover:border-slate-200 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">{cand.name}</span>
                      <span className="font-bold text-teal-800 text-xs">{cand.score}% AI Score</span>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{cand.branch} · Reg {cand.reg}</span>
                      <span className="font-semibold text-slate-700">CGPA {cand.cgpa}</span>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[10px] text-emerald-700 font-semibold inline-flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Criteria Cleared
                      </span>
                      <button
                        type="button"
                        className="text-[11px] font-semibold text-teal-700 hover:text-teal-900"
                      >
                        Advance Stage →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                <span className="text-[11px] text-slate-400">
                  Total {stg.count} candidates in this pipeline bucket
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayoutShell>
  );
}
