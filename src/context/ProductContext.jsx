import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

const initialProducts = [
    {
        id: 1,
        name: "Camiseta Sorpresa",
        price: 60000,
        discount: 0,
        category: "Camisetas",
        image: "https://images.pexels.com/photos/17160679/pexels-photo-17160679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: 2,
        name: "Short Sorpresa",
        price: 55000,
        discount: 0,
        category: "Shorts",
        image: "https://images.pexels.com/photos/6077792/pexels-photo-6077792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: 3,
        name: "Atletico Madrid 25-26 + Parche + Julian Alvarez N°19",
        price: 60000,
        discount: 0,
        category: "Camisetas",
        image: "https://images.pexels.com/photos/32368148/pexels-photo-32368148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
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
