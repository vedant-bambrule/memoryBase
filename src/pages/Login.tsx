import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, User } from 'lucide-react';

export function Login() {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (isSignUp) {
                // Simulated signup logic
                if (password !== confirmPassword) {
                    setError('Passwords do not match');
                    setIsLoading(false);
                    return;
                }
                // Simulate registration delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userName', fullName);
                navigate('/');
            } else {
                // Simulated login logic
                if (email === 'admin@memorycollector.com' && password === 'admin123') {
                    localStorage.setItem('isAuthenticated', 'true');
                    navigate('/');
                } else {
                    setError('Invalid email or password. Hint: admin@memorycollector.com / admin123');
                }
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-[420px] space-y-8 animate-fade-in">
                {/* Logo & Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white shadow-soft border border-surface-200 mb-4 animate-slide-in">
                        <div className="relative">
                            <ShieldCheck className="h-8 w-8 text-indigo-500" />
                            <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full border-2 border-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-navy-900 tracking-tight">
                        Memory <span className="text-gradient">Collector</span>
                    </h1>
                    <p className="text-sm text-navy-400 font-medium max-w-[280px] mx-auto">
                        {isSignUp 
                            ? 'Create your account to start collecting knowledge.' 
                            : 'Your secure AI-powered workspace for collective knowledge.'}
                    </p>
                </div>

                {/* Login/Signup Card */}
                <div className="card p-8 bg-white/80 backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {isSignUp && (
                            <div className="space-y-2 animate-slide-in">
                                <label className="text-xs font-bold text-navy-800 uppercase tracking-wider ml-1">
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <User className="h-4 w-4 text-navy-300 group-focus-within:text-indigo-500 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="John Doe"
                                        className="input-field pl-10 h-11"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-navy-800 uppercase tracking-wider ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-navy-300 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="input-field pl-10 h-11"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-xs font-bold text-navy-800 uppercase tracking-wider">
                                    Password
                                </label>
                                {!isSignUp && (
                                    <button type="button" className="text-[10px] font-bold text-indigo-500 hover:text-indigo-600 uppercase tracking-wider">
                                        Forgot?
                                    </button>
                                )}
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-navy-300 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="input-field pl-10 pr-10 h-11"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-navy-300 hover:text-navy-500 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {isSignUp && (
                            <div className="space-y-2 animate-slide-in">
                                <label className="text-xs font-bold text-navy-800 uppercase tracking-wider ml-1">
                                    Confirm Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <Lock className="h-4 w-4 text-navy-300 group-focus-within:text-indigo-500 transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="input-field pl-10 h-11"
                                    />
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="bg-rose-50 border border-rose-100 rounded-xl p-3.5 animate-slide-in">
                                <p className="text-xs text-rose-600 font-medium text-center">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full h-11 text-base font-bold group relative overflow-hidden"
                        >
                            <span className={`flex items-center justify-center transition-transform duration-300 ${isLoading ? '-translate-y-10' : ''}`}>
                                {isLoading ? (isSignUp ? 'Creating Account...' : 'Signing in...') : (isSignUp ? 'Create Account' : 'Sign In')}
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                </div>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-surface-200">
                        <div className="flex items-center justify-center gap-2">
                            <p className="text-xs text-navy-400 font-medium">
                                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                            </p>
                            <button 
                                onClick={() => {
                                    setIsSignUp(!isSignUp);
                                    setError('');
                                }}
                                className="text-xs font-bold text-indigo-500 hover:text-indigo-600 transition-colors"
                            >
                                {isSignUp ? 'Sign In' : 'Create account'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-center gap-4 text-[11px] text-navy-300 font-medium uppercase tracking-widest">
                    <span className="hover:text-navy-400 transition-colors cursor-pointer">Privacy</span>
                    <div className="h-1 w-1 bg-navy-200 rounded-full" />
                    <span className="hover:text-navy-400 transition-colors cursor-pointer">Terms</span>
                    <div className="h-1 w-1 bg-navy-200 rounded-full" />
                    <span className="hover:text-navy-400 transition-colors cursor-pointer">Help</span>
                </div>
            </div>
        </div>
    );
}
