// check for IndexedDB support
if (!window.indexedDB) {
    // console.log(`Your browser doesn't support IndexedDB`);
    alert("Oops, Does not support IndexedDB");  
}

const dbName = 'MyCartDatabase';

// open the CRM database with the version 1
const request = indexedDB.open(dbName, 1);
var db; 

// create the Contacts object store and indexes
request.onupgradeneeded = (event) => {
    let db = event.target.result;
    db.createObjectStore('cart', { keyPath: 'id', autoIncrement: true});
    db.createObjectStore('compare', { keyPath: 'product_id'});        
};

// handle the error event
request.onerror = (event) => {
    console.error(`Database error: ${event.target.errorCode}`);
};

// handle the success event
request.onsuccess = (event) => {
    const db = event.target.result;
};

export function getEntries(tableName) {
    const myPromise = new Promise((resolve, reject) => {
        var req = window.indexedDB.open(dbName, 1);
        req.onerror =function (error) {
            console.log("error: ", error);
        };
        
        req.onsuccess =function (event) {  
            const db = event.target.result;           
            var myTran = db.transaction([tableName], "readonly");  
            let request = myTran.objectStore(tableName).getAll(); 
            request.onsuccess = function (e)  {  
                resolve(request.result);
            };  
            request.onerror = function (e) {  
                alert("Oops, There is error!", e.message);              
                reject(request.error)
            }; 
            myTran.oncomplete = function (e)  {                      
                db.close();  
            };             
        };            
    });
    return myPromise;
}
export function addNewEntry(tableName, data) {
    const myPromise = new Promise((resolve, reject) => {    
        
            var req = window.indexedDB.open(dbName, 1);
            req.onerror =function (error) {
                console.log("error: ", error);
            };
            
            req.onsuccess =function (event) {  
                const db = event.target.result;           

                let transaction = db.transaction([tableName], 'readwrite');
                let request = transaction.objectStore(tableName).add(data);            
                request.onerror = function() {
                    console.log(request.error);
                    reject(request.error)
                };
                request.onsuccess = function() {
                    resolve(request.result);
                };  
            };          
    });
    return myPromise; 
}

export function removeEntry(tableName, id) {
    const myPromise = new Promise((resolve, reject) => {    
        
        var req = window.indexedDB.open(dbName, 1);
        req.onerror =function (error) {
            console.log("error: ", error);
        };
        
        req.onsuccess =function (event) {  
            const db = event.target.result;

            let transaction = db.transaction([tableName], 'readwrite'); //readonly is optional params
            let request = transaction.objectStore(tableName).delete(id);
            request.onerror = function() {
                console.log(request.error);
                reject(request.error)
            };
            request.onsuccess = function() {
                resolve(request.result);
            };
        };
    });
    return myPromise;
}    

export function updateEntry(tableName, data, id) {
    const myPromise = new Promise((resolve, reject) => {    
        
        var req = window.indexedDB.open(dbName, 1);
        req.onerror =function (error) {
            console.log("error: ", error);
        };
        
        req.onsuccess =function (event) {  
            const db = event.target.result;           

            let transaction = db.transaction([tableName], 'readwrite');
            let request = transaction.objectStore(tableName).put(data, id);              
            request.onerror = function() {
                console.log(request.error);
                reject(request.error)
            };
            request.onsuccess = function() {
                resolve(request.result);
            };  
        };          
    });
    return myPromise;
}
