import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

const initialProducts = [
    {
        id: 1,
        name: 'Camiseta Argentina Local 2024',
        price: 85000,
        discount: 10,
        image: 'https://images.unsplash.com/photo-1620127252536-03bdfcf6d5c3?auto=format&fit=crop&q=80&w=800',
        category: 'Camisetas',
    },
    {
        id: 2,
        name: 'Short Argentina Local 2024',
        price: 45000,
        discount: 0,
        image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800',
        category: 'Shorts',
    },
    {
        id: 3,
        name: 'Camiseta Retro 90s Edition',
        price: 95000,
        discount: 15,
        image: 'https://images.unsplash.com/photo-1521412644187-5447781b8344?auto=format&fit=crop&q=80&w=800',
        category: 'Retro',
    },
    {
        id: 4,
        name: 'Short de Entrenamiento Black',
        price: 35000,
        discount: 0,
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
        category: 'Training',
    },
    {
        id: 4,
        name: 'Short de Entrenamiento Black',
        price: 35000,
        discount: 0,
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
        category: 'Training',
    },
];

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('products');
        return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    });

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const addProduct = (product) => {
        const newProduct = { ...product, id: Date.now() };
        setProducts((prev) => [newProduct, ...prev]);
    };

    const deleteProduct = (id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
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
