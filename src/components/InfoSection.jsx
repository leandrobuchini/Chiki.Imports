import React from 'react';
import { Truck, ShieldCheck, CreditCard, RotateCcw } from 'lucide-react';

const InfoSection = () => {
    const features = [
        {
            icon: <Truck className="text-primary-600" size={32} />,
            title: 'Envíos Rápidos',
            description: 'Llegamos a todo el país en tiempo récord.',
        },
        {
            icon: <ShieldCheck className="text-primary-600" size={32} />,
            title: 'Compra Segura',
            description: 'Garantía oficial en todos nuestros productos.',
        },
        {
            icon: <CreditCard className="text-primary-600" size={32} />,
            title: 'Medios de Pago',
            description: 'Tarjetas, transferencias y billeteras virtuales.',
        },
        {
            icon: <RotateCcw className="text-primary-600" size={32} />,
            title: 'Cambios Fáciles',
            description: '30 días para realizar cambios sin vueltas.',
        },
    ];

    return (
        <section id="pagos" className="bg-slate-50 dark:bg-slate-900 py-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-transform hover:-translate-y-1"
                        >
                            <div className="mb-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-2xl">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InfoSection;
