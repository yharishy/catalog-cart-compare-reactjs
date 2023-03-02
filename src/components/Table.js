import React from 'react';
import Product from './Product';
const Table = ({productList}) => {   
    // Expecting same number of attributes in each product detail objects
    return (
        <div className='table'>
            {productList.length > 0 && (
                <>
                    <div className='tableHeader'>
                        {Object.keys(productList[0]).map(item => (<div key={item}>{item}</div>))}
                        <div>Stock</div>
                        <div>Actions</div>
                    </div>
                    <div className='tableBody'>
                        {productList.map(item => <Product key={item.product_id} item={item} layout="table" />)}
                    </div>
                </>
            )}
        </div>        
    )
}

export default Table;