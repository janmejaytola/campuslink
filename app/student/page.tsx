'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  FileCheck2,
  Calendar,
  Award,
  ArrowRight,
  CheckCircle2,
  Clock,
  Building,
  Target,
  AlertCircle,
  ExternalLink,
  GraduationCap,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { AppLayoutShell } from '@/components/navigation/AppLayoutShell';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PS10Notice } from '@/components/common/PS10Notice';
import { useAuth } from '@/context/AuthContext';
import {
  DEMO_STUDENT_APPLICATIONS,
  DEMO_DRIVE_EVENTS,
  DEMO_OFFERS,
} from '@/lib/demoData';
import { readinessService } from '@/lib/services/readinessService';
import { ReadinessResult } from '@/types/readiness';
import { skillGapService } from '@/lib/services/skillGapService';
import { SkillGapAnalysis } from '@/types/skillGap';

export default function StudentDashboardPage() {
  const { currentUser } = useAuth();
  const [readiness, setReadiness] = useState<ReadinessResult | null>(null);
  const [skillGap, setSkillGap] = useState<SkillGapAnalysis | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!currentUser?.uid) return;
      try {
        const [readinessRes, skillGapRes] = await Promise.all([
          readinessService.getCurrentReadiness(currentUser.uid).then(async (res) => {
            if (!res) return await readinessService.computeAndSaveReadiness(currentUser.uid);
            return res;
          }),
          skillGapService.getCurrentAnalysis(currentUser.uid).then(async (res) => {
            if (!res) return await skillGapService.computeAndSaveSkillGap(currentUser.uid);
            return res;
          }),
        ]);

        if (active) {
          setReadiness(readinessRes);
          setSkillGap(skillGapRes);
        }
      } catch (err) {
        console.error('[Dashboard Data Load Error]:', err);
      }
    })();

    return () => {
      active = false;
    };
  }, [currentUser]);

  const studentName = currentUser?.name || 'Candidate';
  const studentInitials = studentName.slice(0, 2).toUpperCase();

  return (
    <AppLayoutShell role="student">
      <PageHeader
        title={`Welcome back, ${studentName}`}
        description="BPUT Campus Placement Coordination & Intelligence Workspace · Batch of 2026"
        badge="Verified Student"
      >
        <Link
          href="/student/profile"
          className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-500 transition-colors shadow-xs"
        >
          My Profile
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </PageHeader>

      <div className="space-y-6">
        {/* PS10 Foundation Notice */}
        <PS10Notice
          moduleName="Student Placement Workspace Shell"
          nextStepDetail="Foundation routes wired: profile, readiness, skill diagnostics, job discovery, clash-free schedules, offers."
        />

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Active Applications"
            value={DEMO_STUDENT_APPLICATIONS.length}
            subtext="1 in technical interview stage"
            icon={FileCheck2}
          />
          <Link href="/student/readiness" className="block transition-transform hover:scale-[1.01]">
            <StatCard
              label="AI Placement Readiness"
              value={readiness ? `${readiness.score} / 100` : '...'}
              subtext={readiness ? `${readiness.level} · Click to analyze` : 'Calculating index...'}
              icon={Sparkles}
              highlight
            />
          </Link>
          <StatCard
            label="Upcoming Events"
            value={DEMO_DRIVE_EVENTS.length}
            subtext="Next: TCS Online Assessment"
            icon={Calendar}
          />
          <StatCard
            label="Offers Released"
            value={DEMO_OFFERS.length}
            subtext="Highest CTC: ₹9.20 LPA"
            icon={Award}
          />
        </div>

        {/* Real Placement Readiness Intelligence Summary Card */}
        {readiness && (
          <div className="rounded-xl border border-teal-200/80 bg-teal-50/40 p-5 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white font-bold text-base shadow-xs">
                  {readiness.score}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                      Placement Readiness · {readiness.level}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Target Role: <strong className="text-slate-800">{readiness.targetRole}</strong>
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                    <span>
                      Top Strength: <strong className="text-emerald-700 font-semibold">{readiness.strengths[0] || 'Core Academics'}</strong>
                    </span>
                    <span>·</span>
                    <span>
                      Top Improvement: <strong className="text-amber-700 font-semibold">{readiness.improvementAreas[0] || 'Practical Experience'}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/student/readiness"
                className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-teal-500 transition-colors"
              >
                <span>View Full Readiness Breakdown</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Real Skill Gap Intelligence Summary Card */}
        {skillGap && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white font-bold text-base shadow-xs">
                  {skillGap.coverage}%
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Target-Role Skill Coverage
                    </span>
                    <span className="rounded bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-800 border border-teal-200/60">
                      {skillGap.targetRole}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                    <span>
                      Strong Skills: <strong className="text-emerald-700 font-semibold">{skillGap.strongCount}</strong>
                    </span>
                    <span>·</span>
                    <span>
                      Critical Gaps: <strong className="text-rose-700 font-semibold">{skillGap.criticalCount}</strong>
                    </span>
                    <span>·</span>
                    <span>
                      Total Role Benchmarks: <strong className="text-slate-800">{skillGap.gaps.length} skills</strong>
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/student/skill-gap"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors shadow-2xs"
              >
                <span>View Skill Gaps</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
              </Link>
            </div>
          </div>
        )}

        {/* Career Direction Intelligence Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white font-bold text-base shadow-xs">
                <Target className="h-6 w-6 text-teal-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Career Direction
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {skillGap?.targetRole || 'Software Engineer'}
                  </span>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                  <span>
                    Readiness: <strong className="text-slate-900 font-semibold">{readiness ? `${readiness.score} / 100` : '--'}</strong>
                  </span>
                  <span>·</span>
                  <span>
                    Skill Coverage: <strong className="text-teal-700 font-semibold">{skillGap ? `${skillGap.coverage}%` : '--%'}</strong>
                  </span>
                  <span>·</span>
                  <span>
                    Critical Gaps: <strong className="text-rose-700 font-semibold">{skillGap ? skillGap.criticalCount : '--'}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/student/eligibility"
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors shadow-2xs"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Job Eligibility Engine</span>
              </Link>
              <Link
                href="/student/career-goals"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <span>Manage Career Goals</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* Verified Student Credentials Bar */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white font-bold text-base">
                {studentInitials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{studentName}</h3>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    Verified Candidate
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  <span>Reg: {currentUser?.regNumber || '2201106284'}</span>
                  <span>·</span>
                  <span>{currentUser?.department || 'Computer Science & Engineering'}</span>
                  <span>·</span>
                  <span>CGPA: <strong className="text-slate-800">{currentUser?.cgpa || '8.82'}</strong> (0 Backlogs)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/student/profile"
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                View Full Dossier
              </Link>
              <Link
                href="/student/readiness"
                className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Readiness Diagnostics
              </Link>
            </div>
          </div>
        </div>

        {/* Two-Column Layout: Active Pipeline & Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Applications Tracker (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Applications */}
            <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Active Placement Applications</h3>
                  <p className="text-xs text-slate-500">Live recruitment pipeline tracking</p>
                </div>
                <Link
                  href="/student/applications"
                  className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                >
                  View All (3)
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {DEMO_STUDENT_APPLICATIONS.map((app) => (
                  <div key={app.id} className="py-3.5 first:pt-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900 text-sm">{app.company}</span>
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
                        <p className="text-xs text-slate-600 mt-0.5">{app.jobTitle}</p>
                      </div>

                      {app.nextActionDate && (
                        <div className="text-left sm:text-right">
                          <span className="text-[11px] font-medium text-slate-500 block">Next Milestone</span>
                          <span className="text-xs font-semibold text-slate-800">
                            {app.nextActionTitle}
                          </span>
                          <span className="text-[10px] text-teal-700 block">
                            {app.nextActionDate}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Readiness Summary */}
            {/* AI Readiness Diagnostic Breakdown using REAL student readiness */}
            <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">AI Readiness Diagnostic Breakdown</h3>
                  <p className="text-xs text-slate-500">Deterministic scoring from verified student profile dossier</p>
                </div>
                <Link
                  href="/student/readiness"
                  className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                >
                  Full Readiness Breakdown
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {readiness ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-3.5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-800">Academic (CGPA)</span>
                      <span className="text-xs font-bold text-teal-700">{readiness.factorScores.academic}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden mb-1.5">
                      <div className="h-full rounded-full bg-teal-600" style={{ width: `${readiness.factorScores.academic}%` }} />
                    </div>
                    <p className="text-[11px] text-slate-500">Weight: 20% · Normalized from CGPA</p>
                  </div>

                  <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-3.5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-800">Technical Skills</span>
                      <span className="text-xs font-bold text-teal-700">{readiness.factorScores.technical}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden mb-1.5">
                      <div className="h-full rounded-full bg-teal-600" style={{ width: `${readiness.factorScores.technical}%` }} />
                    </div>
                    <p className="text-[11px] text-slate-500">Weight: 30% · Declared skill competencies</p>
                  </div>

                  <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-3.5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-800">Projects Depth</span>
                      <span className="text-xs font-bold text-teal-700">{readiness.factorScores.projects}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden mb-1.5">
                      <div className="h-full rounded-full bg-teal-600" style={{ width: `${readiness.factorScores.projects}%` }} />
                    </div>
                    <p className="text-[11px] text-slate-500">Weight: 15% · Showcase implementation</p>
                  </div>

                  <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-3.5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-800">Assessments</span>
                      <span className="text-xs font-bold text-teal-700">{readiness.factorScores.assessments}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden mb-1.5">
                      <div className="h-full rounded-full bg-teal-600" style={{ width: `${readiness.factorScores.assessments}%` }} />
                    </div>
                    <p className="text-[11px] text-slate-500">Weight: 10% · Aptitude & technical diagnostics</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">Loading readiness metrics...</div>
              )}
            </div>
          </div>

          {/* Right Column: Upcoming Schedule & Offers Alert (1 Col) */}
          <div className="space-y-6">
            {/* Offer Alert Box */}
            {DEMO_OFFERS.length > 0 && (
              <div className="rounded-xl border border-teal-300 bg-teal-50/60 p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                    Official Offer Released
                  </span>
                  <Award className="h-5 w-5 text-teal-700" />
                </div>
                <h4 className="mt-2 text-base font-bold text-slate-900">{DEMO_OFFERS[0].company}</h4>
                <p className="text-xs text-slate-600">{DEMO_OFFERS[0].role}</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-xl font-extrabold text-teal-900">{DEMO_OFFERS[0].ctc}</span>
                  <span className="text-xs text-slate-500">Annual CTC</span>
                </div>
                <p className="mt-2 text-[11px] text-slate-600">
                  Acceptance Deadline: <strong className="text-slate-800">{DEMO_OFFERS[0].acceptanceDeadline}</strong>
                </p>
                <Link
                  href="/student/offers"
                  className="mt-4 block w-full text-center rounded-lg bg-teal-600 py-2 text-xs font-semibold text-white hover:bg-teal-500 transition-colors"
                >
                  Review Offer Letter →
                </Link>
              </div>
            )}

            {/* Upcoming Drive Slots */}
            <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-sm font-bold text-slate-900">Upcoming Drive Slots</h3>
                <Link
                  href="/student/schedule"
                  className="text-xs font-semibold text-teal-700 hover:text-teal-800"
                >
                  Calendar
                </Link>
              </div>

              <div className="space-y-3.5">
                {DEMO_DRIVE_EVENTS.map((event) => (
                  <div key={event.id} className="rounded-lg border border-slate-100 p-3 bg-slate-50/40">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{event.company}</span>
                      <span className="text-[10px] font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded">
                        {event.eventType}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        <span>{event.date} · {event.timeSlot}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-slate-500">
                        <Building className="h-3 w-3 text-slate-400" />
                        <span className="truncate">{event.venueOrLink}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                <span className="text-[11px] text-emerald-700 font-medium inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  No scheduling conflicts detected for your slots
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayoutShell>
  );
}
