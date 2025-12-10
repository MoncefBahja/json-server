import axios from "axios";
import {  useContext , useState } from "react";
import { createContext } from 'react';  




export const apiProducts = axios.create({
    baseURL: 'http://localhost:9000'
})

export const getProducts = (page = 1, keyword = "", size = 4) => {
  return apiProducts.get(`/products?_page=${page}&_limit=${size}`);
};


export const getProductById =(id)=> {
    return apiProducts.get(`/products/${id}`)
}

export const saveProduct =(product)=> {
    return apiProducts.post('/products',product)
}

export const deleteProduct =(product)=> {
    return apiProducts.delete(`/products/${product.id}`)
}

export const checkedProduct =(product)=> {
    return apiProducts.patch(`/products/${product.id}`, {checked : !product.checked})
}
export const updateProduct =(product)=> {
    return apiProducts.patch(`/products/${product.id}`,product)
}


export const AppContext = createContext() ;

export const useAppsstate = () => {
    const intialstate = {
      products : [] ,
      currenetPage : 1 ,
      pageSize : 4,
      keyword: " " ,
      totalPages: 0, 
     }
     const appState = useState (intialstate) ;
     return appState ;

}
 

