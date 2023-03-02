import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Product from '../components/Product';
import { getCompareItems, removeFromCompare } from "../api/compare";

const Cart = () => {
  const [compareList, setCompareList] = useState([]);
  const [compareListKeys, setCompareListKeys] = useState(["product_id", "brand", "price"]);
  
  useEffect(() => {
    getCompareItems().then(result => {
      setCompareList(result);
    });
  },[]);

  const removeFromCompareFunc = (itemId) => { 
    removeFromCompare(itemId).then(()=> {
      getCompareItems().then(result => {
        setCompareList(result);
      });
    });
  }
  
  return (
  <div>
      <Header title="Compare List" /> 
        <div className='compare'>
            {compareList.length > 1 ? (
              <>
              <div key={`title`} className="compare-item-title">
                      {compareList.map(p => (
                        <div key={`${p.product_id}-title}`} className='compare-row'>
                          {p.product_name}
                          &nbsp;
                          <button onClick={()=> removeFromCompareFunc(p.product_id)}>Remove from Cart</button>
                        </div>
                      ))}
              </div>           
              {compareListKeys.map(item => (
                  <div key={`${item}`} className="compare-item">
                      {compareList.map(p => (
                        <div key={`${p.product_id}-${item}}`} className='compare-row'>{p[item]}</div>
                      ))}
                  </div> 
              ))}
              </>
            ) : (
              <div>Not enough product in compare list</div>          
            )}
        </div>             
  </div>
  )
};

export default Cart;
