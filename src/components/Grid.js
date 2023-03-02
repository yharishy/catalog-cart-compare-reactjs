import React from 'react';
import Product from './Product';
const Grid = ({productList}) => {    
    return (
        <div className='grid'>
            {productList.map(item => <Product key={item.product_id} item={item} layout="grid" />)}
        </div>        
    )
}

export default Grid;