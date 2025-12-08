import React from 'react'

import { saveProduct } from '../api/server'
import { useState } from 'react';

export default function NewProduct() {
   const [name , setName] = useState('') ;
  const [price , setPrice] = useState() ;
  const [checked,setChecked] = useState(false)

const handlesaveProduct = ((event)=> {
  event.preventDefault() ;
  let product = {name , price , checked}
  saveProduct(product).then((resp)=>{
    alert (JSON.stringify (resp.data)) ;
  });

})

  return (
     <div className="container mt-4">
      <h3>New Product</h3>

      <form onSubmit={handlesaveProduct} className="card p-4">

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            required
            onChange={e => setName(e.target.value)}
            value={name}

          />
        </div>
        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            required
            onChange={e => setPrice(Number(e.target.value))}
            value={price}
          />
        </div>

        {/* Checked */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="checked"
            onChange={e => setChecked(e.target.value)}
            checked={checked}
          />
          <label className="form-check-label">
            Available
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  )
}
