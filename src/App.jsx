import React, { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import InfoSection from './components/InfoSection'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import LoginModal from './components/LoginModal'
import AdminPanel from './components/AdminPanel'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false)

  return (
    <AuthProvider>
      <ProductProvider>
        <ThemeProvider>
          <CartProvider>
            <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
              <Navbar
                onOpenCart={() => setIsCartOpen(true)}
                onOpenLogin={() => setIsLoginOpen(true)}
                onOpenAdmin={() => setIsAdminPanelOpen(true)}
              />
              <main>
                <Hero />
                <ProductGrid />
                <InfoSection />
              </main>
              <Footer />
              <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
              <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
              <AdminPanel isOpen={isAdminPanelOpen} onClose={() => setIsAdminPanelOpen(false)} />
            </div>
          </CartProvider>
        </ThemeProvider>
      </ProductProvider>
    </AuthProvider>
  )
}

export default App
