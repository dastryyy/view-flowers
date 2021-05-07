var sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('flowers2019.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        //cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database')
    }
})

module.exports = db