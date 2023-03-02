import { getEntries, addNewEntry, removeEntry } from "../utils/db1";

const addToCompare = async data => {
    await addNewEntry('compare', data);
}

const getCompareItems = async () => {
    const cartItems = await getEntries('compare');
    return cartItems;
}

const removeFromCompare = async (itemId) => {
    await removeEntry('compare', itemId);
}

export { addToCompare, getCompareItems, removeFromCompare };