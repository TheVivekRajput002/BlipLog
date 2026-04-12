"use client";

import { useState } from "react";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        
            <>
                <div className="w-full min-h-screen h-screen overflow-y-hidden grid grid-cols-1 md:grid-cols-12 gap-0 bg-[#0e0e0f]">

                    {/* Visual Branding Panel */}
                    <div className="hidden md:flex md:col-span-7 relative flex-col justify-between p-12 overflow-hidden bg-[#201f20]">
                        {/* Background image overlay */}
                        <div className="absolute inset-0 opacity-20">
                            <img
                                className="w-full h-full object-cover grayscale mix-blend-overlay"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPjlCntLt_E-QOmqi3EjlvRX8R5NdcnHa1Hw35jkQ9VzIeCGagfN5Hb4-ROXXocbQPbAaCb6nry4BdiOuHj4nu2KhGatDrYALo4xtYiZBGm9rj8cui51hN8y7FxfyahHsSvg2NpjcWw6VfckllMKrxGD6o5i633Li9n4Sl-g5NVMWC5ORirHrUtfuZQnShciSdviJEd4EWp4NkgukGo1JvKZ-KtNFZAVlLhcauNskGtHNgaaCO3CA5sqd2Z63RQQGG8ofVuUYOhxg"
                                alt="Abstract circuit board"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#131314] via-transparent to-transparent" />
                        </div>

                        {/* Top branding */}
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-16">
                                <span className="font-black text-3xl tracking-[0.2em] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    BLIPLOG
                                </span>
                                <div className="h-[2px] w-12 bg-white" />
                            </div>
                            <h1
                                className="text-6xl font-bold text-white leading-tight tracking-tighter max-w-md"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                KINETIC<br />ENGINEERING<br />SYSTEMS.
                            </h1>
                        </div>

                        {/* Bottom info grid */}
                        <div className="relative z-10 bottom-2">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-[10px] text-[#919191] uppercase tracking-[0.3em] mb-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                        Protocol
                                    </p>
                                    <p className="text-[#c6c6c6] text-sm font-light leading-relaxed">
                                        Secure data orchestration for industrial-scale logistics and automated intelligence.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#919191] uppercase tracking-[0.3em] mb-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                        Status
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#22c55e] block" />
                                        <p className="text-[10px] text-white uppercase tracking-widest" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                            System Operational
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Registration Form Panel */}
                    <div className="col-span-1 px-15 md:col-span-5 flex flex-col p-5 md:py-8 bg-[#0e0e0f]">
                        <div className="mb-4">
                            {/* <p className="text-[10px] text-[#919191] uppercase tracking-[0.4em] mb-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                Registration Flow
                            </p> */}
                            <h2 className="text-xl font-bold text-white tracking-tight uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                Create Account
                            </h2>
                        </div>

                        {/* Step indicator */}
                        <div className="flex gap-1 mb-7">
                            <div className="h-1 flex-1 bg-white" />
                            <div className="h-1 flex-1 bg-[#2a2a2b]" />
                            <div className="h-1 flex-1 bg-[#2a2a2b]" />
                        </div>

                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            {/* Email */}
                            <div className="space-y-1">
                                <label
                                    htmlFor="email"
                                    className="block text-[10px] text-[#919191] uppercase tracking-widest pl-1"
                                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="name@domain.com"
                                    className="w-full bg-[#1c1b1c] border-0 ring-0 focus:ring-1 focus:ring-white text-white p-2.5 text-sm placeholder:text-neutral-700 transition-all duration-200 outline-none"
                                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-1">
                                <label
                                    htmlFor="password"
                                    className="block text-[10px] text-[#919191] uppercase tracking-widest pl-1"
                                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        placeholder="••••••••••••"
                                        className="w-full bg-[#1c1b1c] border-0 focus:ring-1 focus:ring-white text-white p-2.5 pr-12 text-sm placeholder:text-neutral-700 transition-all duration-200 outline-none"
                                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#919191] hover:text-white transition-colors text-xs"
                                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                    >
                                        {showPassword ? "HIDE" : "SHOW"}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1">
                                <label
                                    htmlFor="confirm_password"
                                    className="block text-[10px] text-[#919191] uppercase tracking-widest pl-1"
                                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                >
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirm_password"
                                        type={showConfirm ? "text" : "password"}
                                        required
                                        placeholder="••••••••••••"
                                        className="w-full bg-[#1c1b1c] border-0 focus:ring-1 focus:ring-white text-white p-2.5 pr-12 text-sm placeholder:text-neutral-700 transition-all duration-200 outline-none"
                                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#919191] hover:text-white transition-colors text-xs"
                                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                    >
                                        {showConfirm ? "HIDE" : "SHOW"}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="pt-3">
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-br from-white to-[#d4d4dc] text-[#191b21] font-black py-3 uppercase tracking-[0.2em] text-sm hover:opacity-90 active:scale-[0.98] transition-all"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    CREATE ACCOUNT
                                </button>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8 flex items-center">
                            <div className="flex-grow border-t border-[#474747] opacity-20" />
                            <span
                                className="mx-4 text-[10px] text-[#919191] uppercase tracking-widest"
                                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                            >
                                OR
                            </span>
                            <div className="flex-grow border-t border-[#474747] opacity-20" />
                        </div>

                        {/* OAuth Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                className="flex items-center justify-center gap-3 border border-[#474747] p-4 text-[10px] uppercase tracking-widest text-[#e5e2e3] hover:bg-[#1c1b1c] transition-colors group"
                                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                            >
                                {/* GitHub icon */}
                                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                GitHub
                            </button>
                            <button
                                className="flex items-center justify-center gap-3 border border-[#474747] p-4 text-[10px] uppercase tracking-widest text-[#e5e2e3] hover:bg-[#1c1b1c] transition-colors group"
                                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                            >
                                {/* Google icon */}
                                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
                                    <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.615 24 12.255 24z" />
                                    <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09z" />
                                    <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.64 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
                                </svg>
                                Google
                            </button>
                        </div>

                        {/* Sign in link */}
                        <div className="mt-6 flex flex-col items-center gap-4">
                            <p className="text-[10px] text-[#919191] uppercase tracking-widest" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                Existing Operator?
                            </p>
                            <a
                                href="/login"
                                className="font-bold text-white uppercase text-xs tracking-[0.1em] border-b border-white pb-1 hover:text-[#d4d4dc] hover:border-[#d4d4dc] transition-all"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                Sign In to Dashboard
                            </a>
                        </div>
                    </div>

                </div>
            </>
        
    );
}
