// database  
let db;

// create a new db request for a "budget" database.
const request = indexedDB.open('budget', 1);

// create object store (aka the table) called "pending" and set autoIncrement to true. This calls whenever we run a new version. 
request.onupgradeneeded = function (event) {
  const db = event.target.result;
  const budgetStore = db.createObjectStore('budget', { autoIncrement: true }); 
  budgetStore.createIndex('pendingIndex', 'pending'); // allows our database to quickly look up the data. goes to the table and creates a name and keypath 
};

// called each time you make a new request, even if the database schemas have not changed
request.onsuccess = function (event) {
  db = event.target.result;
  if (navigator.onLine) {
    checkDatabase();
  }
};

 // calls and logs any errors 
request.onerror = function (event) {
  console.log('There has been an error with retrieving your data: ' + request.error);
};