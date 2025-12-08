import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck ,faCircleXmark ,faDeleteLeft} from '@fortawesome/free-solid-svg-icons'

import React, { useEffect, useState } from 'react'
import { deleteProduct, getProducts , checkedProduct } from '../api/server';

export default function Products() {

     const [products , setProducts]= useState ([]) ;

     const handeleProductdelete = (product) => {
        deleteProduct(product).then((resp) =>{
const newProducts = products.filter(p=>p.id!==product.id)
      setProducts(newProducts) ;        }) ;
        
     };

     const handeleProductchecked = (product)=> {

    checkedProduct(product).then((resp)=>{
           const newProducts = products.map((p) => {
            if (p.id == product.id){
                p.checked = !p.checked
            }
            return p ;
        }
    );
    setProducts(newProducts) ;
    })
     } ;

     useEffect( () => { 
        hadeleGetProduct() ;
     }
     ,[])

    const  hadeleGetProduct = () => {
        getProducts().then (resp => {
          setProducts(resp.data)
        })
        .catch ((err)=>{
          console.log (err) 
        });
    }

  return (

  <div className="p-3 m-3">
  <div className="card shadow">
    <div className="card-body">
      <h3 className="text-center mb-4">Product Component</h3>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Checked</th>
            <th>Delete</th>

            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <button onClick={() => handeleProductchecked(product)}
                    className={
                        product.checked
                        ? "btn btn-success btn-sm"
                        : "btn btn-danger btn-sm"
                    }
                  >
                    {product.checked ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faCircleXmark} />
                    )}
                  </button>
                </td>

                 <td>
                    <button  className='btn btn-danger btn-sm'
                     onClick={() => handeleProductdelete(product)}>
                        <FontAwesomeIcon icon={faDeleteLeft}/>
              </button>
                </td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  </div>
</div>

  )
}
