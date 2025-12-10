import React, { useContext } from 'react'
import { AppContext } from '../api/server'

export default function State() {


    const [state,setState] = useContext(AppContext)
  return (
    <div>
      {state.products.length}
    </div>
  )
}
