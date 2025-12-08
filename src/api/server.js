import axios from "axios";

export const apiProducts = axios.create({
    baseURL: 'http://localhost:9000'
})

export const getProducts =()=> {
    return apiProducts.get('/products')
}

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


