'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  User,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  Info,
  Shield,
  Briefcase,
  GraduationCap,
  Layers,
  Lock,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { RouteRole, StrictRole, ROLE_LABELS } from '@/types/auth';

interface AppHeaderProps {
  onMenuClick: () => void;
  activeRole: RouteRole;
}

export function AppHeader({ onMenuClick, activeRole }: AppHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    currentUser,
    notifications,
    unreadCount,
    markNotificationRead,
    markAllNotificationsRead,
    logout,
  } = useAuth();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsProfileOpen(false);
    await logout();
  };

  // Compute clean breadcrumb
  const pathParts = pathname.split('/').filter(Boolean);
  const currentSection = pathParts[1]
    ? pathParts[1].charAt(0).toUpperCase() + pathParts[1].slice(1)
    : 'Overview';

  const userStrictRole: StrictRole = currentUser?.role || 'STUDENT';
  const roleLabel = ROLE_LABELS[userStrictRole] || userStrictRole;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 shadow-xs">
      {/* Left: Mobile Toggle & Page Context */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
          <span className="font-semibold text-slate-800">
            {roleLabel} Portal
          </span>
          <span>/</span>
          <span className="text-slate-600 font-medium">{currentSection}</span>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder={
              activeRole === 'student'
                ? 'Search drives, companies, roles, skills...'
                : activeRole === 'officer'
                ? 'Search student name, roll number, company, branch...'
                : 'Search candidate pool, skills, designations...'
            }
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-teal-500 focus:bg-white focus:outline-hidden"
          />
        </div>
      </div>

      {/* Right: Authenticated Role Badge, Notifications, Profile Menu */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Verified Role Badge */}
        <div className="flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50/70 px-2.5 py-1.5 text-xs font-semibold text-teal-800">
          <Lock className="h-3 w-3 text-teal-600" />
          <span className="hidden sm:inline text-slate-500 font-normal">Role:</span>
          <span>{roleLabel}</span>
        </div>

        {/* Notifications Area */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            aria-label="Open notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-slate-200 bg-white shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 bg-slate-50/70">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="rounded bg-teal-100 px-1.5 py-0.5 text-[10px] font-bold text-teal-800">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-teal-700 hover:text-teal-900 font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-sm text-slate-400">
                    No notifications at this time.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-3.5 transition-colors cursor-pointer hover:bg-slate-50 ${
                        !notif.read ? 'bg-teal-50/30' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5">
                          {notif.type === 'success' ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          ) : notif.type === 'warning' ? (
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                          ) : (
                            <Info className="h-4 w-4 text-teal-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-slate-900">{notif.title}</p>
                          <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                            {notif.message}
                          </p>
                          <span className="mt-1 block text-[10px] text-slate-400">
                            {notif.timestamp}
                          </span>
                        </div>
                        {!notif.read && (
                          <div className="h-2 w-2 rounded-full bg-teal-500 shrink-0 mt-1" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-slate-100 p-2 text-center bg-slate-50/50">
                <button
                  onClick={() => setIsNotifOpen(false)}
                  className="text-xs text-slate-600 hover:text-slate-900 font-medium"
                >
                  Close notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 rounded-lg p-1 hover:bg-slate-100 transition-colors"
            aria-label="User menu"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-white">
              {(currentUser?.name || 'User')
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')}
            </div>
            <div className="hidden xl:block text-left text-xs">
              <div className="font-semibold text-slate-800 leading-tight">
                {currentUser?.name || 'User'}
              </div>
              <div className="text-[11px] text-slate-500">{roleLabel}</div>
            </div>
            <ChevronDown className="hidden xl:block h-3.5 w-3.5 text-slate-400" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl z-50">
              {/* Authenticated User Display: Name, Email, Role */}
              <div className="border-b border-slate-100 px-3 py-2.5">
                <div className="font-bold text-slate-900 text-sm">{currentUser?.name || 'User'}</div>
                <div className="text-xs text-slate-500 truncate">{currentUser?.email || 'user@example.com'}</div>
                <div className="mt-1.5 inline-flex items-center gap-1 rounded bg-teal-50 border border-teal-200 px-2 py-0.5 text-[11px] font-semibold text-teal-800">
                  {roleLabel}
                </div>
              </div>

              <div className="py-1">
                {activeRole === 'student' && (
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      router.push('/student/profile');
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <User className="h-4 w-4 text-slate-400" />
                    My Student Profile
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    router.push('/');
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Layers className="h-4 w-4 text-slate-400" />
                  CampusLink Home
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
