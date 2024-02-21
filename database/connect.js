const path = require("path");
const better_sqlite3 = require('better-sqlite3')(path.join(__dirname, "./sqlite.db"));
const config = require("../config/config.js");

const sqliteExecute = {
    get: async (query, params) => {
        const row = await better_sqlite3.prepare(query).get(params);
        if(!row){
            return {
                results: [],
            }
        }
        if(!Array.isArray(row)){
            let rowArray = [];
            rowArray.push(row);
            return {
                results: rowArray,
            }
        }
        return {
            results: row,
        }
    },
    run: async (query, params) => {
        const row = await better_sqlite3.prepare(query).run(params);
        return row;
    },
    all: async (query, params) =>{
        const rows = await better_sqlite3.prepare(query).all(params);
        return {
            results: rows,
        }
    },
}

exports.sqliteExecute = sqliteExecute;