// import myIndexedDB from '../utils/db1';
// const db = new myIndexedDB();
// console.log("db", db);
import { getEntries, addNewEntry, removeEntry, updateEntry } from "../utils/db1";

const addToCart = async data => {
    data.created= new Date()
    await addNewEntry('cart', data);
}

const getCartItems = async () => {
    const cartItems = await getEntries('cart');
    return cartItems;
}

const removeFromCart = async (itemId) => {
    await removeEntry('cart', itemId);
}

const updateInCart = async (data, itemId) => {
    await updateEntry('cart', data, itemId);
}

// const getSpecificItemFromCart = async (itemValue) => {
//     await db.getSpecificEntry('cart', itemkey, itemValue);
// }


export { addToCart, getCartItems, removeFromCart, updateInCart, /*getSpecificItemFromCart*/ };