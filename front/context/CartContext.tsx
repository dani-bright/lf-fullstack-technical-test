import * as React from 'react';
import { FC, useContext, useState } from 'react';
import { BasicDoc, Hit } from "react-instantsearch-core";
import axios from "axios"

export interface ICartProvider {
    products : Set<Hit<BasicDoc>>;
    setCartContent : (product : Hit<BasicDoc>) => void;
    setCartUuid : (id:string) => void;
    uuid? :string;
}

export const CartContext = React.createContext<ICartProvider>({ uuid :undefined, products: new Set<Hit<BasicDoc>>(), setCartContent : () => {}, setCartUuid: ()=>{} });
export const useCart = () => useContext(CartContext);

export const CartProvider : FC = (props) => {
    const [cartContent, setCart] = useState(new Set<Hit<BasicDoc>>());
    const [uuid, setUuid] = useState("");


    // @ts-ignore
    const setCartContent = (newProduct : Hit<BasicDoc>) => setCart((products) => {        
        if (!products.has(newProduct)) {
            setCart(previousState => new Set([...(products as any), newProduct]))

            // axios.post(`http://localhost:4000/${uuid}`, {id:newProduct.objectID, quantity : 1})
        } else {
            const arr = [...(products as any)].filter(x => x !== newProduct)
            setCart(new Set(arr))
        }
    });

    const setCartUuid = (uuid : string) => {setUuid(uuid)}

    const { children } = props;

    return (
        <CartContext.Provider value={{
            uuid,
            products: cartContent,
            setCartContent,
            setCartUuid
        }}
    >
        {children}
        </CartContext.Provider>
    );

};
