const sql = require('sql-query');
const sqlQuery = sql.Query();

/**
 * Crea querry per la selezione
 * @param {String} nomeTabella 
 * @param {String[]} colonne : Array con nome delle colonne
 * @param {object} criteri : oggetto nome colonna e valore
 * @returns 
 */
function selectSql(nomeTabella, colonne, criteri) {
    let obj = sqlQuery.select();
    let sql = obj
        .from(nomeTabella)
        .select(colonne)
        .where(criteri)
        .build();
    return sql;
}

/**
 * Crea querry per inserimento dati
 * @param {String} nomeTabella 
 * @param {object} valori : oggetto nome colonna e valore 
 * @returns 
 */
function insertSql(nomeTabella, valori) {
    let obj = sqlQuery.insert();
    let sql = obj
        .into(nomeTabella)
        .set(valori)
        .build();
    return sql;
}
/**
 * Crea querry per update
 * @param {String} nomeTabella 
 * @param {object} valori : oggetto nome colonna e valore
 * @param {object} criteri : oggeto nome colonna e valore
 * @returns 
 */
function updateSql(nomeTabella, valori,criteri) {
    let obj = sqlQuery.update();
    let sql = obj
        .into(nomeTabella)
        .set(valori)
        .where(criteri)
        .build();
    return sql;
}

function deleteSql(nomeTabella, criteri) {
    let obj = sqlQuery.remove();
    let sql = obj
        .from(nomeTabella)
        .where(criteri)
        .build();
    return sql;
}

const operatori = {
    'between': sql.between,
    'not_between': sql.not_between,
    'like': sql.like,
    'not_like': sql.not_like,
    'eq': sql.eq,
    'ne': sql.ne,
    'gt': sql.gt,
    'gte': sql.gte,
    'lt': sql.lt,
    'lte': sql.lte,
    'not_in': sql.not_in
}
module.exports = {
    operatori,
    selectSql,
    insertSql,
    updateSql,
    deleteSql
}