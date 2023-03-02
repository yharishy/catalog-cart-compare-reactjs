import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({title}) => {
  return (  
    <div>
        Routing Link: <Link to="/catalog">Product Catalog</Link> | <Link to="/cart">Cart</Link> | <Link to="/compare">Compare</Link>        
        <h3 className='title'>{title}</h3>
    </div>
  )
};

export default Header;
