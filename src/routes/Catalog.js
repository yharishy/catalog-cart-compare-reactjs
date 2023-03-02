import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import productList from "../data/productList.json";
// import productInventory from "../data/productInventory.json";
import Grid from '../components/Grid';
import Table from '../components/Table';
import { getCartItems } from "../api/cart";

const Catalog = () => {
  const [layout, setLayout] = useState('table');
  // const [pList, setProductList] = useState([]);  

  // useEffect(() => {
  //   setProductList(loadProductList());
  // },[productList]);

  // useEffect(() => {
  //   getCartItems().then(result => {        
  //     console.log('result = ',result);
  //     // const productIncart = result.find((product) => product.product_id == item.product_id);
  //     // setProduct({...item, stock: (productIncart ? overAllStock - productIncart.stock : overAllStock) });
  //   });
  // },[]);

  // const loadProductList = () => {      
  //   return productList;
  //   // return productList.map(product => {
  //   //   const pInventory = productInventory.find((inventory) => inventory.product_id == product.product_id);
  //   //   product.stock = pInventory.stock;
  //   //   return product;
  //   // });      
  // }  

  return (
  <div>
      <Header title="Product Catalog"/>
      <div>
        Set Layout : 
        <select onChange={(evt)=> setLayout(evt.target.value)} value={layout}>
            <option value="table">Table</option>
            <option value="grid">Grid</option>
        </select>        
      </div><br />
      { layout=='grid' && <Grid productList={productList} /> }
      { layout=='table' && <Table productList={productList} /> }
  </div>    
  )
};

export default Catalog;
