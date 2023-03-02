import React, { useState, useEffect } from 'react';
import { addToCart, getCartItems, updateInCart, getSpecificItemFromCart } from '../api/cart';
import { addToCompare, getCompareItems, removeFromCompare } from '../api/compare';
import productInventory from "../data/productInventory.json";

const Product = ({item, layout}) => {  
    const [product, setProduct] = useState({});
    useEffect(() => {
      // Expecting that imventory for each product exists
      const overAllStock = productInventory.find((inventory) => inventory.product_id == item.product_id).stock;
      getCartItems().then(result => {
        const productIncart = result.find((product) => product.product_id == item.product_id);
        
        console.log('rtrtrtrt = ', {...item, stock: (productIncart ? overAllStock - productIncart.stock : overAllStock) });

        setProduct({...item, stock: (productIncart ? overAllStock - productIncart.stock : overAllStock) });
      });
    },[item, product]);

    const addUpdateToCartFunc = () => {
      if(product.stock == 0) {
        alert('Product Out of Stock');
      } else {
        getCartItems().then(result => {     
          const productIncart = result.find((product) => product.product_id == item.product_id);
          setProduct({...item, stock: product.stock-- });
          console.log('productIncart = ', {...item, stock: product.stock-- });
          if(productIncart) {
            productIncart.stock++;          
            updateInCart(productIncart);          
          } else {
            item.stock = 1;
            addToCart(item);
          }
        });
      }
    }

    const addToCompareFunc = () => {
      getCompareItems().then(result => {
        if(result.length < 3) {
          console.log('result = ', result);
          addToCompare(item).catch(error=> {
            alert('Already in compare list');
          });
        } else {
          alert('Compare list has already 3 products');
        }
      });
    }

    const displayProductInfo = (attr) => {
      let cellContent = layout=='grid'? `${attr} : ${product[attr]}` : product[attr];
      return cellContent;
    }
    return (
        <div className='pitem'>
          <div>{ displayProductInfo('product_id') }</div>
          <div>{ displayProductInfo('product_name') }</div>
          <div>{ displayProductInfo('brand') }</div>
          <div>{ displayProductInfo('price') }</div>
          <div>{ displayProductInfo('stock') }{(product.stock <= 2) && (<span className='lowStock'>Low Stock</span>)}</div>
          <div>
            <button onClick={()=> addUpdateToCartFunc()}>Add to Cart</button>&nbsp;
            <button onClick={()=> addToCompareFunc()}>Compare</button>
          </div>
      </div>       
    )
}

export default Product;