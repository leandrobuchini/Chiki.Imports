import React from 'react';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                            Chiki Imports
                        </span>
                        <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Tu tienda de confianza para la mejor indumentaria deportiva. Calidad premium y envíos a todo el país.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-400">Enlaces</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Inicio</a></li>
                            <li><a href="#catalogo" className="hover:text-primary-500 transition-colors">Catálogo</a></li>
                            <li><a href="#pagos" className="hover:text-primary-500 transition-colors">Pagos</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-400">Legal</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Términos y Condiciones</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Política de Privacidad</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Defensa al Consumidor</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-400">Síguenos</h4>
                        <div className="flex space-x-4">
                            <a href="https://www.instagram.com/chiki.imports/" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 dark:bg-slate-900 rounded-full hover:bg-primary-500 hover:text-white transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="p-2 bg-slate-100 dark:bg-slate-900 rounded-full hover:bg-primary-500 hover:text-white transition-all">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="p-2 bg-slate-100 dark:bg-slate-900 rounded-full hover:bg-primary-500 hover:text-white transition-all">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-900 text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        © {new Date().getFullYear()} Chiki Imports. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
