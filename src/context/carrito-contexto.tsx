import { useContext, createContext, ReactNode } from "react";
import Queso from "../models/queso";
import { useLocalStorage } from "../hooks/useLocalStorage";
import CartItem from "../models/carritoItem";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContextType = {
    getCartItems: () => CartItem[]
    emptyCart: () => void
    increaseCartQuantity: (id: number, gramosQueso: number, queso: Queso) => void
    decreaseCartQuantity: (id: number, gramosQueso: number) => void
    removeFromCart: (id:number) => void
    cartQuantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContextType)

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children} : ShoppingCartProviderProps){
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        []
      )

    const cartQuantity = getCartItems().length;

    function getCartItems(){
      return cartItems;
    }

    function emptyCart(){
      setCartItems([]);
    }

    function increaseCartQuantity(id: number, gramosQueso: number, queso: Queso) {
        setCartItems(currItems => {
          if (currItems.find(item => item.id === id) == null) {
            let gramos : number = +gramosQueso;
            return [...currItems, { id: id, queso: queso, gramosQueso: +gramos }]
          } else {
            return currItems.map(item => {
              if (item.id === id) {
                let gramos : number = (+item.gramosQueso) + (+gramosQueso);
                return { id: id, queso: queso, gramosQueso: +gramos  }
              } else {
                return item
              }
            })
          }
        })
      }

      function decreaseCartQuantity(id: number, gramosQueso: number) {
        setCartItems(currItems => {
          if (currItems.find(item => item.id === id)?.gramosQueso === 250) {
            return currItems.filter(item => item.id !== id)
          } else {
            return currItems.map(item => {
              if (item.id === id) {
                return { ...item, gramosQueso: (+item.gramosQueso) - (+gramosQueso) }
              } else {
                return item
              }
            })
          }
        })
      }

      function removeFromCart(id: number) {
        setCartItems(currItems => {
          return currItems.filter(item => item.id !== id)
        })
      }

    return (
        <ShoppingCartContext.Provider 
        value={{
            getCartItems,
            emptyCart,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            cartQuantity
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}