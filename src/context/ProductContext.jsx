import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

const initialProducts = [
    {
        id: 1,
        name: "Argentina Local 2026 + Parche + Messi 10",
        price: 60000,
        discount: 0,
        category: "Camisetas",
        image: "/images/products/ec62b6d4.jpg"
    },
    {
        id: 2,
        name: "Argentina Edicion Aniversario",
        price: 50000,
        discount: 0,
        category: "Camisetas",
        image: "/images/products/ebef86d9.jpg"
    },
    {
        id: 3,
        name: "Atletico Madrid 25-26 + Parche + Julian Alvarez N°19",
        price: 60000,
        discount: 0,
        category: "Camisetas",
        image: "/images/products/AtleticoMadrid.jpg"
    },
    {
        id: 4,
        name: "Inter Miami 25 - 26 + Parche + Messi N°10",
        price: 55000,
        discount: 0,
        category: "Camisetas",
        image: "/images/products/InterMiami.jpg"
    },
    {
        id: 5,
        name: "Roma Alternativa 25-26",
        price: 50000,
        discount: 0,
        category: "Camisetas",
        image: "/images/products/RomaAlternativa.jpeg"
    },
    {
        id: 6,
        name: "Adidas Oasis Black",
        price: 53500,
        discount: 0,
        category: "Camisetas",
        image: "/images/products/oasisBlack.jpeg"
    }, {
        id: 7,
        name: "Barcelona Local 25 - 26 + Parche",
        price: 53500,
        discount: 0,
        category: "Camisetas",
        image: "/images/products/Barcelona.jpg"
    }, {
        id: 8,
        name: "Liverpool 25 - 26 Alexis Mac Allister N°10",
        price: 60000,
        discount: 0,
        category: "Camisetas",
        image: "/images/products/liverpoolBlanca.jpg"
    }, {
        id: 9,
        name: "Liverpool 25 - 26 Short Jugador",
        price: 50000,
        discount: 0,
        category: "Shorts",
        image: "/images/products/shortLiverpool.jpeg"
    }, {
        id: 10,
        name: "Argentina 25 - 26 Short Jugador",
        price: 50000,
        discount: 0,
        category: "Shorts",
        image: "/images/products/shortArg.jpeg"
    }, {
        id: 11,
        name: "Short Sorpresa",
        price: 55000,
        discount: 0,
        category: "Shorts",
        image: "/images/products/images.jpeg"
    }, {
        id: 12,
        name: "Camiseta Sorpresa",
        price: 60000,
        discount: 0,
        category: "Camisetas",
        image: "/images/products/regalo-sorpresa.jpg"
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
