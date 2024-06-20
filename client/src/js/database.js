import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>{
    console.log(content);
    //open DB connection
    const jateDB = await openDB('jate', 1);
    //create a new transaction
    const tx = jateDB.transaction('jate', 'readwrite');
    //open desired object store
    const store = tx.objectStore('jate');
    //add content to database
    const request = store.put({content});
    //get confirmation
    const result = await request;
    console.log('content saved to database', result)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    console.log('getDB');
    //open connection
    const jateDB = await openDB('jate', 1);
    //create a new transaction
    const tx = jateDB.transaction('jate', 'readwrite');
    //open desired object store
    const store = tx.objectStore('jate');
    //get all content from store
    const request = store.getAll();
    //get confirmation
    const result = await request;
    console.log('result: ', result);
    //return it
    return result.content;
};

initdb();
