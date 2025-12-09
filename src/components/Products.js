import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck ,faCircleXmark ,faDeleteLeft} from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { deleteProduct, getProducts , checkedProduct } from '../api/server';

export default function Products() {

     const [state , setState]= useState ({
      products : [] ,
      currenetPage : 1 ,
      pageSize : 4,
      keyword: " " ,
      totalPages: 0, 
     }
     ) ;

     const handeleProductdelete = (product) => {
        deleteProduct(product).then((resp) =>{
const newProducts = state.products.filter(p=>p.id!==product.id)
setState({...state, products: newProducts})
        })
     };

     const handeleProductchecked = (product)=> {
    checkedProduct(product).then((resp)=>{
           const newProducts = state.products.map((p) => {
            if (p.id == product.id){
                p.checked = !p.checked
            }
            return p ;
        }
    );
          setState({...state, products: newProducts})
    })
     } ;
const hadeleGoPage = (page) => {
  setState(prevState => {
    hadeleGetProduct(page, prevState.keyword, prevState.pageSize);
    return prevState;
  });
}


     useEffect( () => { 
        hadeleGetProduct(state.currenetPage,state.keyword,state.pageSize) ;
     }
     ,[])


   const hadeleGetProduct = (currentPage, keyword, pageSize) => {
  getProducts(currentPage, keyword, pageSize).then(resp => {
    const totalElements = parseInt(resp.headers["x-total-count"]);
    let totalPages = Math.floor(totalElements / pageSize);
    if (totalElements % pageSize != 0) ++totalPages;
    
    setState({
      products: resp.data,
      currenetPage: currentPage,
      pageSize: pageSize,
      keyword: keyword,
      totalPages: totalPages,
    });
  })
  .catch((err) => {
    console.log(err);
  });
  console.log("Request page:", currentPage, "keyword:", keyword, "pageSize:", pageSize);
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
            {state.products.map((product) => (
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
         <ul className="nav nav-pills">
          {
            new Array (state.totalPages).fill(0).map((v,index)=>(
              <li>
               <button 
  onClick={() => hadeleGoPage(index + 1)} 
  className={`btn ms-1 ${state.currenetPage === index + 1 ? 'btn-info' : 'btn-outline-info'}`}
>
  {index + 1}
</button>
                  
              </li>
            ))
          }

  </ul>  
  
      </div>

    </div>
  </div>
</div>

  )
}
