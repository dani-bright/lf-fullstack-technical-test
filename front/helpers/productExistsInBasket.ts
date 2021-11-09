import { BasicDoc, Hit } from "react-instantsearch-core";

export const productExistsInBasket = (products : Set<Hit<BasicDoc>>, objectID: string)=>{
    const productIds = [...(products as any)].map(product=>product.objectID);
    const productIdSet = new Set<string>();
    productIds.forEach(id=>{
        productIdSet.add(id)
    })
    return productIdSet.has(objectID);
}