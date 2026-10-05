'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  GraduationCap,
  ShieldCheck,
  Briefcase,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { StrictRole, ROLE_LABELS, ROLE_DASHBOARD_ROUTES } from '@/types/auth';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect');

  const { login, loginWithGoogle, currentUser, isAuthenticated } = useAuth();

  const [selectedRole, setSelectedRole] = useState<StrictRole>('STUDENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const currentDomain =
    typeof window !== 'undefined'
      ? window.location.hostname
      : 'ais-dev-4p5djfnofihhkfodyz4rbb-444151331719.asia-southeast1.run.app';

  // If already authenticated with matching role, redirect
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      const dest = redirectPath || ROLE_DASHBOARD_ROUTES[currentUser.role] || '/student';
      router.replace(dest);
    }
  }, [isAuthenticated, currentUser, router, redirectPath]);

  const handleRoleSelect = (role: StrictRole) => {
    setSelectedRole(role);
    setErrorMessage(null);
    setErrorCode(null);
  };

  const copyDomain = () => {
    const domain = typeof window !== 'undefined' ? window.location.hostname : currentDomain;
    if (!domain) return;
    navigator.clipboard.writeText(domain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setErrorCode(null);
    setSuccessMessage(null);

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your account password.');
      return;
    }

    setIsLoading(true);

    try {
      const user = await login(email, password, selectedRole);
      setSuccessMessage(`Authenticated successfully as ${ROLE_LABELS[user.role]}! Redirecting...`);
      const targetDashboard = redirectPath || ROLE_DASHBOARD_ROUTES[user.role] || '/student';
      setTimeout(() => {
        router.replace(targetDashboard);
      }, 500);
    } catch (err: unknown) {
      setIsLoading(false);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Authentication failed. Please check your email and password.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setErrorCode(null);
    setSuccessMessage(null);
    setIsGoogleLoading(true);

    try {
      const user = await loginWithGoogle(selectedRole);
      setSuccessMessage(`Authenticated successfully as ${ROLE_LABELS[user.role]}! Redirecting...`);
      const targetDashboard = redirectPath || ROLE_DASHBOARD_ROUTES[user.role] || '/student';
      setTimeout(() => {
        router.replace(targetDashboard);
      }, 400);
    } catch (err: unknown) {
      setIsGoogleLoading(false);
      const code = err && typeof err === 'object' && 'code' in err ? (err as { code: string }).code : '';
      setErrorCode(code);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Google authentication could not be completed. Please try again.');
      }
    }
  };

  const isUnauthorizedDomain =
    errorCode === 'auth/unauthorized-domain' ||
    (errorMessage && errorMessage.includes('not authorized for Firebase Google Sign-In'));

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white font-bold tracking-wider shadow-xs">
            CL
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">CAMPUSLINK</span>
        </Link>
        <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
          Sign in to your account
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          BPUT Campus Placement Intelligence & Coordination Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-10">
          {/* Unauthorized Domain Helper Card */}
          {isUnauthorizedDomain ? (
            <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50/90 p-4 text-xs text-amber-950 shadow-xs">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-2">
                  <h4 className="font-bold text-amber-950">Domain Authorization Required</h4>
                  <p className="text-amber-800 leading-relaxed">
                    Firebase blocks Google popups until this app&apos;s hostname is added to project{' '}
                    <strong className="font-semibold text-amber-950">campuslink-4e78d</strong>.
                  </p>

                  <div className="flex items-center gap-2 bg-white border border-amber-200 rounded-lg p-2 font-mono text-[11px] text-slate-800">
                    <span className="flex-1 truncate">{currentDomain || 'ais-dev-...'}</span>
                    <button
                      type="button"
                      onClick={copyDomain}
                      className="shrink-0 px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded font-sans text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="text-[11px] text-amber-900/90 space-y-1.5 pt-1">
                    <p className="font-semibold text-amber-950">How to authorize in 30 seconds:</p>
                    <ol className="list-decimal list-inside space-y-1 text-amber-850">
                      <li>
                        Open{' '}
                        <a
                          href="https://console.firebase.google.com/project/campuslink-4e78d/authentication/settings"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-0.5 font-bold text-teal-800 hover:text-teal-950 underline"
                        >
                          Firebase Authorized Domains
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </li>
                      <li>Click <strong>Add domain</strong></li>
                      <li>Paste the copied domain and click <strong>Save</strong></li>
                    </ol>
                    <p className="pt-1 text-[11px] text-slate-500 italic">
                      Or sign in immediately below with Email & Password.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : errorCode === 'auth/user-cancelled' || errorCode === 'auth/popup-closed-by-user' ? (
            <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-700 flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">
                Google Sign-In was cancelled or access was not granted. When the Google popup opens, select your account and grant permission to sign in.
              </div>
            </div>
          ) : errorMessage ? (
            <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50/90 p-3.5 text-xs text-rose-800 flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{errorMessage}</div>
            </div>
          ) : null}

          {successMessage && (
            <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{successMessage}</span>
            </div>
          )}

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Target Role: <span className="text-teal-700 font-bold">{ROLE_LABELS[selectedRole]}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleRoleSelect('STUDENT')}
                className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-xs font-semibold transition-all ${
                  selectedRole === 'STUDENT'
                    ? 'border-teal-500 bg-teal-50/80 text-teal-800 ring-2 ring-teal-500/20 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <GraduationCap className="h-4 w-4 mb-1 text-teal-700" />
                Student
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('PLACEMENT_OFFICER')}
                className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-xs font-semibold transition-all ${
                  selectedRole === 'PLACEMENT_OFFICER'
                    ? 'border-teal-500 bg-teal-50/80 text-teal-800 ring-2 ring-teal-500/20 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <ShieldCheck className="h-4 w-4 mb-1 text-blue-700" />
                Officer
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('RECRUITER')}
                className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-xs font-semibold transition-all ${
                  selectedRole === 'RECRUITER'
                    ? 'border-teal-500 bg-teal-50/80 text-teal-800 ring-2 ring-teal-500/20 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Briefcase className="h-4 w-4 mb-1 text-amber-700" />
                Recruiter
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400">
              For new Google users, this assigns your initial portal role. Existing accounts retain their registered role.
            </p>
          </div>

          {/* Email/Password Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-800 focus:border-teal-500 focus:outline-hidden"
                  placeholder="name@bput.ac.in"
                  disabled={isLoading || isGoogleLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="block text-xs font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-10 text-sm text-slate-800 focus:border-teal-500 focus:outline-hidden"
                  placeholder="••••••••"
                  disabled={isLoading || isGoogleLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-teal-700 hover:text-teal-800 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full rounded-lg bg-teal-600 py-2.5 text-xs font-semibold text-white hover:bg-teal-500 transition-colors shadow-xs flex items-center justify-center gap-2 disabled:bg-teal-400 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In as {ROLE_LABELS[selectedRole]}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2.5 text-slate-400 font-medium">OR</span>
            </div>
          </div>

          {/* Real Google Authentication Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading || isGoogleLoading}
            className="w-full inline-flex items-center justify-center gap-2.5 rounded-lg border border-slate-200 bg-white py-2.5 px-4 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isGoogleLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
                <span>Connecting to Google...</span>
              </>
            ) : (
              <>
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          <div className="mt-6 border-t border-slate-100 pt-5 text-center text-xs text-slate-500">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-teal-700 hover:text-teal-800">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 text-white font-bold text-lg mb-4 shadow-sm animate-pulse">
            CL
          </div>
          <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
            <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
            <span>Loading login portal...</span>
          </div>
        </div>
      }
    >
      <LoginForm />
    </React.Suspense>
  );
}
