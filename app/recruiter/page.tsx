'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Users,
  UserCheck,
  CalendarDays,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
  Building,
  Award,
  Sparkles,
  Upload,
  Eye,
  MapPin,
  Loader2,
} from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AppLayoutShell } from '@/components/navigation/AppLayoutShell';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { PS10Notice } from '@/components/common/PS10Notice';
import { useAuth } from '@/context/AuthContext';
import { jobService } from '@/lib/services/jobService';
import { RecruiterJob, WORK_MODE_LABELS, EMPLOYMENT_TYPE_LABELS } from '@/types/job';

export default function RecruiterDashboardPage() {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState<RecruiterJob[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!currentUser?.uid) return;
      try {
        const data = await jobService.getRecruiterJobs(currentUser.uid);
        if (active) setJobs(data);
      } catch (err) {
        console.error('[Dashboard Load Jobs Error]:', err);
      } finally {
        if (active) setIsLoadingJobs(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [currentUser]);

  const totalJobs = jobs.length;
  const draftJobs = jobs.filter((j) => j.status === 'DRAFT').length;
  const openJobs = jobs.filter((j) => j.status === 'OPEN').length;
  const closedJobs = jobs.filter((j) => j.status === 'CLOSED').length;
  const recentJobs = jobs.slice(0, 5);

  return (
    <ProtectedRoute allowedRole="RECRUITER">
      <AppLayoutShell role="recruiter">
        <PageHeader
          title={`${currentUser?.company || currentUser?.name || 'Enterprise Partner'} · Recruiter Hub`}
          description="Structured campus hiring pipeline, JD parsing, candidate pool filtering, and digital offer rollout"
          badge="Enterprise Partner"
        >
          <div className="flex items-center gap-2">
            <Link
              href="/recruiter/jobs/new?tab=upload"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <Upload className="h-3.5 w-3.5 text-teal-600" />
              Upload JD
            </Link>
            <Link
              href="/recruiter/jobs/new"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-500 transition-colors shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              Create Job Opening
            </Link>
          </div>
        </PageHeader>

        <div className="space-y-6">
          <PS10Notice
            moduleName="Recruiter Talent Acquisition Console"
            nextStepDetail="Step 8: Position criteria definition, AI JD parsing, cut-off whitelisting, and structured job requirements."
          />

          {/* Top Metric Cards: Jobs Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link href="/recruiter/jobs" className="block transition-transform hover:scale-[1.01]">
              <StatCard
                label="Total Jobs Created"
                value={`${totalJobs} Roles`}
                subtext="Managed by your organization"
                icon={Briefcase}
                highlight
              />
            </Link>
            <Link href="/recruiter/jobs" className="block transition-transform hover:scale-[1.01]">
              <StatCard
                label="Open & Active"
                value={`${openJobs} Open`}
                subtext="Accepting student applications"
                icon={CheckCircle2}
              />
            </Link>
            <Link href="/recruiter/jobs" className="block transition-transform hover:scale-[1.01]">
              <StatCard
                label="Draft Positions"
                value={`${draftJobs} Draft`}
                subtext="Pending publishing review"
                icon={Clock}
              />
            </Link>
            <Link href="/recruiter/jobs" className="block transition-transform hover:scale-[1.01]">
              <StatCard
                label="Closed Positions"
                value={`${closedJobs} Closed`}
                subtext="Completed placement cycles"
                icon={Award}
              />
            </Link>
          </div>

          {/* Active Openings & Candidate Pipeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main 2 Cols: Active Job Postings */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Your Recent Job Postings</h3>
                    <p className="text-xs text-slate-500">
                      Configured criteria, mandatory skill thresholds, and application status
                    </p>
                  </div>
                  <Link
                    href="/recruiter/jobs"
                    className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                  >
                    <span>Manage Jobs</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                {isLoadingJobs ? (
                  <div className="py-8 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
                    <span>Loading positions from Firestore...</span>
                  </div>
                ) : recentJobs.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center bg-slate-50/50">
                    <Briefcase className="mx-auto h-8 w-8 text-slate-300" />
                    <h4 className="mt-2 text-xs font-bold text-slate-800">No jobs posted yet</h4>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Create your first campus position or upload a JD to start.
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <Link
                        href="/recruiter/jobs/new"
                        className="inline-flex items-center gap-1 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-500"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Create Job</span>
                      </Link>
                      <Link
                        href="/recruiter/jobs/new?tab=upload"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <Upload className="h-3 w-3 text-teal-600" />
                        <span>Upload JD</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentJobs.map((job) => (
                      <div
                        key={job.id}
                        className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 hover:border-slate-200 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/recruiter/jobs/${job.id}`}
                                className="text-sm font-bold text-slate-900 hover:text-teal-700 transition-colors"
                              >
                                {job.title}
                              </Link>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  job.status === 'OPEN'
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                    : job.status === 'DRAFT'
                                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                                }`}
                              >
                                {job.status}
                              </span>
                              {job.aiParsed && (
                                <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-teal-800 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                                  <Sparkles className="h-2.5 w-2.5 text-teal-600" />
                                  AI Parsed
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                              <span>{job.company}</span>
                              <span>·</span>
                              <span>{job.location}</span>
                              <span>·</span>
                              <span>
                                Min CGPA: <strong className="text-slate-700">{job.eligibility.minCgpa ?? 'None'}</strong>
                              </span>
                              <span>·</span>
                              <span>
                                Package:{' '}
                                <strong className="text-slate-700 font-mono">
                                  {job.salaryMin != null && job.salaryMax != null
                                    ? `₹${job.salaryMin} - ₹${job.salaryMax} LPA`
                                    : 'Negotiable'}
                                </strong>
                              </span>
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <Link
                              href={`/recruiter/jobs/${job.id}`}
                              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
                            >
                              View Position
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Action Banner */}
              <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-teal-950">
                    Need to add another campus placement opportunity?
                  </h4>
                  <p className="text-xs text-teal-800 mt-0.5">
                    Define custom branch eligibility, minimum CGPA thresholds, and required skill rubrics.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href="/recruiter/jobs/new?tab=upload"
                    className="rounded-lg border border-teal-300 bg-white px-3 py-1.5 text-xs font-semibold text-teal-900 hover:bg-teal-50 transition-colors text-center"
                  >
                    Upload JD
                  </Link>
                  <Link
                    href="/recruiter/jobs/new"
                    className="rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-500 transition-colors text-center shadow-xs"
                  >
                    Create Job
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Col: Recruitment Schedule & Panel Slots */}
            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">
                  Campus Placement Drive Calendar
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="rounded-lg border border-slate-100 p-3 bg-slate-50/50">
                    <span className="text-xs font-bold text-slate-900 block">
                      Online Coding Assessment Round
                    </span>
                    <span className="text-[11px] text-teal-700 font-semibold block mt-0.5">
                      Oct 10, 2026 · 10:00 AM - 12:30 PM
                    </span>
                    <p className="text-slate-500 text-[11px] mt-1">
                      Central Computing Lab 1 & 2 (300 PC terminals allocated)
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-100 p-3 bg-slate-50/50">
                    <span className="text-xs font-bold text-slate-900 block">
                      Technical & Architecture Interviews
                    </span>
                    <span className="text-[11px] text-teal-700 font-semibold block mt-0.5">
                      Oct 11, 2026 · 09:30 AM - 05:00 PM
                    </span>
                    <p className="text-slate-500 text-[11px] mt-1">
                      Online Meet Panel A, B & C (50 shortlisted candidates)
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                  <Link
                    href="/recruiter/jobs"
                    className="text-xs font-semibold text-teal-700 hover:text-teal-800"
                  >
                    View All Active Roles ({totalJobs}) &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayoutShell>
    </ProtectedRoute>
  );
}
