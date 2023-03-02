import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Catalog from './routes/Catalog';
import Cart from './routes/Cart';
import Compare from './routes/Compare';

const App = () => (
  <div className='App'> 
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<div><Link to="/catalog">Click here to navigate to product catalog page</Link></div>} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/compare" element={<Compare />} />
        </Routes>
      </Suspense>
    </Router>
  </div>
);

export default App;
