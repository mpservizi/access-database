/**
 * Connessione a database access e query sql scritte a mano
 */
// const MyQuery = require('./my-querry');
const DbManger = require('./db-manager');

let dbPath = 'mydb.accdb';

if (!DbManger.init(dbPath)) {
    console.log('Errore apertura database');
    return;
}

console.log('Database pronto');