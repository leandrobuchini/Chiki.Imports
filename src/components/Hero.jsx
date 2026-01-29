import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=1920',
        title: 'Nueva Colección 2024',
        subtitle: 'Lleva tu pasión a otro nivel con lo último en indumentaria.',
    },
    {
        image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=1920',
        title: 'Equipamiento de Elite',
        subtitle: 'Calidad Premium en cada prenda para un rendimiento máximo.',
    },
    {
        image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=1920',
        title: 'Clásicos Atemporales',
        subtitle: 'Revive la historia con nuestras camisetas retro exclusivas.',
    },
];

const Hero = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

    return (
        <section className="relative h-[400px] md:h-[600px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 transform translate-y-0 transition-transform duration-700">
                            {slide.title}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
                            {slide.subtitle}
                        </p>
                        <a
                            href="#catalogo"
                            className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95"
                        >
                            Comprar Ahora
                        </a>
                    </div>
                </div>
            ))}

            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
            >
                <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === current ? 'bg-primary-500 w-8' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
