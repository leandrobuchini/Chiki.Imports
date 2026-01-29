import React from 'react';
import { X, Trash2, Plus, Minus, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = ({ isOpen, onClose }) => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

    const handleCheckout = () => {
        const phoneNumber = '543425298828'; // Reemplazar con el número real
        const messageLines = cartItems.map(
            (item) => `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString()})`
        );

        const fullMessage = `Hola Chiki Imports! Me gustaría realizar el siguiente pedido:\n\n${messageLines.join('\n')}\n\n*Total: $${cartTotal.toLocaleString()}*\n\n¿Cómo podemos coordinar el pago y envío?`;

        const encodedMessage = encodeURIComponent(fullMessage);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md h-full bg-white dark:bg-slate-950 shadow-2xl flex flex-col transform transition-transform duration-300">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center space-x-2">
                        <span>Tu Carrito</span>
                        <span className="text-sm font-normal text-slate-500">({cartCount} items)</span>
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-full text-slate-400">
                                <Trash2 size={48} />
                            </div>
                            <p className="text-slate-500 font-medium">Tu carrito está vacío</p>
                            <button
                                onClick={onClose}
                                className="text-primary-600 font-bold hover:underline"
                            >
                                Volver a la tienda
                            </button>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex space-x-4">
                                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-sm leading-tight">{item.name}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <p className="text-primary-600 dark:text-primary-400 font-bold">
                                        ${item.price.toLocaleString()}
                                    </p>
                                    <div className="flex items-center space-x-3 pt-2">
                                        <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg scale-90">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 border-t border-slate-200 dark:border-slate-800 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total</span>
                        <span className="text-2xl font-black text-primary-600 dark:text-primary-400">
                            ${cartTotal.toLocaleString()}
                        </span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0}
                        className="flex items-center justify-center space-x-2 w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-black rounded-xl transition-all shadow-lg hover:shadow-green-500/20 active:scale-[0.98]"
                    >
                        <Send size={20} />
                        <span>FINALIZAR PEDIDO (WHATSAPP)</span>
                    </button>
                    <p className="text-[10px] text-center text-slate-500 uppercase font-bold tracking-widest">
                        Envíos a todo el país • Pagos 100% seguros
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
