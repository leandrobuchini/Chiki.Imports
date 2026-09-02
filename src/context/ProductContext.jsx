import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, PRODUCT_IMAGES_BUCKET } from '../lib/supabaseClient';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        const { data, error: fetchError } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (fetchError) {
            console.error('Error al cargar productos:', fetchError.message);
            setError(fetchError.message);
        } else {
            // Postgres serializa "numeric" como string en JSON; los pasamos a Number
            // para que toLocaleString() y las cuentas de descuento funcionen bien.
            const normalized = data.map((p) => ({
                ...p,
                price: Number(p.price),
                discount: Number(p.discount),
            }));
            setProducts(normalized);
            setError(null);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- carga inicial de datos, patrón válido
        fetchProducts();

        // Mantiene el catálogo sincronizado en tiempo real entre pestañas/dispositivos
        const channel = supabase
            .channel('products-changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
                fetchProducts();
            })
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [fetchProducts]);

    // Sube la imagen al bucket de Storage y devuelve su URL pública
    const uploadProductImage = async (imageFile) => {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from(PRODUCT_IMAGES_BUCKET)
            .upload(fileName, imageFile);

        if (uploadError) {
            throw new Error(`No se pudo subir la imagen: ${uploadError.message}`);
        }

        const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(fileName);
        return data.publicUrl;
    };

    // product: { name, price, discount, category }, imageFile: File del <input type="file">
    const addProduct = async (product, imageFile) => {
        const imageUrl = await uploadProductImage(imageFile);

        const { error: insertError } = await supabase
            .from('products')
            .insert([{ ...product, image: imageUrl }]);

        if (insertError) {
            throw new Error(`No se pudo guardar el producto: ${insertError.message}`);
        }
        // La suscripción en tiempo real actualiza "products" automáticamente,
        // pero refrescamos igual por si el evento tarda en llegar.
        await fetchProducts();
    };

    const deleteProduct = async (id) => {
        const { error: deleteError } = await supabase.from('products').delete().eq('id', id);
        if (deleteError) {
            throw new Error(`No se pudo eliminar el producto: ${deleteError.message}`);
        }
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, loading, error, addProduct, deleteProduct, refetch: fetchProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};
