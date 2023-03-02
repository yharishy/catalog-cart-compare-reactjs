if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

class myIndexedDB {

    db;
    // objStoreList;

    constructor() {
        // initialize indexedDB database (start)        
        const request = indexedDB.open("MyCartDatabase", 1);

        request.onupgradeneeded = function (e) {
            this.db = e.target.result;
            this.db.createObjectStore('cart', { keyPath: 'id', autoIncrement: true});
            // this.objStoreList.push(objStore);
            this.db.createObjectStore('compare', { keyPath: 'product_id'});
            // this.objStoreList.push(objStore);
        };
        request.onerror = (event) => {
            console.error("Why didn't you allow my web app to use IndexedDB?!");
        };
        request.onsuccess = (event) => {
            this.db = event.target.result;  
            // console.log("this.db", this.db);
        };
        // initialize indexedDB database (end)
    }

    // createNewObjectStore(tableName, keyPath) {        
    //     const objStore = this.db.createObjectStore(tableName, {keyPath});
    //     this.objStoreList.push(objStore);
    // }

    addNewEntry(tableName, data) {
        const myPromise = new Promise((resolve, reject) => {        
            let transaction = this.db.transaction([tableName], 'readwrite');
            let request = transaction.objectStore(tableName).add(data);            
            request.onerror = function() {
                console.log(request.error);
                reject(request.error)
            };
            request.onsuccess = function() {
                resolve(request.result);
            };            
        });
        return myPromise;
    }
    updateEntry(tableName, data, id) {
        const myPromise = new Promise((resolve, reject) => {        
            let transaction = this.db.transaction([tableName], 'readwrite');
            let request = transaction.objectStore(tableName).put(data, id);              
            request.onerror = function() {
                console.log(request.error);
                reject(request.error)
            };
            request.onsuccess = function() {
                resolve(request.result);
            };            
        });
        return myPromise;
    }
    // getSpecificEntry(tableName, key, value) {          
    //     const myPromise = new Promise((resolve, reject) => {
    //         let transaction = this.db.transaction([tableName], 'readonly'); //readonly is optional params
    //         let request = transaction.objectStore(tableName).get(id);
    //         request.onerror = function() {
    //             console.log(request.error);
    //             reject(request.error)
    //         };
    //         request.onsuccess = function() {
    //             resolve(request.result);
    //         };            
    //     });
    //     return myPromise;
    // }
    getEntries(tableName) {   
        console.log("123 this.db", this.db);
        const myPromise = new Promise((resolve, reject) => {
            let transaction = this.db.transaction([tableName], 'readonly'); //readonly is optional params
            let request = transaction.objectStore(tableName).getAll();
            request.onerror = function() {
                console.log(request.error);
                reject(request.error)
            };
            request.onsuccess = function() {
                resolve(request.result);
            };            
        });
        return myPromise;
    }
    removeEntry(tableName, id) {          
        const myPromise = new Promise((resolve, reject) => {
            let transaction = this.db.transaction([tableName], 'readwrite'); //readonly is optional params
            let request = transaction.objectStore(tableName).delete(id);
            request.onerror = function() {
                console.log(request.error);
                reject(request.error)
            };
            request.onsuccess = function() {
                resolve(request.result);
            };            
        });
        return myPromise;
    }
}

export default myIndexedDB;