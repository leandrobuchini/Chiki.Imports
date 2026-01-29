import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const hasDiscount = product.discount > 0;
    const finalPrice = hasDiscount
        ? product.price * (1 - product.discount / 100)
        : product.price;

    const handleAdd = () => {
        // Agregamos el producto con el precio final ya calculado
        addToCart({ ...product, price: finalPrice }, quantity);
        setQuantity(1);
    };

    return (
        <div className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {hasDiscount && (
                        <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full flex items-center gap-1 shadow-lg shadow-red-500/20 animate-pulse">
                            <Tag size={10} />
                            {product.discount}% OFF
                        </span>
                    )}
                    {product.category && (
                        <span className="px-3 py-1 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider rounded-full w-fit">
                            {product.category}
                        </span>
                    )}
                </div>
            </div>

            <div className="p-4 md:p-6 text-center">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary-600 transition-colors h-14 line-clamp-2">
                    {product.name}
                </h3>

                <div className="flex flex-col items-center justify-center mb-6">
                    {hasDiscount ? (
                        <>
                            <span className="text-sm text-slate-400 line-through font-medium">
                                ${product.price.toLocaleString()}
                            </span>
                            <span className="text-2xl font-black text-red-600 dark:text-red-500">
                                ${finalPrice.toLocaleString()}
                            </span>
                        </>
                    ) : (
                        <span className="text-2xl font-black text-primary-600 dark:text-primary-400">
                            ${product.price.toLocaleString()}
                        </span>
                    )}
                </div>

                <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-center space-x-4 bg-slate-100 dark:bg-slate-800 rounded-full p-1 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-2 rounded-full hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-sm"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="text-lg font-bold w-8">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-2 rounded-full hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-sm"
                        >
                            <Plus size={16} />
                        </button>
                    </div>

                    <button
                        onClick={handleAdd}
                        className={`flex items-center justify-center space-x-2 w-full py-4 ${hasDiscount ? 'bg-red-600 hover:bg-red-700 shadow-red-500/20' : 'bg-slate-900 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700 shadow-primary-500/20'
                            } text-white font-bold rounded-xl transition-all shadow-lg active:scale-95`}
                    >
                        <ShoppingCart size={18} />
                        <span>Agregar al Carrito</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
