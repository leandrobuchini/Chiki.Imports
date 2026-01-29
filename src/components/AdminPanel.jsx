import React, { useState } from 'react';
import { X, Plus, Package, Trash2, LogOut, Percent } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';

const AdminPanel = ({ isOpen, onClose }) => {
    const { logout } = useAuth();
    const { products, addProduct, deleteProduct } = useProducts();
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        discount: '0',
        category: 'Camisetas',
        image: '',
    });

    const [imagePreview, setImagePreview] = useState('');

    if (!isOpen) return null;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct({ ...newProduct, image: reader.result });
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.price || !newProduct.image) return;

        addProduct({
            ...newProduct,
            price: parseFloat(newProduct.price),
            discount: parseFloat(newProduct.discount) || 0,
        });
        setNewProduct({ name: '', price: '', discount: '0', category: 'Camisetas', image: '' });
        setImagePreview('');
    };

    return (
        <div className="fixed inset-0 z-[70] flex justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-2xl h-full bg-white dark:bg-slate-950 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
                    <div className="flex items-center space-x-3">
                        <Package size={24} className="text-primary-600" />
                        <h2 className="text-xl font-bold">Mantenimiento de Catálogo</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => { logout(); onClose(); }}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            title="Cerrar Sesión"
                        >
                            <LogOut size={20} />
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    {/* Add Form */}
                    <section className="mb-12">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Agregar Nuevo Producto</h3>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                placeholder="Nombre del Producto"
                                className="col-span-1 md:col-span-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-primary-500 transition-all border-none font-medium"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            />
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                                <input
                                    type="number"
                                    placeholder="Precio"
                                    className="w-full p-3 pl-8 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-primary-500 transition-all border-none font-bold"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                />
                            </div>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
                                <input
                                    type="number"
                                    placeholder="Descuento"
                                    className="w-full p-3 pl-8 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-primary-500 transition-all border-none font-bold"
                                    value={newProduct.discount}
                                    onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
                                />
                            </div>
                            <select
                                className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-primary-500 transition-all border-none font-bold"
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            >
                                <option value="Camisetas">Camisetas</option>
                                <option value="Shorts">Shorts</option>
                                <option value="Retro">Retro</option>
                                <option value="Training">Training</option>
                            </select>
                            <div className="col-span-1 md:col-span-2 space-y-4">
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider">Foto del Producto</label>
                                <div className="flex items-center space-x-4">
                                    <div className="relative group">
                                        <div className={`w-24 h-24 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all ${imagePreview ? 'border-primary-500 bg-primary-50/50' : 'border-slate-300 dark:border-slate-700 hover:border-primary-400'}`}>
                                            {imagePreview ? (
                                                <>
                                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setImagePreview('');
                                                            setNewProduct({ ...newProduct, image: '' });
                                                        }}
                                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </>
                                            ) : (
                                                <Plus size={32} className="text-slate-300 group-hover:text-primary-400 transition-colors" />
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-slate-500 mb-2">Haz clic para buscar en tu ordenador o arrastra la foto aquí</p>
                                        <button
                                            type="button"
                                            onClick={() => document.querySelector('input[type="file"]').click()}
                                            className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors"
                                        >
                                            Seleccionar archivo
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="col-span-1 md:col-span-2 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary-500/20 active:scale-95 flex items-center justify-center space-x-2"
                            >
                                <Plus size={20} />
                                <span>AGREGAR AL CATÁLOGO</span>
                            </button>
                        </form>
                    </section>

                    {/* List Section */}
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Productos Actuales</h3>
                        <div className="space-y-4">
                            {products.map((product) => (
                                <div key={product.id} className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 group transition-all hover:bg-white dark:hover:bg-slate-800 shadow-sm">
                                    <img src={product.image} className="w-16 h-16 object-cover rounded-lg" alt="" />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold truncate">{product.name}</h4>
                                        <div className="flex items-center space-x-2">
                                            <p className="text-primary-600 dark:text-primary-400 font-bold">${product.price.toLocaleString()}</p>
                                            {product.discount > 0 && (
                                                <span className="text-[10px] font-bold px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center space-x-1">
                                                    <Percent size={10} />
                                                    <span>{product.discount}</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => deleteProduct(product.id)}
                                        className="p-2 text-slate-400 hover:text-red-500 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
