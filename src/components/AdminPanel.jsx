import React, { useState } from 'react';
import { X, Plus, Package, Trash2, LogOut, Percent, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'];

const AdminPanel = ({ isOpen, onClose }) => {
    const { logout } = useAuth();
    const { products, loading, error, addProduct, deleteProduct } = useProducts();
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        discount: '0',
        category: 'Camisetas',
    });
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState('');
    const [deletingId, setDeletingId] = useState(null);

    if (!isOpen) return null;

    const toggleSize = (size) => {
        setSelectedSizes((prev) =>
            prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
        );
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const resetForm = () => {
        setNewProduct({ name: '', price: '', discount: '0', category: 'Camisetas' });
        setSelectedSizes([]);
        setImageFile(null);
        setImagePreview('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.price || !imageFile) {
            setFormError('Completá nombre, precio y una foto del producto.');
            return;
        }

        setSubmitting(true);
        setFormError('');
        try {
            await addProduct(
                {
                    name: newProduct.name,
                    price: parseFloat(newProduct.price),
                    discount: parseFloat(newProduct.discount) || 0,
                    category: newProduct.category,
                    sizes: selectedSizes,
                },
                imageFile
            );
            resetForm();
        } catch (err) {
            setFormError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await deleteProduct(id);
        } catch (err) {
            setFormError(err.message);
        } finally {
            setDeletingId(null);
        }
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

                        {formError && (
                            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center space-x-2 text-sm font-medium">
                                <AlertCircle size={18} />
                                <span>{formError}</span>
                            </div>
                        )}

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
                            <div className="col-span-1 md:col-span-2 space-y-3">
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider">
                                    Talles Disponibles
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {AVAILABLE_SIZES.map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => toggleSize(size)}
                                            className={`w-12 h-12 rounded-xl font-bold text-sm transition-all border-2 ${selectedSizes.includes(size)
                                                    ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/20'
                                                    : 'bg-slate-100 dark:bg-slate-800 border-transparent text-slate-500 hover:border-primary-300'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                {selectedSizes.length === 0 && (
                                    <p className="text-xs text-slate-400">
                                        Si no marcás ningún talle, el producto se muestra sin selector de talle.
                                    </p>
                                )}
                            </div>
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
                                                            setImageFile(null);
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
                                disabled={submitting}
                                className="col-span-1 md:col-span-2 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary-500/20 active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-60"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        <span>SUBIENDO...</span>
                                    </>
                                ) : (
                                    <>
                                        <Plus size={20} />
                                        <span>AGREGAR AL CATÁLOGO</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </section>

                    {/* List Section */}
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Productos Actuales</h3>

                        {loading && (
                            <div className="flex items-center justify-center py-12 text-slate-400">
                                <Loader2 size={24} className="animate-spin mr-2" />
                                Cargando catálogo...
                            </div>
                        )}

                        {!loading && error && (
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                                Error al cargar productos: {error}
                            </div>
                        )}

                        {!loading && !error && products.length === 0 && (
                            <p className="text-slate-400 text-sm py-6 text-center">Todavía no hay productos cargados.</p>
                        )}

                        <div className="space-y-4">
                            {products.map((product) => (
                                <div key={product.id} className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 group transition-all hover:bg-white dark:hover:bg-slate-800 shadow-sm">
                                    <img src={product.image} className="w-16 h-16 object-cover rounded-lg" alt="" />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold truncate">{product.name}</h4>
                                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                                            <p className="text-primary-600 dark:text-primary-400 font-bold">${Number(product.price).toLocaleString()}</p>
                                            {product.discount > 0 && (
                                                <span className="text-[10px] font-bold px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center space-x-1">
                                                    <Percent size={10} />
                                                    <span>{product.discount}</span>
                                                </span>
                                            )}
                                            {product.sizes?.length > 0 && (
                                                <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                                                    {product.sizes.join(' / ')}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        disabled={deletingId === product.id}
                                        className="p-2 text-slate-400 hover:text-red-500 transition-all disabled:opacity-50"
                                    >
                                        {deletingId === product.id ? (
                                            <Loader2 size={18} className="animate-spin" />
                                        ) : (
                                            <Trash2 size={18} />
                                        )}
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
