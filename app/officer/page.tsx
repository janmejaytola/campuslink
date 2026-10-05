'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  Building2,
  CalendarDays,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Plus,
  ShieldCheck,
  Download,
  Filter,
} from 'lucide-react';
import { AppLayoutShell } from '@/components/navigation/AppLayoutShell';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PS10Notice } from '@/components/common/PS10Notice';
import { useAuth } from '@/context/AuthContext';
import { DEMO_OFFICER_STUDENTS, DEMO_JOBS, DEMO_DRIVE_EVENTS } from '@/lib/demoData';

export default function OfficerDashboardPage() {
  const { currentUser } = useAuth();

  return (
    <AppLayoutShell role="officer">
      <PageHeader
        title="Training & Placement Office (TPO) Console"
        description="Central university placement coordination, drive oversight, and institutional intelligence"
        badge="University Admin"
      >
        <div className="flex items-center gap-2">
          <Link
            href="/officer/drives"
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-500 transition-colors shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            Manage Drives
          </Link>
          <Link
            href="/officer/analytics"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <BarChart3 className="h-3.5 w-3.5 text-teal-600" />
            Analytics
          </Link>
        </div>
      </PageHeader>

      <div className="space-y-6">
        <PS10Notice
          moduleName="Placement Officer Central Authority Shell"
          nextStepDetail="Foundation shell monitoring batch eligibility, multi-company drive coordination, and conflict-free campus scheduling."
        />

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Eligible 2026 Batch"
            value="1,420"
            subtext="Across BPUT Engineering Disciplines"
            icon={Users}
            highlight
          />
          <StatCard
            label="Active Campus Drives"
            value="6 Live"
            subtext="TCS, Deloitte, Amazon, L&T, etc."
            icon={Building2}
          />
          <StatCard
            label="Placement Rate"
            value="72.4%"
            subtext="Targeting 90%+ for 2026 cohort"
            icon={BarChart3}
            trend={{ value: '6.2% vs 2025', positive: true }}
          />
          <StatCard
            label="Scheduling Conflicts"
            value="0 Clashes"
            subtext="All 300 lab slots conflict-free"
            icon={CalendarDays}
          />
        </div>

        {/* Live Drives & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main 2 Cols: Master Student Registry Preview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Student Placement Registry Preview</h3>
                  <p className="text-xs text-slate-500">Verified BPUT candidate profiles (Batch of 2026)</p>
                </div>
                <Link
                  href="/officer/students"
                  className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                >
                  View Full Registry
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/75 border-b border-slate-200/80 text-slate-600 uppercase tracking-wider text-[11px] font-semibold">
                    <tr>
                      <th className="py-3 px-4">Reg No</th>
                      <th className="py-3 px-4">Student Name</th>
                      <th className="py-3 px-4">Branch</th>
                      <th className="py-3 px-4">CGPA</th>
                      <th className="py-3 px-4">Placement Status</th>
                      <th className="py-3 px-4">AI Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {DEMO_OFFICER_STUDENTS.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4 font-mono font-medium text-slate-800">{s.regNo}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900">{s.name}</td>
                        <td className="py-3 px-4 text-slate-600">{s.branch}</td>
                        <td className="py-3 px-4 font-bold text-slate-900">{s.cgpa}</td>
                        <td className="py-3 px-4">
                          <StatusBadge
                            status={s.placementStatus}
                            variant={s.placementStatus.includes('Offered') ? 'success' : 'neutral'}
                          />
                        </td>
                        <td className="py-3 px-4 font-bold text-teal-800">{s.readinessScore}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Active Drives Monitor */}
            <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-sm font-bold text-slate-900">Active Placement Drives Pipeline</h3>
                <Link href="/officer/drives" className="text-xs font-semibold text-teal-700 hover:text-teal-800">
                  Manage Drives
                </Link>
              </div>

              <div className="space-y-3">
                {DEMO_JOBS.slice(0, 3).map((job) => (
                  <div
                    key={job.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-slate-100 p-3.5 bg-slate-50/50"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">{job.company}</span>
                        <span className="text-[10px] font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded">
                          {job.packageCTC}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{job.title}</p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-600">
                      <span>{job.applicantsCount} Applicants</span>
                      <span>·</span>
                      <span className="font-semibold text-teal-700">{job.shortlistedCount} Shortlisted</span>
                      <span>·</span>
                      <span>Deadline: {job.deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Venue Coordination & Support Notices */}
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">
                Campus Infrastructure & Lab Slots
              </h3>

              <div className="space-y-3 text-xs">
                <div className="rounded-lg border border-slate-100 p-3 bg-slate-50/50">
                  <div className="flex items-center justify-between font-semibold text-slate-800">
                    <span>Central Computing Lab 1 & 2</span>
                    <span className="text-emerald-700 font-bold">Available (300 PCs)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Allocated for TCS Digital Online Assessment (Oct 10, 10:00 AM)
                  </p>
                </div>

                <div className="rounded-lg border border-slate-100 p-3 bg-slate-50/50">
                  <div className="flex items-center justify-between font-semibold text-slate-800">
                    <span>Placement Block Interview Rooms (1-8)</span>
                    <span className="text-emerald-700 font-bold">Ready</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Wired for hybrid virtual + offline panel interviews with high-speed uplink.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <Link
                  href="/officer/scheduling"
                  className="block text-center rounded-lg bg-slate-900 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
                >
                  Manage Venue Allocations →
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-5 shadow-xs text-xs text-slate-800">
              <div className="flex items-center gap-2 text-teal-900 font-bold mb-2">
                <ShieldCheck className="h-4 w-4 text-teal-700" />
                <span>BPUT Central Verification Policy</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Deterministic eligibility rule checks ensure zero ineligible candidate submissions.
                All student CGPAs are locked against controller of examinations grade reports.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayoutShell>
  );
}
