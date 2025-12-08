import './App.css';
import { BrowserRouter,Route,Routes,Link } from 'react-router-dom';
import Home from './components/Home'
import Products from './components/Products'
import NewProduct from './components/NewProduct'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function App() {
  const [ currentRouter ,setCurrentRouter] = useState();
  useEffect (()=>{ 
    setCurrentRouter(window.location.pathname.toLocaleLowerCase()) ;
  },[])
  return (
   <BrowserRouter>
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link  onClick={() => setCurrentRouter('/home')} 
            className= {currentRouter === '/home' ? 'nav-link active' : 'nav-link'} 
            to="/home">Home</Link>
          </li>

          <li className="nav-item">
            <Link   onClick={() => setCurrentRouter('/products')} 
            className= {currentRouter === '/products' ? 'nav-link active' : 'nav-link'} 
            to="/products">Products</Link>
          </li>
          
          <li className="nav-item">
            <Link   onClick={() => setCurrentRouter('/newProduct')} 
            className= {currentRouter === '/newProduct' ? 'nav-link active' : 'nav-link'} 
            to="/newProduct">NewProduct</Link>
          </li>
        </ul>
      </div>
    </nav>
   <Routes>
    <Route path='/home' element={<Home/>} ></Route>
    <Route path='/products' element={<Products/>}></Route>
        <Route path='/newProduct' element={<NewProduct/>}></Route>

    </Routes>
   </BrowserRouter>
  );
}

export default App;
