import './App.css';
import { BrowserRouter,Route,Routes,Link } from 'react-router-dom';
import Home from './components/Home'
import Products from './components/Products'
import NewProduct from './components/NewProduct'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useAppsstate ,AppContext} from './api/server';
import State from './components/State';


function App() {
  const [ currentRouter ,setCurrentRouter] = useState();
  useEffect (()=>{ 
    setCurrentRouter(window.location.pathname.toLocaleLowerCase()) ;
  },[])
  return (
<AppContext.Provider value = {useAppsstate()}>

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
<div className="container mt-4">
  <div className="card shadow-lg border-0 rounded-4">
    <div className="card-body p-4">
      <h5 className="card-title text-center mb-3">Statistiques</h5>
      <div className="text-center">
        <State />
      </div>
    </div>
  </div>
</div>
   <Routes>
    <Route path='/home' element={<Home/>} ></Route>
    <Route path='/products' element={<Products/>}></Route>
        <Route path='/newProduct' element={<NewProduct/>}></Route>

    </Routes>
   </BrowserRouter>
   </AppContext.Provider>
  );
}

export default App;
