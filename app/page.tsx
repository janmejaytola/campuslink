'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  ShieldCheck,
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  CalendarDays,
  Target,
  FileText,
  BarChart3,
  Users,
  ChevronRight,
  Layers,
  Cpu,
  Clock,
  Building,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { StrictRole, ROLE_LABELS, ROLE_DASHBOARD_ROUTES } from '@/types/auth';

export default function LandingPage() {
  const router = useRouter();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [selectedRolePreview, setSelectedRolePreview] = useState<StrictRole>('STUDENT');

  const handleLaunchRole = (role: StrictRole) => {
    setSelectedRolePreview(role);
    if (isAuthenticated && currentUser?.role === role) {
      router.push(ROLE_DASHBOARD_ROUTES[role]);
    } else {
      router.push(`/login`);
    }
  };

  const journeySteps = [
    { num: '01', title: 'Student Profile', desc: 'Verified academic credentials, BPUT reg no, and verified CGPA' },
    { num: '02', title: 'Resume Upload', desc: 'Secure document storage with multi-version tracking' },
    { num: '03', title: 'AI Resume Extraction', desc: 'Structured entity parsing of skills, projects, and coursework' },
    { num: '04', title: 'AI Readiness Benchmark', desc: 'Rubric-based evaluation across technical and behavioral readiness' },
    { num: '05', title: 'Skill Gap Analysis', desc: 'Deterministic delta against industry job requirements' },
    { num: '06', title: 'Target Career Role', desc: 'Personalized pathway mapping for high-probability placements' },
    { num: '07', title: 'Recruiter Job Creation', desc: 'Structured criteria builder with branch and CGPA filters' },
    { num: '08', title: 'AI JD Parsing', desc: 'Extraction of core competencies, interview rounds, and qualifications' },
    { num: '09', title: 'Deterministic Eligibility', desc: 'Zero-hallucination rule check on graduation year, branch & CGPA' },
    { num: '10', title: 'Explainable Matching', desc: 'Transparent breakdown of candidate suitability' },
    { num: '11', title: 'Drive Applications', desc: 'One-click authenticated student submission pipeline' },
    { num: '12', title: 'Shortlisting Engine', desc: 'Recruiter multi-stage candidate pipeline management' },
    { num: '13', title: 'Conflict-Aware Scheduling', desc: 'Automated clash detection across parallel interviews and venue labs' },
    { num: '14', title: 'Instant Notifications', desc: 'Real-time multi-channel alerts for slots, rounds, and results' },
    { num: '15', title: 'Offers & Documents', desc: 'Official offer rollouts, document verification, and central TPO analytics' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white font-bold tracking-wider">
              CL
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-slate-900">CAMPUSLINK</span>
                <span className="rounded bg-teal-50 border border-teal-200 px-1.5 py-0.5 text-[10px] font-semibold text-teal-800">
                  PS10
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Campus Placement Intelligence Platform
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#roles" className="hover:text-teal-700 transition-colors">
              Platform Roles
            </a>
            <a href="#journey" className="hover:text-teal-700 transition-colors">
              Placement Journey
            </a>
            <a href="#architecture" className="hover:text-teal-700 transition-colors">
              Hackathon Architecture
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated && currentUser ? (
              <>
                <Link
                  href={ROLE_DASHBOARD_ROUTES[currentUser.role]}
                  className="rounded-lg bg-teal-600 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-teal-500 transition-colors shadow-xs"
                >
                  My Dashboard ({ROLE_LABELS[currentUser.role]})
                </Link>
                <button
                  onClick={() => logout()}
                  className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-teal-600 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-teal-500 transition-colors shadow-xs"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-900 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-teal-500" />
              BPUT Hackathon 2026 · Problem Statement PS10
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
              AI-Powered Campus Placement Intelligence & Coordination
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
              CAMPUSLINK bridges students, placement officers, and enterprise recruiters into a unified,
              conflict-aware placement orchestration ecosystem. Built to eliminate placement friction with
              explainable readiness, deterministic eligibility, and automated scheduling.
            </p>

            {/* Quick Persona Launch Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => handleLaunchRole('STUDENT')}
                className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-teal-500 transition-all"
              >
                <GraduationCap className="h-4 w-4" />
                Explore as Student
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => handleLaunchRole('PLACEMENT_OFFICER')}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-xs hover:bg-slate-50 transition-all"
              >
                <ShieldCheck className="h-4 w-4 text-teal-600" />
                Placement Officer Console
              </button>

              <button
                onClick={() => handleLaunchRole('RECRUITER')}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-xs hover:bg-slate-50 transition-all"
              >
                <Briefcase className="h-4 w-4 text-teal-600" />
                Recruiter Portal
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Firebase Authentication enabled. Sign in to your verified CAMPUSLINK account to access your workspace.
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars / Roles Section */}
      <section id="roles" className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              User Roles & Experience
            </h2>
            <p className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Tailored Workspaces for Every Placement Stakeholder
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Select a persona below to preview key features and launch its dedicated dashboard shell.
            </p>
          </div>

          {/* Role Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student Card */}
            <div
              className={`rounded-2xl border bg-white p-6 transition-all ${
                selectedRolePreview === 'STUDENT'
                  ? 'border-teal-500 ring-2 ring-teal-500/20 shadow-md'
                  : 'border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700 border border-teal-100">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Role 01
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Student Portal</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Empower candidates with structured profile verification, readiness insights, skill gaps,
                clash-free interview calendars, and verified offer letters.
              </p>
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                {[
                  'Verified academic profile & resume vault',
                  'AI readiness score & skill gap diagnostics',
                  'Direct campus drive discovery & 1-click apply',
                  'Live interview rounds tracking & offer downloads',
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-2">
                <button
                  onClick={() => handleLaunchRole('STUDENT')}
                  className="w-full rounded-lg bg-teal-600 py-2.5 text-xs font-semibold text-white hover:bg-teal-500 transition-colors"
                >
                  Enter Student Portal →
                </button>
              </div>
            </div>

            {/* Placement Officer Card */}
            <div
              className={`rounded-2xl border bg-white p-6 transition-all ${
                selectedRolePreview === 'PLACEMENT_OFFICER'
                  ? 'border-teal-500 ring-2 ring-teal-500/20 shadow-md'
                  : 'border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Role 02
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Placement Officer (TPO)</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Centralized university administration for student registry management, drive approvals,
                venue allocation, grievance handling, and institutional analytics.
              </p>
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                {[
                  'Master student registry with batch verification',
                  'Placement drive orchestration & company approvals',
                  'Conflict-aware interview venue & lab scheduling',
                  'Real-time branch-wise placement % analytics',
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-2">
                <button
                  onClick={() => handleLaunchRole('PLACEMENT_OFFICER')}
                  className="w-full rounded-lg bg-slate-900 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
                >
                  Enter TPO Console →
                </button>
              </div>
            </div>

            {/* Recruiter Card */}
            <div
              className={`rounded-2xl border bg-white p-6 transition-all ${
                selectedRolePreview === 'RECRUITER'
                  ? 'border-teal-500 ring-2 ring-teal-500/20 shadow-md'
                  : 'border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-100">
                  <Briefcase className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Role 03
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Recruiter Console</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Structured recruitment pipeline for enterprise talent partners: post job openings, filter
                verified student pools, conduct shortlists, and roll out digital offer letters.
              </p>
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                {[
                  'Structured job postings with branch & CGPA rules',
                  'Filtered candidate database with readiness metrics',
                  'Stage-by-stage shortlisting & interview slots',
                  'Digital offer letter generation & tracking',
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-2">
                <button
                  onClick={() => handleLaunchRole('RECRUITER')}
                  className="w-full rounded-lg bg-teal-700 py-2.5 text-xs font-semibold text-white hover:bg-teal-600 transition-colors"
                >
                  Enter Recruiter Console →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Product Journey Section */}
      <section id="journey" className="py-16 sm:py-20 bg-white border-t border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              End-to-End Orchestration
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Core 15-Step Placement Journey
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              CAMPUSLINK provides an unbroken chain from student resume intake to final institutional analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {journeySteps.map((step) => (
              <div
                key={step.num}
                className="flex items-start gap-3.5 rounded-xl border border-slate-200/90 bg-[#F8FAFC] p-4 transition-colors hover:border-teal-300"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-xs font-bold text-white">
                  {step.num}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{step.title}</h4>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hackathon PS10 Architecture Highlights */}
      <section id="architecture" className="py-16 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12 shadow-xs">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-md bg-teal-50 border border-teal-200 px-2.5 py-1 text-xs font-semibold text-teal-800 mb-4">
                Architecture Standard
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                Built for Expansion · BPUT Hackathon 2026 (PS10)
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                In strict adherence to the problem statement specifications, this foundation release
                establishes the complete enterprise route architecture, role-aware shells, responsive sidebar &
                top navigation, and state separation. In subsequent iterations, deep AI parsing engines and
                deterministic matching pipelines will be integrated on top of these verified foundations.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 pt-2">
                <Link
                  href="/login"
                  className="rounded-lg bg-teal-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-teal-500 transition-colors"
                >
                  Access Platform Portals
                </Link>
                <Link
                  href="/student"
                  className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  View Student Shell
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-teal-600 text-white font-bold text-[10px]">
              CL
            </div>
            <span className="font-semibold text-slate-800">CAMPUSLINK</span>
            <span>· BPUT Hackathon 2026 Problem Statement PS10</span>
          </div>
          <div>
            <span>Designed for Biju Patnaik University of Technology & Affiliated Colleges</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
