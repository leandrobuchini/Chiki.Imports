import React from 'react';
import { ShoppingCart, Sun, Moon, Menu, User, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenCart, onOpenLogin, onOpenAdmin }) => {
    const { theme, toggleTheme } = useTheme();
    const { cartCount } = useCart();
    const { isAdmin } = useAuth();

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent cursor-pointer">
                            Chiki Imports
                        </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#" className="hover:text-primary-500 transition-colors font-medium">Inicio</a>
                        <a href="#catalogo" className="hover:text-primary-500 transition-colors font-medium">Catálogo</a>
                        <a href="#pagos" className="hover:text-primary-500 transition-colors font-medium">Pagos y Envíos</a>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        {isAdmin ? (
                            <button
                                onClick={onOpenAdmin}
                                className="p-2 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 text-primary-600 transition-colors"
                                title="Admin Panel"
                            >
                                <Settings size={20} />
                            </button>
                        ) : (
                            <button
                                onClick={onOpenLogin}
                                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                                title="Login"
                            >
                                <User size={20} />
                            </button>
                        )}

                        <button
                            onClick={onOpenCart}
                            className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                            aria-label="Open cart"
                        >
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 flex items-center justify-center h-5 w-5 rounded-full bg-primary-600 text-white text-[10px] font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <button className="md:hidden p-2 text-slate-600 dark:text-slate-400">
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
