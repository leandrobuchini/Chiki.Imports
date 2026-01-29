import React, { useState } from 'react';
import { X, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const { login } = useAuth();

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(password)) {
            onClose();
            setPassword('');
            setError(false);
        } else {
            setError(true);
        }
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl animate-in zoom-in duration-300">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                    <X size={20} />
                </button>

                <div className="text-center mb-8">
                    <div className="inline-flex p-4 bg-primary-100 dark:bg-primary-900/30 rounded-2xl mb-4 text-primary-600">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-2xl font-bold">Admin Login</h2>
                    <p className="text-slate-500 text-sm mt-1">Acceso exclusivo para Chiki Imports</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(false);
                            }}
                            className={`w-full py-3 px-4 pr-12 bg-slate-100 dark:bg-slate-800 rounded-xl border ${error ? 'border-red-500' : 'border-transparent focus:border-primary-500'
                                } outline-none transition-all`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary-500"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-xs text-center font-bold">Contraseña incorrecta</p>}

                    <button
                        type="submit"
                        className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all active:scale-95"
                    >
                        INGRESAR
                    </button>
                </form>
                <p className="mt-6 text-center text-xs text-slate-400">
                    Contraseña por defecto: <strong>admin123</strong>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;
