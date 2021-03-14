const ADODB = require('node-adodb');
ADODB.debug = true;
const fs = require('fs');

/**
 * Inizializza la connessione con il database
 * @param {String} dbPath : percorso del dataabse
 * @returns {Object} connessione al database. Null in caso di errore
 */
function openConnection(dbPath) {
    const conStr = 'Provider=Microsoft.ACE.OLEDB.12.0;Data Source=' + dbPath + ';Persist Security Info=False;'
    try {
        if (!fs.existsSync(dbPath)) {
            console.log('Percorso database non valido : ' + dbPath);
            return null;
        }
        let connection = ADODB.open(conStr);
        return connection;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Esegue la funzione di querry su database
 * @param {Object} connection : database connection
 * @param {String} sql : testo sql
 * @param {Boolean} execute : Indica se eseguite metodo con execute invece di querry
 * @returns {Array} : in caso di execute array è vuoto
 */
async function eseguiFunzione(connection, sql, execute) {
    try {
        let result = null;
        if (execute) {
            await connection.execute(sql);
            result = {result:'OK'};
        } else {
            result = await connection.query(sql);
        }
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * Classe wrapper per gestione database
 */
class DbManager {
    constructor() { }
    /** Inizializza la connessione
     * @param {dbPath}  :percorso del database
     * @returns {boolean} : true in caso di successo
     */
    init(dbPath) {
        this.connection = openConnection(dbPath);
        return this.connection != null;
    }
    async select(sql) {
        return await eseguiFunzione(this.connection, sql);
    }
    async insert(sql) {
        return await eseguiFunzione(this.connection, sql, true);
    }
    async update(sql) {
        return await eseguiFunzione(this.connection, sql, true);
    }
    async delete(sql) {
        return await eseguiFunzione(this.connection, sql, true);
    }
}

/**
 * Crea testo sql per eseguire querry con i parametri
 * @param {String} nomeQuerry : nome della querry in databse access
 * @param {Object} params : Oggetto con chiave = nome parametro e valore = valore parametro
 * @returns {String} testo sql
 */
function creaSqlParametriQuerry(nomeQuerry, params) {
    let strParams = '';
    Object.keys(params).forEach(key => {
        let p = key;
        let v = params[key];
        strParams += ` @${p}="${v}"`
    })
    let sql = nomeQuerry + strParams;
    // console.log(sql);
    return sql;
}
function creaSqlValori(params) {
    let campi = '';
    let valori = '';
    Object.keys(params).forEach(key => {
        let p = key;
        let v = params[key];
        campi += `, ${p}`;
        valori += `, "${v}"`;
    });
    //Tolgo la virgola iniziale
    campi = campi.substr(1);
    valori = valori.substr(1);
    //INSERT INTO nomi ( Nome, Anni ) VALUES ("Node js", "15");
    let sql = `(${campi} ) VALUES (${valori} )`;
    return sql;
}

function creaInsertQuery(nomeTabella, params) {
    let valori = creaSqlValori(params);
    //INSERT INTO nomi ( Nome, Anni ) VALUES ("Node js", "15");
    let sql = `INSERT INTO ${nomeTabella} ${valori};`;
    return sql;
}

function creaUpdateQuerry(nomeTabella, params, criteria) {
    //UPDATE nomi SET nome = '$nome', anni = '$anni';
    let valori = '';
    Object.keys(params).forEach(key => {
        let p = key;
        let v = params[key];
        valori += ` ${p} = ${v},`;
    });
    //Tolgo ultima virgola
    valori = valori.substring(0, valori.length - 1);
    let sql = `UPDATE ${nomeTabella} SET${valori} WHERE ${criteria};`;
    console.log(sql);
}
module.exports = new DbManager();