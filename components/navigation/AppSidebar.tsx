'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Sparkles,
  Target,
  Briefcase,
  FileCheck2,
  Calendar,
  Award,
  FolderLock,
  Users,
  Building2,
  CalendarDays,
  LifeBuoy,
  BarChart3,
  UserCheck,
  CheckCircle2,
  GraduationCap,
  X,
  LogOut,
  Bell,
  ShieldCheck,
  Scale,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { RouteRole, ROLE_LABELS, StrictRole } from '@/types/auth';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const STUDENT_NAV: NavItem[] = [
  { label: 'Dashboard', href: '/student', icon: LayoutDashboard },
  { label: 'My Profile', href: '/student/profile', icon: User },
  { label: 'Resume', href: '/student/resume', icon: FolderLock },
  { label: 'AI Readiness', href: '/student/readiness', icon: Sparkles },
  { label: 'Skill Gap', href: '/student/skill-gap', icon: Target },
  { label: 'Career Goals', href: '/student/career-goals', icon: Award },
  { label: 'Job Eligibility', href: '/student/eligibility', icon: ShieldCheck },
  { label: 'Job Matches', href: '/student/job-matches', icon: Sparkles, badge: 'Fit' },
  { label: 'Jobs', href: '/student/jobs', icon: Briefcase, badge: 'Catalog' },
  { label: 'Applications', href: '/student/applications', icon: FileCheck2 },
  { label: 'Notifications', href: '/student/notifications', icon: Bell },
];

const OFFICER_NAV: NavItem[] = [
  { label: 'Dashboard', href: '/officer', icon: LayoutDashboard },
  { label: 'Students', href: '/officer/students', icon: Users },
  { label: 'Job Eligibility', href: '/officer/eligibility', icon: ShieldCheck, badge: 'Gate' },
  { label: 'Candidate Matches', href: '/officer/matches', icon: Scale, badge: 'Engine' },
  { label: 'Placement Drives', href: '/officer/drives', icon: Building2, badge: '4 Live' },
  { label: 'Scheduling', href: '/officer/scheduling', icon: CalendarDays },
  { label: 'Support', href: '/officer/support', icon: LifeBuoy },
  { label: 'Analytics', href: '/officer/analytics', icon: BarChart3 },
];

const RECRUITER_NAV: NavItem[] = [
  { label: 'Dashboard', href: '/recruiter', icon: LayoutDashboard },
  { label: 'Jobs', href: '/recruiter/jobs', icon: Briefcase },
  { label: 'Candidates', href: '/recruiter/candidates', icon: Users },
  { label: 'Shortlist', href: '/recruiter/shortlist', icon: UserCheck, badge: '88' },
  { label: 'Schedule', href: '/recruiter/schedule', icon: CalendarDays },
  { label: 'Offers', href: '/recruiter/offers', icon: CheckCircle2 },
];

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeRole: RouteRole;
}

export function AppSidebar({ isOpen, onClose, activeRole }: AppSidebarProps) {
  const pathname = usePathname();
  const { currentUser, logout } = useAuth();

  const navItems =
    activeRole === 'student'
      ? STUDENT_NAV
      : activeRole === 'officer'
      ? OFFICER_NAV
      : RECRUITER_NAV;

  const roleLabel =
    activeRole === 'student'
      ? 'Student Portal'
      : activeRole === 'officer'
      ? 'Placement Cell'
      : 'Recruiter Console';

  const roleSubtext =
    activeRole === 'student'
      ? 'BPUT Batch 2026'
      : activeRole === 'officer'
      ? 'University Admin'
      : 'Talent Acquisition';

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800 bg-[#0F172A] text-slate-200 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-800/80 px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white font-bold tracking-wider shadow-sm transition-colors group-hover:bg-teal-500">
              CL
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-white text-base">CAMPUSLINK</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-400 bg-teal-950/70 border border-teal-800/50 px-1.5 py-0.5 rounded">
                  PS10
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">BPUT Placement Intelligence</p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current Active Context Badge */}
        <div className="mx-4 mt-4 mb-2 rounded-lg border border-slate-800 bg-slate-900/90 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
              {roleLabel}
            </span>
            <span className="text-[11px] text-slate-400">{roleSubtext}</span>
          </div>
          <p className="mt-1 truncate text-xs font-medium text-slate-200">
            {currentUser?.name || 'Authenticated User'}
          </p>
          <p className="truncate text-[11px] text-slate-400">
            {activeRole === 'student'
              ? `Reg: ${currentUser?.regNumber || '2201106284'}`
              : activeRole === 'officer'
              ? 'TPO Central Authority'
              : currentUser?.company || 'Enterprise Partner'}
          </p>
        </div>

        {/* Navigation List - Strictly filtered to authenticated user's role */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Navigation Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== `/${activeRole}` && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-teal-600/15 text-teal-300 border-l-2 border-teal-500 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                      isActive
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700/60'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Hackathon PS10 Info Footer & Sign Out */}
        <div className="border-t border-slate-800/80 p-4 space-y-2">
          <div className="rounded-lg bg-slate-900/60 p-2.5 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <GraduationCap className="h-4 w-4 text-teal-400 shrink-0" />
              <span>BPUT Hackathon 2026</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
              Problem Statement PS10 · Role-Based Security Verified
            </p>
          </div>

          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 rounded-lg py-2 px-3 text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-slate-900/80 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
