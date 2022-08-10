let db;

const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = function(event) {
    db = event.target.result;
    // check if app is online before reading
    if(navigator.online) {
        checkDatabase();
    }

};

request.onerror = function(event) {
    console.log("Whoops! " + event.target.errorCode)
};

function saveRecord(record){
    // create a transaction on the pending db
    const transaction = db.transaction(["pending"], "readwrite");
    // access pending object store
    const store = transaction.objectStore("pending");
    // get all records from store and set to a variable
    const getAll = store.getAll();
}

function checkDatabase() {
    // open a transaction on your pending db
    const transaction = db.transaction(["pending"], "readwrite");
    // access your pending object store
    const store = transaction.objectStore("pending");
    // get all records from store and set to a variable
    const getAll = store.getAll();

    getAll.onsuccess = function(){
        if(getAll.result.length > 0){
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(() => {
                // if success open a trans on pending db
                const transaction = db.transaction(["pending"], "readwrite");
                // access pending obj store
                const store = transaction.objectStore("pending");
                // clear store
                store.clear();
            });
        }
    };
}

window.addEventListener("online", checkDatabase)