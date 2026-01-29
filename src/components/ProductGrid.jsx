import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../context/ProductContext';

const ProductGrid = () => {
    const { products } = useProducts();
    const [filter, setFilter] = useState('Todos');

    const filteredProducts = filter === 'Todos'
        ? products
        : products.filter(p => p.category === filter);

    return (
        <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 space-y-4 md:space-y-0">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black mb-2 uppercase tracking-tighter">
                        Catálogo Exclusivo
                    </h2>
                    <div className="h-1 w-20 bg-primary-600 rounded-full" />
                </div>
                <div className="flex flex-wrap gap-2">
                    {['Todos', 'Camisetas', 'Shorts', 'Retro', 'Training'].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setFilter(tag)}
                            className={`px-4 py-1.5 rounded-full border text-sm font-bold transition-all ${filter === tag
                                    ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/20'
                                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                {filteredProducts.length === 0 && (
                    <div className="col-span-full py-20 text-center text-slate-500">
                        No hay productos en esta categoría.
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductGrid;
