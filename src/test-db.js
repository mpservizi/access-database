const MyQuery = require('./my-querry');
const DbManger = require('./db-manager');

let dbPath = 'mydb.accdb';

if (!DbManger.init(dbPath)) {
    console.log('Errore apertura database');
    return;
}


async function qr_select(sql) {
    let result = await DbManger.select(sql);
    console.log(result);
}
async function qr_update(sql) {
    let result = await DbManger.update(sql);
    console.log(result);
}
async function qr_insert(sql) {
    let result = await DbManger.insert(sql);
    console.log(result);
}
async function qr_delete(sql) {
    let result = await DbManger.delete(sql);
    console.log(result);
}

function test_select() {
    // let sql_all = MyQuery.selectSql('nomi')
    // let sql_nome = MyQuery.selectSql('nomi',['Nome'])
    // let sql_where = MyQuery.selectSql('nomi',[],{ID:1})
    // let sql_operator = MyQuery.selectSql('nomi',[],{ID:MyQuery.operatori.gt(5)})
    let sql_operator_between = MyQuery.selectSql('nomi', [], { ID: MyQuery.operatori.between(5, 13) })

    let sql = sql_operator_between;
    console.log(sql);
    qr_select(sql);
}

async function test_insert() {
    let prima = MyQuery.selectSql('nomi');
    let sql = MyQuery.insertSql('nomi', { Nome: 'Code', Anni: 20 })
    let dopo = MyQuery.selectSql('nomi');
    console.log(sql);
    await qr_select(prima);
    await qr_insert(sql);
    await qr_select(dopo);
}

async function test_update() {
    let sql = MyQuery.updateSql('nomi', { Nome: 'U-' }, { Nome: 'Code' })
    console.log(sql);
    await qr_select(MyQuery.selectSql('nomi'))
    await qr_update(sql);
    await qr_select(MyQuery.selectSql('nomi'))
}

async function test_delete() {
    let sql = MyQuery.deleteSql('nomi', { Nome: 'U-' })
    console.log(sql);
    await qr_select(MyQuery.selectSql('nomi'))
    await qr_delete(sql);
    await qr_select(MyQuery.selectSql('nomi'))
}

function testOperatori() {
    Object.keys(MyQuery.operatori).forEach(item => {
        let f = MyQuery.operatori[item];
        let s = MyQuery.selectSql('nomi', [], { ID: f(5, 10) });
        console.log(s);
    })
}

test_select();