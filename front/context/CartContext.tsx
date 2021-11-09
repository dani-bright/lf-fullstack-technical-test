import * as React from 'react';
import { FC, useContext, useState } from 'react';
import { BasicDoc, Hit } from "react-instantsearch-core";


export interface ICartProvider {
    products : Set<Hit<BasicDoc>>;
    setCartContent : (product : Hit<BasicDoc>) => void;
}

export const CartContext = React.createContext<ICartProvider>({ products: new Set<Hit<BasicDoc>>(), setCartContent : () => {} });
export const useCart = () => useContext(CartContext);

export const CartProvider : FC = (props) => {
    const [cartContent, setCart] = useState(new Set<Hit<BasicDoc>>());

    // @ts-ignore
    const setCartContent = (newProduct : Hit<BasicDoc>) => setCart((products) => {
        if (!products.has(newProduct)) {
            setCart(previousState => new Set([...(products as any), newProduct]))
        } else {
            const arr = [...(products as any)].filter(x => x !== newProduct)
            setCart(new Set(arr))
        }
    });

    const { children } = props;

    return (
        <CartContext.Provider value={{
            products: cartContent,
            setCartContent,
        }}
    >
        {children}
        </CartContext.Provider>
    );

};
