'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatAuthError } from '@/lib/auth/authService';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(email);
      setSuccessMessage(
        `A password reset email has been dispatched to ${email}. Please check your inbox and follow the instructions to reset your password.`
      );
    } catch (err: unknown) {
      setErrorMessage(formatAuthError(err));
    } finally {
      setIsLoading(false);
    }
  };

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
          Reset your password
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Enter your registered email address to receive a secure Firebase reset link
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-10">
          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50/90 p-3.5 text-xs text-rose-800 flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-800 flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">
                <p className="font-semibold">Reset Link Sent</p>
                <p className="mt-1 text-emerald-700">{successMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm text-slate-800 focus:border-teal-500 focus:outline-hidden"
                  placeholder="name@bput.ac.in"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-teal-600 py-2.5 text-xs font-semibold text-white hover:bg-teal-500 transition-colors shadow-xs flex items-center justify-center gap-2 disabled:bg-teal-400 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sending Reset Link...</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Reset Link</span>
                </>
              )}
            </button>
          </form>

          {/* Back to Sign In */}
          <div className="mt-6 border-t border-slate-100 pt-5 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
