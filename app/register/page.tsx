'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  ShieldCheck,
  Briefcase,
  User,
  Mail,
  Lock,
  Building,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { StrictRole, ROLE_LABELS, ROLE_DASHBOARD_ROUTES } from '@/types/auth';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [role, setRole] = useState<StrictRole>('STUDENT');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [regOrId, setRegOrId] = useState('');
  const [institutionOrCompany, setInstitutionOrCompany] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validation
    if (!fullName || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full legal name (minimum 2 characters).');
      return;
    }
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter your password.');
      return;
    }
    if (!role || (role !== 'STUDENT' && role !== 'PLACEMENT_OFFICER' && role !== 'RECRUITER')) {
      setErrorMessage('Please select a valid user role.');
      return;
    }

    setIsLoading(true);

    try {
      const user = await register({
        name: fullName,
        email,
        password,
        role,
        regNumber: role === 'STUDENT' ? regOrId : undefined,
        department: role === 'PLACEMENT_OFFICER' ? institutionOrCompany : undefined,
        company: role === 'RECRUITER' ? institutionOrCompany : undefined,
        institution: role === 'STUDENT' ? institutionOrCompany : undefined,
      });

      setSuccessMessage(`Account registered successfully as ${ROLE_LABELS[user.role]}! Redirecting...`);
      const targetDashboard = ROLE_DASHBOARD_ROUTES[user.role];

      setTimeout(() => {
        router.replace(targetDashboard);
      }, 600);
    } catch (err: unknown) {
      setIsLoading(false);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Registration failed. Please verify your details.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white font-bold tracking-wider shadow-xs">
            CL
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">CAMPUSLINK</span>
        </Link>
        <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
          Create your placement account
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Role-Based Access for Students, Placement Officers, and Recruiters
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-10">
          {errorMessage && (
            <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50/90 p-3.5 text-xs text-rose-800 flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{successMessage}</span>
            </div>
          )}

          {/* Role Choice */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Select Role: <span className="text-teal-700 font-bold">{ROLE_LABELS[role]}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole('STUDENT')}
                className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-xs font-semibold transition-all ${
                  role === 'STUDENT'
                    ? 'border-teal-500 bg-teal-50/80 text-teal-800 ring-2 ring-teal-500/20 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <GraduationCap className="h-4 w-4 mb-1 text-teal-700" />
                Student
              </button>

              <button
                type="button"
                onClick={() => setRole('PLACEMENT_OFFICER')}
                className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-xs font-semibold transition-all ${
                  role === 'PLACEMENT_OFFICER'
                    ? 'border-teal-500 bg-teal-50/80 text-teal-800 ring-2 ring-teal-500/20 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <ShieldCheck className="h-4 w-4 mb-1 text-blue-700" />
                Officer
              </button>

              <button
                type="button"
                onClick={() => setRole('RECRUITER')}
                className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-xs font-semibold transition-all ${
                  role === 'RECRUITER'
                    ? 'border-teal-500 bg-teal-50/80 text-teal-800 ring-2 ring-teal-500/20 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Briefcase className="h-4 w-4 mb-1 text-amber-700" />
                Recruiter
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder={role === 'STUDENT' ? 'e.g. Janmejay Tola' : 'e.g. Dr. Suresh Pradhan'}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-800 focus:border-teal-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {role === 'RECRUITER' ? 'Official Work Email' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder={role === 'STUDENT' ? 'student@bput.ac.in' : 'user@domain.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-800 focus:border-teal-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Min 6 chars"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-9 text-sm text-slate-800 focus:border-teal-500 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-800 focus:border-teal-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {role === 'STUDENT'
                    ? 'BPUT Registration No.'
                    : role === 'PLACEMENT_OFFICER'
                    ? 'TPO Employee ID'
                    : 'Recruiter Identification Code'}
                </label>
                <input
                  type="text"
                  placeholder={role === 'STUDENT' ? 'e.g. 2201106284' : 'e.g. TPO-BPUT-01'}
                  value={regOrId}
                  onChange={(e) => setRegOrId(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-lg border border-slate-200 py-2 px-3 text-sm text-slate-800 focus:border-teal-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {role === 'RECRUITER' ? 'Company Name' : 'College / Department'}
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder={role === 'RECRUITER' ? 'e.g. TCS' : 'e.g. BPUT Engineering Institute'}
                    value={institutionOrCompany}
                    onChange={(e) => setInstitutionOrCompany(e.target.value)}
                    disabled={isLoading}
                    className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-800 focus:border-teal-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-500 leading-relaxed">
              By creating an account, you agree to role-based verification and institutional policies.
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-teal-600 py-2.5 text-xs font-semibold text-white hover:bg-teal-500 transition-colors shadow-xs flex items-center justify-center gap-2 disabled:bg-teal-400"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Registering Profile...</span>
                </>
              ) : (
                <>
                  <span>Register as {ROLE_LABELS[role]}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-teal-700 hover:text-teal-800">
              Sign in to your account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
