import { createContext, ReactNode, useContext, useState } from "react"
import ShoppingCart from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"
import Checkout from "../components/Checkout"

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    openCheckout: () => void
    closeCheckout: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    clearCart: () => void
    cartQuantity: number
    cartItems: CartItem[]
}

type CartItem = {
    id: number
    quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
     return useContext(ShoppingCartContext);
}

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[]);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0
    );

    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    const increaseCartQuantity = (id: number) => {
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id) == null){
                return [...currItems, { id: id, quantity: 1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id){
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    const decreaseCartQuantity = (id: number) => {
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id)?.quantity === 1){
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id){
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    const removeFromCart = (id: number) => {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    const openCart = () => {
        setIsCartOpen(true);
    }

    const closeCart = () => {
        setIsCartOpen(false);
    }

    const openCheckout = () => {
        setIsCheckoutOpen(true);
    }

    const closeCheckout = () => {
        setIsCheckoutOpen(false);
    }

    const clearCart = () => {
        setCartItems([])
    }

    return <ShoppingCartContext.Provider 
    value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity, openCart, closeCart, openCheckout, closeCheckout, clearCart }}>
        {children}
        <ShoppingCart isOpen={isCartOpen}/>
        <Checkout isOpen={isCheckoutOpen}/>
    </ShoppingCartContext.Provider>
}