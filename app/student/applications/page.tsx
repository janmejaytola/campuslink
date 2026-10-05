'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  Calendar,
  Building,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { AppLayoutShell } from '@/components/navigation/AppLayoutShell';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PS10Notice } from '@/components/common/PS10Notice';
import { DEMO_STUDENT_APPLICATIONS } from '@/lib/demoData';

export default function StudentApplicationsPage() {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Interview'>('All');

  const filteredApps = DEMO_STUDENT_APPLICATIONS.filter((app) => {
    if (filter === 'Interview') return app.stage === 'Technical Round';
    if (filter === 'Active') return app.stage !== 'Declined';
    return true;
  });

  return (
    <AppLayoutShell role="student">
      <PageHeader
        title="Application Pipeline & Recruitment Stages"
        description="End-to-end recruitment stage monitoring from authenticated submission to final offer rollout"
        badge="Live Tracker"
      >
        <Link
          href="/student/schedule"
          className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-500 transition-colors shadow-xs"
        >
          View Interview Calendar
          <Calendar className="h-3.5 w-3.5" />
        </Link>
      </PageHeader>

      <div className="space-y-6">
        <PS10Notice
          moduleName="Candidate Application State Machine"
          nextStepDetail="Foundation shell monitoring recruitment transitions across screening, coding, technical panels, and HR."
        />

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {(['All', 'Active', 'Interview'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                filter === tab
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab} Applications
            </button>
          ))}
        </div>

        {/* Applications List */}
        <div className="rounded-xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filteredApps.map((app) => (
              <div key={app.id} className="p-5 hover:bg-slate-50/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-base font-bold text-slate-900">{app.company}</h3>
                      <StatusBadge
                        status={app.stage}
                        variant={
                          app.stage === 'Technical Round'
                            ? 'brand'
                            : app.stage === 'Shortlisted'
                            ? 'success'
                            : 'neutral'
                        }
                      />
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{app.jobTitle}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span>Applied: {app.appliedDate}</span>
                      <span>·</span>
                      <span className="text-emerald-700 font-medium">BPUT Dossier Verified</span>
                    </div>
                  </div>

                  {app.nextActionDate && (
                    <div className="rounded-lg bg-slate-50 border border-slate-200/80 p-3 text-left md:text-right min-w-[220px]">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Current Milestone
                      </span>
                      <span className="text-xs font-bold text-slate-800 block mt-0.5">
                        {app.nextActionTitle}
                      </span>
                      <span className="text-[11px] text-teal-700 font-semibold block mt-0.5">
                        {app.nextActionDate}
                      </span>
                    </div>
                  )}
                </div>

                {/* Progress Visualizer */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                    <span>Recruitment Progress</span>
                    <span className="font-semibold text-slate-700">{app.stage} Stage</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {['Submitted', 'Eligibility', 'Shortlist', 'Technical', 'HR', 'Offer'].map(
                      (stepName, i) => {
                        const isDone =
                          (app.stage === 'Technical Round' && i <= 3) ||
                          (app.stage === 'Shortlisted' && i <= 2) ||
                          (app.stage === 'Assessment' && i <= 2);

                        return (
                          <div key={i} className="flex-1">
                            <div
                              className={`h-1.5 rounded-full ${
                                isDone ? 'bg-teal-600' : 'bg-slate-200'
                              }`}
                            />
                            <span className="text-[9px] text-slate-400 block mt-1 truncate">
                              {stepName}
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayoutShell>
  );
}
